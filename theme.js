/* ============================================
   CPQ COURSE — DARK MODE TOGGLE
   ============================================ */
(function() {
    'use strict';

    const STORAGE_KEY = 'cpq-theme';

    function getPreferred() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        // Update icon
        const btn = document.getElementById('cpq-theme-toggle');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    function toggle() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        apply(current === 'dark' ? 'light' : 'dark');
    }

    // Apply immediately (before DOM ready) to prevent flash
    apply(getPreferred());

    // Expose toggle
    window.cpqToggleTheme = toggle;
})();
