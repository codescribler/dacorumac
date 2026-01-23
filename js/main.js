// Dacorum Athletics Club - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  initMobileMenu();

  // Sticky Header
  initStickyHeader();

  // Dropdown Menus (for mobile)
  initDropdowns();

  // Animated Counters
  initCounters();

  // Tabs
  initTabs();

  // Accordions
  initAccordions();

  // Scroll Animations
  initScrollAnimations();

  // Form Validation
  initFormValidation();
});

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('active');
    overlay?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Sticky Header with blur effect
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    lastScroll = currentScroll;
  });
}

// Dropdown Menus for Mobile & Desktop focus fix
function initDropdowns() {
  // Mobile toggle
  const mobileBtns = document.querySelectorAll('.mobile-dropdown-btn');
  mobileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.dropdown-icon');
      content.classList.toggle('hidden');
      icon?.classList.toggle('rotate-180');
    });
  });

  // Desktop click-to-blur fix (prevents sticking after click)
  const desktopBtns = document.querySelectorAll('.dropdown > button');
  desktopBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.blur();
    });
    // Also handle mouseleave to be safe
    btn.parentElement.addEventListener('mouseleave', () => {
      btn.blur();
    });
  });
}

// Animated Counters
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const options = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-counter'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target + (element.hasAttribute('data-suffix') ? element.getAttribute('data-suffix') : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.hasAttribute('data-suffix') ? element.getAttribute('data-suffix') : '');
    }
  }, 16);
}

// Tabs
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.getAttribute('data-tab');

        // Update tabs
        tabs.forEach(t => {
          t.classList.remove('tab-active', 'border-violet-600', 'text-violet-600');
          t.classList.add('border-transparent', 'text-gray-500');
        });
        tab.classList.add('tab-active', 'border-violet-600', 'text-violet-600');
        tab.classList.remove('border-transparent', 'text-gray-500');

        // Update panels
        panels.forEach(panel => {
          if (panel.getAttribute('data-panel') === targetPanel) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });
  });
}

// Accordions
function initAccordions() {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach(accordion => {
    const btn = accordion.querySelector('[data-accordion-btn]');
    const content = accordion.querySelector('[data-accordion-content]');
    const icon = accordion.querySelector('[data-accordion-icon]');

    btn?.addEventListener('click', () => {
      const isOpen = content.classList.contains('active');

      if (isOpen) {
        content.classList.remove('active');
        content.style.maxHeight = '0';
        icon?.classList.remove('rotate-180');
      } else {
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon?.classList.add('rotate-180');
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (elements.length === 0) return;

  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const inputs = form.querySelectorAll('[required]');

      inputs.forEach(input => {
        const errorEl = input.parentElement.querySelector('.error-message');

        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('border-red-500');
          if (errorEl) errorEl.classList.remove('hidden');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
          isValid = false;
          input.classList.add('border-red-500');
          if (errorEl) errorEl.classList.remove('hidden');
        } else {
          input.classList.remove('border-red-500');
          if (errorEl) errorEl.classList.add('hidden');
        }
      });

      if (isValid) {
        // Show success message (placeholder)
        const successMsg = form.querySelector('.success-message');
        if (successMsg) {
          successMsg.classList.remove('hidden');
          form.reset();
        } else {
          alert('Form submitted successfully! (This is a prototype)');
          form.reset();
        }
      }
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Utility: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Records Filter (for records page)
function filterRecords(gender, ageGroup, eventType) {
  const rows = document.querySelectorAll('[data-record-row]');

  rows.forEach(row => {
    const rowGender = row.getAttribute('data-gender');
    const rowAge = row.getAttribute('data-age');
    const rowEvent = row.getAttribute('data-event');

    const matchGender = gender === 'all' || rowGender === gender;
    const matchAge = ageGroup === 'all' || rowAge === ageGroup;
    const matchEvent = eventType === 'all' || rowEvent === eventType;

    if (matchGender && matchAge && matchEvent) {
      row.classList.remove('hidden');
    } else {
      row.classList.add('hidden');
    }
  });
}

// Expose filter function globally for records page
window.filterRecords = filterRecords;
