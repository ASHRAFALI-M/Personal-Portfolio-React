import { formatMonth, duration } from '../lib/dates.js'

const ROLES = [
  {
    start: '2025-11',
    end: null,            // current role, measured against today on every render
    role: 'Artificial Intelligence Developer',
    org: 'ASK Real Estate',
    place: 'Manama, Bahrain · Full-time',
    p: "Building the AI layer on ASK Real Estate's existing enterprise ERP (CRM, marketing, facility and property management, HRMS, finance, procurement). The ERP was built by a team before I joined; the AI on top of it is my work.",
    bullets: [
      'Built a multi-provider LLM gateway (Claude, Gemini, OpenAI, Ollama) with per-agent model policy, fallback chains and Redis cost caps; reconciled the AI cost ledger daily against provider usage data and corrected it where they disagreed.',
      'Built Layla, a WhatsApp AI sales agent live since spring 2026: staged conversations, live listing search, viewing bookings, and structured writes to the CRM.',
      'Gated at least 23 AI write and customer-messaging paths behind an Action Checkpoint with a fail-closed emergency stop; built 9 tool-using agents with single-use human approvals and 14 active LLM signal classifiers.',
    ],
    tech: ['LLM gateway', 'LangGraph', 'RAG', 'MCP', 'TypeScript'],
  },
  {
    start: '2024-09',
    end: '2025-03',
    role: 'Machine Learning Research Intern',
    org: 'NIT Tiruchirappalli',
    place: 'Tiruchirappalli, India · Internship',
    p: 'Research internship at the National Institute of Technology, Tiruchirappalli, on skin cancer detection from 35,000 skin lesion images.',
    bullets: [
      'Reduced the feature space with PCA, retaining 95% of the variance.',
      'Used t-SNE to visualise how the lesion classes separate in that space.',
    ],
    tech: ['Machine Learning', 'PCA · t-SNE', 'Python'],
  },
  {
    start: '2024-05',
    end: '2024-08',
    role: 'Artificial Intelligence Developer',
    org: 'Trio Devs Digital Services',
    place: 'India · Internship',
    p: 'First professional engagement with applied AI: notebook to endpoint, and the first encounter with the gap between a model that works and a system that survives users.',
    bullets: [
      'Shipped the first production AI features end to end.',
      'Learned that the model is the easy half.',
    ],
    tech: ['Applied AI', 'Python', 'Software development'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="panel">
      <div className="wrap">
        <div className="p-head rv">
          <span className="no">// 03</span>
          <h2>Experience</h2>
          <span className="lead">3 roles · one throughline</span>
        </div>

        <div className="log">
          {ROLES.map((r) => (
            <article className="entry rv" key={r.org}>
              <div className="when">
                <b>{formatMonth(r.start)} → {r.end ? formatMonth(r.end) : 'Present'}</b>
                {duration(r.start, r.end)}
                <s>{r.place}</s>
              </div>
              <div>
                <h3>{r.role}</h3>
                <div className="org"><b>{r.org}</b></div>
                <p>{r.p}</p>
                <ul>
                  {r.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="tech">
                  {r.tech.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
