// ============================================
// SCROLL-TRIGGERED FADE-IN
// Finds every element with the class "reveal" and adds
// the "is-visible" class when it scrolls into view.
// The CSS handles the actual fade animation.
//
// IntersectionObserver is a built-in browser feature —
// it efficiently watches elements and tells us when they
// enter or leave the visible part of the page.
// ============================================

// Wait until the HTML is fully loaded before running this
document.addEventListener('DOMContentLoaded', () => {

  // Find every element on the page with class="reveal"
  const revealElements = document.querySelectorAll('.reveal');

  // Create the observer that watches them
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // entry.isIntersecting = true when the element is in view
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Once revealed, stop watching this element (it doesn't need to fade in twice)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,        // trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px'  // trigger slightly before it fully enters view
  });

  // Tell the observer to watch each reveal element
  revealElements.forEach((el) => observer.observe(el));
});