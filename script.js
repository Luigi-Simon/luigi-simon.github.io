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

  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const modalId = card.dataset.project;
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  const modals = document.querySelectorAll('.project-modal');
  modals.forEach((modal) => {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.close();
    });
  });

  const recentContainer = document.getElementById('recent-projects');
  if (recentContainer) {
    const tryFetch = (url) => fetch(url).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    });

    tryFetch('projects.html')
      .catch((firstErr) => {
        const origin = location.origin && location.origin !== 'null' ? location.origin : '';
        const fallback = origin ? `${origin}/projects.html` : 'projects.html';
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
          .sort((a, b) => b.year !== a.year ? b.year - a.year : a.index - b.index);

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
        console.error('Failed to load projects.html:', err);
      });
  }
});