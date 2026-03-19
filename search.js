/* ============================================
   CPQ COURSE — SEARCH
   ============================================ */
(function() {
    'use strict';

    const searchIndex = [
        // Index
        { page: 'Home', url: 'index.html', title: 'CPQ Master Course Platform', text: 'Complete Learning Ecosystem with all resources, modules, exercises, case studies' },
        // Course Modules
        { page: 'Course', url: 'cpq-master-course.html', title: 'What is CPQ?', text: 'Configure Price Quote enterprise software solution, product selection, pricing rules, quote generation' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Why CPQ Matters', text: 'Revenue growth, sales acceleration, margin protection, operational efficiency' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'CPQ vs Other Solutions', text: 'CPQ vs Excel, CRM quotes, comparison matrix' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Core Concepts', text: 'Product, SKU, Bundle, Add-on, Configuration, Pricing Rule, Quote, Line Item, Approval' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'CPQ Architecture', text: 'Product Catalog, Pricing Engine, Configuration UI, Quote Generation, Approval Workflow, Integration Layer' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Product Management', text: 'Product catalog, SKU, product hierarchy, product family, product attributes' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Pricing Models', text: 'List pricing, tiered pricing, volume discounts, subscription pricing' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Pricing Rules', text: 'Discount rules, markup rules, conditional pricing, customer-specific pricing' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Bundles', text: 'Product bundles, bundle pricing, package deals, bundle discounts' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Discounts', text: 'Volume discounts, promotional discounts, negotiated discounts, approval limits' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Quote Creation', text: 'Creating quotes, customer selection, product selection, generating quotes' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Quote Configuration', text: 'Quote settings, field configuration, terms and conditions' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Quote Templates', text: 'Template design, branding, document formatting, PDF generation' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Quote Lifecycle', text: 'Draft, pending approval, approved, sent, accepted, rejected, expired' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Line Items', text: 'Line item management, quantities, pricing, grouping, sorting' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Approval Workflows', text: 'Workflow design, routing rules, approver assignment, parallel and sequential' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Approval Rules', text: 'Amount thresholds, discount thresholds, product-based rules' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Approval Process', text: 'Submit, review, approve, reject, escalate' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Escalation', text: 'Automatic escalation, timeout rules, escalation chains' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'CRM Integration', text: 'Salesforce, ServiceNow, opportunity sync, customer data' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Billing Integration', text: 'Invoice generation, billing sync, payment tracking' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'ERP Integration', text: 'Order management, inventory, fulfillment' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'APIs', text: 'REST API, custom integrations, webhooks, data sync' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Custom Fields', text: 'Custom field creation, field types, validation rules' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Scripting', text: 'Business rules, client scripts, server scripts, automation' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Performance', text: 'Optimization, caching, indexing, load testing' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Security', text: 'Access control, field-level security, record-level security, audit' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Best Practices', text: 'Implementation best practices, naming conventions, testing' },
        { page: 'Course', url: 'cpq-master-course.html', title: 'Troubleshooting', text: 'Common issues, debugging, error resolution, performance issues' },
        // Exercises
        { page: 'Exercises', url: 'exercises-interactive.html', title: 'Create Your First Quote', text: 'Beginner exercise, 30 minutes, create a quote for ABC Corp' },
        { page: 'Exercises', url: 'exercises-interactive.html', title: 'Apply Volume Discounts', text: 'Beginner exercise, pricing rules, 50-99 units, 100-249, 250+' },
        { page: 'Exercises', url: 'exercises-interactive.html', title: 'Create Product Bundles', text: 'Beginner exercise, Starter, Growth, Enterprise bundles' },
        { page: 'Exercises', url: 'exercises-interactive.html', title: 'Build Approval Workflows', text: 'Beginner exercise, approval matrix, Manager, Director, VP' },
        { page: 'Exercises', url: 'exercises-interactive.html', title: 'CRM Integration Setup', text: 'Intermediate exercise, opportunity tracking, data sync' },
        { page: 'Exercises', url: 'exercises-interactive.html', title: 'Custom Pricing Script', text: 'Intermediate exercise, JavaScript, tiered pricing, customer tiers' },
        { page: 'Exercises', url: 'exercises-interactive.html', title: 'Full Implementation Lab', text: 'Advanced capstone, 240 min, complete CPQ implementation' },
        // Case Studies
        { page: 'Case Studies', url: 'case-studies-interactive.html', title: 'CloudData Analytics', text: 'SaaS company, $7.9M ROI, 97% faster quotes, per-user pricing' },
        { page: 'Case Studies', url: 'case-studies-interactive.html', title: 'EnterpriseFlow Corp', text: 'Enterprise software, $24.5M ROI, 50+ product modules, multi-tier approval' },
        { page: 'Case Studies', url: 'case-studies-interactive.html', title: 'CloudOps Services', text: 'Usage-based pricing, $3.2M ROI, dynamic pricing, real-time integration' },
        { page: 'Case Studies', url: 'case-studies-interactive.html', title: 'GlobalSoft Inc', text: 'Global enterprise, $35M ROI, 50+ countries, 15+ currencies, multi-region' },
        // Resources
        { page: 'Resources', url: 'resources-hub.html', title: 'Learning Resources Hub', text: 'ServiceNow documentation, community, developer instance, external resources' },
        { page: 'Resources', url: 'resources-hub.html', title: '14-Week Learning Path', text: 'Weekly plan, structured learning, time commitment, 80-120 hours' },
        { page: 'Resources', url: 'resources-hub.html', title: 'FAQ', text: 'Offline learning, ServiceNow access, team sharing, beginner friendly' },
        // Guides
        { page: 'Guides', url: 'learning-guides.html', title: 'Quick Start Guide', text: '5 minutes, download, bookmark, start learning' },
        { page: 'Guides', url: 'learning-guides.html', title: 'Getting Started - First Week', text: 'Day by day plan, fundamentals, first exercise' },
        { page: 'Guides', url: 'learning-guides.html', title: 'Effective Learning Strategies', text: 'Active learning, study schedule, tips for success' },
        { page: 'Guides', url: 'learning-guides.html', title: 'Certification Preparation', text: 'CPQ Specialist, Developer certification, study plan, exam tips' },
        // Quizzes
        { page: 'Quizzes', url: 'quiz.html', title: 'Module Quizzes', text: 'Knowledge assessment, multiple choice, instant feedback, score tracking' },
    ];

    function search(query) {
        if (!query || query.length < 2) return [];
        const q = query.toLowerCase();
        return searchIndex.filter(item => {
            return item.title.toLowerCase().includes(q) ||
                   item.text.toLowerCase().includes(q) ||
                   item.page.toLowerCase().includes(q);
        }).slice(0, 8);
    }

    function openSearch() {
        const overlay = document.getElementById('cpq-search-overlay');
        if (overlay) {
            overlay.classList.add('open');
            const input = overlay.querySelector('.cpq-search-input');
            if (input) { input.value = ''; input.focus(); }
            renderResults([]);
        }
    }

    function closeSearch() {
        const overlay = document.getElementById('cpq-search-overlay');
        if (overlay) overlay.classList.remove('open');
    }

    function renderResults(results) {
        const container = document.getElementById('cpq-search-results');
        if (!container) return;

        if (results.length === 0) {
            const input = document.querySelector('.cpq-search-input');
            const query = input ? input.value : '';
            container.innerHTML = query.length >= 2
                ? '<div class="cpq-search-empty">No results found</div>'
                : '<div class="cpq-search-empty">Start typing to search…</div>';
            return;
        }

        container.innerHTML = results.map(r => `
            <a href="${r.url}" class="cpq-search-result">
                <div class="result-page">${r.page}</div>
                <div class="result-title">${r.title}</div>
                <div class="result-preview">${r.text.substring(0, 100)}${r.text.length > 100 ? '…' : ''}</div>
            </a>
        `).join('');
    }

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        if (e.key === 'Escape') closeSearch();
    });

    // Expose
    window.cpqSearch = { open: openSearch, close: closeSearch, search, renderResults };
})();
