// ===========================
// 🔧 UTILITY FUNCTIONS
// ===========================

// Show toast notifications
function showNotification(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Smooth scroll to section
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===========================
// 🔍 SEARCH FILTER
// ===========================
const searchInput = document.querySelector('.search-bar input');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const listings = document.querySelectorAll('.listing-item');

    let visibleCount = 0;
    listings.forEach(function (listing) {
      const title = listing.querySelector('h3').textContent.toLowerCase();
      const desc = listing.querySelector('p').textContent.toLowerCase();

      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        listing.style.display = 'block';
        listing.style.animation = 'fadeIn 0.3s ease';
        visibleCount++;
      } else {
        listing.style.display = 'none';
      }
    });

    // Show message if no results
    const container = document.querySelector('.listings-container');
    if (container) {
      const noResults = container.querySelector('.no-results');
      if (visibleCount === 0 && searchTerm) {
        if (!noResults) {
          const msg = document.createElement('p');
          msg.className = 'no-results';
          msg.textContent = `No results found for "${searchTerm}"`;
          container.appendChild(msg);
        }
      } else if (noResults) {
        noResults.remove();
      }
    }
  });

  // Add search button functionality
  const searchBtn = document.querySelector('.search-bar .btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      showNotification('Searching listings...', 'info');
    });
  }
}

// ===========================
// 🏷️ CATEGORY FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Remove active from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const category = this.textContent.trim();
    const listings = document.querySelectorAll('.listing-item');

    let visibleCount = 0;
    listings.forEach(function (listing) {
      const tag = listing.querySelector('.tag');
      if (!tag) return;
      
      const tagText = tag.textContent.trim();

      if (category === 'All' || tagText === category) {
        listing.style.display = 'block';
        listing.style.animation = 'fadeIn 0.3s ease';
        visibleCount++;
      } else {
        listing.style.display = 'none';
      }
    });

    // Show message if no results
    if (visibleCount === 0) {
      showNotification(`No listings found in "${category}" category`, 'info');
    }
  });
});

// ===========================
// ✅ FORM VALIDATION
// ===========================

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function isStrongPassword(password) {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[0-9]/.test(password);
}

// Signup validation
const signupBtn = document.querySelector('.signup-btn');

if (signupBtn) {
  signupBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const name = document.querySelector('input[type="text"]');
    const email = document.querySelector('input[type="email"]');
    const password = document.querySelector('input[type="password"]');
    const select = document.querySelector('select');

    // Validate fields exist
    if (!name || !email || !password || !select) {
      showNotification('⚠️ Form fields not found. Please refresh the page.', 'error');
      return;
    }

    // Get values
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const selectValue = select.value;

    // Validate name
    if (!nameValue) {
      showNotification('❌ Please enter your full name', 'error');
      name.focus();
      return;
    }

    if (nameValue.length < 2) {
      showNotification('❌ Name must be at least 2 characters long', 'error');
      name.focus();
      return;
    }

    // Validate email
    if (!emailValue) {
      showNotification('❌ Please enter your email address', 'error');
      email.focus();
      return;
    }

    if (!isValidEmail(emailValue)) {
      showNotification('❌ Please enter a valid email address', 'error');
      email.focus();
      return;
    }

    // Validate password
    if (!passwordValue) {
      showNotification('❌ Please enter a password', 'error');
      password.focus();
      return;
    }

    if (!isStrongPassword(passwordValue)) {
      showNotification('❌ Password must be 8+ characters with uppercase and numbers', 'error');
      password.focus();
      return;
    }

    // Validate category
    if (selectValue === 'Select a category' || !selectValue) {
      showNotification('❌ Please select a skill category', 'error');
      select.focus();
      return;
    }

    // Save to localStorage
    const userData = {
      name: nameValue,
      email: emailValue,
      category: selectValue,
      signupDate: new Date().toLocaleString()
    };

    localStorage.setItem('skillbridgeUser', JSON.stringify(userData));

    // Show success
    showNotification('🎉 Account created successfully! Redirecting...', 'success');

    // Simulate redirect after 2 seconds
    setTimeout(() => {
      window.location.href = 'listing.html';
    }, 2000);
  });
}

// ===========================
// 📋 FAQ ACCORDION
// ===========================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', function () {
    const faqItem = this.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// ===========================
// 🎯 NAVIGATION ACTIVE STATE
// ===========================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar ul li a');

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

setActiveNavLink();

// ===========================
// 💾 LOCAL STORAGE FEATURES
// ===========================

// Check if user is logged in
function checkUserLogin() {
  const userData = localStorage.getItem('skillbridgeUser');
  if (userData) {
    const user = JSON.parse(userData);
    console.log('User logged in:', user.name);
    // Could update navbar or welcome message here
  }
}

// Logout function
function logout() {
  localStorage.removeItem('skillbridgeUser');
  showNotification('Logged out successfully', 'success');
  window.location.href = 'index.html';
}

checkUserLogin();

// ===========================
// 🎨 SCROLL ANIMATIONS
// ===========================

// Add fade-in animation when elements come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .step, .listing-card, .testimonial').forEach(el => {
  observer.observe(el);
});

// ===========================
// 📱 RESPONSIVE NAVIGATION
// ===========================

// Mobile menu toggle (if implemented in HTML)
const navMenu = document.querySelector('.nav-menu');

function createMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

createMobileMenu();

// ===========================
// 🔔 FORM INPUT VALIDATION
// ===========================

// Real-time email validation
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
  input.addEventListener('blur', function () {
    if (this.value && !isValidEmail(this.value)) {
      this.style.borderColor = '#ef4444';
    } else {
      this.style.borderColor = '#334155';
    }
  });
});

// Password strength indicator
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(input => {
  input.addEventListener('input', function () {
    if (this.value) {
      if (isStrongPassword(this.value)) {
        this.style.borderColor = '#10b981';
      } else {
        this.style.borderColor = '#f59e0b';
      }
    }
  });
});

// ===========================
// 🎯 CTA BUTTON TRACKING
// ===========================

// Track CTA button clicks
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-large');
ctaButtons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const buttonText = this.textContent.trim();
    console.log('Button clicked:', buttonText);
    // Could send analytics here
  });
});

// ===========================
// 🌙 SCROLL TO TOP
// ===========================

// Create and show scroll-to-top button
function createScrollToTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.innerHTML = '↑';
  scrollBtn.style.display = 'none';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'block';
      scrollBtn.style.animation = 'fadeIn 0.3s ease';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

createScrollToTopButton();

// ===========================
// 🔐 CONSENT MESSAGE
// ===========================

function showCookieConsent() {
  const consentKey = 'skillbridge_consent';
  if (!localStorage.getItem(consentKey)) {
    const consent = document.createElement('div');
    consent.className = 'cookie-consent';
    consent.innerHTML = `
      <p>We use cookies to enhance your experience. By continuing, you accept our cookie policy.</p>
      <button class="btn btn-small">Accept</button>
    `;
    document.body.appendChild(consent);

    consent.querySelector('button').addEventListener('click', () => {
      localStorage.setItem(consentKey, 'accepted');
      consent.remove();
    });
  }
}

showCookieConsent();

// ===========================
// ✨ PAGE LOAD EFFECTS
// ===========================

document.addEventListener('DOMContentLoaded', function () {
  console.log('SkillBridge loaded successfully');
  
  // Add any page-specific initialization here
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  console.log('Current page:', currentPage);
});

// ===========================
// 🐛 ERROR HANDLING
// ===========================

window.addEventListener('error', function (e) {
  console.error('Error:', e.message);
  // Could send error logs to server
});
