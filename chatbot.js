// CPQ Course Chatbot - Fully Client-Side AI Assistant
// Built-in knowledge base covering all 7 course modules
(function() {
    'use strict';

    // ==========================================
    // KNOWLEDGE BASE
    // ==========================================
    const knowledgeBase = [
        // Module 1: Fundamentals
        {
            keywords: ['what is cpq', 'cpq meaning', 'define cpq', 'cpq stands for', 'cpq definition', 'configure price quote'],
            answer: '**CPQ stands for Configure, Price, Quote.** It\'s a sales tool that helps companies quickly and accurately generate quotes for orders. The three components are:\n\n• **Configure** – Select and customize products/services\n• **Price** – Apply pricing rules, discounts, and calculations automatically\n• **Quote** – Generate professional quote documents\n\nCPQ eliminates manual errors and speeds up the sales cycle by 30-50%.',
            topic: 'CPQ Basics'
        },
        {
            keywords: ['why cpq', 'cpq benefits', 'cpq advantages', 'why use cpq', 'cpq important', 'cpq matters'],
            answer: '**Why CPQ Matters:**\n\n📈 **Revenue Growth** – 20-30% increase in average deal size\n⚡ **Speed** – Quote generation: 2-3 days → 5 minutes (97% faster)\n🎯 **Accuracy** – Pricing errors drop from 30% to 0.1%\n💰 **Margins** – 5-10% margin improvement\n📊 **Win Rate** – Increases from 45% to 60%\n🔄 **Sales Cycle** – 33% shorter (90 days → 60 days)',
            topic: 'CPQ Benefits'
        },
        {
            keywords: ['cpq vs', 'cpq comparison', 'cpq alternative', 'erp vs cpq', 'crm vs cpq', 'spreadsheet'],
            answer: '**CPQ vs Other Solutions:**\n\n| Feature | CPQ | Spreadsheets | ERP | CRM |\n|---------|-----|-------------|-----|-----|\n| Product Config | ✅ Advanced | ❌ Manual | ⚠️ Basic | ❌ None |\n| Pricing Rules | ✅ Automated | ❌ Manual | ⚠️ Limited | ❌ None |\n| Quote Generation | ✅ Professional | ❌ Basic | ❌ None | ⚠️ Basic |\n| Approval Workflows | ✅ Built-in | ❌ None | ⚠️ Limited | ⚠️ Basic |\n\nCPQ is purpose-built for the quote-to-cash process, while other tools handle different aspects of business operations.',
            topic: 'CPQ Comparisons'
        },
        {
            keywords: ['cpq architecture', 'cpq components', 'cpq structure', 'how cpq works', 'cpq system'],
            answer: '**CPQ Architecture has 4 key layers:**\n\n1️⃣ **Product Catalog** – Centralized repository of all products, options, and rules\n2️⃣ **Pricing Engine** – Handles list prices, discounts, promotions, and tax calculations\n3️⃣ **Rules Engine** – Validates configurations, enforces business logic, and manages dependencies\n4️⃣ **Document Engine** – Generates professional quotes, proposals, and contracts\n\nThese layers integrate with CRM (Salesforce, ServiceNow) and ERP systems for end-to-end automation.',
            topic: 'CPQ Architecture'
        },
        // Module 2: Products & Pricing
        {
            keywords: ['product catalog', 'product management', 'product types', 'catalog', 'products'],
            answer: '**Product Management in CPQ:**\n\n📦 **Product Types:**\n• Stand-alone products\n• Configurable products (with options)\n• Bundles (pre-packaged combinations)\n• Subscriptions (recurring billing)\n\n🔧 **Key Features:**\n• Hierarchical product categories\n• Product attributes and options\n• Compatibility rules\n• Product lifecycle management\n• Version control for product changes',
            topic: 'Product Management'
        },
        {
            keywords: ['pricing', 'pricing model', 'price', 'pricing strategy', 'pricing rules', 'discount'],
            answer: '**CPQ Pricing Models:**\n\n💲 **Pricing Types:**\n• **List Price** – Standard published price\n• **Cost-Plus** – Cost + markup percentage\n• **Tiered/Volume** – Price decreases with quantity\n• **Subscription** – Recurring (monthly/annual)\n• **Usage-Based** – Pay-per-use metering\n\n🏷️ **Discount Types:**\n• Volume discounts (quantity-based)\n• Bundle discounts (package deals)\n• Customer-specific pricing\n• Promotional discounts\n• Approval-required discounts (margin protection)',
            topic: 'Pricing'
        },
        {
            keywords: ['bundle', 'bundles', 'product bundle', 'package', 'bundling'],
            answer: '**Product Bundles in CPQ:**\n\nBundles are pre-configured packages of products sold together, usually at a discount.\n\n📦 **Bundle Types:**\n• **Fixed Bundle** – Predefined set, no changes allowed\n• **Flexible Bundle** – Core items + optional add-ons\n• **Nested Bundle** – Bundle within a bundle\n\n💡 **Best Practices:**\n• Starter Bundle (small business) – 5-10% discount\n• Growth Bundle (mid-market) – 15-20% discount\n• Enterprise Bundle (large) – Custom pricing\n\nBundles increase average deal size by 15-25%.',
            topic: 'Bundles'
        },
        // Module 3: Quotes
        {
            keywords: ['quote', 'quote creation', 'create quote', 'generate quote', 'quotation', 'proposal'],
            answer: '**Quote Creation Process:**\n\n1️⃣ **Initiate** – Create new quote from opportunity/account\n2️⃣ **Add Products** – Browse catalog, select items\n3️⃣ **Configure** – Customize options, quantities\n4️⃣ **Price** – System auto-calculates with rules\n5️⃣ **Review** – Verify totals, margins, discounts\n6️⃣ **Approve** – Route through approval workflow\n7️⃣ **Generate** – Create professional PDF document\n8️⃣ **Send** – Email or share with customer\n\n⏱️ Average time: 5-10 minutes (vs 2-3 days manually)',
            topic: 'Quote Creation'
        },
        {
            keywords: ['quote template', 'template', 'document template', 'pdf template'],
            answer: '**Quote Templates:**\n\nProfessional templates auto-populate with quote data:\n\n📄 **Template Sections:**\n• Company branding (logo, colors)\n• Customer information\n• Executive summary\n• Detailed line items with pricing\n• Terms and conditions\n• Signature blocks\n• Validity period\n\n🎨 **Customization:**\n• Multiple templates per use case\n• Dynamic content blocks\n• Conditional sections (show/hide based on rules)\n• Multi-language support',
            topic: 'Templates'
        },
        {
            keywords: ['line item', 'line items', 'quote line', 'order line'],
            answer: '**Quote Line Items:**\n\nEach line item represents a product/service on the quote:\n\n📋 **Line Item Fields:**\n• Product name and description\n• Quantity\n• List price per unit\n• Discount (% or amount)\n• Net price\n• Extended price (qty × net price)\n• Tax amount\n\n🔢 **Calculations:**\n```\nList Price: $500/unit\nQuantity: 100\nSubtotal: $50,000\nDiscount (15%): -$7,500\nNet: $42,500\nTax (8%): +$3,400\nTotal: $45,900\n```',
            topic: 'Line Items'
        },
        // Module 4: Approvals
        {
            keywords: ['approval', 'approval workflow', 'approve', 'approval process', 'approval rules'],
            answer: '**CPQ Approval Workflows:**\n\n✅ **Approval Triggers:**\n• Discount exceeds threshold (e.g., >20%)\n• Deal size above limit (e.g., >$100K)\n• Non-standard terms or conditions\n• Custom pricing requests\n• New customer accounts\n\n🔄 **Workflow Steps:**\n1. Sales rep submits quote\n2. System evaluates approval rules\n3. Routes to appropriate approver(s)\n4. Approver reviews and decides\n5. Auto-escalation if not actioned\n6. Quote status updates automatically\n\n⚡ **Best Practice:** Auto-approve standard quotes, manual approval only for exceptions.',
            topic: 'Approvals'
        },
        {
            keywords: ['escalation', 'escalate', 'approval escalation', 'sla'],
            answer: '**Approval Escalation:**\n\nEscalation ensures quotes don\'t get stuck waiting:\n\n⏰ **Escalation Rules:**\n• Level 1 → Manager (0-24 hours)\n• Level 2 → Director (24-48 hours)\n• Level 3 → VP Sales (48-72 hours)\n• Level 4 → CEO (72+ hours, auto-notify)\n\n📧 **Notifications:**\n• Email alerts at each escalation\n• Dashboard indicators\n• SMS for urgent deals\n• Calendar reminders for approvers',
            topic: 'Escalation'
        },
        // Module 5: Integration
        {
            keywords: ['integration', 'integrate', 'crm integration', 'salesforce', 'servicenow', 'api'],
            answer: '**CPQ Integration Points:**\n\n🔗 **CRM Integration:**\n• Salesforce CPQ\n• ServiceNow CPQ\n• Microsoft Dynamics\n• HubSpot\n\n🏢 **ERP Integration:**\n• SAP\n• Oracle\n• NetSuite\n\n🔌 **Integration Methods:**\n• REST APIs\n• SOAP Web Services\n• Middleware (MuleSoft, Dell Boomi)\n• Native connectors\n\n📊 **Data Sync:**\n• Products & pricing\n• Customer accounts\n• Orders & contracts\n• Inventory levels',
            topic: 'Integration'
        },
        // Module 5: Reporting
        {
            keywords: ['report', 'reporting', 'analytics', 'dashboard', 'metrics', 'kpi'],
            answer: '**CPQ Reporting & Analytics:**\n\n📊 **Key Metrics (KPIs):**\n• Quote-to-Close ratio\n• Average deal size\n• Quote cycle time\n• Win/loss rate\n• Discount distribution\n• Revenue by product line\n• Margin analysis\n\n📈 **Dashboard Types:**\n• Sales performance dashboard\n• Pipeline analytics\n• Approval bottleneck tracker\n• Product popularity analysis\n• Discount compliance report\n\n💡 Track these weekly to optimize your CPQ process.',
            topic: 'Reporting'
        },
        // Module 6: Advanced Topics
        {
            keywords: ['advanced', 'advanced cpq', 'complex', 'enterprise', 'custom', 'customization'],
            answer: '**Advanced CPQ Topics:**\n\n🔧 **Advanced Configuration:**\n• Guided selling wizards\n• Dynamic product rules\n• Constraint-based configuration\n• Multi-currency support\n• Multi-language quotes\n\n⚙️ **Automation:**\n• Automated renewal quotes\n• Contract amendments\n• Upsell/cross-sell recommendations\n• AI-powered pricing suggestions\n\n🏗️ **Enterprise Features:**\n• Multi-org support\n• Role-based access control\n• Audit trails and compliance\n• High-volume quote processing',
            topic: 'Advanced Topics'
        },
        {
            keywords: ['guided selling', 'guided', 'wizard', 'needs assessment'],
            answer: '**Guided Selling in CPQ:**\n\nGuided selling walks sales reps through a series of questions to recommend the best products:\n\n🎯 **How It Works:**\n1. Ask about customer needs/budget\n2. Assess technical requirements\n3. Determine deployment preferences\n4. Recommend optimal configuration\n5. Auto-populate quote with selections\n\n💡 **Benefits:**\n• Reduces training time for new reps\n• Ensures consistent recommendations\n• Increases upsell opportunities\n• Improves customer experience\n• Reduces configuration errors by 90%',
            topic: 'Guided Selling'
        },
        // Module 7: Implementation
        {
            keywords: ['implementation', 'implement', 'deploy', 'rollout', 'go live', 'project plan'],
            answer: '**CPQ Implementation Roadmap:**\n\n📅 **Phase 1: Discovery (Weeks 1-2)**\n• Requirements gathering\n• Current process analysis\n• Stakeholder interviews\n\n📅 **Phase 2: Design (Weeks 3-4)**\n• Solution architecture\n• Data model design\n• Integration planning\n\n📅 **Phase 3: Build (Weeks 5-10)**\n• Product catalog setup\n• Pricing rules configuration\n• Template creation\n• Integration development\n\n📅 **Phase 4: Test & Launch (Weeks 11-14)**\n• UAT testing\n• Training\n• Data migration\n• Go-live support',
            topic: 'Implementation'
        },
        {
            keywords: ['best practice', 'best practices', 'tips', 'recommendations', 'advice'],
            answer: '**CPQ Best Practices:**\n\n✅ **Do:**\n• Start simple, add complexity gradually\n• Keep product catalog clean and organized\n• Set clear approval thresholds\n• Train sales team thoroughly\n• Monitor KPIs weekly\n• Document all pricing rules\n\n❌ **Don\'t:**\n• Over-complicate approval workflows\n• Allow unlimited manual discounts\n• Skip user acceptance testing\n• Ignore data quality\n• Forget mobile accessibility\n\n💡 **Pro Tip:** Aim for 80% auto-approval rate on standard quotes.',
            topic: 'Best Practices'
        },
        // Certification & Learning
        {
            keywords: ['certification', 'certified', 'exam', 'certification prep', 'study'],
            answer: '**CPQ Certification Guide:**\n\n🏆 **Available Certifications:**\n• ServiceNow Certified CPQ Specialist\n• ServiceNow Certified CPQ Developer\n• Salesforce CPQ Specialist\n\n📚 **Study Plan:**\n• Week 1-2: Fundamentals (Module 1)\n• Week 3-4: Products & Pricing (Module 2)\n• Week 5-6: Quotes & Configuration (Module 3)\n• Week 7-8: Approvals & Integration (Modules 4-5)\n• Week 9-10: Advanced Topics (Module 6)\n• Week 11-12: Practice exams\n• Week 13-14: Review & exam\n\n📝 Take the quizzes on this site to test your knowledge!',
            topic: 'Certification'
        },
        {
            keywords: ['exercise', 'exercises', 'practice', 'hands on', 'lab', 'hands-on'],
            answer: '**This course includes 16 hands-on exercises:**\n\n🟢 **Beginner (5 exercises):**\n• Create Your First Quote\n• Apply Volume Discounts\n• Create Product Bundles\n• Build Approval Workflows\n• Configure Quote Templates\n\n🟡 **Intermediate (7 exercises):**\n• CRM Integration Setup\n• Multi-tier Pricing\n• Advanced Approval Matrix\n• Renewal Automation\n• And more...\n\n🔴 **Advanced (4 exercises):**\n• Full Implementation Lab (Capstone)\n• Performance Optimization\n• Complex Integration Scenarios\n\n➡️ Go to the **Exercises** page to start practicing!',
            topic: 'Exercises'
        },
        {
            keywords: ['case study', 'case studies', 'real world', 'example', 'success story'],
            answer: '**4 Real-World CPQ Case Studies:**\n\n1️⃣ **CloudData Analytics** (SaaS)\n   • ROI: $7.9M in Year 1\n   • Quote time: 2-3 days → 5 mins\n\n2️⃣ **EnterpriseFlow Corp** (Enterprise Software)\n   • ROI: $24.5M in Year 1\n   • 50+ product modules managed\n\n3️⃣ **CloudOps Services** (Usage-Based Pricing)\n   • ROI: $3.2M in Year 1\n   • Dynamic pricing automation\n\n4️⃣ **GlobalSoft Inc** (Global Enterprise)\n   • ROI: $35M in Year 1\n   • 50+ countries, 15+ currencies\n\n➡️ Visit the **Cases** page for full details!',
            topic: 'Case Studies'
        },
        // Course Navigation
        {
            keywords: ['module', 'modules', 'course content', 'syllabus', 'topics', 'what does this course cover'],
            answer: '**This CPQ Master Course covers 7 modules:**\n\n📖 **Module 1:** Fundamentals – What, Why, How of CPQ\n🛍️ **Module 2:** Products & Pricing – Catalog, pricing models, bundles\n📝 **Module 3:** Quotes – Creation, templates, lifecycle\n✅ **Module 4:** Approvals – Workflows, rules, escalation\n🔗 **Module 5:** Integration & Reporting – APIs, CRM, analytics\n⚙️ **Module 6:** Advanced Topics – Guided selling, automation\n🚀 **Module 7:** Implementation – Deployment, best practices\n\n➡️ Click **Course** in the nav bar to start learning!',
            topic: 'Course Overview'
        },
        {
            keywords: ['start', 'get started', 'begin', 'how to start', 'new', 'beginner', 'first time'],
            answer: '**Welcome! Here\'s how to get started:**\n\n1️⃣ **Start with the Course** – Click "Course" in the nav bar → Begin with Module 1\n2️⃣ **Follow the Learning Path** – Go to "Guides" → "Quick Start" for a 5-minute setup\n3️⃣ **Practice** – Try the "Exercises" starting with Beginner level\n4️⃣ **Test Yourself** – Take module quizzes to check understanding\n5️⃣ **Read Cases** – See real-world implementations\n\n💡 **Pro tip:** Use the progress tracker (top-right) to track which modules you\'ve completed!\n\n🔍 Press **Ctrl+K** anytime to search across all content.',
            topic: 'Getting Started'
        },
        {
            keywords: ['help', 'how to use', 'navigation', 'features', 'what can you do'],
            answer: '**I can help you with:**\n\n📚 **Course Content** – Ask about any CPQ topic\n🔍 **Find Information** – "What is guided selling?", "How do approvals work?"\n📝 **Learning Path** – "How do I get started?", "What modules are there?"\n🏆 **Certification** – "How to prepare for CPQ certification?"\n💡 **Best Practices** – "What are CPQ best practices?"\n🏢 **Case Studies** – "Show me real-world examples"\n\n**Try asking:**\n• "What is CPQ?"\n• "How does pricing work?"\n• "Tell me about bundles"\n• "How to create a quote?"',
            topic: 'Help'
        },
        {
            keywords: ['quiz', 'quizzes', 'test', 'assessment', 'knowledge check'],
            answer: '**Knowledge Quizzes:**\n\nThis site includes **7 module quizzes** with **38 total questions**:\n\n📝 Each quiz covers one module:\n• Module 1: Fundamentals (6 questions)\n• Module 2: Products & Pricing (6 questions)\n• Module 3: Quotes (5 questions)\n• Module 4: Approvals (5 questions)\n• Module 5: Integration (5 questions)\n• Module 6: Advanced (5 questions)\n• Module 7: Implementation (6 questions)\n\n✅ Features instant feedback, explanations, and score tracking!\n\n➡️ Click **Quizzes** in the nav bar to start!',
            topic: 'Quizzes'
        },
        {
            keywords: ['servicenow', 'service now', 'snow'],
            answer: '**ServiceNow CPQ:**\n\nServiceNow CPQ is a module within the ServiceNow platform:\n\n🔧 **Key Features:**\n• Built on the Now Platform\n• Integrates with ITSM, CSM, and ITOM\n• Uses ServiceNow\'s workflow engine\n• Product Catalog integration\n• Flow Designer for approvals\n• Service Portal for customer-facing quotes\n\n📚 **Resources:**\n• [developer.servicenow.com](https://developer.servicenow.com)\n• [learn.servicenow.com](https://learn.servicenow.com)\n• [docs.servicenow.com](https://docs.servicenow.com)',
            topic: 'ServiceNow'
        },
        {
            keywords: ['salesforce', 'sfdc', 'salesforce cpq', 'steelbrick'],
            answer: '**Salesforce CPQ:**\n\nFormerly Steelbrick, Salesforce CPQ is a native AppExchange product:\n\n🔧 **Key Features:**\n• Native Salesforce integration\n• Product and pricing rules\n• Guided selling\n• Advanced approval workflows\n• Contract and renewal management\n• Multi-currency and multi-language\n\n💡 **Tip:** Many concepts in this course apply directly to Salesforce CPQ. The fundamentals of Configure, Price, Quote are platform-agnostic.',
            topic: 'Salesforce CPQ'
        },
        // Conversational / Greetings
        {
            keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
            answer: '👋 **Hello!** Welcome to the CPQ Course Assistant!\n\nI\'m here to help you learn about Configure, Price, Quote (CPQ). I can answer questions about:\n\n• CPQ concepts and definitions\n• Pricing models and discounts\n• Quote creation and templates\n• Approval workflows\n• Integration and reporting\n• Certification preparation\n\n**Try asking me something like:**\n"What is CPQ?" or "How do I get started?"',
            topic: 'Greeting'
        },
        {
            keywords: ['thank', 'thanks', 'thank you', 'thx', 'appreciate'],
            answer: 'You\'re welcome! 😊 Happy to help with your CPQ learning journey.\n\nFeel free to ask me anything else about CPQ, or explore the course modules for in-depth learning.\n\n💡 **Quick links:**\n• 📖 Course – Full 7-module content\n• 🎓 Exercises – Hands-on practice\n• 📝 Quizzes – Test your knowledge\n• 📋 Cases – Real-world examples',
            topic: 'Thanks'
        },
        {
            keywords: ['bye', 'goodbye', 'see you', 'later', 'exit'],
            answer: 'Goodbye! 👋 Good luck with your CPQ studies!\n\nRemember:\n• 📊 Your progress is saved automatically\n• 🌙 Dark mode preference is remembered\n• 🔍 Use Ctrl+K to search anytime\n\nCome back anytime you need help! 🚀',
            topic: 'Goodbye'
        },
        {
            keywords: ['dark mode', 'theme', 'light mode', 'night mode'],
            answer: '**Theme Toggle:**\n\nYou can switch between light and dark mode using the 🌙/☀️ button in the top-right corner of the navigation bar.\n\n• Your preference is automatically saved\n• Works across all pages\n• Respects your system settings on first visit\n\n💡 Dark mode is easier on the eyes during evening study sessions!',
            topic: 'Dark Mode'
        },
        {
            keywords: ['progress', 'track', 'tracking', 'how much', 'completed'],
            answer: '**Progress Tracking:**\n\nThe progress tracker shows how much of the course you\'ve completed:\n\n📊 **How it works:**\n• Each module section you visit is tracked\n• Progress percentage shows in the nav bar\n• The homepage shows a module-by-module breakdown\n• Your progress is saved in your browser\n\n💡 Visit module sections in the Course page to increase your progress!',
            topic: 'Progress'
        },
        {
            keywords: ['search', 'find', 'look for', 'ctrl k', 'ctrl+k'],
            answer: '**Search Feature:**\n\nYou can search across all course content:\n\n🔍 **How to use:**\n• Press **Ctrl+K** (or **Cmd+K** on Mac)\n• Or click the 🔍 icon in the nav bar\n• Type your search query\n• Click a result to jump to that page\n\nThe search covers all modules, exercises, case studies, and resources!',
            topic: 'Search'
        }
    ];

    // ==========================================
    // MATCHING ENGINE
    // ==========================================
    function findBestMatch(query) {
        const q = query.toLowerCase().trim();
        
        // Score each knowledge entry
        let bestMatch = null;
        let bestScore = 0;

        for (const entry of knowledgeBase) {
            let score = 0;
            
            for (const keyword of entry.keywords) {
                // Exact match
                if (q === keyword) {
                    score += 100;
                }
                // Query contains keyword
                else if (q.includes(keyword)) {
                    score += 50 + (keyword.length / q.length) * 30;
                }
                // Keyword contains query
                else if (keyword.includes(q)) {
                    score += 30 + (q.length / keyword.length) * 20;
                }
                // Word overlap
                else {
                    const qWords = q.split(/\s+/);
                    const kWords = keyword.split(/\s+/);
                    let wordMatches = 0;
                    for (const qw of qWords) {
                        if (qw.length < 3) continue;
                        for (const kw of kWords) {
                            if (kw.includes(qw) || qw.includes(kw)) {
                                wordMatches++;
                            }
                        }
                    }
                    if (wordMatches > 0) {
                        score += wordMatches * 15;
                    }
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        if (bestScore >= 10) {
            return bestMatch;
        }

        return null;
    }

    function getResponse(userMsg) {
        const match = findBestMatch(userMsg);
        if (match) {
            return { answer: match.answer, topic: match.topic };
        }
        return {
            answer: 'I\'m not sure about that specific topic, but I can help with:\n\n• **CPQ basics** – "What is CPQ?"\n• **Pricing** – "How does pricing work?"\n• **Quotes** – "How to create a quote?"\n• **Approvals** – "How do approvals work?"\n• **Modules** – "What modules are in this course?"\n• **Getting started** – "How do I begin?"\n\nTry rephrasing your question or ask about a specific CPQ topic!',
            topic: 'General'
        };
    }

    // ==========================================
    // SIMPLE MARKDOWN RENDERER
    // ==========================================
    function renderMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: var(--primary)">$1</a>')
            .replace(/^• /gm, '<span style="margin-left:8px">• </span>')
            .replace(/^[0-9]️⃣/gm, (m) => `<span style="margin-left:4px">${m}</span>`)
            .replace(/\n/g, '<br>');
    }

    // ==========================================
    // UI INJECTION
    // ==========================================
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cpq-chat-toggle {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white;
                border: none;
                cursor: pointer;
                font-size: 28px;
                box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
                z-index: 10000;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cpq-chat-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 28px rgba(99, 102, 241, 0.6);
            }
            .cpq-chat-toggle.active {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
            }

            .cpq-chat-window {
                position: fixed;
                bottom: 96px;
                right: 24px;
                width: 400px;
                max-height: 550px;
                border-radius: 16px;
                overflow: hidden;
                z-index: 10000;
                display: none;
                flex-direction: column;
                background: var(--bg-card, #ffffff);
                box-shadow: 0 12px 48px rgba(0,0,0,0.2);
                border: 1px solid var(--border-light, #e2e8f0);
                animation: cpqChatSlideUp 0.3s ease;
            }
            .cpq-chat-window.open { display: flex; }

            @keyframes cpqChatSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .cpq-chat-header {
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .cpq-chat-header-avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                flex-shrink: 0;
            }
            .cpq-chat-header-info h3 {
                margin: 0;
                font-size: 15px;
                font-weight: 700;
            }
            .cpq-chat-header-info p {
                margin: 0;
                font-size: 11px;
                opacity: 0.85;
            }

            .cpq-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                min-height: 300px;
                max-height: 380px;
                background: var(--bg-body, #f8fafc);
            }

            .cpq-chat-msg {
                margin-bottom: 12px;
                display: flex;
                gap: 8px;
                align-items: flex-start;
            }
            .cpq-chat-msg.user { flex-direction: row-reverse; }

            .cpq-chat-msg-avatar {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                flex-shrink: 0;
            }
            .cpq-chat-msg.bot .cpq-chat-msg-avatar {
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white;
            }
            .cpq-chat-msg.user .cpq-chat-msg-avatar {
                background: var(--color-success, #22c55e);
                color: white;
            }

            .cpq-chat-bubble {
                max-width: 80%;
                padding: 10px 14px;
                border-radius: 12px;
                font-size: 13px;
                line-height: 1.5;
                word-wrap: break-word;
            }
            .cpq-chat-msg.bot .cpq-chat-bubble {
                background: var(--bg-card, white);
                color: var(--text-primary, #1e293b);
                border: 1px solid var(--border-light, #e2e8f0);
                border-top-left-radius: 4px;
            }
            .cpq-chat-msg.user .cpq-chat-bubble {
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white;
                border-top-right-radius: 4px;
            }
            .cpq-chat-bubble strong { font-weight: 700; }
            .cpq-chat-bubble code {
                background: rgba(99, 102, 241, 0.1);
                padding: 1px 4px;
                border-radius: 3px;
                font-size: 12px;
            }
            .cpq-chat-bubble a {
                color: var(--brand-primary, #6366f1);
                text-decoration: underline;
            }

            .cpq-chat-topic-tag {
                display: inline-block;
                font-size: 10px;
                padding: 2px 8px;
                border-radius: 10px;
                background: rgba(99, 102, 241, 0.1);
                color: var(--brand-primary, #6366f1);
                margin-top: 6px;
                font-weight: 600;
            }

            .cpq-chat-input-area {
                padding: 12px 16px;
                border-top: 1px solid var(--border-light, #e2e8f0);
                display: flex;
                gap: 8px;
                background: var(--bg-card, white);
            }
            .cpq-chat-input {
                flex: 1;
                padding: 10px 14px;
                border: 1px solid var(--border-light, #e2e8f0);
                border-radius: 24px;
                font-size: 13px;
                outline: none;
                background: var(--bg-body, #f8fafc);
                color: var(--text-primary, #1e293b);
                font-family: 'Inter', sans-serif;
                transition: border-color 0.2s;
            }
            .cpq-chat-input:focus {
                border-color: var(--brand-primary, #6366f1);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            }
            .cpq-chat-input::placeholder {
                color: var(--text-secondary, #94a3b8);
            }
            .cpq-chat-send {
                width: 38px;
                height: 38px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white;
                border: none;
                cursor: pointer;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            .cpq-chat-send:hover {
                transform: scale(1.05);
                box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
            }

            .cpq-chat-suggestions {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin-top: 8px;
            }
            .cpq-chat-suggestion {
                padding: 5px 10px;
                border-radius: 16px;
                font-size: 11px;
                background: rgba(99, 102, 241, 0.08);
                color: var(--brand-primary, #6366f1);
                border: 1px solid rgba(99, 102, 241, 0.2);
                cursor: pointer;
                transition: all 0.2s;
                font-weight: 500;
            }
            .cpq-chat-suggestion:hover {
                background: var(--brand-primary, #6366f1);
                color: white;
                border-color: var(--brand-primary, #6366f1);
            }

            .cpq-chat-typing {
                display: flex;
                gap: 4px;
                padding: 8px 0;
                align-items: center;
            }
            .cpq-chat-typing span {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--brand-primary, #6366f1);
                animation: cpqTypingDot 1.2s infinite;
            }
            .cpq-chat-typing span:nth-child(2) { animation-delay: 0.2s; }
            .cpq-chat-typing span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes cpqTypingDot {
                0%, 100% { opacity: 0.3; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1); }
            }

            @media (max-width: 480px) {
                .cpq-chat-window {
                    width: calc(100vw - 32px);
                    right: 16px;
                    bottom: 88px;
                    max-height: calc(100vh - 120px);
                }
                .cpq-chat-toggle {
                    bottom: 16px;
                    right: 16px;
                    width: 52px;
                    height: 52px;
                    font-size: 24px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function createChatWidget() {
        // Toggle button
        const toggle = document.createElement('button');
        toggle.className = 'cpq-chat-toggle';
        toggle.id = 'cpqChatToggle';
        toggle.innerHTML = '💬';
        toggle.title = 'Chat with CPQ Assistant';
        toggle.setAttribute('aria-label', 'Open CPQ Chat Assistant');

        // Chat window
        const chatWindow = document.createElement('div');
        chatWindow.className = 'cpq-chat-window';
        chatWindow.id = 'cpqChatWindow';
        chatWindow.innerHTML = `
            <div class="cpq-chat-header">
                <div class="cpq-chat-header-avatar">🤖</div>
                <div class="cpq-chat-header-info">
                    <h3>CPQ Assistant</h3>
                    <p>Ask me anything about CPQ</p>
                </div>
            </div>
            <div class="cpq-chat-messages" id="cpqChatMessages"></div>
            <div class="cpq-chat-input-area">
                <input type="text" class="cpq-chat-input" id="cpqChatInput" placeholder="Ask about CPQ..." autocomplete="off">
                <button class="cpq-chat-send" id="cpqChatSend" aria-label="Send message">➤</button>
            </div>
        `;

        document.body.appendChild(toggle);
        document.body.appendChild(chatWindow);

        // Event handlers
        toggle.addEventListener('click', () => {
            const isOpen = chatWindow.classList.toggle('open');
            toggle.classList.toggle('active', isOpen);
            toggle.innerHTML = isOpen ? '✕' : '💬';
            if (isOpen) {
                const msgs = document.getElementById('cpqChatMessages');
                if (msgs.children.length === 0) showWelcome();
                document.getElementById('cpqChatInput').focus();
            }
        });

        const input = document.getElementById('cpqChatInput');
        const sendBtn = document.getElementById('cpqChatSend');

        sendBtn.addEventListener('click', () => sendMessage());
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function showWelcome() {
        const msgs = document.getElementById('cpqChatMessages');
        
        addBotMessage('👋 **Hi! I\'m your CPQ Course Assistant.**\n\nI can answer questions about CPQ concepts, help you navigate the course, and guide your learning. What would you like to know?', 'Welcome');

        // Add suggestion chips
        const suggestions = document.createElement('div');
        suggestions.className = 'cpq-chat-suggestions';
        const chips = ['What is CPQ?', 'How to get started?', 'Show modules', 'Best practices', 'Certification prep'];
        chips.forEach(text => {
            const chip = document.createElement('button');
            chip.className = 'cpq-chat-suggestion';
            chip.textContent = text;
            chip.addEventListener('click', () => {
                document.getElementById('cpqChatInput').value = text;
                sendMessage();
            });
            suggestions.appendChild(chip);
        });
        msgs.appendChild(suggestions);
        scrollToBottom();
    }

    function sendMessage() {
        const input = document.getElementById('cpqChatInput');
        const text = input.value.trim();
        if (!text) return;

        addUserMessage(text);
        input.value = '';

        // Show typing indicator
        const msgs = document.getElementById('cpqChatMessages');
        const typing = document.createElement('div');
        typing.className = 'cpq-chat-msg bot';
        typing.id = 'cpqTyping';
        typing.innerHTML = `
            <div class="cpq-chat-msg-avatar">🤖</div>
            <div class="cpq-chat-bubble">
                <div class="cpq-chat-typing"><span></span><span></span><span></span></div>
            </div>
        `;
        msgs.appendChild(typing);
        scrollToBottom();

        // Simulate thinking delay
        const delay = 400 + Math.random() * 600;
        setTimeout(() => {
            typing.remove();
            const result = getResponse(text);
            addBotMessage(result.answer, result.topic);
        }, delay);
    }

    function addUserMessage(text) {
        const msgs = document.getElementById('cpqChatMessages');
        // Remove any existing suggestion chips
        const oldSuggestions = msgs.querySelectorAll('.cpq-chat-suggestions');
        oldSuggestions.forEach(s => s.remove());

        const msg = document.createElement('div');
        msg.className = 'cpq-chat-msg user';
        msg.innerHTML = `
            <div class="cpq-chat-msg-avatar">👤</div>
            <div class="cpq-chat-bubble">${escapeHtml(text)}</div>
        `;
        msgs.appendChild(msg);
        scrollToBottom();
    }

    function addBotMessage(text, topic) {
        const msgs = document.getElementById('cpqChatMessages');
        const msg = document.createElement('div');
        msg.className = 'cpq-chat-msg bot';
        msg.innerHTML = `
            <div class="cpq-chat-msg-avatar">🤖</div>
            <div>
                <div class="cpq-chat-bubble">${renderMarkdown(text)}</div>
                ${topic ? `<span class="cpq-chat-topic-tag">📌 ${topic}</span>` : ''}
            </div>
        `;
        msgs.appendChild(msg);
        scrollToBottom();
    }

    function scrollToBottom() {
        const msgs = document.getElementById('cpqChatMessages');
        setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==========================================
    // INITIALIZE
    // ==========================================
    function init() {
        injectStyles();
        createChatWidget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
