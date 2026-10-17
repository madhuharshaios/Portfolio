/**
 * ===================================================================
 * PRABHATH AKALANKA - DATA SCIENCE PORTFOLIO JAVASCRIPT
 * Features:
 * - Dynamic Title Typing Effect
 * - Sticky Navbar & Mobile Drawer
 * - Active Section Scroll Spy
 * - Scroll Reveal Animations (IntersectionObserver)
 * - Animated Skill Progress Bars
 * - Project Category Filtering
 * - Certificate Lightbox Modal
 * - Contact Form Validation & Mailto Action
 * - Back to Top Floating Button
 * - Dynamic Copyright Year
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------------
     1. HERO TYPING EFFECT
  ----------------------------------------------------------------- */
  const typedTextEl = document.querySelector('.typed-text');
  if (typedTextEl) {
    const titles = [
      'Data Science Undergraduate',
      'Aspiring Data Scientist',
      'Machine Learning Enthusiast',
      'Python & Data Analytics Developer'
    ];

    if (prefersReducedMotion) {
      typedTextEl.textContent = titles[0];
    } else {
      let titleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typeSpeed = 90;
      const deleteSpeed = 45;
      const pauseEnd = 1800;
      const pauseStart = 400;

      function typeLoop() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
          typedTextEl.textContent = currentTitle.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typedTextEl.textContent = currentTitle.substring(0, charIndex + 1);
          charIndex++;
        }

        let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentTitle.length) {
          // Pause at end of title
          nextSpeed = pauseEnd;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          // Move to next title
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          nextSpeed = pauseStart;
        }

        setTimeout(typeLoop, nextSpeed);
      }

      typeLoop();
    }
  }

  /* -----------------------------------------------------------------
     2. STICKY NAVBAR & BACK-TO-TOP BUTTON VISIBILITY
  ----------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar style on scroll
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* -----------------------------------------------------------------
     3. MOBILE NAVIGATION DRAWER
  ----------------------------------------------------------------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (menuToggle && mobileNav) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
      
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    // Close when clicking mobile link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') && 
          !mobileNav.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  /* -----------------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  ----------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* -----------------------------------------------------------------
     5. ANIMATED SKILL PROGRESS BARS
  ----------------------------------------------------------------- */
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  const skillsSection = document.querySelector('#skills');

  if (skillsSection && skillBars.length > 0) {
    let animated = false;

    const triggerSkillBars = () => {
      if (animated) return;
      skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress') || '0';
        bar.style.width = `${targetWidth}%`;
      });
      animated = true;
    };

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerSkillBars();
          }
        });
      }, { threshold: 0.2 });

      skillObserver.observe(skillsSection);
    } else {
      triggerSkillBars();
    }
  }

  /* -----------------------------------------------------------------
     6. ACTIVE NAV LINK HIGHLIGHTER (Scroll Spy)
  ----------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* -----------------------------------------------------------------
     7. PROJECTS FILTERING
  ----------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active button toggle
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.classList.remove('hidden');
            if (!prefersReducedMotion) {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 50);
            }
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* -----------------------------------------------------------------
     8. CERTIFICATE LIGHTBOX / PREVIEW MODAL
  ----------------------------------------------------------------- */
  const modalOverlay = document.querySelector('#certModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalImg = document.querySelector('#modalCertImg');
  const modalTitle = document.querySelector('#modalCertTitle');
  const modalIssuer = document.querySelector('#modalCertIssuer');
  const modalYear = document.querySelector('#modalCertYear');
  const modalRecipient = document.querySelector('#modalCertRecipient');
  const modalCode = document.querySelector('#modalCertCode');
  const modalVerifyBtn = document.querySelector('#modalCertVerifyBtn');
  const certCards = document.querySelectorAll('.cert-card');

  const openCertModal = (card) => {
    if (!modalOverlay) return;

    const title = card.getAttribute('data-title') || 'Certificate of Completion';
    const issuer = card.getAttribute('data-issuer') || 'Issuing Authority';
    const year = card.getAttribute('data-year') || '';
    const imgSrc = card.getAttribute('data-image') || 'assets/certificates/certificate-placeholder.jpg';
    const recipient = card.getAttribute('data-recipient') || 'Prabhath Akalanka';
    const code = card.getAttribute('data-code') || '';
    const verifyUrl = card.getAttribute('data-verify-url') || '';

    if (modalTitle) modalTitle.textContent = title;
    if (modalIssuer) modalIssuer.textContent = issuer;
    if (modalYear) modalYear.textContent = year ? `Date / Period: ${year}` : 'Completed';
    if (modalImg) modalImg.src = imgSrc;

    if (modalRecipient) {
      modalRecipient.textContent = recipient;
    }

    if (modalCode) {
      if (code) {
        modalCode.parentElement.style.display = 'flex';
        modalCode.textContent = code;
      } else {
        modalCode.parentElement.style.display = 'none';
      }
    }

    if (modalVerifyBtn) {
      if (verifyUrl) {
        modalVerifyBtn.style.display = 'inline-flex';
        modalVerifyBtn.href = verifyUrl;
      } else {
        modalVerifyBtn.style.display = 'none';
      }
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCertModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  certCards.forEach(card => {
    card.addEventListener('click', () => openCertModal(card));
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCertModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeCertModal();
      }
    });
  }

  /* -----------------------------------------------------------------
     8B. CV PREVIEW MODAL
  ----------------------------------------------------------------- */
  const cvModalOverlay = document.querySelector('#cvModal');
  const cvCloseBtn = document.querySelector('#cvModalCloseBtn');
  const openCvBtns = document.querySelectorAll('.open-cv-modal');

  const openCvModal = () => {
    if (!cvModalOverlay) return;
    cvModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCvModal = () => {
    if (!cvModalOverlay) return;
    cvModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openCvBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  });

  if (cvCloseBtn) {
    cvCloseBtn.addEventListener('click', closeCvModal);
  }

  if (cvModalOverlay) {
    cvModalOverlay.addEventListener('click', (e) => {
      if (e.target === cvModalOverlay) {
        closeCvModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeCertModal();
      }
      if (cvModalOverlay && cvModalOverlay.classList.contains('active')) {
        closeCvModal();
      }
    }
  });

  /* -----------------------------------------------------------------
     9. CONTACT FORM VALIDATION & MAILTO ACTION
  ----------------------------------------------------------------- */
  const contactForm = document.querySelector('#contactForm');
  const formToast = document.querySelector('#formToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.querySelector('#name');
      const emailInput = document.querySelector('#email');
      const subjectInput = document.querySelector('#subject');
      const messageInput = document.querySelector('#message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validation
      if (!name) {
        alert('Please enter your name.');
        if (nameInput) nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!subject) {
        alert('Please enter a message subject.');
        if (subjectInput) subjectInput.focus();
        return;
      }

      if (!message || message.length < 10) {
        alert('Please enter a message containing at least 10 characters.');
        if (messageInput) messageInput.focus();
        return;
      }

      // Format recipient and construct mailto link
      const recipient = 'prabhathakalanka341@gmail.com';
      const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${subject}`);
      const mailtoBody = encodeURIComponent(
        `Hello Prabhath,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Portfolio Contact Form`
      );

      const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Show toast notification
      if (formToast) {
        formToast.classList.add('show');
        setTimeout(() => {
          formToast.classList.remove('show');
        }, 7000);
      }

      // Open mail application
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      // Reset form
      contactForm.reset();
    });
  }

  /* -----------------------------------------------------------------
     10. DYNAMIC COPYRIGHT YEAR
  ----------------------------------------------------------------- */
  const yearEl = document.querySelector('#currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
