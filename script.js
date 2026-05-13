// ============================================
// SCROLL-TRIGGERED FADE-IN
// Adds "is-visible" to .reveal elements when they enter the viewport.
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));

  // ============================================
  // PROJECT MODALS
  // Click a card → open the matching <dialog>.
  // Click close button or backdrop → close it.
  // ESC key closes automatically (built into <dialog>).
  // ============================================

  // Find every project card
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      // The card's data-project attribute tells us which modal to open
      const modalId = card.dataset.project;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();  // built-in <dialog> method
      }
    });
  });

  // Wire up every modal's close button
  const modals = document.querySelectorAll('.project-modal');

  modals.forEach((modal) => {
    // Close when the × button is clicked
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.close());
    }

    // Close when clicking the dark backdrop (outside the modal content)
    modal.addEventListener('click', (event) => {
      // event.target is the modal itself only when you click the backdrop
      // (clicks on inner content don't bubble up to the dialog element directly)
      if (event.target === modal) {
        modal.close();
      }
    });
  });
});