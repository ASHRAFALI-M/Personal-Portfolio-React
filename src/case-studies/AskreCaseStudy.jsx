import CaseStudyLayout from './CaseStudyLayout.jsx'
import ConfidentialityNotice from './ConfidentialityNotice.jsx'

/* The checkpoint snippet keeps its braces/backticks verbatim via innerHTML,
   rewriting it as JSX text would force escaping every { } ` ${ }.
   Illustrative TypeScript written for this page: generic names only, no
   internal paths, keys, flags or production values. */
const CHECKPOINT_SNIPPET = `<span class="c">// Illustrative TypeScript, written for this page. Not production code.</span>
<span class="c">// Every gated AI write or customer message passes through one function.</span>

<span class="k">type</span> Mode = <span class="s">'off'</span> | <span class="s">'observe'</span> | <span class="s">'enforce'</span>;
<span class="k">type</span> Decision = <span class="s">'allow'</span> | <span class="s">'would_block'</span> | <span class="s">'block'</span>;

<span class="k">interface</span> Check {
  name: string;
  fails(action: GatedAction): Promise&lt;boolean&gt;;
}

<span class="k">async function</span> checkpoint(action: GatedAction, checks: Check[]): Promise&lt;Decision&gt; {
  <span class="k">const</span> mode: Mode = <span class="k">await</span> modeFor(action.family);
  <span class="k">if</span> (mode === <span class="s">'off'</span>) <span class="k">return</span> <span class="s">'allow'</span>;

  <span class="k">const</span> violations: string[] = [];
  <span class="k">for</span> (<span class="k">const</span> check <span class="k">of</span> checks) {
    <span class="k">try</span> {
      <span class="k">if</span> (<span class="k">await</span> check.fails(action)) violations.push(check.name);
    } <span class="k">catch</span> {
      violations.push(<span class="s">\`check_error:\${check.name}\`</span>);   <span class="c">// "could not tell" is a no</span>
    }
  }

  <span class="k">const</span> decision: Decision =
    violations.length === <span class="n">0</span> ? <span class="s">'allow'</span>
    : mode === <span class="s">'observe'</span>    ? <span class="s">'would_block'</span>            <span class="c">// recorded, still runs</span>
    :                         <span class="s">'block'</span>;                 <span class="c">// enforce: final</span>

  <span class="k">await</span> audit.record({ action, mode, violations, decision });
  <span class="k">return</span> decision;
}`

