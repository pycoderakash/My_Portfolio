/**
 * ACCESSIBLE SEMANTIC PORTFOLIO — CORE SCRIPT
 * WCAG 2.2 Level AA Keyboard Navigation, Theme Toggle, Project Filter, Accessible Form
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 0. Centralized Profile & Contact Configuration
  // ---------------------------------------------------------------------------
  const profile = {
    name: "Akash Rai",
    email: "akashrai34558@gmail.com",
    linkedin: "https://www.linkedin.com/in/akash-rai-3927593b9",
    github: "https://github.com/pycoderakash"
  };

  // Expose on window for programmatic access or external components
  window.portfolioProfile = Object.freeze(profile);

  // ---------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark with System Preference & Persistence)
  // ---------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'portfolio-theme-preference';
  const rootElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  const MOON_PATH = 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z';
  const SUN_PATH = 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z';

  function applyTheme(theme, save = true) {
    if (theme === 'dark') {
      rootElement.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', 'true');
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme (currently dark)');
        const labelSpan = themeToggleBtn.querySelector('.theme-toggle__text');
        if (labelSpan) labelSpan.textContent = 'Light Mode';
        const iconPath = themeToggleBtn.querySelector('.theme-toggle__icon path');
        if (iconPath) iconPath.setAttribute('d', SUN_PATH);
      }
    } else {
      rootElement.setAttribute('data-theme', 'light');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', 'false');
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme (currently light)');
        const labelSpan = themeToggleBtn.querySelector('.theme-toggle__text');
        if (labelSpan) labelSpan.textContent = 'Dark Mode';
        const iconPath = themeToggleBtn.querySelector('.theme-toggle__icon path');
        if (iconPath) iconPath.setAttribute('d', MOON_PATH);
      }
    }

    if (save) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (e) {
        // LocalStorage might be disabled or full
      }
    }
  }

  // Initialize theme
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (e) {
    savedTheme = null;
  }

  const initialTheme = savedTheme || getSystemTheme();
  applyTheme(initialTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = rootElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, true);
    });
  }

  // Listen for OS theme changes if user has not set an explicit override
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      let stored = null;
      try {
        stored = localStorage.getItem(THEME_STORAGE_KEY);
      } catch (err) {}
      if (!stored) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Responsive Mobile Navigation (Keyboard & Focus Friendly)
  // ---------------------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (menuToggle && primaryNav) {
    function toggleMenu(open) {
      const isExpanded = open !== undefined ? open : menuToggle.getAttribute('aria-expanded') === 'true';
      const targetState = !isExpanded;

      menuToggle.setAttribute('aria-expanded', String(targetState));
      if (targetState) {
        primaryNav.classList.add('is-open');
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
      } else {
        primaryNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
      }
    }

    menuToggle.addEventListener('click', function () {
      toggleMenu();
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (menuToggle.getAttribute('aria-expanded') === 'true') {
          toggleMenu(false);
          menuToggle.focus();
        }
      }
    });

    // Close when clicking outside of nav on mobile
    document.addEventListener('click', function (e) {
      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        if (!primaryNav.contains(e.target) && !menuToggle.contains(e.target)) {
          toggleMenu(false);
        }
      }
    });

    // Reset mobile menu state on window resize past 768px
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && menuToggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Projects Filter Toolbar (projects.html)
  // ---------------------------------------------------------------------------
  const filterToolbar = document.getElementById('project-filter-toolbar');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  const filterLiveRegion = document.getElementById('filter-live-region');

  if (filterToolbar && projectCards.length > 0) {
    const filterButtons = filterToolbar.querySelectorAll('.filter-btn');

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const selectedCategory = this.getAttribute('data-filter');

        // Update aria-pressed for all filter buttons
        filterButtons.forEach(function (btn) {
          btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
        });

        let visibleCount = 0;
        const totalCount = projectCards.length;

        projectCards.forEach(function (card) {
          const cardCategories = card.getAttribute('data-category') || '';
          const categoryList = cardCategories.split(' ').map((s) => s.trim().toLowerCase());

          if (selectedCategory === 'all' || categoryList.includes(selectedCategory.toLowerCase())) {
            card.removeAttribute('hidden');
            card.style.display = '';
            visibleCount++;
          } else {
            card.setAttribute('hidden', '');
            card.style.display = 'none';
          }
        });

        // Announce count to screen readers
        if (filterLiveRegion) {
          const categoryName = button.textContent.trim();
          filterLiveRegion.textContent = `Showing ${visibleCount} of ${totalCount} projects for filter: ${categoryName}.`;
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Accessible Contact Form Validation (contact.html)
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const subjectInput = document.getElementById('user-subject');
    const messageInput = document.getElementById('user-message');
    const formStatus = document.getElementById('form-status');

    // Validation definitions
    function validateField(input) {
      if (!input) return true;

      const fieldId = input.id;
      const errorElement = document.getElementById(`${fieldId}-error`);
      let isValid = true;
      let errorMessage = '';

      const value = input.value.trim();

      if (input.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required. Please provide a value.';
      } else if (input.type === 'email' && value !== '') {
        // Standard HTML5 email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address (e.g., name@example.com).';
        }
      } else if (fieldId === 'user-name' && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters in length.';
      } else if (fieldId === 'user-message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long.';
      }

      // Update ARIA and DOM
      if (!isValid) {
        input.setAttribute('aria-invalid', 'true');
        if (errorElement) {
          errorElement.textContent = errorMessage;
          errorElement.style.display = 'flex';
        }
      } else {
        input.removeAttribute('aria-invalid');
        if (errorElement) {
          errorElement.textContent = '';
          errorElement.style.display = 'none';
        }
      }

      return isValid;
    }

    // Attach blur validation
    [nameInput, emailInput, subjectInput, messageInput].forEach(function (field) {
      if (!field) return;

      field.addEventListener('blur', function () {
        validateField(field);
      });

      // Clear error on input when user starts correcting
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
    });

    // Form submission handler
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const isNameValid = validateField(nameInput);
      const isEmailValid = validateField(emailInput);
      const isSubjectValid = validateField(subjectInput);
      const isMessageValid = validateField(messageInput);

      const allValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (!allValid) {
        // Count errors
        const invalidFields = [nameInput, emailInput, subjectInput, messageInput].filter(
          (f) => f && f.getAttribute('aria-invalid') === 'true'
        );

        if (formStatus) {
          formStatus.className = 'form-status form-status--error is-visible';
          formStatus.textContent = `The form contains ${invalidFields.length} invalid field${
            invalidFields.length > 1 ? 's' : ''
          }. Please correct the highlighted errors before submitting.`;
        }

        // Move focus to first invalid field (WCAG requirement)
        if (invalidFields.length > 0) {
          invalidFields[0].focus();
        }
      } else {
        // Live Form Submission via FormSubmit AJAX API
        const submitBtn = document.getElementById('submit-btn');
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" class="spin-icon">
              <path d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8zm0 16c-4.41 0-8-3.59-8-8H2c0 5.52 4.48 10 10 10v-2zm8-8c0 4.41-3.59 8-8 8v2c5.52 0 10-4.48 10-10h-2zm0-2h2c0-5.52-4.48-10-10-10v2c4.41 0 8 3.59 8 8z"/>
            </svg>
            Sending message...
          `;
        }

        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          _subject: `Portfolio Message from ${nameInput.value.trim()}: ${subjectInput.value.trim()}`,
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim(),
          _captcha: 'false',
          _template: 'table',
          _autoresponse: 'Thank you for contacting Akash Rai! I have received your message and will respond as soon as possible.'
        };

        fetch('https://formsubmit.co/ajax/akashrai34558@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHTML;
            }

            if (data.success === 'true' || data.success === true) {
              if (formStatus) {
                formStatus.className = 'form-status form-status--success is-visible';
                formStatus.innerHTML = `
                  <strong>Thank you, ${escapeHTML(formData.name)}! Your message has been sent successfully.</strong>
                  <p>Your message was delivered directly to Akash's email inbox (<strong>akashrai34558@gmail.com</strong>). I will review your message and reply to <strong>${escapeHTML(formData.email)}</strong> shortly.</p>
                `;
                formStatus.focus();
              }

              // Reset fields safely
              contactForm.reset();
              [nameInput, emailInput, subjectInput, messageInput].forEach((f) => {
                if (f) f.removeAttribute('aria-invalid');
              });
            } else if (data.message && data.message.includes('Activation')) {
              if (formStatus) {
                formStatus.className = 'form-status form-status--success is-visible';
                formStatus.innerHTML = `
                  <strong>One-Time Activation Required!</strong>
                  <p>FormSubmit has sent an activation confirmation email to <strong>akashrai34558@gmail.com</strong>. Please check your inbox and click <em>'Activate Form'</em> to complete setup.</p>
                `;
                formStatus.focus();
              }
            } else {
              throw new Error(data.message || 'Message transmission failed.');
            }
          })
          .catch(function (error) {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHTML;
            }

            const mailtoFallback = `mailto:akashrai34558@gmail.com?subject=${encodeURIComponent(
              formData._subject
            )}&body=${encodeURIComponent(
              `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            if (formStatus) {
              formStatus.className = 'form-status form-status--error is-visible';
              formStatus.innerHTML = `
                <strong>Message Delivery Notice</strong>
                <p>${escapeHTML(error.message || 'Unable to transmit directly over the network.')}</p>
                <p style="margin-block-start: var(--space-xs);">
                  You can send your message directly to Akash via your email client:
                </p>
                <p style="margin-block-start: var(--space-xs);">
                  <a href="${mailtoFallback}" class="btn btn--secondary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    Open in Email App &rarr;
                  </a>
                </p>
              `;
              formStatus.focus();
            }
          });
      }
    });
  }

  // Safe HTML escaper for client-rendered text
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ---------------------------------------------------------------------------
  // 5. Back to Top Smooth & Focus Handler
  // ---------------------------------------------------------------------------
  const backToTopLinks = document.querySelectorAll('a[href="#main-content"]');
  backToTopLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        // Shift keyboard focus to the main landmark
        mainContent.focus();
      }
    });
  });
})();
