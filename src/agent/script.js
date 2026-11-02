/* ==========================================================================
   THE SCRIPT
   Every answer this site can give, written by hand. There is no model behind
   it and no network call; the agent says so itself when asked (see 'meta'),
   because a portfolio that fakes an LLM is a worse credential than one that
   doesn't pretend.

   Answer markup: **bold** and [label](#href). Streaming renders plain text,
   then swaps in the parsed version on completion (see Stream.jsx).
   ========================================================================== */

export const AGENT = {
  name: 'ashrafali.m',
  email: 'ashrafali31018@gmail.com',
}

export const INTENTS = [
  {
    id: 'who',
    q: 'who are you?',
    keywords: ['who', 'about you', 'name', 'ashrafali', 'yourself', 'intro', 'hello', 'hi'],
    a: "**Ashrafali M.**, AI developer at ASK Real Estate in Manama, Bahrain. I build the AI layer on an existing enterprise real-estate ERP: a multi-provider LLM gateway, guardrails on at least 23 AI write and messaging paths, **Layla** (a WhatsApp AI sales agent, live since spring 2026), 9 tool-using agents and 14 active LLM signal classifiers. The ERP itself was built by a team before I joined. Before that, ML research at NIT Tiruchirappalli. Ask me [what's live](#work), [how I build](#practice), or [what I've shipped](#experience).",
  },
  {
    id: 'production',
    q: "what's in production?",
    keywords: ['production', 'live', 'now', 'current', 'running', 'askre', 'real estate', 'working on'],
    a: "Right now: the AI layer on **ASK Real Estate**'s enterprise ERP in Manama (CRM, marketing, facility and property management, HRMS, finance, procurement; the ERP was built by a team before I joined). **Layla**, a WhatsApp AI sales agent, has been live since spring 2026. Behind it: **one multi-provider LLM gateway** with per-agent model policy and Redis cost caps, an **Action Checkpoint** gating at least 23 AI write and customer-messaging paths, **9 tool-using agents** with single-use human approvals, and **14 active LLM signal classifiers** that run a free SQL check before any paid model call. Tap a node in the mesh for any piece, or read the [case study](#/case/askre).",
    goto: 'work',
  },
  {
    id: 'work',
    q: 'show me the work',
    keywords: ['work', 'projects', 'portfolio', 'built', 'show', 'case', 'studies', 'shipped'],
    a: "Five records, three in production and two from research: **Layla** (a live WhatsApp AI sales agent that qualifies leads and books meetings), the **Enterprise AI Platform** at ASK Real Estate (gateway, guardrails, agents and classifiers), **72 ERP AI automations** (signal radars, investigators, drafters, document readers and work-order automation), **Skin Cancer Detection** (seven lesion classes, 84.5% accuracy, PCA + t-SNE, from my NIT research internship), and **Smart Agriculture AI** (ResNet101V2, ~95%, Grad-CAM so every diagnosis shows its reason). Each one has a full case study: open a record below.",
    goto: 'work',
  },
  {
    id: 'practice',
    q: 'how do you build?',
    keywords: ['build', 'method', 'practice', 'process', 'approach', 'philosophy', 'work style'],
    a: "Four disciplines and one loop. The disciplines: **tool-using agents**, **LLM engineering**, **RAG pipelines**, **AI automation**. The loop: prototype fast, evaluate hard, harden, observe. The bias throughout is that **production is the only real benchmark**: a working agent beats a slide, and evals beat vibes.",
    goto: 'practice',
  },
  {
    id: 'stack',
    q: "what's the stack?",
    keywords: ['stack', 'tools', 'tech', 'technologies', 'languages', 'frameworks', 'use'],
    a: "**TypeScript** and **Node.js** for the AI layer itself. **Claude**, **Gemini**, **OpenAI** and **Ollama** behind one gateway. **LangGraph** for the tool-using agents, **MCP** for connectors. **Pinecone**, Amazon Titan embeddings and BM25 for retrieval. **PostgreSQL**, **Redis** and **BullMQ** underneath. **Python** and **TensorFlow** for the research classifiers.",
    goto: 'stack',
  },
  {
    id: 'experience',
    q: 'where have you worked?',
    keywords: ['experience', 'worked', 'jobs', 'career', 'history', 'employment', 'role', 'nit'],
    a: "Three roles, one throughline. **ASK Real Estate** (Nov 2025 to present, Manama): AI developer building the AI layer on the company's ERP. **NIT Tiruchirappalli** (Sep 2024 to Mar 2025): ML research internship on skin cancer detection from 35,000 lesion images, with PCA and t-SNE. **Trio Devs** (May to Aug 2024): first production AI features, and the lesson that a model that works isn't yet a system that survives users.",
    goto: 'experience',
  },
  {
    id: 'education',
    q: 'what did you study?',
    keywords: ['education', 'study', 'studied', 'degree', 'college', 'university', 'msc', 'bsc', 'cgpa'],
    a: "**M.Sc. Data Science**, Bishop Heber College, 2023 to 2025, CGPA **8.38/10**: deep learning, NLP, predictive modelling. Before it, **B.Sc. Computer Science**, Jamal Mohamed College, 2020 to 2023, CGPA **8.11/10**: algorithms, databases, networks. The fundamentals the agent work stands on.",
    goto: 'education',
  },
  {
    id: 'hire',
    q: 'can I hire you?',
    keywords: ['hire', 'hire you', 'hiring', 'available', 'work together', 'contact', 'email', 'reach', 'freelance', 'job', 'collab'],
    a: "I'm open to research collaboration, speaking, and agent architecture chats. Based in Manama (AST, UTC+3), remote-friendly, usually replying inside 24 hours. Mail me at **ashrafali31018@gmail.com**, or take the [contact panel](#contact) for WhatsApp, LinkedIn and GitHub.",
    goto: 'contact',
  },
  {
    id: 'layla',
    q: 'who is Layla?',
    keywords: ['layla', 'whatsapp', 'sales agent', 'chatbot', 'leads', 'booking', 'viewing'],
    a: "**Layla** is a WhatsApp AI sales agent I built, live since spring 2026. Assign it a lead and it opens with an approved WhatsApp template, qualifies the customer (purpose and budget first, then area, type and bedrooms), checks live inventory, and books a meeting with a human specialist at the time the customer names. Under it: **10 live stages**, a per-lead Redis lock, a 24-hour WhatsApp window guard, and a round-robin handoff that messages the assigned agent the client's details. The model writes the sentences; deterministic code decides what happens next. Full story in the [case study](#/case/layla).",
    goto: 'work',
  },
  {
    id: 'automations',
    q: 'what automations have you built?',
    keywords: ['automation', 'automations', 'automate', 'radar', 'radars', 'signal', 'drafter', 'investigator', 'workflow', 'erp ai', 'work order', 'document reader'],
    a: "Seventy-two AI features inside the ERP. **15 signal radars** read what staff actually write on work orders, quotations, leads, leases and inspections, and tag what needs a person; free SQL facts sit under each tag and flag the verdicts that are wrong. On-demand **investigators** explain why one record is stuck. **Drafters** write the quotation chase, PO chase, rent reminder or renewal offer and hand it to a person, and refuse when another message would not help. **Document readers** check supplier bills, staff IDs, leases and utility bills, and only ever suggest. Failed inspections raise their own work orders, dry run first. The rule throughout: the model explains and drafts, code computes and decides. Full list in the [case study](#/case/automations).",
    goto: 'work',
  },
  {
    id: 'safety',
    q: 'how do you keep AI safe?',
    keywords: ['safe', 'safety', 'guardrail', 'guardrails', 'risk', 'security', 'checkpoint', 'kill switch', 'injection', 'pii', 'approval'],
    a: "By putting the checks **before** the model gets to act. An **Action Checkpoint** gates at least 23 AI write and customer-messaging paths in off, observe or enforce mode; in enforce mode a check that errors counts as a block, and the **emergency stop fails closed**. Agent actions wait for **single-use human approvals** that are time-limited. Around that: PII masking, a fail-closed prompt-injection defence, output validation, audit logging, and security hardening of the MCP connectors. On WhatsApp, Layla hands off to a human after repeated model timeouts, a turn limit or a compliance violation.",
  },
  {
    id: 'cost',
    q: 'how do you control AI cost?',
    keywords: ['cost', 'costs', 'bill', 'billing', 'budget', 'spend', 'price', 'expensive', 'tokens', 'ledger'],
    a: "In the gateway, not after the bill arrives. Spend is capped in **Redis** with a pre-reserve / settle pattern: the budget is reserved before a call and settled against the real cost after it. Each agent has its own model policy and fallback chain. The signal classifiers run a **free SQL pre-filter** before any paid Claude call. And a cost ledger is reconciled daily against Anthropic's usage data, and corrected where the two disagree.",
  },
  {
    id: 'agents',
    q: 'what do your agents do?',
    keywords: ['agents', 'agent', 'langgraph', 'react loop', 'tools', 'drafter', 'drafters', 'classifiers'],
    a: "**9 tool-using agents** on a LangGraph ReAct loop: HR, approvals, receivables and facility-management investigators, plus rent, quotation and purchase-order chase drafters. Daily goal agents run alongside them. When an agent wants to change something, a person approves it, and each approval is **single-use** and time-limited. Then there's **Layla** on WhatsApp, and **14 active LLM signal classifiers** across facility management, procurement, billing, inspections and contacts. Tap a node in the mesh for any of them.",
  },
  {
    id: 'erp',
    q: 'did you build the ERP?',
    keywords: ['erp', 'did you build', 'build the erp', 'built the erp', 'ownership', 'scope', 'team'],
    a: "No, and I'm careful to say so. ASK Real Estate's ERP (CRM, marketing, facility and property management, HRMS, finance, procurement) was built by a team before I joined in **November 2025**. What I built is the **AI layer** on top of it: the gateway, the guardrails, Layla, the agents, the signal classifiers and the valuation pipeline. Part of the job was also subtraction: a usage audit, and retiring the AI features nobody used.",
  },
  {
    id: 'research',
    q: 'tell me about your research',
    keywords: ['research', 'skin', 'lesion', 'cancer', 'cotton', 'disease', 'grad-cam', 'pca', 't-sne', 'deep learning'],
    a: "Two research classifiers. At **NIT Tiruchirappalli** (Sep 2024 to Mar 2025) I worked on skin cancer detection from **35,000 skin lesion images**: seven classes, **84.5%** accuracy, with PCA (95% of variance retained) and t-SNE to see what the features were learning. Separately, a **cotton leaf disease** classifier on ResNet101V2 transfer learning at **~95%**, with Grad-CAM so each diagnosis shows where it looked. Both have [case studies](#work).",
    goto: 'work',
  },
  {
    id: 'certs',
    q: 'any certifications?',
    keywords: ['cert', 'certification', 'certifications', 'certified', 'certificate', 'course', 'databricks', 'azure', 'fluency'],
    a: "Three: **Databricks Accredited AI Agent Fundamentals** (2026), **Anthropic AI Fluency: Framework & Foundations** (2026), and **Microsoft Azure Fundamentals** (2024).",
    goto: 'education',
  },
  {
    id: 'retired',
    q: 'what did you retire?',
    keywords: ['retire', 'retired', 'removed', 'unused', 'usage audit', 'deleted', 'autopilot', 'executor', 'subtraction'],
    a: "A usage audit of the AI platform showed features, workers and feature flags that weren't being used, so I retired them: a CRM orchestration layer and a goal-oriented lead-conversion agent were removed, and the CRM and property-management autopilots were decommissioned. None of them run today. AI that nobody uses still costs money and attention, and still adds risk.",
  },
  {
    id: 'location',
    q: 'where are you based?',
    keywords: ['based', 'location', 'located', 'timezone', 'time zone', 'bahrain', 'manama', 'remote', 'country', 'city'],
    a: "**Manama, Bahrain** (AST, UTC+3). Remote-friendly, and I usually reply inside 24 hours. Mail **ashrafali31018@gmail.com** or use the [contact panel](#contact).",
    goto: 'contact',
  },
  {
    id: 'meta',
    q: 'is this a real LLM?',
    keywords: ['llm', 'real', 'ai', 'gpt', 'claude', 'model', 'fake', 'this site', 'how does this work', 'prompt'],
    a: "No, and deliberately. Every answer here is **hand-written and shipped in the bundle**: no model, no API key, no network call, nothing to jailbreak or run up a bill. A portfolio claiming to be an agent while calling someone else's model would be the wrong credential. The [real](#work) AI work is the layer I build at ASKRE. This is just its interface, borrowed.",
  },
]

