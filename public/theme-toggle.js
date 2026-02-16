(() => {
  const STORAGE_KEY = 'lunarax-theme';

  const getPreferredTheme = () => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  };

  const applyTheme = (theme) => {
    if (!theme) return;
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const loadTheme = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  };

  const createButton = () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'themeToggle';
    button.className = 'theme-toggle';
    button.setAttribute('aria-live', 'polite');
    button.setAttribute('aria-label', 'Tema değiştir');

    const icon = document.createElement('span');
    icon.className = 'theme-icon';
    icon.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'theme-label';

    button.appendChild(icon);
    button.appendChild(label);

    return { button, icon, label };
  };

  const updateButton = (theme, iconEl, labelEl, buttonEl) => {
    if (theme === 'light') {
      iconEl.textContent = '🌞';
      labelEl.textContent = 'Koyu Mod';
      buttonEl.setAttribute('aria-pressed', 'false');
      buttonEl.setAttribute('aria-label', 'Koyu moda geç');
    } else {
      iconEl.textContent = '🌙';
      labelEl.textContent = 'Açık Mod';
      buttonEl.setAttribute('aria-pressed', 'true');
      buttonEl.setAttribute('aria-label', 'Açık moda geç');
    }
  };

  const init = () => {
    const saved = loadTheme();
    const initialTheme = saved || getPreferredTheme();
    applyTheme(saved ? saved : initialTheme === 'light' ? 'light' : 'dark');

    const { button, icon, label } = createButton();
    updateButton(initialTheme, icon, label, button);

    button.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      saveTheme(next);
      updateButton(next, icon, label, button);
    });

    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.appendChild(button);
    } else {
      button.classList.add('theme-toggle--fixed');
      document.body.appendChild(button);
    }

    if (window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: light)');
      media.addEventListener('change', (event) => {
        const stored = loadTheme();
        if (stored) return;
        const newTheme = event.matches ? 'light' : 'dark';
        applyTheme(newTheme);
        updateButton(newTheme, icon, label, button);
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
