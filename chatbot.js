// CPQ Course AI Chatbot - Powered by Google Gemini (Free Tier)
// Falls back to built-in knowledge base when no API key is set
(function() {
    'use strict';

    const GEMINI_MODEL = 'gemini-2.0-flash';
    const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL + ':generateContent';
    const STORAGE_KEY = 'cpq_gemini_api_key';
    const HISTORY_KEY = 'cpq_chat_history';

    const SYSTEM_PROMPT = `You are CPQ Assistant, an expert AI tutor for a CPQ (Configure, Price, Quote) learning course. You help students learn CPQ concepts, answer technical questions, and guide them through the course.

CORE CPQ KNOWLEDGE:
- CPQ = Configure, Price, Quote — a sales tool for generating accurate quotes quickly
- Three pillars: Configure (select/customize products), Price (apply pricing rules/discounts), Quote (generate professional documents)
- CPQ reduces quote time from days to minutes, improves accuracy from 70% to 99.9%, increases deal size 20-30%
- Key platforms: Salesforce CPQ, ServiceNow CPQ, Oracle CPQ, SAP CPQ

COURSE MODULES:
1. Fundamentals — What is CPQ, Why it matters, Architecture
2. Products & Pricing — Product catalog, pricing models (list, volume, subscription, usage-based), bundles
3. Quotes — Quote creation, templates, line items, lifecycle management
4. Approvals — Workflow automation, approval rules, escalation
5. Integration & Reporting — CRM/ERP integration, APIs, dashboards, KPIs
6. Advanced Topics — Guided selling, multi-currency, contract management
7. Implementation — Project planning, deployment, best practices

BEHAVIOR RULES:
- Keep responses concise but informative (2-4 short paragraphs max)
- Use bullet points and emoji for readability
- If asked about non-CPQ topics, politely redirect to CPQ learning
- Suggest relevant course modules when appropriate
- Be encouraging and supportive of learning
- Format responses with **bold** for emphasis
- Use simple markdown (bold, bullet points) — no headers or complex formatting`;

    let conversationHistory = [];

    // ==========================================
    // BUILT-IN KNOWLEDGE BASE (FALLBACK)
    // ==========================================
    const knowledgeBase = [
        {
            keywords: ['what is cpq', 'cpq meaning', 'define cpq', 'cpq stands for', 'cpq definition', 'configure price quote'],
            answer: '**CPQ stands for Configure, Price, Quote.** It\'s a sales tool that helps companies quickly and accurately generate quotes for orders.\n\n• **Configure** – Select and customize products/services\n• **Price** – Apply pricing rules, discounts, and calculations automatically\n• **Quote** – Generate professional quote documents\n\nCPQ eliminates manual errors and speeds up the sales cycle by 30-50%.\n\n💡 *Connect a free Gemini API key (⚙️) for more detailed AI-powered answers!*'
        },
        {
            keywords: ['why cpq', 'cpq benefits', 'cpq advantages', 'why use cpq', 'cpq important', 'cpq matters'],
            answer: '**Why CPQ Matters:**\n\n📈 **Revenue Growth** – 20-30% increase in average deal size\n⚡ **Speed** – Quote generation: 2-3 days → 5 minutes (97% faster)\n🎯 **Accuracy** – Pricing errors drop from 30% to 0.1%\n💰 **Margins** – 5-10% margin improvement\n📊 **Win Rate** – Increases from 45% to 60%\n\n💡 *Add your free Gemini API key (⚙️) for deeper AI explanations!*'
        },
        {
            keywords: ['pricing', 'pricing model', 'price', 'discount', 'pricing rules'],
            answer: '**CPQ Pricing Models:**\n\n• **List Price** – Standard published price\n• **Cost-Plus** – Cost + markup percentage\n• **Tiered/Volume** – Price decreases with quantity\n• **Subscription** – Recurring (monthly/annual)\n• **Usage-Based** – Pay-per-use metering\n\n🏷️ **Discount Types:** Volume, bundle, customer-specific, promotional, and approval-required discounts.'
        },
        {
            keywords: ['quote', 'create quote', 'quotation', 'proposal', 'quote creation'],
            answer: '**Quote Creation Process:**\n\n1️⃣ Create new quote from opportunity\n2️⃣ Add products from catalog\n3️⃣ Configure options & quantities\n4️⃣ System auto-calculates pricing\n5️⃣ Review totals & margins\n6️⃣ Route through approval workflow\n7️⃣ Generate professional PDF\n8️⃣ Send to customer\n\n⏱️ Average time: **5-10 minutes** (vs 2-3 days manually)'
        },
        {
            keywords: ['approval', 'approval workflow', 'approve', 'approval process'],
            answer: '**CPQ Approval Workflows:**\n\n✅ **Triggers:** Discount >20%, deal >$100K, non-standard terms, custom pricing\n\n🔄 **Steps:**\n1. Sales rep submits quote\n2. System evaluates rules\n3. Routes to approver(s)\n4. Approver reviews/decides\n5. Auto-escalation if delayed\n6. Status updates automatically\n\n⚡ **Best Practice:** Auto-approve standard quotes, manual approval only for exceptions.'
        },
        {
            keywords: ['product', 'catalog', 'bundle', 'product types'],
            answer: '**Product Management in CPQ:**\n\n📦 **Product Types:** Stand-alone, configurable, bundles, subscriptions\n\n🔧 **Features:**\n• Hierarchical categories\n• Product attributes & options\n• Compatibility rules\n• Lifecycle management\n• Version control\n\n📦 **Bundle Types:** Fixed, flexible, and nested bundles — increase deal size by 15-25%.'
        },
        {
            keywords: ['integration', 'crm', 'erp', 'salesforce', 'servicenow', 'api'],
            answer: '**CPQ Integration Points:**\n\n🔗 **CRM:** Salesforce, ServiceNow, MS Dynamics, HubSpot\n🏢 **ERP:** SAP, Oracle, NetSuite\n🔌 **Methods:** REST APIs, SOAP, Middleware (MuleSoft, Dell Boomi)\n📊 **Data Sync:** Products, pricing, customers, orders, inventory'
        },
        {
            keywords: ['implementation', 'deploy', 'rollout', 'go live', 'project'],
            answer: '**CPQ Implementation Roadmap:**\n\n📅 **Phase 1 (Weeks 1-2):** Discovery & requirements\n📅 **Phase 2 (Weeks 3-4):** Solution design\n📅 **Phase 3 (Weeks 5-10):** Build & configure\n📅 **Phase 4 (Weeks 11-14):** Test, train & go-live\n\n💡 Start simple, add complexity gradually. Aim for 80% auto-approval rate.'
        },
        {
            keywords: ['module', 'modules', 'course', 'syllabus', 'topics'],
            answer: '**7 Course Modules:**\n\n📖 Module 1: Fundamentals\n🛍️ Module 2: Products & Pricing\n📝 Module 3: Quotes\n✅ Module 4: Approvals\n🔗 Module 5: Integration & Reporting\n⚙️ Module 6: Advanced Topics\n🚀 Module 7: Implementation\n\n➡️ Click **Course** in the nav bar to start!'
        },
        {
            keywords: ['hello', 'hi', 'hey', 'greetings'],
            answer: '👋 **Hello!** Welcome to the CPQ Course AI Assistant!\n\nI can answer questions about CPQ concepts, guide your learning, and help with the course.\n\n🤖 **For AI-powered answers**, click ⚙️ and add your free Google Gemini API key.\n\n**Try asking:** "What is CPQ?" or "How do approvals work?"'
        },
        {
            keywords: ['start', 'get started', 'begin', 'how to start', 'new', 'beginner'],
            answer: '**Getting Started:**\n\n1️⃣ Click **Course** → Start with Module 1\n2️⃣ Go to **Guides** → Quick Start (5 min setup)\n3️⃣ Try **Exercises** (Beginner level)\n4️⃣ Take **Quizzes** to test knowledge\n5️⃣ Read **Cases** for real-world examples\n\n🔍 Press **Ctrl+K** to search across all content!'
        },
        {
            keywords: ['help', 'how to use', 'features', 'what can you do'],
            answer: '**I can help with:**\n\n📚 CPQ concepts & definitions\n💲 Pricing models & discounts\n📝 Quote creation & templates\n✅ Approval workflows\n🔗 Integration & reporting\n🏆 Certification prep\n\n🤖 **Upgrade to AI mode** — Click ⚙️ to add your free Gemini API key for unlimited, detailed answers!\n\n**Try:** "What is guided selling?" or "How does pricing work?"'
        },
        {
            keywords: ['certification', 'certified', 'exam', 'study'],
            answer: '**CPQ Certification Guide:**\n\n🏆 **Certifications:** ServiceNow CPQ Specialist/Developer, Salesforce CPQ Specialist\n\n📚 **14-Week Study Plan:**\n• Weeks 1-4: Fundamentals & Products\n• Weeks 5-8: Quotes, Approvals, Integration\n• Weeks 9-12: Advanced Topics & Practice\n• Weeks 13-14: Review & exam\n\n📝 Take the **Quizzes** on this site to test your knowledge!'
        },
        {
            keywords: ['best practice', 'best practices', 'tips', 'advice'],
            answer: '**CPQ Best Practices:**\n\n✅ Start simple, add complexity gradually\n✅ Keep product catalog clean & organized\n✅ Set clear approval thresholds\n✅ Train sales team thoroughly\n✅ Monitor KPIs weekly\n\n❌ Don\'t over-complicate workflows\n❌ Don\'t allow unlimited manual discounts\n❌ Don\'t skip user acceptance testing\n\n💡 **Pro Tip:** Aim for 80% auto-approval rate.'
        },
        {
            keywords: ['guided selling', 'wizard', 'needs assessment'],
            answer: '**Guided Selling:**\n\nWalks reps through questions to recommend best products:\n\n1. Assess customer needs/budget\n2. Determine technical requirements\n3. Recommend optimal configuration\n4. Auto-populate quote\n\n💡 Reduces training time, ensures consistency, increases upsell by 25%.'
        },
        {
            keywords: ['report', 'reporting', 'analytics', 'dashboard', 'kpi'],
            answer: '**CPQ Analytics:**\n\n📊 **Key KPIs:** Quote-to-close ratio, average deal size, cycle time, win rate, discount distribution, margin analysis\n\n📈 **Dashboards:** Sales performance, pipeline, approval bottlenecks, product popularity\n\n💡 Track these weekly to optimize your CPQ process.'
        },
        {
            keywords: ['thank', 'thanks', 'thank you'],
            answer: 'You\'re welcome! 😊 Happy to help with your CPQ learning!\n\nFeel free to ask anything else. If you want more detailed AI answers, click ⚙️ to add your free Gemini API key.'
        },
        {
            keywords: ['api key', 'gemini', 'setup', 'configure ai', 'settings'],
            answer: '**Setting up AI-powered answers:**\n\n1️⃣ Get a **free** API key from [aistudio.google.com](https://aistudio.google.com/app/apikey)\n2️⃣ Click the ⚙️ icon in this chat window\n3️⃣ Paste your API key and click Save\n4️⃣ That\'s it! You\'ll now get AI-powered responses\n\n🆓 The Gemini API free tier gives you **15 requests/minute** — more than enough for learning!'
        }
    ];

    // ==========================================
    // KNOWLEDGE BASE MATCHING (FALLBACK)
    // ==========================================
    function findKBMatch(query) {
        const q = query.toLowerCase().trim();
        let bestMatch = null;
        let bestScore = 0;

        for (const entry of knowledgeBase) {
            let score = 0;
            for (const keyword of entry.keywords) {
                if (q === keyword) score += 100;
                else if (q.includes(keyword)) score += 50 + (keyword.length / q.length) * 30;
                else if (keyword.includes(q)) score += 30 + (q.length / keyword.length) * 20;
                else {
                    const qWords = q.split(/\s+/);
                    const kWords = keyword.split(/\s+/);
                    let wordMatches = 0;
                    for (const qw of qWords) {
                        if (qw.length < 3) continue;
                        for (const kw of kWords) {
                            if (kw.includes(qw) || qw.includes(kw)) wordMatches++;
                        }
                    }
                    if (wordMatches > 0) score += wordMatches * 15;
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        return bestScore >= 10 ? bestMatch.answer : null;
    }

    // ==========================================
    // GEMINI API
    // ==========================================
    function getApiKey() {
        return localStorage.getItem(STORAGE_KEY) || '';
    }

    function setApiKey(key) {
        localStorage.setItem(STORAGE_KEY, key.trim());
        conversationHistory = [];
    }

    async function callGemini(userMessage) {
        const apiKey = getApiKey();
        if (!apiKey) return null;

        // Build conversation for Gemini
        conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

        // Keep only last 10 messages to avoid token limits
        const recentHistory = conversationHistory.slice(-10);

        try {
            const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    contents: recentHistory,
                    generationConfig: {
                        temperature: 0.7,
                        topP: 0.9,
                        maxOutputTokens: 600
                    }
                })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                console.warn('Gemini API error:', err);
                if (response.status === 400 || response.status === 403) {
                    return { error: '⚠️ **Invalid API key.** Please check your Gemini API key in ⚙️ settings.\n\nGet a free key at [aistudio.google.com](https://aistudio.google.com/app/apikey)' };
                }
                if (response.status === 429) {
                    return { error: '⚠️ **Rate limit reached.** The free tier allows 15 requests/minute. Please wait a moment and try again.' };
                }
                return null;
            }

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                conversationHistory.push({ role: 'model', parts: [{ text }] });
                return { text };
            }

            return null;
        } catch (e) {
            console.warn('Gemini API error:', e);
            return null;
        }
    }

    async function getResponse(userMsg) {
        // Try Gemini API first
        const apiKey = getApiKey();
        if (apiKey) {
            const geminiResult = await callGemini(userMsg);
            if (geminiResult?.error) {
                return { answer: geminiResult.error, topic: 'Error', isAI: false };
            }
            if (geminiResult?.text) {
                return { answer: geminiResult.text, topic: 'AI Response', isAI: true };
            }
        }

        // Fallback to knowledge base
        const kbAnswer = findKBMatch(userMsg);
        if (kbAnswer) {
            return { answer: kbAnswer, topic: 'Knowledge Base', isAI: false };
        }

        return {
            answer: 'I\'m not sure about that. Try asking about:\n\n• **CPQ basics** – "What is CPQ?"\n• **Pricing** – "How does pricing work?"\n• **Quotes** – "How to create a quote?"\n• **Getting started** – "How do I begin?"\n\n🤖 **For smarter answers**, click ⚙️ to add your free Gemini API key!',
            topic: 'General',
            isAI: false
        };
    }

    // ==========================================
    // MARKDOWN RENDERER
    // ==========================================
    function renderMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            .replace(/^• /gm, '<span style="margin-left:8px">• </span>')
            .replace(/^- /gm, '<span style="margin-left:8px">• </span>')
            .replace(/\n/g, '<br>');
    }

    // ==========================================
    // UI
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
                width: 420px;
                max-height: 580px;
                border-radius: 16px;
                overflow: hidden;
                z-index: 10000;
                display: none;
                flex-direction: column;
                background: var(--bg-card, #ffffff);
                box-shadow: 0 12px 48px rgba(0,0,0,0.25);
                border: 1px solid var(--border-light, #e2e8f0);
                animation: cpqSlideUp 0.3s ease;
            }
            .cpq-chat-window.open { display: flex; }
            @keyframes cpqSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .cpq-chat-header {
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white;
                padding: 14px 18px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .cpq-chat-header-avatar {
                width: 36px; height: 36px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
                display: flex; align-items: center; justify-content: center;
                font-size: 20px; flex-shrink: 0;
            }
            .cpq-chat-header-info { flex: 1; }
            .cpq-chat-header-info h3 { margin: 0; font-size: 14px; font-weight: 700; }
            .cpq-chat-header-info p { margin: 0; font-size: 11px; opacity: 0.85; }
            .cpq-chat-header-actions { display: flex; gap: 6px; }
            .cpq-chat-header-btn {
                background: rgba(255,255,255,0.15);
                border: none; color: white;
                width: 30px; height: 30px; border-radius: 50%;
                cursor: pointer; font-size: 14px;
                display: flex; align-items: center; justify-content: center;
                transition: background 0.2s;
            }
            .cpq-chat-header-btn:hover { background: rgba(255,255,255,0.3); }

            .cpq-chat-ai-badge {
                display: inline-flex; align-items: center; gap: 4px;
                font-size: 9px; padding: 1px 6px;
                border-radius: 8px; font-weight: 700;
                margin-left: 6px; vertical-align: middle;
            }
            .cpq-chat-ai-badge.connected { background: #22c55e33; color: #22c55e; }
            .cpq-chat-ai-badge.offline { background: #f59e0b33; color: #f59e0b; }

            .cpq-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 14px;
                min-height: 300px;
                max-height: 400px;
                background: var(--bg-body, #f8fafc);
            }

            .cpq-chat-msg { margin-bottom: 12px; display: flex; gap: 8px; align-items: flex-start; }
            .cpq-chat-msg.user { flex-direction: row-reverse; }
            .cpq-chat-msg-avatar {
                width: 28px; height: 28px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 14px; flex-shrink: 0;
            }
            .cpq-chat-msg.bot .cpq-chat-msg-avatar {
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white;
            }
            .cpq-chat-msg.user .cpq-chat-msg-avatar {
                background: var(--color-success, #22c55e); color: white;
            }

            .cpq-chat-bubble {
                max-width: 82%; padding: 10px 14px;
                border-radius: 14px; font-size: 13px;
                line-height: 1.55; word-wrap: break-word;
            }
            .cpq-chat-msg.bot .cpq-chat-bubble {
                background: var(--bg-card, white);
                color: var(--text-primary, #1e293b);
                border: 1px solid var(--border-light, #e2e8f0);
                border-top-left-radius: 4px;
            }
            .cpq-chat-msg.user .cpq-chat-bubble {
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white; border-top-right-radius: 4px;
            }
            .cpq-chat-bubble strong { font-weight: 700; }
            .cpq-chat-bubble code {
                background: rgba(99,102,241,0.1); padding: 1px 4px;
                border-radius: 3px; font-size: 12px; font-family: monospace;
            }
            .cpq-chat-bubble a { color: var(--brand-primary, #6366f1); text-decoration: underline; }
            .cpq-chat-msg.user .cpq-chat-bubble a { color: #c4b5fd; }

            .cpq-chat-source {
                display: inline-flex; align-items: center; gap: 3px;
                font-size: 10px; padding: 2px 8px;
                border-radius: 10px; margin-top: 4px; font-weight: 600;
            }
            .cpq-chat-source.ai { background: #22c55e22; color: #16a34a; }
            .cpq-chat-source.kb { background: rgba(99,102,241,0.1); color: var(--brand-primary, #6366f1); }

            .cpq-chat-input-area {
                padding: 10px 14px;
                border-top: 1px solid var(--border-light, #e2e8f0);
                display: flex; gap: 8px;
                background: var(--bg-card, white);
            }
            .cpq-chat-input {
                flex: 1; padding: 10px 14px;
                border: 1px solid var(--border-light, #e2e8f0);
                border-radius: 24px; font-size: 13px;
                outline: none;
                background: var(--bg-body, #f8fafc);
                color: var(--text-primary, #1e293b);
                font-family: 'Inter', sans-serif;
                transition: border-color 0.2s;
            }
            .cpq-chat-input:focus {
                border-color: var(--brand-primary, #6366f1);
                box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
            }
            .cpq-chat-input::placeholder { color: var(--text-secondary, #94a3b8); }
            .cpq-chat-send {
                width: 38px; height: 38px; border-radius: 50%;
                background: linear-gradient(135deg, var(--brand-primary, #6366f1), var(--brand-secondary, #8b5cf6));
                color: white; border: none; cursor: pointer;
                font-size: 16px; display: flex;
                align-items: center; justify-content: center;
                transition: all 0.2s; flex-shrink: 0;
            }
            .cpq-chat-send:hover { transform: scale(1.05); }

            .cpq-chat-suggestions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
            .cpq-chat-chip {
                padding: 5px 10px; border-radius: 16px; font-size: 11px;
                background: rgba(99,102,241,0.08); color: var(--brand-primary, #6366f1);
                border: 1px solid rgba(99,102,241,0.2); cursor: pointer;
                transition: all 0.2s; font-weight: 500;
            }
            .cpq-chat-chip:hover {
                background: var(--brand-primary, #6366f1); color: white;
                border-color: var(--brand-primary, #6366f1);
            }

            .cpq-chat-typing { display: flex; gap: 4px; padding: 8px 0; align-items: center; }
            .cpq-chat-typing span {
                width: 6px; height: 6px; border-radius: 50%;
                background: var(--brand-primary, #6366f1);
                animation: cpqDot 1.2s infinite;
            }
            .cpq-chat-typing span:nth-child(2) { animation-delay: 0.2s; }
            .cpq-chat-typing span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes cpqDot {
                0%, 100% { opacity: 0.3; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1); }
            }

            /* Settings panel */
            .cpq-chat-settings {
                display: none; padding: 20px;
                background: var(--bg-card, white);
                border-bottom: 1px solid var(--border-light, #e2e8f0);
            }
            .cpq-chat-settings.open { display: block; }
            .cpq-chat-settings h4 {
                margin: 0 0 12px; font-size: 14px;
                color: var(--text-primary, #333);
            }
            .cpq-chat-settings p {
                font-size: 11px; color: var(--text-secondary, #666);
                margin: 0 0 10px; line-height: 1.5;
            }
            .cpq-chat-settings-input {
                width: 100%; padding: 8px 12px;
                border: 1px solid var(--border-light, #e2e8f0);
                border-radius: 8px; font-size: 12px;
                background: var(--bg-body, #f8fafc);
                color: var(--text-primary, #333);
                font-family: monospace;
                outline: none; margin-bottom: 10px;
            }
            .cpq-chat-settings-input:focus {
                border-color: var(--brand-primary, #6366f1);
            }
            .cpq-chat-settings-actions {
                display: flex; gap: 8px;
            }
            .cpq-chat-settings-btn {
                padding: 6px 14px; border-radius: 8px;
                font-size: 12px; font-weight: 600;
                cursor: pointer; border: none;
                transition: all 0.2s; font-family: 'Inter', sans-serif;
            }
            .cpq-chat-settings-btn.primary {
                background: var(--brand-primary, #6366f1); color: white;
            }
            .cpq-chat-settings-btn.primary:hover { opacity: 0.9; }
            .cpq-chat-settings-btn.danger {
                background: #ef444422; color: #ef4444;
            }
            .cpq-chat-settings-btn.danger:hover { background: #ef444444; }
            .cpq-chat-settings-link {
                display: inline-block; margin-top: 8px;
                font-size: 11px; color: var(--brand-primary, #6366f1);
                text-decoration: underline;
            }

            @media (max-width: 480px) {
                .cpq-chat-window {
                    width: calc(100vw - 32px); right: 16px;
                    bottom: 88px; max-height: calc(100vh - 120px);
                }
                .cpq-chat-toggle {
                    bottom: 16px; right: 16px; width: 52px; height: 52px; font-size: 24px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function createWidget() {
        const hasKey = !!getApiKey();

        const toggle = document.createElement('button');
        toggle.className = 'cpq-chat-toggle';
        toggle.id = 'cpqChatToggle';
        toggle.innerHTML = '💬';
        toggle.title = 'Chat with CPQ AI Assistant';

        const chatWindow = document.createElement('div');
        chatWindow.className = 'cpq-chat-window';
        chatWindow.id = 'cpqChatWindow';
        chatWindow.innerHTML = `
            <div class="cpq-chat-header">
                <div class="cpq-chat-header-avatar">🤖</div>
                <div class="cpq-chat-header-info">
                    <h3>CPQ AI Assistant
                        <span class="cpq-chat-ai-badge ${hasKey ? 'connected' : 'offline'}" id="cpqAIBadge">
                            ${hasKey ? '● AI ON' : '● KB Mode'}
                        </span>
                    </h3>
                    <p>${hasKey ? 'Powered by Gemini AI' : 'Add API key for AI mode'}</p>
                </div>
                <div class="cpq-chat-header-actions">
                    <button class="cpq-chat-header-btn" id="cpqSettingsBtn" title="Settings">⚙️</button>
                </div>
            </div>
            <div class="cpq-chat-settings" id="cpqSettings">
                <h4>🔑 AI Settings</h4>
                <p>Add your <strong>free</strong> Google Gemini API key for AI-powered answers. Your key is stored locally in your browser only.</p>
                <input type="password" class="cpq-chat-settings-input" id="cpqApiKeyInput" placeholder="Paste your Gemini API key here..." value="${getApiKey()}">
                <div class="cpq-chat-settings-actions">
                    <button class="cpq-chat-settings-btn primary" id="cpqSaveKey">💾 Save Key</button>
                    <button class="cpq-chat-settings-btn danger" id="cpqClearKey">🗑️ Remove</button>
                </div>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" class="cpq-chat-settings-link">🆓 Get free API key → aistudio.google.com</a>
            </div>
            <div class="cpq-chat-messages" id="cpqMsgs"></div>
            <div class="cpq-chat-input-area">
                <input type="text" class="cpq-chat-input" id="cpqInput" placeholder="Ask about CPQ..." autocomplete="off">
                <button class="cpq-chat-send" id="cpqSend" aria-label="Send">➤</button>
            </div>
        `;

        document.body.appendChild(toggle);
        document.body.appendChild(chatWindow);

        // Toggle chat
        toggle.addEventListener('click', () => {
            const isOpen = chatWindow.classList.toggle('open');
            toggle.classList.toggle('active', isOpen);
            toggle.innerHTML = isOpen ? '✕' : '💬';
            if (isOpen) {
                if (document.getElementById('cpqMsgs').children.length === 0) showWelcome();
                document.getElementById('cpqInput').focus();
            }
        });

        // Settings toggle
        document.getElementById('cpqSettingsBtn').addEventListener('click', () => {
            document.getElementById('cpqSettings').classList.toggle('open');
        });

        // Save API key
        document.getElementById('cpqSaveKey').addEventListener('click', () => {
            const key = document.getElementById('cpqApiKeyInput').value.trim();
            if (key) {
                setApiKey(key);
                updateAIBadge(true);
                document.getElementById('cpqSettings').classList.remove('open');
                addBotMessage('✅ **AI mode activated!** I\'m now powered by Google Gemini. Ask me anything about CPQ!', 'AI Connected', true);
            }
        });

        // Clear API key
        document.getElementById('cpqClearKey').addEventListener('click', () => {
            localStorage.removeItem(STORAGE_KEY);
            document.getElementById('cpqApiKeyInput').value = '';
            conversationHistory = [];
            updateAIBadge(false);
            document.getElementById('cpqSettings').classList.remove('open');
            addBotMessage('🔌 AI mode disabled. I\'ll use the built-in knowledge base. You can re-add your key anytime via ⚙️.', 'Settings', false);
        });

        // Send message
        document.getElementById('cpqSend').addEventListener('click', sendMessage);
        document.getElementById('cpqInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function updateAIBadge(connected) {
        const badge = document.getElementById('cpqAIBadge');
        const info = badge.closest('.cpq-chat-header-info');
        badge.className = 'cpq-chat-ai-badge ' + (connected ? 'connected' : 'offline');
        badge.textContent = connected ? '● AI ON' : '● KB Mode';
        info.querySelector('p').textContent = connected ? 'Powered by Gemini AI' : 'Add API key for AI mode';
    }

    function showWelcome() {
        const hasKey = !!getApiKey();
        const msg = hasKey
            ? '👋 **Hi! I\'m your CPQ AI Assistant**, powered by Gemini.\n\nAsk me anything about CPQ — I can explain concepts, give examples, help with exercises, and guide your learning journey!'
            : '👋 **Hi! I\'m your CPQ Course Assistant.**\n\nI can answer questions about CPQ using my built-in knowledge base.\n\n🤖 **Want smarter AI answers?** Click ⚙️ to add your free Gemini API key!';

        addBotMessage(msg, 'Welcome', hasKey);

        const msgs = document.getElementById('cpqMsgs');
        const chips = document.createElement('div');
        chips.className = 'cpq-chat-suggestions';
        ['What is CPQ?', 'How to start?', 'Course modules', 'Best practices', 'Pricing models'].forEach(text => {
            const chip = document.createElement('button');
            chip.className = 'cpq-chat-chip';
            chip.textContent = text;
            chip.addEventListener('click', () => {
                document.getElementById('cpqInput').value = text;
                sendMessage();
            });
            chips.appendChild(chip);
        });
        msgs.appendChild(chips);
        scrollBottom();
    }

    async function sendMessage() {
        const input = document.getElementById('cpqInput');
        const text = input.value.trim();
        if (!text) return;

        addUserMessage(text);
        input.value = '';
        input.disabled = true;

        // Remove suggestion chips
        document.querySelectorAll('.cpq-chat-suggestions').forEach(s => s.remove());

        // Show typing
        const msgs = document.getElementById('cpqMsgs');
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
        scrollBottom();

        // Get response
        const result = await getResponse(text);

        typing.remove();
        addBotMessage(result.answer, result.topic, result.isAI);
        input.disabled = false;
        input.focus();
    }

    function addUserMessage(text) {
        const msgs = document.getElementById('cpqMsgs');
        const msg = document.createElement('div');
        msg.className = 'cpq-chat-msg user';
        msg.innerHTML = `
            <div class="cpq-chat-msg-avatar">👤</div>
            <div class="cpq-chat-bubble">${escapeHtml(text)}</div>
        `;
        msgs.appendChild(msg);
        scrollBottom();
    }

    function addBotMessage(text, topic, isAI) {
        const msgs = document.getElementById('cpqMsgs');
        const msg = document.createElement('div');
        msg.className = 'cpq-chat-msg bot';
        const sourceClass = isAI ? 'ai' : 'kb';
        const sourceLabel = isAI ? '✨ Gemini AI' : '📚 Knowledge Base';
        msg.innerHTML = `
            <div class="cpq-chat-msg-avatar">🤖</div>
            <div>
                <div class="cpq-chat-bubble">${renderMarkdown(text)}</div>
                <span class="cpq-chat-source ${sourceClass}">${sourceLabel}</span>
            </div>
        `;
        msgs.appendChild(msg);
        scrollBottom();
    }

    function scrollBottom() {
        const msgs = document.getElementById('cpqMsgs');
        setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
    }

    function escapeHtml(t) {
        const d = document.createElement('div');
        d.textContent = t;
        return d.innerHTML;
    }

    // Init
    function init() {
        injectStyles();
        createWidget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