/* Ranked keyword match. Deliberately simple and readable; it runs on a
   small hand-written script, not a corpus, so anything cleverer would be theatre. */
export function resolve(input) {
  const q = input.toLowerCase().trim()
  if (!q) return null

  let best = null
  let bestScore = 0

  for (const intent of INTENTS) {
    let score = 0
    if (q === intent.q.toLowerCase()) score += 100
    for (const kw of intent.keywords) {
      // whole words only: a bare substring test let 'hi' match inside 'hire'
      const re = new RegExp(`(^|[^a-z])${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-z])`)
      if (re.test(q)) score += kw.length > 4 ? 3 : 2
    }
    if (score > bestScore) { bestScore = score; best = intent }
  }

  return bestScore >= 2 ? best : null
}

export const FALLBACK = {
  id: 'fallback',
  a: "That one isn't in the script. This agent answers from a fixed set, not a model. Try [the work](#work), what's in [production](#practice), how I [build](#practice), or whether I'm [available](#contact). Everything below is browsable the normal way too.",
}

/* What the ⌘K palette and the hero chips offer. */
export const SUGGESTED = ['who', 'production', 'layla', 'work', 'safety', 'cost', 'practice', 'hire']


/* ==========================================================================
   THE 7 PROJECTS
   The verified pieces of the AI layer at ASKRE, around the gateway hub.
   AgentGraph renders `code` as the node labels, so this array is the single
   source of truth for the mesh and the answers both.
   ========================================================================== */
