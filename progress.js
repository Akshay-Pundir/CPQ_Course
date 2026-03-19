/* ============================================
   CPQ COURSE — PROGRESS TRACKING
   ============================================ */
(function() {
    'use strict';

    const STORAGE_KEY = 'cpq-progress';
    const CHECKLIST_KEY = 'cpq-checklist';

    // All trackable sections across the site
    const ALL_SECTIONS = [
        'm1-what', 'm1-why', 'm1-vs', 'm1-concepts', 'm1-arch',
        'm2-products', 'm2-pricing', 'm2-rules', 'm2-bundles', 'm2-discounts',
        'm3-creation', 'm3-config', 'm3-templates', 'm3-lifecycle', 'm3-lineitems',
        'm4-workflows', 'm4-rules', 'm4-process', 'm4-escalation', 'm4-matrix',
        'm5-crm', 'm5-billing', 'm5-erp', 'm5-apis', 'm5-sync',
        'm6-fields', 'm6-scripting', 'm6-perf', 'm6-security', 'm6-best', 'm6-trouble',
        'm7-exercises', 'm7-cases', 'm7-cert', 'm7-interview', 'm7-projects'
    ];

    function getProgress() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch(e) {
            return {};
        }
    }

    function saveProgress(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function markVisited(sectionId) {
        if (!sectionId || sectionId === 'home' || sectionId === 'resources') return;
        const progress = getProgress();
        if (!progress[sectionId]) {
            progress[sectionId] = Date.now();
            saveProgress(progress);
            updateProgressUI();
        }
    }

    function getPercentage() {
        const progress = getProgress();
        const visited = Object.keys(progress).filter(k => ALL_SECTIONS.includes(k)).length;
        return Math.round((visited / ALL_SECTIONS.length) * 100);
    }

    function updateProgressUI() {
        const pct = getPercentage();
        const fill = document.getElementById('cpq-progress-fill');
        const text = document.getElementById('cpq-progress-text');
        if (fill) fill.style.width = pct + '%';
        if (text) text.textContent = pct + '%';

        // Update homepage progress cards if present
        const homeProgress = document.getElementById('cpq-home-progress');
        if (homeProgress) {
            homeProgress.innerHTML = buildHomeProgressHTML();
        }
    }

    function buildHomeProgressHTML() {
        const progress = getProgress();
        const modules = [
            { name: 'Module 1: Fundamentals', ids: ['m1-what','m1-why','m1-vs','m1-concepts','m1-arch'] },
            { name: 'Module 2: Products', ids: ['m2-products','m2-pricing','m2-rules','m2-bundles','m2-discounts'] },
            { name: 'Module 3: Quotes', ids: ['m3-creation','m3-config','m3-templates','m3-lifecycle','m3-lineitems'] },
            { name: 'Module 4: Approvals', ids: ['m4-workflows','m4-rules','m4-process','m4-escalation','m4-matrix'] },
            { name: 'Module 5: Integration', ids: ['m5-crm','m5-billing','m5-erp','m5-apis','m5-sync'] },
            { name: 'Module 6: Advanced', ids: ['m6-fields','m6-scripting','m6-perf','m6-security','m6-best','m6-trouble'] },
            { name: 'Module 7: Learning', ids: ['m7-exercises','m7-cases','m7-cert','m7-interview','m7-projects'] },
        ];

        return modules.map(mod => {
            const done = mod.ids.filter(id => progress[id]).length;
            const total = mod.ids.length;
            const pct = Math.round((done / total) * 100);
            const icon = pct === 100 ? '✅' : pct > 0 ? '📖' : '📋';
            return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-light)">
                <span style="font-size:1.3em">${icon}</span>
                <div style="flex:1">
                    <div style="font-weight:600;color:var(--text-primary);font-size:0.92em">${mod.name}</div>
                    <div style="height:5px;border-radius:3px;background:var(--border-light);margin-top:4px;overflow:hidden">
                        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--brand-primary),var(--brand-secondary));border-radius:3px;transition:width 0.5s"></div>
                    </div>
                </div>
                <span style="font-size:0.82em;color:var(--text-secondary);font-weight:600">${done}/${total}</span>
            </div>`;
        }).join('');
    }

    // Checklist persistence for learning-guides
    function initChecklists() {
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        if (!checkboxes.length) return;

        let saved = {};
        try { saved = JSON.parse(localStorage.getItem(CHECKLIST_KEY)) || {}; } catch(e) {}

        checkboxes.forEach((cb, i) => {
            const key = 'check-' + i;
            if (saved[key]) cb.checked = true;
            cb.addEventListener('change', () => {
                saved[key] = cb.checked;
                localStorage.setItem(CHECKLIST_KEY, JSON.stringify(saved));
            });
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        updateProgressUI();
        initChecklists();
    });

    // Expose
    window.cpqProgress = { markVisited, getPercentage, updateProgressUI };
})();
