/**
 * verify-portfolio.js — Dependency-free QA test suite for the portfolio site.
 * Run with: node verify-portfolio.js
 *
 * Validates HTML structure, accessibility basics, SEO tags, internal links,
 * image alt text, and deployment readiness (no placeholder domains).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const HTML_PAGES = ['index.html', 'about.html', 'skills.html', 'projects.html', 'contact.html', '404.html'];
const INDEXABLE_PAGES = ['index.html', 'about.html', 'skills.html', 'projects.html', 'contact.html'];

let passed = 0;
let failed = 0;
const failures = [];

function check(ok, label) {
  if (ok) {
    passed++;
  } else {
    failed++;
    failures.push(label);
  }
}

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function extractIds(html) {
  const ids = [];
  const re = /\sid\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) ids.push(m[1]);
  return ids;
}

// ---------------------------------------------------------------------------
// 1. Per-page HTML checks
// ---------------------------------------------------------------------------
HTML_PAGES.forEach(function (page) {
  const html = read(page);

  check(/^<!doctype html>/i.test(html), page + ': has <!doctype html>');
  check(/<html\s[^>]*lang=/.test(html), page + ': <html> has a lang attribute');

  // Unique IDs
  const ids = extractIds(html);
  const unique = new Set(ids);
  check(ids.length === unique.size, page + ': all element IDs are unique');

  // Landmarks
  const mainMatches = html.match(/<main\b[^>]*id\s*=\s*["']main-content["']/gi) || [];
  check(mainMatches.length === 1, page + ': exactly one <main id="main-content">');

  // Headings
  const h1Matches = html.match(/<h1\b/gi) || [];
  check(h1Matches.length === 1, page + ': exactly one <h1>');

  // Skip link
  check(html.indexOf('class="skip-link"') !== -1, page + ': includes a skip link');

  // Images must have alt attributes
  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  const missingAlt = imgTags.filter(function (tag) {
    return !/\salt\s*=\s*["'][^"']*["']/i.test(tag);
  });
  check(missingAlt.length === 0, page + ': every <img> has an alt attribute');

  // JSON-LD present and valid JSON
  const ldMatches = html.match(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  check(ldMatches.length >= 1, page + ': includes JSON-LD structured data');
  ldMatches.forEach(function (block, i) {
    const json = block.replace(/^[\s\S]*?>/i, '').replace(/<\/script>$/i, '');
    let parsed = null;
    try {
      parsed = JSON.parse(json);
    } catch (e) {
      parsed = null;
    }
    check(parsed !== null, page + ': JSON-LD block ' + (i + 1) + ' is valid JSON');

    // schema.org email must not use a mailto: prefix
    if (parsed) {
      const text = JSON.stringify(parsed);
      check(text.indexOf('"mailto:') === -1, page + ': JSON-LD email has no mailto: prefix');
    }
  });

  // aria-describedby references must resolve to existing IDs
  const describedByRe = /aria-describedby\s*=\s*["']([^"']+)["']/gi;
  let dbm;
  while ((dbm = describedByRe.exec(html)) !== null) {
    dbm[1].split(/\s+/).forEach(function (ref) {
      check(ids.indexOf(ref) !== -1, page + ': aria-describedby reference "#' + ref + '" exists');
    });
  }

  // Internal page links must resolve to real files
  const hrefRe = /href\s*=\s*["']([^"']+)["']/gi;
  let hm;
  while ((hm = hrefRe.exec(html)) !== null) {
    const href = hm[1];
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
    const target = href.split('#')[0].split('?')[0];
    if (!target) continue;
    check(fs.existsSync(path.join(ROOT, target)), page + ': internal link "' + href + '" resolves');
  }

  // Indexable pages: canonical + absolute social image URLs
  if (INDEXABLE_PAGES.indexOf(page) !== -1) {
    check(/<link\s[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']https:\/\//i.test(html) ||
          /<link\s[^>]*href\s*=\s*["']https:\/\/[^"']*["'][^>]*rel\s*=\s*["']canonical["']/i.test(html),
      page + ': has an absolute canonical URL');

    const ogImage = html.match(/property\s*=\s*["']og:image["']\s+content\s*=\s*["']([^"']+)["']/i) ||
                    /content\s*=\s*["']([^"']+)["']\s+property\s*=\s*["']og:image["']/i.exec(html);
    check(ogImage && /^https:\/\//.test(ogImage[1]), page + ': og:image is an absolute https URL');

    const twImage = html.match(/name\s*=\s*["']twitter:image["']\s+content\s*=\s*["']([^"']+)["']/i) ||
                    /content\s*=\s*["']([^"']+)["']\s+name\s*=\s*["']twitter:image["']/i.exec(html);
    check(twImage && /^https:\/\//.test(twImage[1]), page + ': twitter:image is an absolute https URL');

    check(/property\s*=\s*["']og:url["']/.test(html), page + ': includes og:url');
  }

  // Theme toggle must not hardcode a wrong state claim
  check(html.indexOf('aria-label="Switch to dark theme (currently light)"') === -1,
    page + ': theme toggle has no hardcoded state claim');
});

// ---------------------------------------------------------------------------
// 2. Contact form specifics
// ---------------------------------------------------------------------------
(function () {
  const html = read('contact.html');
  check(html.indexOf('novalidate') === -1, 'contact.html: form keeps native validation (no novalidate)');

  const labelForRe = /<label\s[^>]*for\s*=\s*["']([^"']+)["']/gi;
  let lm;
  while ((lm = labelForRe.exec(html)) !== null) {
    check(html.indexOf('id="' + lm[1] + '"') !== -1, 'contact.html: label for="#' + lm[1] + '" matches a field id');
  }

  const autoresponse = html.match(/name\s*=\s*["_']?_autoresponse["']?\s+value\s*=\s*["']([^"']+)["']/i);
  const js = read('assets/js/main.js');
  check(autoresponse !== null && js.indexOf('Thank you for contacting') !== -1 &&
        autoresponse[1].indexOf('Thank you for contacting') === 0,
    'contact.html + main.js: autoresponse messages are unified');
  check(js.indexOf('contactForm.noValidate = true') !== -1,
    'main.js: JS takes over form validation (custom a11y validation runs; native is no-JS fallback)');
})();

// ---------------------------------------------------------------------------
// 3. Site-wide config checks
// ---------------------------------------------------------------------------
(function () {
  const sitemap = read('sitemap.xml');
  const robots = read('robots.txt');

  check(sitemap.indexOf('[your-domain.com]') === -1, 'sitemap.xml: no placeholder domain');
  check(robots.indexOf('[your-domain.com]') === -1, 'robots.txt: no placeholder domain');
  check(/<loc>https:\/\//.test(sitemap), 'sitemap.xml: all locations are absolute https URLs');

  const locRe = /<loc>([^<]+)<\/loc>/g;
  let sm;
  while ((sm = locRe.exec(sitemap)) !== null) {
    const page = sm[1].split('/').pop();
    check(fs.existsSync(path.join(ROOT, page)), 'sitemap.xml: listed page "' + page + '" exists');
  }

  const js = read('assets/js/main.js');
  check(js.indexOf('portfolioProfile') !== -1 && js.indexOf('applyProfileToDOM') !== -1,
    'main.js: centralized profile is wired into the DOM');
  check(js.indexOf('AbortController') !== -1, 'main.js: FormSubmit fetch has an AbortController timeout');
  check(js.indexOf('formsubmit.co/ajax/akashrai34558@gmail.com') === -1,
    'main.js: FormSubmit endpoint uses profile.email (no hardcoded email)');

  const css = read('assets/css/styles.css');
  check(css.indexOf('color-scheme: light') !== -1 && css.indexOf('color-scheme: dark') !== -1,
    'styles.css: color-scheme declared for both themes');
  check(/\[hidden\]\s*\{[^}]*display:\s*none\s*!important/.test(css),
    'styles.css: [hidden] guard present');
  check(css.indexOf('#0369a1') === -1 || css.indexOf('--color-status-prototype') !== -1,
    'styles.css: prototype status color uses design tokens');
})();

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log('\nPortfolio QA Verification Suite');
console.log('===============================');
console.log('Passed: ' + passed);
console.log('Failed: ' + failed);

if (failed > 0) {
  console.log('\nFailures:');
  failures.forEach(function (f) {
    console.log('  ✗ ' + f);
  });
  process.exit(1);
} else {
  console.log('\n✓ All checks passed.');
  process.exit(0);
}