export default function AskreCaseStudy() {
  return (
    <CaseStudyLayout
      title="Enterprise AI Platform · Case Study · Ashrafali M."
      wrapClass="cs-askre sig-graph"
      backHash="#work-askre"
      brandLink
    >
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-graph" aria-hidden="true">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <g>
                <line x1="110" y1="92" x2="42" y2="40"/>
                <line x1="110" y1="92" x2="172" y2="52"/>
                <line x1="110" y1="92" x2="52" y2="152"/>
                <line x1="110" y1="92" x2="160" y2="150"/>
                <line x1="110" y1="92" x2="120" y2="20"/>
                <line x1="42" y1="40" x2="120" y2="20"/>
                <line x1="172" y1="52" x2="160" y2="150"/>
                <line x1="42" y1="40" x2="52" y2="152"/>
              </g>
              <circle className="hub" cx="110" cy="92" r="5.5"/>
              <circle cx="42" cy="40" r="3.5"/>
              <circle cx="172" cy="52" r="3.5"/>
              <circle cx="52" cy="152" r="3.5"/>
              <circle cx="160" cy="150" r="3.5"/>
              <circle cx="120" cy="20" r="3.5"/>
            </svg>
          </div>

          <div className="eyebrow">Case study · № 02</div>
          <h1 className="h1">Building the <span className="accent">AI layer</span><br/>on a live enterprise<br/>real-estate ERP.</h1>
          <p className="deck">How I built the AI layer on ASK Real Estate's existing ERP: <span className="em">a multi-provider LLM gateway, guardrails on at least 23 AI write and messaging paths, a live WhatsApp sales agent</span>, tool-using agents, and LLM signal classifiers, without destabilising the operational system underneath. The ERP itself was built by the wider engineering team; my part was the AI layer.</p>

          <div className="meta">
            <div className="meta-item"><span className="meta-label">Case study</span><span className="meta-val">№ 02</span></div>
            <div className="meta-item"><span className="meta-label">Domain</span><span className="meta-val">Real Estate ERP · Applied AI</span></div>
            <div className="meta-item"><span className="meta-label">Role</span><span className="meta-val">AI Developer · AI layer design &amp; implementation</span></div>
            <div className="meta-item"><span className="meta-label">Status</span><span className="meta-val live">In production</span></div>
          </div>

          <div className="stats">
            <div className="stat"><div className="stat-num">4<span className="em">×</span></div><div className="stat-label">LLM providers behind one gateway</div></div>
            <div className="stat"><div className="stat-num">23</div><div className="stat-label">AI write &amp; messaging paths gated</div></div>
            <div className="stat"><div className="stat-num">9</div><div className="stat-label">Tool-using agents with human approvals</div></div>
            <div className="stat"><div className="stat-num">14</div><div className="stat-label">LLM signal classifiers</div></div>
          </div>
        </div>
      </section>
      <ConfidentialityNotice />

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 01 · Context</div>
          <h2 className="section-title reveal">The system I walked into, <span className="accent">and what I was asked to do inside it.</span></h2>
          <div className="prose reveal">
            <p className="lede">ASK Real Estate runs on an <span className="accent">enterprise ERP</span>: CRM, marketing, facility and property management, HRMS, finance, procurement. Everything a property company touches, in one system.</p>
            <p>I joined in <strong>November 2025</strong> as an AI Developer. By then the ERP was already a mature system with live users and real money moving through it, built by a team before I arrived. Real users. Real consequences if something broke.</p>
            <p>My mandate was straightforward to state and difficult to execute: <strong>build an AI layer that operates inside this ERP</strong>, not bolted on as a separate service but woven through it, <strong>without destabilising the operational system underneath</strong>.</p>
            <p>The easy move would have been to drop a chatbot in front of the data and call it AI. The ERP didn't need someone to <em>answer questions</em>. It needed something to <em>do work</em>: qualify leads on WhatsApp, flag facility, procurement, and billing records that need attention, extract data from valuation documents, and draft chase messages for a person to approve. That requires more than retrieval and a prompt.</p>
          </div>
          <div className="quote reveal">A chatbot answers. An operations platform <span className="em">acts</span>. The difference is where most AI integrations quietly fail.</div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 02 · Scope &amp; ownership</div>
          <h2 className="section-title reveal">What I built, <span className="accent">honestly.</span></h2>
          <div className="prose reveal">
            <p>The ERP itself is the work of a team. Other engineers built and continue to build the business modules, integrations, and operational backend that ASKRE runs on. I did not build the ERP. The <strong>AI layer</strong> on top of it, the gateway, guardrails, agents, classifiers, and pipelines described here, was mine to design and implement.</p>
            <p>Part of the job was also subtraction. A usage audit of the AI platform showed features, workers, and feature flags that weren't being used, and I retired them. What's described below is what remains and runs.</p>
          </div>

          <div className="panel reveal">
            <div className="panel-label">What I built · primary &amp; direct</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">Gateway</div><div className="pi-val">Multi-provider LLM gateway over <span className="accent">Claude, Gemini, OpenAI, Ollama</span> (native SDKs). Per-agent model policy, fallback chains, Redis cost caps, response caching, a cost ledger reconciled daily.</div></div>
              <div className="panel-item"><div className="pi-label">Guardrails</div><div className="pi-val">Action Checkpoint on at least 23 AI write and messaging paths. PII masking, fail-closed prompt-injection defence, output validation, audit logging, hardened MCP connectors.</div></div>
              <div className="panel-item"><div className="pi-label">Conversational</div><div className="pi-val">Layla, a WhatsApp AI sales agent live since spring 2026, plus a separate website chatbot.</div></div>
              <div className="panel-item"><div className="pi-label">Agents</div><div className="pi-val">9 tool-using agents on a LangGraph ReAct loop, plus daily goal agents, with <span className="accent">single-use human approvals</span> that expire.</div></div>
              <div className="panel-item"><div className="pi-label">Signals</div><div className="pi-val">14 active LLM signal classifiers, each behind a free SQL pre-filter. An evaluation harness and a cross-domain Work Queue.</div></div>
              <div className="panel-item"><div className="pi-label">Valuation &amp; retrieval</div><div className="pi-val">OCR cascade and schema-validated extraction for valuations. A shared RAG core on Pinecone, Amazon Titan embeddings, and BM25 re-ranking.</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="arch">
        <div className="arch-inner">
          <div className="chap">// 03 · Architecture</div>
          <h2 className="section-title reveal">The shape of the <span className="accent">AI layer.</span></h2>

          <div className="prose reveal">
            <p>The AI layer calls models through one gateway. Agents don't own a provider SDK. They declare what they need and the gateway resolves the rest: which model, under which per-agent policy, with which fallback chain, within which cost cap.</p>
            <p>That single design choice is what makes everything else manageable. Change a model for one agent? One policy. Add a provider? One adapter. Cap spend? One layer, with budgets reserved in Redis before a call and settled after it.</p>
          </div>

          <div className="arch-diagram">
            <svg viewBox="0 0 1100 540" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(34, 211, 238, 0.9)"/>
                </marker>
                <marker id="arr-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(244, 238, 229, 0.4)"/>
                </marker>
              </defs>

              <g fontFamily="ui-monospace, Menlo, monospace" fontSize="11">
                <rect x="40" y="30" width="180" height="48" rx="4" fill="rgba(34, 211, 238, 0.12)" stroke="rgba(34, 211, 238, 0.6)"/>
                <text x="130" y="50" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Inbound</text>
                <text x="130" y="66" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">WhatsApp · web chat · ERP</text>

                <rect x="450" y="30" width="220" height="48" rx="4" fill="rgba(34, 211, 238, 0.2)" stroke="rgba(34, 211, 238, 0.9)" strokeWidth="1.5"/>
                <text x="560" y="50" textAnchor="middle" fill="#f4f1ec" fontWeight="500">AI layer</text>
                <text x="560" y="66" textAnchor="middle" fill="rgba(244, 238, 229, 0.6)" fontSize="9">writes pass the Action Checkpoint</text>

                <rect x="900" y="30" width="160" height="48" rx="4" fill="rgba(244, 238, 229, 0.06)" stroke="rgba(244, 238, 229, 0.3)" strokeDasharray="3 3"/>
                <text x="980" y="50" textAnchor="middle" fill="#f4f1ec">ERP · team-built</text>
                <text x="980" y="66" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">CRM · FM · HRMS · finance</text>

                <text x="40" y="135" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">AI WORKLOADS · AGENTS, CLASSIFIERS, PIPELINES</text>
                <rect x="40" y="150" width="170" height="60" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="125" y="172" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Website chatbot</text>
                <text x="125" y="187" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">separate from Layla</text>
                <text x="125" y="200" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">website channel</text>

                <rect x="230" y="150" width="170" height="60" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="315" y="172" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Tool-using agents</text>
                <text x="315" y="187" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">9 agents · LangGraph ReAct</text>
                <text x="315" y="200" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">single-use approvals</text>

                <rect x="420" y="150" width="170" height="60" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="505" y="172" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Signal classifiers</text>
                <text x="505" y="187" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">14 · free SQL pre-filter</text>
                <text x="505" y="200" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">then a paid Claude call</text>

                <rect x="610" y="150" width="170" height="60" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="695" y="172" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Valuation</text>
                <text x="695" y="187" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">OCR cascade · extraction</text>
                <text x="695" y="200" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">comparables re-ranked</text>

                <rect x="800" y="150" width="170" height="60" rx="4" fill="rgba(34, 211, 238, 0.1)" stroke="rgba(34, 211, 238, 0.5)"/>
                <text x="885" y="172" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Layla</text>
                <text x="885" y="187" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">WhatsApp sales agent</text>
                <text x="885" y="200" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">10 stages · live</text>

                <text x="40" y="265" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">FOUNDATION · MULTI-PROVIDER LLM GATEWAY</text>
                <rect x="40" y="285" width="930" height="68" rx="4" fill="rgba(34, 211, 238, 0.08)" stroke="rgba(34, 211, 238, 0.6)"/>
                <text x="505" y="310" textAnchor="middle" fill="#f4f1ec" fontWeight="500" fontSize="12">Per-agent model policy · fallback chains · response caching</text>
                <text x="505" y="328" textAnchor="middle" fill="rgba(244, 238, 229, 0.7)" fontSize="10">Anthropic Claude · Google Gemini · OpenAI · Ollama (native SDKs)</text>
                <text x="505" y="343" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">Redis pre-reserve / settle cost caps · cost ledger reconciled daily</text>

                <text x="40" y="395" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">SUPPORTING SYSTEMS</text>

                <rect x="40" y="415" width="220" height="60" rx="4" fill="rgba(244, 238, 229, 0.05)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="150" y="437" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Retrieval</text>
                <text x="150" y="452" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">Pinecone · Titan embeddings</text>
                <text x="150" y="465" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">BM25 re-ranking</text>

                <rect x="290" y="415" width="220" height="60" rx="4" fill="rgba(34, 211, 238, 0.15)" stroke="rgba(34, 211, 238, 0.7)"/>
                <text x="400" y="437" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Guardrails</text>
                <text x="400" y="452" textAnchor="middle" fill="rgba(244, 238, 229, 0.6)" fontSize="9">Action Checkpoint · at least 23 paths</text>
                <text x="400" y="465" textAnchor="middle" fill="rgba(244, 238, 229, 0.6)" fontSize="9">off · observe · enforce</text>

                <rect x="540" y="415" width="220" height="60" rx="4" fill="rgba(244, 238, 229, 0.05)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="650" y="437" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Safety</text>
                <text x="650" y="452" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">PII masking · injection defence</text>
                <text x="650" y="465" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">output validation · audit log</text>

                <rect x="790" y="415" width="180" height="60" rx="4" fill="rgba(244, 238, 229, 0.05)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="880" y="437" textAnchor="middle" fill="#f4f1ec" fontWeight="500">MCP connectors</text>
                <text x="880" y="452" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">staff access to ERP data</text>
                <text x="880" y="465" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">OAuth hardening</text>
              </g>

              <g stroke="rgba(34, 211, 238, 0.7)" strokeWidth="1.2" fill="none">
                <path d="M220 54 L445 54" markerEnd="url(#arr)"/>
                <path d="M670 54 L895 54" markerEnd="url(#arr)" strokeDasharray="3 3"/>
              </g>
              <g stroke="rgba(244, 238, 229, 0.35)" strokeWidth="1" fill="none">
                <path d="M520 78 Q330 110 130 145" markerEnd="url(#arr-s)"/>
                <path d="M540 78 Q420 110 320 145" markerEnd="url(#arr-s)"/>
                <path d="M560 78 L520 145" markerEnd="url(#arr-s)"/>
                <path d="M580 78 Q650 110 695 145" markerEnd="url(#arr-s)"/>
                <path d="M600 78 Q740 110 880 145" markerEnd="url(#arr-s)"/>
              </g>
              <g stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" fill="none" strokeDasharray="3 3">
                <path d="M125 210 L155 285" markerEnd="url(#arr)"/>
                <path d="M315 210 L350 285" markerEnd="url(#arr)"/>
                <path d="M505 210 L505 285" markerEnd="url(#arr)"/>
                <path d="M695 210 L650 285" markerEnd="url(#arr)"/>
                <path d="M885 210 L855 285" markerEnd="url(#arr)"/>
              </g>
              <g stroke="rgba(244, 238, 229, 0.25)" strokeWidth="0.8" fill="none" strokeDasharray="2 3">
                <path d="M280 355 L150 412"/>
                <path d="M420 355 L400 412"/>
                <path d="M560 355 L650 412"/>
                <path d="M720 355 L880 412"/>
              </g>
            </svg>
          </div>

          <div className="arch-legend">
            <span><i style={{ background: '#22D3EE' }}></i>Request path</span>
            <span><i style={{ background: 'rgba(244, 238, 229, 0.35)' }}></i>Dispatch to workloads</span>
            <span><i style={{ background: 'rgba(34, 211, 238, 0.5)', border: '1px dashed rgba(34, 211, 238, 0.6)' }}></i>Gateway call</span>
          </div>
          <p className="diagram-note">Recreated conceptual diagram for this page. Component names are generic; this is not the internal service map.</p>

          <div className="prose" style={{ marginTop: '3rem' }}>
            <p>Seven pieces of work, each built on the same gateway and guardrails rather than as a separate system.</p>
          </div>

          <div className="domains">
            <div className="domain"><div className="domain-name">Gateway</div><div className="domain-count">4 providers · cost caps</div></div>
            <div className="domain"><div className="domain-name">Guardrails</div><div className="domain-count">at least 23 paths</div></div>
            <div className="domain"><div className="domain-name">Layla</div><div className="domain-count">WhatsApp · live</div></div>
            <div className="domain"><div className="domain-name">Agents</div><div className="domain-count">9 tool-using + goals</div></div>
            <div className="domain"><div className="domain-name">Signals</div><div className="domain-count">14 classifiers</div></div>
            <div className="domain"><div className="domain-name">Valuation</div><div className="domain-count">OCR · comparables</div></div>
            <div className="domain"><div className="domain-name">Usage audit</div><div className="domain-count">unused AI retired</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 04 · Decisions</div>
          <h2 className="section-title reveal">Choices that <span className="accent">shaped the AI layer.</span></h2>

          <div className="prose reveal">
            <p className="lede">Architecture isn't drawn before the work. It emerges <span className="accent">during</span> the work, as production teaches you what your design actually needs to be.</p>
          </div>

          <div className="decision reveal">
            <div className="decision-label">Decision · Gateway</div>
            <div className="decision-title">One way to call an LLM.</div>
            <div className="decision-body">No agent owns a provider SDK. Claude, Gemini, OpenAI, and Ollama sit behind one gateway, called through their native SDKs. Each agent has its own model policy and fallback chain. Spend is capped in Redis with a pre-reserve / settle pattern: the budget is reserved before a call and settled against the real cost after it. Responses are cached on a hash of the normalised request.</div>
          </div>

          <div className="decision reveal">
            <div className="decision-label">Decision · Agents</div>
            <div className="decision-title">Tool-using agents, with a human between the agent and the write.</div>
            <div className="decision-body">Nine agents run on a LangGraph ReAct loop: HR, approvals, receivables, and facility management investigators, plus rent, quotation, and purchase-order chase drafters. Daily goal agents run alongside them. When an agent wants to change something, a person approves it, and each approval is <em>single-use</em> and time-limited, so an old yes can't be replayed later.</div>
          </div>

          <div className="decision reveal">
            <div className="decision-label">Decision · Signals</div>
            <div className="decision-title">A free SQL check before a paid model call.</div>
            <div className="decision-body">Fourteen active LLM signal classifiers cover facility management, procurement, billing, inspections, and contacts. Each one runs a SQL pre-filter first, which costs nothing, and only the records that pass go to a paid Claude call. An evaluation harness checks the classifiers, and a cross-domain Work Queue gathers what they find in one place. The full list of radars, investigators, drafters and automations is in <a href="#/case/automations">its own case study</a>.</div>
          </div>

          <div className="decision reveal">
            <div className="decision-label">Decision · Retrieval</div>
            <div className="decision-title">SQL first, similarity second.</div>
            <div className="decision-body">The valuation pipeline reads documents through an OCR cascade: PDF text first, then Tesseract in English and Arabic, then Claude Vision only when the cheaper steps fail. Extraction is schema-validated. Comparable properties are filtered in SQL, then re-ranked by embedding similarity. Retrieval elsewhere runs on a shared RAG core: Pinecone, Amazon Titan embeddings, and BM25 re-ranking.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 05 · Layla</div>
          <h2 className="section-title reveal">A sales agent <span className="accent">customers actually talk to.</span></h2>

          <div className="prose reveal">
            <p className="lede">Layla is a WhatsApp AI sales agent, <span className="accent">live since spring 2026</span>. It talks to real customers, which means every failure mode is a customer staring at their phone.</p>
            <p>A lead assigned to Layla gets a WhatsApp message, a short qualification, a check against live inventory, and a meeting with a human specialist at the time the customer names. The conversation runs on <strong>10 live stages</strong>, and every outcome is written back to the CRM: the transcript, stage changes, the booking, and the conversion to a contact with an assigned agent, picked round-robin.</p>
            <p>Layla has <a href="#/case/layla">its own case study</a>, covering the stage machine, the WhatsApp and CRM integration, concurrency, and handoff in detail.</p>
            <p>I also built the separate website chatbot. It is its own engine, not Layla on a different channel.</p>
          </div>

          <div className="panel reveal">
            <div className="panel-label">Reliability · what happens when things go wrong</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">Model unavailable</div><div className="pi-val">Deterministic fallbacks keep the conversation moving.</div></div>
              <div className="panel-item"><div className="pi-label">Forced handoff</div><div className="pi-val">To a human after repeated model timeouts, a turn limit, or a compliance violation.</div></div>
              <div className="panel-item"><div className="pi-label">Concurrency</div><div className="pi-val">Per-lead Redis locks, cross-replica message dedup, and burst messages wait for the current reply.</div></div>
              <div className="panel-item"><div className="pi-label">Truthfulness</div><div className="pi-val">Hallucination and grounding checks. A failed booking <span className="accent">never</span> tells the customer "confirmed".</div></div>
              <div className="panel-item"><div className="pi-label">Sending</div><div className="pi-val">Duplicate-send protection and a 24-hour WhatsApp window guard.</div></div>
              <div className="panel-item"><div className="pi-label">Record</div><div className="pi-val">Conversation transcripts are logged.</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 06 · The hard part</div>
          <h2 className="section-title reveal">When the ledger <span className="accent">and the bill disagree.</span></h2>

          <div className="prose reveal">
            <p className="lede">Cost caps are only as good as the numbers they're built on. So the gateway keeps an <span className="accent">AI cost ledger</span>, and I reconcile it daily against Anthropic's own usage data.</p>
            <p>When two sources of truth disagree, one of them is wrong, and reconciliation is how you find out which before the number reaches a budget or a report. Building the ledger meant getting three costing rules right:</p>
            <p><strong>Cached prompts are priced differently.</strong> Cache reads and writes are billed at their own rates, not as ordinary input tokens.</p>
            <p><strong>A budget is charged exactly once.</strong> The reservation taken before a call and the settlement after it must net to a single charge.</p>
            <p><strong>Images are costed by the provider's rules.</strong> Vision input is priced from the provider's own formula, not estimated.</p>
          </div>

          <div className="quote reveal">If you can't reconcile your AI costs against the provider's numbers, <span className="em">you don't know your AI costs</span>. You know an estimate.</div>
        </div>
      </section>

      <section className="arch">
        <div className="arch-inner">
          <div className="chap">// 07 · Action Checkpoint</div>
          <h2 className="section-title reveal">One gate for every <span className="accent">AI write and send.</span></h2>

          <div className="prose reveal">
            <p>An audit of the AI layer mapped every place an AI write or customer message reaches the database, WhatsApp or email: <strong>at least 23 separate paths</strong>.</p>
            <p>Every one of those paths now calls the same checkpoint before it acts. The paths are grouped into eight families, each with its own on/off switch and its own enforcement setting. One of the five checks, tenant scope, is written for multi-company data. This deployment holds a single company, so today that check is recorded, not relied on as an isolation boundary.</p>
          </div>

          <div className="arch-diagram">
            <svg viewBox="0 0 1100 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cp-arch-title">
              <title id="cp-arch-title">Eight path families flow into the Action Checkpoint, which resolves a mode, runs five isolated checks, and returns allow, would block, or block. Every decision is written to an audit log.</title>
              <defs>
                <marker id="cp-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(34, 211, 238, 0.9)"/>
                </marker>
                <marker id="cp-arr-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(244, 238, 229, 0.45)"/>
                </marker>
              </defs>

              <g fontFamily="ui-monospace, Menlo, monospace" fontSize="11">
                <text x="30" y="40" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">8 FAMILIES · AT LEAST 23 WRITE &amp; SEND PATHS</text>

                <rect x="30" y="60" width="250" height="44" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="44" y="78" fill="#f4f1ec" fontWeight="500">Assistant tool writes</text>
                <text x="44" y="94" fill="rgba(244, 238, 229, 0.5)" fontSize="9">updates requested in chat</text>

                <rect x="30" y="114" width="250" height="44" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="44" y="132" fill="#f4f1ec" fontWeight="500">Approved drafts</text>
                <text x="44" y="148" fill="rgba(244, 238, 229, 0.5)" fontSize="9">messages released after sign-off</text>

                <rect x="30" y="168" width="250" height="44" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="44" y="186" fill="#f4f1ec" fontWeight="500">Record automation</text>
                <text x="44" y="202" fill="rgba(244, 238, 229, 0.5)" fontSize="9">work raised from inspection data</text>

                <rect x="30" y="222" width="250" height="44" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="44" y="240" fill="#f4f1ec" fontWeight="500">Status emails</text>
                <text x="44" y="256" fill="rgba(244, 238, 229, 0.5)" fontSize="9">notifications to external parties</text>

                <rect x="30" y="276" width="250" height="44" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="44" y="294" fill="#f4f1ec" fontWeight="500">Auto-replies</text>
                <text x="44" y="310" fill="rgba(244, 238, 229, 0.5)" fontSize="9">factual replies sent automatically</text>

                <rect x="30" y="330" width="250" height="44" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="44" y="348" fill="#f4f1ec" fontWeight="500">Action executor</text>
                <text x="44" y="364" fill="rgba(244, 238, 229, 0.5)" fontSize="9">has its own approval gate</text>

                <rect x="30" y="384" width="250" height="44" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="44" y="402" fill="#f4f1ec" fontWeight="500">Inbound chat replies</text>
                <text x="44" y="418" fill="rgba(244, 238, 229, 0.5)" fontSize="9">live conversation</text>

                <rect x="30" y="438" width="250" height="44" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="44" y="456" fill="#f4f1ec" fontWeight="500">Sales agent replies</text>
                <text x="44" y="472" fill="rgba(244, 238, 229, 0.5)" fontSize="9">live conversation</text>

                <rect x="360" y="60" width="380" height="422" rx="6" fill="rgba(34, 211, 238, 0.07)" stroke="rgba(34, 211, 238, 0.85)" strokeWidth="1.5"/>
                <text x="550" y="88" textAnchor="middle" fill="#f4f1ec" fontWeight="600" fontSize="13" letterSpacing="1">ACTION CHECKPOINT</text>
                <text x="550" y="106" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">one module · called before every gated write or send</text>

                <text x="380" y="136" fill="rgba(34, 211, 238, 0.8)" fontSize="9" letterSpacing="2">1 · RESOLVE MODE</text>
                <rect x="380" y="146" width="104" height="26" rx="13" fill="none" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="432" y="163" textAnchor="middle" fill="rgba(244, 238, 229, 0.6)">off</text>
                <rect x="496" y="146" width="104" height="26" rx="13" fill="rgba(255, 184, 77, 0.1)" stroke="rgba(255, 184, 77, 0.7)"/>
                <text x="548" y="163" textAnchor="middle" fill="#FFB84D">observe</text>
                <rect x="612" y="146" width="108" height="26" rx="13" fill="rgba(255, 92, 122, 0.1)" stroke="rgba(255, 92, 122, 0.7)"/>
                <text x="666" y="163" textAnchor="middle" fill="#FF5C7A">enforce</text>
                <text x="550" y="190" textAnchor="middle" fill="rgba(244, 238, 229, 0.45)" fontSize="9">each family is rolled out observe → enforce</text>

                <text x="380" y="216" fill="rgba(34, 211, 238, 0.8)" fontSize="9" letterSpacing="2">2 · FIVE CHECKS, EACH ISOLATED</text>
                <rect x="380" y="226" width="340" height="32" rx="3" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.18)"/>
                <text x="392" y="246" fill="#f4f1ec">Emergency stop</text>
                <text x="708" y="246" textAnchor="end" fill="rgba(244, 238, 229, 0.5)" fontSize="9">sends · unreadable = stopped</text>
                <rect x="380" y="264" width="340" height="32" rx="3" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.18)"/>
                <text x="392" y="284" fill="#f4f1ec">Path kill switch</text>
                <text x="708" y="284" textAnchor="end" fill="rgba(244, 238, 229, 0.5)" fontSize="9">the path's own on/off switch</text>
                <rect x="380" y="302" width="340" height="32" rx="3" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.18)"/>
                <text x="392" y="322" fill="#f4f1ec">Scope</text>
                <text x="708" y="322" textAnchor="end" fill="rgba(244, 238, 229, 0.5)" fontSize="9">recorded only · single-company data today</text>
                <rect x="380" y="340" width="340" height="32" rx="3" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.18)"/>
                <text x="392" y="360" fill="#f4f1ec">Duplicate</text>
                <text x="708" y="360" textAnchor="end" fill="rgba(244, 238, 229, 0.5)" fontSize="9">has this already run to completion?</text>
                <rect x="380" y="378" width="340" height="32" rx="3" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.18)"/>
                <text x="392" y="398" fill="#f4f1ec">Content</text>
                <text x="708" y="398" textAnchor="end" fill="rgba(244, 238, 229, 0.5)" fontSize="9">validator + real-estate rules</text>

                <text x="550" y="436" textAnchor="middle" fill="#22D3EE" fontSize="10">a check that errors counts as a violation</text>
                <text x="550" y="458" textAnchor="middle" fill="rgba(244, 238, 229, 0.45)" fontSize="9">risk level recorded on every action, never guessed</text>

                <text x="800" y="40" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">3 · DECIDE</text>
                <rect x="800" y="70" width="270" height="64" rx="4" fill="rgba(34, 211, 238, 0.1)" stroke="rgba(34, 211, 238, 0.7)"/>
                <text x="816" y="96" fill="#22D3EE" fontWeight="600">ALLOW</text>
                <text x="816" y="116" fill="rgba(244, 238, 229, 0.6)" fontSize="9">no violations · the action runs</text>

                <rect x="800" y="170" width="270" height="64" rx="4" fill="rgba(255, 184, 77, 0.08)" stroke="rgba(255, 184, 77, 0.7)"/>
                <text x="816" y="196" fill="#FFB84D" fontWeight="600">WOULD BLOCK</text>
                <text x="816" y="216" fill="rgba(244, 238, 229, 0.6)" fontSize="9">observe · recorded, the action runs</text>

                <rect x="800" y="270" width="270" height="64" rx="4" fill="rgba(255, 92, 122, 0.08)" stroke="rgba(255, 92, 122, 0.75)"/>
                <text x="816" y="296" fill="#FF5C7A" fontWeight="600">BLOCK</text>
                <text x="816" y="316" fill="rgba(244, 238, 229, 0.6)" fontSize="9">enforce · refused, never runs</text>

                <rect x="800" y="390" width="270" height="64" rx="4" fill="rgba(244, 238, 229, 0.06)" stroke="rgba(244, 238, 229, 0.3)" strokeDasharray="3 3"/>
                <text x="935" y="416" textAnchor="middle" fill="#f4f1ec" fontWeight="500">ERP · WhatsApp · email</text>
                <text x="935" y="436" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">the write or send happens</text>

                <rect x="30" y="505" width="1040" height="40" rx="4" fill="rgba(34, 211, 238, 0.06)" stroke="rgba(34, 211, 238, 0.45)"/>
                <text x="550" y="529" textAnchor="middle" fill="rgba(244, 238, 229, 0.8)" fontSize="10">AUDIT LOG · every decision with its mode, violations and risk, then marked executed or failed</text>
              </g>

              <g stroke="rgba(244, 238, 229, 0.4)" strokeWidth="1" fill="none">
                <path d="M280 82 L354 82" markerEnd="url(#cp-arr-s)"/>
                <path d="M280 136 L354 136" markerEnd="url(#cp-arr-s)"/>
                <path d="M280 190 L354 190" markerEnd="url(#cp-arr-s)"/>
                <path d="M280 244 L354 244" markerEnd="url(#cp-arr-s)"/>
                <path d="M280 298 L354 298" markerEnd="url(#cp-arr-s)"/>
                <path d="M280 352 L354 352" markerEnd="url(#cp-arr-s)"/>
                <path d="M280 406 L354 406" markerEnd="url(#cp-arr-s)"/>
                <path d="M280 460 L354 460" markerEnd="url(#cp-arr-s)"/>
              </g>
              <g stroke="rgba(34, 211, 238, 0.8)" strokeWidth="1.2" fill="none">
                <path d="M740 102 L794 102" markerEnd="url(#cp-arr)"/>
                <path d="M740 202 L794 202" stroke="rgba(255, 184, 77, 0.8)" markerEnd="url(#cp-arr)"/>
                <path d="M740 302 L794 302" stroke="rgba(255, 92, 122, 0.8)" markerEnd="url(#cp-arr)"/>
                <path d="M1070 102 L1086 102 L1086 422 L1076 422" markerEnd="url(#cp-arr)"/>
                <path d="M1070 202 L1086 202" stroke="rgba(255, 184, 77, 0.8)"/>
                <path d="M550 482 L550 500" markerEnd="url(#cp-arr)"/>
              </g>
              <g stroke="#FF5C7A" strokeWidth="1.6">
                <path d="M1078 296 L1090 308 M1090 296 L1078 308"/>
              </g>
            </svg>
          </div>

          <div className="arch-legend">
            <span><i style={{ background: '#22D3EE' }}></i>Allowed</span>
            <span><i style={{ background: '#FFB84D' }}></i>Observe: recorded, still runs</span>
            <span><i style={{ background: '#FF5C7A' }}></i>Enforce: blocked</span>
          </div>
          <p className="diagram-note">Recreated conceptual diagram for this page. Component names are generic; this is not the internal service map.</p>

          <div className="prose" style={{ marginTop: '3.5rem' }}>
            <p><strong>Where it fails closed.</strong> Observe mode is bolted onto live production paths, so it never throws and never blocks: a recording failure must not become a dropped customer reply. Enforce mode is the opposite. Its whole point is that "I could not tell" does not mean "go ahead", so a check that errors is treated exactly like a check that failed.</p>
          </div>

          <div className="arch-diagram">
            <svg viewBox="0 0 1100 256" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cp-fail-title">
              <title id="cp-fail-title">What the checkpoint does in observe and enforce mode when checks pass, fail, or error, and when the emergency stop is on or unreadable.</title>
              <g fontFamily="ui-monospace, Menlo, monospace">
                <text x="30" y="24" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">SITUATION</text>
                <text x="450" y="24" fill="#FFB84D" fontSize="9" letterSpacing="2">OBSERVE</text>
                <text x="770" y="24" fill="#FF5C7A" fontSize="9" letterSpacing="2">ENFORCE · PER PATH</text>

                <rect x="20" y="40" width="1060" height="48" rx="3" fill="rgba(244, 238, 229, 0.03)"/>
                <text x="30" y="62" fill="#f4f1ec" fontSize="11.5">Every check passes</text>
                <text x="450" y="62" fill="#22D3EE" fontSize="11" fontWeight="600">ALLOW</text>
                <text x="450" y="78" fill="rgba(244, 238, 229, 0.5)" fontSize="9">the action runs</text>
                <text x="770" y="62" fill="#22D3EE" fontSize="11" fontWeight="600">ALLOW</text>
                <text x="770" y="78" fill="rgba(244, 238, 229, 0.5)" fontSize="9">the action runs</text>

                <text x="30" y="114" fill="#f4f1ec" fontSize="11.5">A check finds a violation</text>
                <text x="30" y="130" fill="rgba(244, 238, 229, 0.45)" fontSize="9">a switched-off path, a duplicate, flagged text</text>
                <text x="450" y="114" fill="#FFB84D" fontSize="11" fontWeight="600">WOULD BLOCK</text>
                <text x="450" y="130" fill="rgba(244, 238, 229, 0.5)" fontSize="9">runs, recorded for review</text>
                <text x="770" y="114" fill="#FF5C7A" fontSize="11" fontWeight="600">BLOCK</text>
                <text x="770" y="130" fill="rgba(244, 238, 229, 0.5)" fontSize="9">refused before it runs</text>

                <rect x="20" y="144" width="1060" height="48" rx="3" fill="rgba(255, 92, 122, 0.06)" stroke="rgba(255, 92, 122, 0.35)"/>
                <text x="30" y="166" fill="#f4f1ec" fontSize="11.5">A check itself errors</text>
                <text x="30" y="182" fill="rgba(244, 238, 229, 0.45)" fontSize="9">a store is unreachable, a query fails</text>
                <text x="450" y="166" fill="#FFB84D" fontSize="11" fontWeight="600">WOULD BLOCK</text>
                <text x="450" y="182" fill="rgba(244, 238, 229, 0.5)" fontSize="9">the error is recorded as the violation</text>
                <text x="770" y="166" fill="#FF5C7A" fontSize="11" fontWeight="600">BLOCK · FAILS CLOSED</text>
                <text x="770" y="182" fill="rgba(244, 238, 229, 0.5)" fontSize="9">"could not tell" is a no</text>

                <text x="30" y="218" fill="#f4f1ec" fontSize="11.5">Emergency stop on, or unreadable</text>
                <text x="30" y="234" fill="rgba(244, 238, 229, 0.45)" fontSize="9">an unreadable switch counts as stopped</text>
                <text x="450" y="218" fill="#FFB84D" fontSize="11" fontWeight="600">WOULD BLOCK (sends)</text>
                <text x="450" y="234" fill="rgba(244, 238, 229, 0.5)" fontSize="9">and the gateway refuses every model call</text>
                <text x="770" y="218" fill="#FF5C7A" fontSize="11" fontWeight="600">BLOCK (sends)</text>
                <text x="770" y="234" fill="rgba(244, 238, 229, 0.5)" fontSize="9">and the gateway refuses every model call</text>
              </g>
              <g stroke="rgba(244, 238, 229, 0.08)" strokeWidth="1">
                <path d="M440 34 L440 246"/>
                <path d="M760 34 L760 246"/>
              </g>
            </svg>
          </div>
          <p className="diagram-note">Recreated conceptual diagram for this page. Component names are generic; this is not the internal service map.</p>

          <div className="prose" style={{ marginTop: '2.5rem' }}>
            <p>The platform emergency stop sits above all of this. It treats a switch it can't read as "stopped", and the LLM gateway enforces it on every model call, so turning AI off stops the models even on paths that are still only observed.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 08 · Guardrails</div>
          <h2 className="section-title reveal">Guardrails before <span className="accent">the model gets to act.</span></h2>

          <div className="prose reveal">
            <p>Once AI moves from advice into writing records and messaging customers, a valid-looking output isn't enough. Each of these layers exists before the model gets the chance to be wrong.</p>
          </div>

          <div className="layers">
            <div className="layer reveal">
              <div className="layer-num">01</div>
              <div>
                <div className="layer-title">Action <span className="accent">Checkpoint.</span></div>
                <div className="layer-body">Gates at least 23 AI write and customer-messaging paths, in eight families. Each family runs in one of three modes: off, observe, or enforce. Observe mode records what enforcement would block without blocking it, so a path can be watched before it's switched on.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">02</div>
              <div>
                <div className="layer-title">Fail-closed <span className="accent">switches.</span></div>
                <div className="layer-body">A platform emergency stop that treats an unreadable switch as "stopped", plus an on/off switch per path. In enforce mode, any check that errors, including reading a switch, counts as a violation and blocks.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">03</div>
              <div>
                <div className="layer-title">Human <span className="accent">approvals.</span></div>
                <div className="layer-body">Agent actions wait for a person. Approvals are single-use and time-limited.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">04</div>
              <div>
                <div className="layer-title">Input <span className="accent">defence.</span></div>
                <div className="layer-body">PII masking, and a prompt-injection defence that fails closed rather than letting a suspicious input through.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">05</div>
              <div>
                <div className="layer-title">Output <span className="accent">validation.</span></div>
                <div className="layer-body">Model output is validated, not trusted because it looks well-formed.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">06</div>
              <div>
                <div className="layer-title">Audit &amp; <span className="accent">connectors.</span></div>
                <div className="layer-body">Audit logging, and security hardening of the MCP connectors staff use to query ERP data: standard OAuth protections and removal of sensitive fields from responses.</div>
              </div>
            </div>
          </div>

          <div className="prose reveal" style={{ marginTop: '3rem' }}>
            <p>None of this is technically novel: approvals, kill switches, validators, and audit logs are old engineering ideas. The point is that <strong>they exist <em>before</em> the LLM gets to be wrong</strong>, and that the enforced ones fail closed.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 09 · Engineering</div>
          <h2 className="section-title reveal">The checkpoint, <span className="accent">in outline.</span></h2>

          <div className="prose reveal">
            <p>The shape of the Action Checkpoint as generic pseudocode. It isn't the production code, but it shows the order of decisions from the diagrams above.</p>
          </div>

          <pre className="codeblock" dangerouslySetInnerHTML={{ __html: CHECKPOINT_SNIPPET }} />

          <div className="prose reveal">
            <p>Three things that matter more than they look:</p>
            <p><strong>Every check runs, and each one is isolated.</strong> One erroring check doesn't stop the others from being recorded, and the error itself is a violation. In enforce mode that is what fails closed.</p>
            <p><strong>Observe mode</strong> makes rollout safe. A path can run for real while the checkpoint records what it would have blocked, so enforcement is switched on with evidence rather than hope.</p>
            <p><strong>In enforce mode a "no" is final.</strong> A refused action is refused and logged.</p>
          </div>
        </div>
      </section>

      <section className="lessons">
        <div className="lessons-inner">
          <div className="chap">// 10 · Reflections</div>
          <h2 className="section-title reveal">What this work <span className="accent">taught me.</span></h2>
          <ol className="lessons-list">
            <li className="reveal">
              <span className="lesson-num">i.</span>
              <div className="lesson-text">Put every LLM call you own through one gateway, early. Model policy, fallbacks, cost caps, and caching only have to be right in one place.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">ii.</span>
              <div className="lesson-text"><span className="accent">Plausibility is not safety.</span> Schema validation catches the easy mistakes. The dangerous mistakes look correct, which is why writes need a checkpoint and a human.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">iii.</span>
              <div className="lesson-text">Reconcile your cost numbers against the provider's. An estimate nobody checks drifts quietly; comparing the ledger with the provider's usage data every day is what makes it a number you can trust.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">iv.</span>
              <div className="lesson-text">Retire what nobody uses. The usage audit removed a CRM orchestration layer and a goal-oriented lead-conversion agent, and decommissioned the CRM and property-management autopilots. None of them run today.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">v.</span>
              <div className="lesson-text">The best AI integrations are <span className="accent">boring on purpose</span> at the points that matter. When the model is unavailable, Layla falls back to deterministic behaviour instead of improvising.</div>
            </li>
          </ol>
        </div>
      </section>

      <section className="end">
        <div className="end-inner">
          <span className="end-eyebrow">End of case study · № 02</span>
          <h2 className="end-title">Want to build something <span className="accent">like this</span>?</h2>
          <div className="end-links">
            <a className="btn btn-fill" href="mailto:ashrafali31018@gmail.com">Email</a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/ashrafali-m-769b25246" target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn btn-ghost" href="https://github.com/ASHRAFALI-M" target="_blank" rel="noopener">GitHub</a>
            <a className="btn btn-ghost" href="#work-askre">More work</a>
          </div>
          <div className="end-meta">
            <span>© {new Date().getFullYear()} · Ashrafali M.</span>
            <span>ASKRE · Case Study № 02</span>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  )
}