export const DOMAINS = [
  {
    code: 'GATE', label: 'LLM gateway',
    q: "what's the LLM gateway?",
    a: "Claude, Gemini, OpenAI and Ollama behind **one gateway**, called through their native SDKs. Each agent gets its own **model policy** and **fallback chain**; spend is capped in Redis with a pre-reserve / settle pattern. A cost ledger is reconciled daily against Anthropic's usage data, and corrected where the two disagree.",
  },
  {
    code: 'GUARD', label: 'Guardrails',
    q: 'what are the guardrails?',
    a: "An **Action Checkpoint** gates at least 23 AI write and customer-messaging paths, each in off, observe or enforce mode. Five isolated checks run on every action (emergency stop, path kill switch, tenant scope, duplicate, content; the scope check is recorded only, since the deployment holds a single company), and in enforce mode a check that errors counts as a block: **it fails closed**. Diagrams in the [case study](#/case/askre). Around it: PII masking, a fail-closed prompt-injection defence, output validation, audit logging, and security hardening of the MCP connectors.",
  },
  {
    code: 'LAYLA', label: 'Layla',
    q: 'who is Layla?',
    a: "**Layla** is a WhatsApp AI sales agent, live since spring 2026: a staged conversation with 10 live stages, from greeting and qualifying to booking and handoff. It searches live listings via SQL, books a meeting with a specialist at the time the customer names, and writes activities, lead updates, stage changes and conversions to the CRM. If the model is unavailable it falls back to deterministic replies; after repeated model timeouts, a turn limit or a compliance violation, it hands off to a human. A failed booking never tells the customer \"confirmed\". More in the [case study](#/case/layla).",
  },
  {
    code: 'AGENTS', label: 'Tool-using agents',
    q: 'what do the agents do?',
    a: "**9 tool-using agents** on a LangGraph ReAct loop: HR, approvals, receivables and facility-management investigators, plus rent, quotation and purchase-order chase drafters. Daily goal agents run alongside them. Every change waits for a **single-use human approval** that is time-limited.",
  },
  {
    code: 'SIGNALS', label: 'Signal classifiers',
    q: 'what are the signal classifiers?',
    a: "**14 active LLM signal classifiers** across facility management, procurement, billing, inspections and contacts. Each runs a **free SQL pre-filter** first, and only what passes goes to a paid Claude call. An evaluation harness checks them, and a cross-domain **Work Queue** collects what they find.",
  },
  {
    code: 'VAL', label: 'Valuation',
    q: 'how does valuation work?',
    a: "The valuation pipeline reads documents through an **OCR cascade**: PDF text, then Tesseract in English and Arabic, then Claude Vision. Extraction is schema-validated. Comparable properties are filtered in SQL, then re-ranked by embedding similarity. Retrieval elsewhere uses a shared RAG core: Pinecone, Amazon Titan embeddings and BM25 re-ranking.",
  },
  {
    code: 'AUDIT', label: 'Usage audit',
    q: 'what did the usage audit retire?',
    a: "A usage audit of the AI platform, then **subtraction**: features, workers and feature flags that weren't being used were retired. A CRM orchestration layer and a goal-oriented lead-conversion agent were removed, and the CRM and property-management autopilots were decommissioned. None of them run today.",
  },
]

export function findDomain(code) {
  return DOMAINS.find((d) => d.code === code) || null
}

/* BASE_URL, not "/": the site is served from a project subpath on GitHub Pages. */
export const CV_URL = `${import.meta.env.BASE_URL}Ashrafali-M-CV.pdf`

export const SECTIONS = [
  { id: 'work', label: 'Work', hint: '5 records' },
  { id: 'practice', label: 'Practice & method', hint: '4 disciplines' },
  { id: 'experience', label: 'Experience', hint: '3 roles' },
  { id: 'stack', label: 'Stack', hint: 'tools' },
  { id: 'education', label: 'Education', hint: '2 degrees' },
  { id: 'contact', label: 'Contact', hint: 'available' },
]

export const CASES = [
  { hash: '#/case/layla', label: 'Layla · AI Sales Agent', hint: 'case study' },
  { hash: '#/case/askre', label: 'Enterprise AI Platform · CRM Integration', hint: 'case study' },
  { hash: '#/case/automations', label: 'ERP AI Automations', hint: 'case study' },
  { hash: '#/case/skin-lesion', label: 'Skin Cancer Detection', hint: 'case study' },
  { hash: '#/case/cotton-disease', label: 'Smart Agriculture AI', hint: 'case study' },
]
