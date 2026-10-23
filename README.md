# Akash Rai &mdash; Personal Portfolio Website

[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20Level%20AA-success?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![HTML5 Validated](https://img.shields.io/badge/HTML5-Semantic%20Standards-blue?style=flat-square)](https://validator.w3.org/)
[![No Frameworks](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%7C%20CSS3%20%7C%20JS-orange?style=flat-square)](#technology-stack)
[![Student Developer](https://img.shields.io/badge/Student%20Developer-B.Tech%20CSE%20(AI%2FML)-blueviolet?style=flat-square)](#about-akash-rai)

A responsive, accessible, multi-page personal portfolio website for **Akash Rai**, built strictly upon verified academic, technical, and project information. Designed following modern semantic HTML5 practices, Web Content Accessibility Guidelines (WCAG 2.2 Level AA), and technical SEO standards.

---

## Table of Contents

1. [Developer Profile & Academic Context](#developer-profile--academic-context)
2. [Technology Stack](#technology-stack)
3. [Multi-Page Architecture](#multi-page-architecture)
4. [Genuine Projects Portfolio](#genuine-projects-portfolio)
5. [Verified Technical Skills](#verified-technical-skills)
6. [Strict Personal Information & Ethics Policy](#strict-personal-information--ethics-policy)
7. [Accessibility Implementation (WCAG 2.2 AA)](#accessibility-implementation-wcag-22-aa)
8. [Technical SEO Implementation](#technical-seo-implementation)
9. [Local Development Setup](#local-development-setup)
10. [Customization Guide](#customization-guide)
11. [Testing & Quality Assurance](#testing--quality-assurance)
12. [Deployment Instructions](#deployment-instructions)

---

## 1. Developer Profile & Academic Context

* **Name:** Akash Rai
* **Professional Positioning:** Student Developer | Python | AI/ML | Generative AI
* **Educational Program:** Bachelor of Technology (B.Tech) in Computer Science and Engineering (Artificial Intelligence and Machine Learning) &mdash; CSE (AI/ML)
* **University Affiliation:** Chhattisgarh Swami Vivekanand Technical University (CSVTU), Bhilai
* **Technical Interests:** Python programming, Artificial Intelligence & Machine Learning, Generative AI, data analysis & visualization, web development, backend APIs, prompt engineering, cybersecurity fundamentals, and practical software problem-solving.

---

## 2. Technology Stack

* **Semantic HTML5:** Strict document outline, native landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<address>`, `<figure>`), native controls, and WAI-ARIA 1.2 live regions.
* **Modern CSS3:** CSS Custom Properties (Tokens), Flexbox, CSS Grid, fluid typography (`clamp()`), high-contrast `:focus-visible` indicators, Light/Dark theme switching (deep charcoal & neon cyan/violet accents), interactive micro-animations on all controls, and print stylesheets.
* **Vanilla JavaScript (ES6+):** Lightweight modular scripts without bulky frameworks. Manages accessible navigation toggle, theme switching with `localStorage` and system sync, interactive project category filtering with live announcements, and client-side accessible form validation with FormSubmit + honeypot anti-spam.
* **Three.js WebGL 3D Canvas:** Immersive, high-performance 3D Programming Universe rendered globally across all pages (`index.html`, `about.html`, `skills.html`, `projects.html`, `contact.html`, `404.html`) extending seamlessly from the very top to the bottom of each page. Features 16 transparent authentic programming logos tumbling like asteroids, a 3-layer depth orbit, central neural network core, cybersecurity wireframe shield, smooth cursor parallax, document scroll voyage navigation, dynamic light/dark theme synchronization, WebGL capability check, `prefers-reduced-motion` static frame rendering, and background tab pause via `visibilitychange`. Fully offline-capable via vendored `assets/js/three.min.js`.
* **Vector Graphics (SVG):** Responsive, high-contrast, scalable icons. Decorative inline icons are marked `aria-hidden="true"` so screen readers skip them; informative graphics (photos, screenshots) carry descriptive `alt` text.

---

## 3. Multi-Page Architecture

```text
D:\personal_portfilo/
├── index.html                           # Home / Landing page with 3D WebGL hero & project highlights
├── about.html                           # Educational context, learning journey & CSVTU affiliation
├── skills.html                          # Structured 7-category technical skills matrix
├── projects.html                        # Filterable portfolio of 5 genuine projects
├── contact.html                         # Accessible contact form & direct channels
├── 404.html                             # Custom accessible 404 not-found page
├── assets/
│   ├── css/
│   │   └── styles.css                   # Shared design tokens, layout & accessibility rules
│   ├── js/
│   │   ├── main.js                      # Core vanilla JavaScript functionality
│   │   ├── three.min.js                 # Vendored Three.js r128 (100% offline standalone WebGL engine)
│   │   └── 3d-universe.js               # Interactive 3D Programming Universe (WebGL space, asteroids, code, neural net)
│   ├── images/
│   │   ├── Akash_rai.jpeg               # Genuine developer photograph of Akash Rai
│   │   ├── project-placeholder.svg      # Neutral project illustration (spare fallback asset)
│   │   ├── resume-analyser-ai.png       # Resume Analyser AI opening interface screenshot
│   │   ├── kshamta-ai.png               # Capacity Connect (Kshamta AI) opening interface screenshot
│   │   ├── prompt-tester-ai.png         # Prompt Tester AI opening interface screenshot
│   │   ├── nexus-ai.png                 # NexusAI (Prapt) multi-model platform opening interface screenshot
│   │   └── shiksha-saathi.png           # Shiksha Saathi privacy web platform opening interface screenshot
│   └── icons/
│       ├── favicon.svg                  # High-contrast SVG brand favicon (< / >)
│       └── logo.jpeg                    # Custom AI + Python developer brand logo
├── robots.txt                           # Crawl directives pointing to sitemap
├── sitemap.xml                          # Search engine XML URL index
├── verify-portfolio.js                  # Dependency-free automated QA test suite (node verify-portfolio.js)
├── .gitignore                           # Git repository exclusions for OS, editor, and build artifacts
└── README.md                            # Comprehensive project documentation
```

---

## 4. Genuine Projects Portfolio

Every project is presented with evidence-based status classifications and technical notes:

| Project | Status Classification | Verified Technologies | Core Highlights |
| :--- | :--- | :--- | :--- |
| **AI Resume Analyzer** | Implemented Prototype | Python, Streamlit, PyPDF2, Matplotlib, Regex | Uploads resume PDFs, extracts categorized skills with regex, computes matching scores, and charts missing competencies. |
| **Kshamta AI (Capacity Connect)** | Hackathon Prototype | FastAPI, SQLAlchemy, SQLite, Pydantic, React, Vite | Capacity-building learning portal developed for Smart India Hackathon 2026 (Problem Statement ID: 26075, MoES / IMD context). |
| **Prompt Tester AI** | Implemented Prototype | React, Vite, Node.js, Express.js, Groq SDK | Client-server architecture executing user prompts via Groq SDK through an Express backend that keeps API keys secure. |
| **NexusAI** | Implemented Full-Stack Platform | React 19, TypeScript, Node.js, Express.js, Prisma ORM, SQLite, Tailwind CSS | Full-stack AI chatbot platform featuring multi-model selection (Gemini, GPT-4o, Claude), LaTeX math, and document vector processing. |
| **Shiksha Saathi** | Browser-Side Prototype | HTML5, CSS3, Vanilla JavaScript | Privacy-conscious web platform supporting English and Hindi to provide helpline contacts and resource cards without server tracking. |

---

## 5. Verified Technical Skills

Skills are categorized into 7 functional domains without arbitrary numerical ratings:

1. **Programming Languages:** Python, C, JavaScript (ES6+), Java
2. **Python & Data Analysis:** NumPy, Pandas, Matplotlib, Streamlit, Regular Expressions (re), PyPDF2
3. **Frontend Development:** HTML5, CSS3, React, Vite, Tailwind CSS
4. **Backend & APIs:** FastAPI, Node.js, Express.js, RESTful API design
5. **Databases & Data Access:** SQLite, SQLAlchemy ORM, PostgreSQL (architectural concepts)
6. **Computer Science Fundamentals:** Data Structures and Algorithms, Operating Systems, Computer Networks, Digital Electronics and Logic Design
7. **Development Tools & Concepts:** Git & GitHub, Prompt Engineering, Generative AI, AI-assisted development, Cybersecurity fundamentals

---

## 6. Strict Personal Information & Ethics Policy

In accordance with strict personal data guidelines:

* **No Fictional Identity:** No random names, fake credentials, or third-party identities are used.
* **Verified Genuine Contact Details & Privacy:** Only appropriate public professional channels are displayed:
  - **Email:** `akashrai34558@gmail.com` (`mailto:akashrai34558@gmail.com`)
  - **GitHub:** `https://github.com/pycoderakash`
  - **LinkedIn:** `https://www.linkedin.com/in/akash-rai-3927593b9`
  - **Privacy Protection:** Personal phone numbers and sensitive personal identifiers are strictly excluded from all public pages, metadata, and structured data.
* **Centralized Configuration:** Contact channels are defined once in `assets/js/main.js` (`window.portfolioProfile`). On page load, the script syncs every footer/sidebar link marked with `data-profile-link="email" | "github" | "linkedin"` and is used for the FormSubmit endpoint, autoresponder text, and mailto fallback. Static HTML keeps identical values as a no-JavaScript fallback.
* **No Unverified Claims:** Academic status is presented accurately as a B.Tech student at CSVTU Bhilai without guessing semester, graduation year, or CGPA.
* **No Fabricated Employment:** Positioned strictly as a student developer; no employment or senior engineer claims are made.
* **No False Production Links:** No unverified deployment domains or fabricated repositories are presented as live.

---

## 7. Accessibility Implementation (WCAG 2.2 AA)

* **2.4.1 Bypass Blocks (Skip Navigation):** Every page includes `<a href="#main-content" class="skip-link">Skip to main content</a>` positioned off-screen and visible on keyboard focus.
* **2.4.7 & 2.4.11 Focus Visible:** Custom `:focus-visible` styling provides a high-contrast 3px outline with a 3px offset across all buttons, links, and inputs.
* **1.4.3 & 1.4.11 Color Contrast:**
  - Normal text contrast exceeds **7:1** (surpassing the 4.5:1 AA standard).
  - Headings exceed **8:1**.
  - Interactive component borders exceed **3:1** against adjacent backgrounds.
* **1.3.1 Info and Relationships:** Real semantic HTML elements convey page structure without relying on visual formatting.
* **2.5.8 Target Size:** Interactive controls meet the minimum touch target size of 44×44 CSS pixels.
* **2.3.3 Reduced Motion:** Full `@media (prefers-reduced-motion: reduce)` support reduces all transitions to `0.01ms`.
* **1.4.10 Reflow:** Fluid responsive layout operates cleanly at 320px viewport width and at 200% browser zoom without horizontal scrollbars.

---

## 8. Technical SEO Implementation

* Unique, descriptive `<title>` and `<meta name="description">` on every page.
* Open Graph and Twitter Card tags with **absolute** `https://` image URLs, `og:url`, `og:site_name`, and `og:locale` (required by social scrapers).
* `<link rel="canonical">` on every indexable page.
* Valid Schema.org JSON-LD structured data on all pages (including the noindexed 404 page) referencing Akash Rai as a student developer affiliated with CSVTU Bhilai.
* `robots.txt` and `sitemap.xml` configured for the live site URL `https://pycoderakash.github.io/My_Portfolio` (see [Site URL Configuration](#site-url-configuration)).

---

## 9. Local Development Setup

No build tools, bundlers, or package installations are required to view the portfolio.

### Option A: Using Python (Built-in)
```powershell
cd "D:\personal_portfilo"
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

### Option B: Using Node.js
```powershell
npx serve "D:\personal_portfilo" -p 8080
```

---

## 10. Customization Guide

### Verified Contact Channels & Configuration
All contact channels are verified and integrated across the portfolio:
* **Email:** `akashrai34558@gmail.com`
* **GitHub:** `https://github.com/pycoderakash`
* **LinkedIn:** `https://www.linkedin.com/in/akash-rai-3927593b9`

Contact information is centralized in `assets/js/main.js`:
```javascript
const profile = {
  name: "Akash Rai",
  email: "akashrai34558@gmail.com",
  linkedin: "https://www.linkedin.com/in/akash-rai-3927593b9",
  github: "https://github.com/pycoderakash"
};
window.portfolioProfile = Object.freeze(profile);
```

### Developer Profile Photograph
The genuine developer photograph is integrated from `assets/images/Akash_rai.jpeg`:
* Displayed in the hero section on `index.html` with `.profile-image` responsive styling (`width: 350px`, `object-fit: cover`, `object-position: center top`).
* Displayed in the profile summary card on `about.html` (`.about__image`).
* Configured as the social share image (`og:image` and `twitter:image`) on `index.html`, `about.html`, `skills.html`, and `contact.html` (absolute URLs).
* `assets/images/project-placeholder.svg` is retained as a spare neutral illustration asset.

### Site URL Configuration
All absolute URLs (canonical, `og:url`, `og:image`, `twitter:image`, `sitemap.xml`, `robots.txt`) currently use the GitHub Pages project URL:

```text
https://pycoderakash.github.io/My_Portfolio
```

If you deploy to a custom domain, update the base URL in **all** of the following places:
1. `sitemap.xml` — every `<loc>` entry
2. `robots.txt` — the `Sitemap:` line
3. Every HTML page — `<link rel="canonical">`, `og:url`, `og:image`, and `twitter:image` meta tags in `<head>`

### Live Form Submission Integration
The contact form is connected with live email routing directly to `akashrai34558@gmail.com` via **FormSubmit**:
* **Live Action Endpoint:** `https://formsubmit.co/akashrai34558@gmail.com` (with progressive enhancement via AJAX API).
* **Features:** Real-time client-side validation, loading spinner states, automated autoresponder to senders, structured email layout, and accessible fallback to native email client.
* **One-Time Activation:** FormSubmit sends an initial "Activate Form" email to `akashrai34558@gmail.com`. Once clicked, all future submissions arrive directly in your inbox without requiring ongoing configuration.

---

## 11. Testing & Quality Assurance

Run the automated verification test suite (no dependencies required, Node.js only):
```powershell
node verify-portfolio.js
```
The test suite validates:
* HTML5 document structure and valid `<!doctype html>`.
* Unique element IDs across all pages.
* Single `<main id="main-content">` landmark per page.
* Exactly one `<h1>` per page with logical heading hierarchy.
* Associated `<label for="...">` on all form fields.
* Valid `aria-describedby` references.
* Working internal navigation links.
* Valid alt text on all images.
* Accessible theme switching and mobile menu keyboard operability.

---

## 12. Deployment Instructions

### Deploy to GitHub Pages
1. Initialize a git repository in `D:\personal_portfilo`:
   ```powershell
   cd "D:\personal_portfilo"
   git init
   git add .
   git commit -m "Initial commit: Akash Rai Personal Portfolio"
   ```
2. Create a GitHub repository (e.g. `akashrai.github.io`).
3. Push to GitHub:
   ```powershell
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
4. Enable **GitHub Pages** from the repository Settings menu (deploy from the `main` branch, root folder).

### After Deployment
* The site URL `https://pycoderakash.github.io/My_Portfolio` is already configured in `sitemap.xml`, `robots.txt`, and all HTML meta tags. If you rename the repository or use a custom domain, follow [Site URL Configuration](#site-url-configuration).
* **FormSubmit one-time activation:** the first real contact-form submission triggers an "Activate Form" email to `akashrai34558@gmail.com` — click the link inside it once to enable live delivery.

---

&copy; 2026 Akash Rai. Built with semantic HTML5, CSS3, and vanilla JavaScript.
