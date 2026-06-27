// Main App Module
// Initializes the home page functionality

import Auth from './auth.js';

// Initialize auth state
Auth.init();

// Animate statistics counter
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Animate stats on page load
document.addEventListener('DOMContentLoaded', () => {
  const businessCount = document.getElementById('businessCount');
  const userCount = document.getElementById('userCount');
  const serviceCount = document.getElementById('serviceCount');

  if (businessCount) animateCounter(businessCount, 250);
  if (userCount) animateCounter(userCount, 1500);
  if (serviceCount) animateCounter(serviceCount, 75);
});

// Export for global access
window.LocalLink = { Auth };
