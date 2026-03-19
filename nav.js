/* ============================================
   CPQ COURSE — GLOBAL NAVIGATION BAR
   ============================================ */
(function() {
    'use strict';

    const NAV_LINKS = [
        { label: '🏠 Home', href: 'index.html', id: 'home' },
        { label: '📚 Course', href: 'cpq-master-course.html', id: 'course' },
        { label: '🎓 Exercises', href: 'exercises-interactive.html', id: 'exercises' },
        { label: '📊 Cases', href: 'case-studies-interactive.html', id: 'cases' },
        { label: '🔗 Resources', href: 'resources-hub.html', id: 'resources' },
        { label: '📖 Guides', href: 'learning-guides.html', id: 'guides' },
        { label: '✍️ Quizzes', href: 'quiz.html', id: 'quiz' },
    ];

    function getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('cpq-master-course')) return 'course';
        if (path.includes('exercises')) return 'exercises';
        if (path.includes('case-studies')) return 'cases';
        if (path.includes('resources-hub')) return 'resources';
        if (path.includes('learning-guides')) return 'guides';
        if (path.includes('quiz')) return 'quiz';
        return 'home';
    }

    function buildNav() {
        const currentPage = getCurrentPage();
        const pct = (window.cpqProgress && window.cpqProgress.getPercentage) ? window.cpqProgress.getPercentage() : 0;

        // Nav bar
        const nav = document.createElement('nav');
        nav.className = 'cpq-global-nav';
        nav.innerHTML = `
            <a href="index.html" class="cpq-nav-brand">
                <span class="brand-icon">🚀</span> CPQ Course
            </a>
            <ul class="cpq-nav-links">
                ${NAV_LINKS.map(link => `
                    <li><a href="${link.href}" class="${currentPage === link.id ? 'active' : ''}">${link.label}</a></li>
                `).join('')}
            </ul>
            <div class="cpq-nav-actions">
                <div class="cpq-progress-pill">
                    <span id="cpq-progress-text">${pct}%</span>
                    <div class="cpq-progress-bar-mini">
                        <div class="cpq-progress-bar-mini-fill" id="cpq-progress-fill" style="width:${pct}%"></div>
                    </div>
                </div>
                <button class="cpq-nav-btn" onclick="cpqSearch.open()" title="Search (Ctrl+K)">🔍</button>
                <button class="cpq-nav-btn" id="cpq-theme-toggle" onclick="cpqToggleTheme()" title="Toggle dark mode">🌙</button>
                <button class="cpq-hamburger" onclick="toggleMobileMenu()" aria-label="Menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        `;

        // Mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'cpq-mobile-menu';
        mobileMenu.id = 'cpq-mobile-menu';
        mobileMenu.innerHTML = NAV_LINKS.map(link => `
            <a href="${link.href}" class="${currentPage === link.id ? 'active' : ''}">${link.label}</a>
        `).join('') + `
            <div style="padding:14px 16px;margin-top:10px;border-top:1px solid var(--border-light)">
                <div class="cpq-progress-pill" style="justify-content:center">
                    <span>Progress: ${pct}%</span>
                    <div class="cpq-progress-bar-mini" style="width:100px">
                        <div class="cpq-progress-bar-mini-fill" style="width:${pct}%"></div>
                    </div>
                </div>
            </div>
        `;

        // Search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'cpq-search-overlay';
        searchOverlay.id = 'cpq-search-overlay';
        searchOverlay.onclick = (e) => { if (e.target === searchOverlay) cpqSearch.close(); };
        searchOverlay.innerHTML = `
            <div class="cpq-search-box">
                <div class="cpq-search-input-wrap">
                    <span class="search-icon">🔍</span>
                    <input type="text" class="cpq-search-input" placeholder="Search course content…" oninput="cpqSearch.renderResults(cpqSearch.search(this.value))">
                    <span class="cpq-search-kbd">ESC</span>
                </div>
                <div class="cpq-search-results" id="cpq-search-results">
                    <div class="cpq-search-empty">Start typing to search…</div>
                </div>
            </div>
        `;

        // Scroll to top
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'cpq-scroll-top';
        scrollBtn.id = 'cpq-scroll-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

        // Insert into page
        document.body.prepend(mobileMenu);
        document.body.prepend(nav);
        document.body.appendChild(searchOverlay);
        document.body.appendChild(scrollBtn);

        // Add body padding for nav
        document.body.style.paddingTop = 'var(--nav-height)';

        // Scroll listeners
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            // Scroll to top visibility
            if (scrollTop > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
            // Nav shadow
            if (scrollTop > 10) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            lastScroll = scrollTop;
        }, { passive: true });
    }

    window.toggleMobileMenu = function() {
        const menu = document.getElementById('cpq-mobile-menu');
        if (menu) menu.classList.toggle('open');
    };

    // Build nav when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildNav);
    } else {
        buildNav();
    }
})();
