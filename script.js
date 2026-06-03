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

  // ============================================
  // DYNAMIC RECENT PROJECTS
  // Loads project cards from `projects.html` and renders the most recent 3
  // into `#recent-projects` on the index page.
  // ============================================
  const recentContainer = document.getElementById('recent-projects');
  if (recentContainer) {
    // Try relative fetch first (works when served or opened via http). If it
    // fails (e.g., opened file://), fall back to origin-based URL.
    const tryFetch = (url) => fetch(url).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    });

    // eslint-disable-next-line no-console
    console.log('Attempting to load recent projects via relative path projects.html');

    tryFetch('projects.html')
      .catch((firstErr) => {
        // If relative fetch fails, try origin-based URL (useful for some server setups)
        const origin = location.origin && location.origin !== 'null' ? location.origin : '';
        const fallback = origin ? `${origin}/projects.html` : 'projects.html';
        // eslint-disable-next-line no-console
        console.warn('Relative fetch failed, trying fallback URL:', fallback, firstErr);
        return tryFetch(fallback);
      })
      .then((htmlText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const cards = Array.from(doc.querySelectorAll('.project-card'))
          .map((card, index) => {
            const titleEl = card.querySelector('h3');
            const metaEl = card.querySelector('.project-meta');
            const summaryEl = card.querySelector('.project-summary');
            const id = card.dataset.project || '';
            const metaText = metaEl ? metaEl.textContent.trim() : '';
            const yearMatch = metaText.match(/(\d{4})/);
            const year = yearMatch ? Number(yearMatch[1]) : 0;
            return {
              id,
              title: titleEl ? titleEl.textContent.trim() : '',
              meta: metaText,
              summary: summaryEl ? summaryEl.textContent.trim() : '',
              year,
              index,
            };
          })
          .sort((a, b) => {
            // sort by year desc, then by original order
            if (b.year !== a.year) return b.year - a.year;
            return a.index - b.index;
          });

        const top = cards.slice(0, 3);

        if (top.length === 0) {
          recentContainer.innerHTML = '<p>No projects found — visit the <a href="projects.html">projects page</a>.</p>';
          return;
        }

        recentContainer.innerHTML = top
          .map((p) => {
            const href = p.id ? `projects.html#${p.id}` : 'projects.html';
            return `
              <article class="mini-project">
                <h3>${p.title}</h3>
                <p class="project-meta">${p.meta}</p>
                <p class="project-summary">${p.summary}</p>
                <a class="project-link" href="${href}">Read more →</a>
              </article>
            `;
          })
          .join('');
      })
      .catch((err) => {
        recentContainer.innerHTML = '<p>Could not load projects.</p>';
        // eslint-disable-next-line no-console
        console.error('Failed to load projects.html:', err);
      });
  }
});