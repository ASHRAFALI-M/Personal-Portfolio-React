const DISCIPLINES = [
  {
    ic: '⬡',
    h: 'Tool-using agents',
    p: 'ReAct loops with real tools, and a human approval between the agent and anything it changes. Approvals are single-use and expire, so an old yes can\'t be replayed.',
    kit: 'LangGraph · LangChain tools · MCP',
    proof: '9 tool-using agents · ASKRE',
  },
  {
    ic: '◎',
    h: 'LLM engineering',
    p: 'Per-agent model policy, fallback chains across providers, and spend capped before a call rather than discovered after it.',
    kit: 'Claude · Gemini · OpenAI · Ollama',
    proof: 'four providers, one gateway · ASKRE',
  },
  {
    ic: '◈',
    h: 'RAG pipelines',
    p: 'Dense retrieval with BM25 re-ranking, and SQL filters first wherever the data is structured.',
    kit: 'Pinecone · Amazon Titan · BM25',
    proof: 'shared RAG core · ASKRE',
  },
  {
    ic: '⬢',
    h: 'AI automation',
    p: 'Workflows that replace manual decisions with auditable ones: human-in-the-loop where it matters, audit trails throughout, and graceful failure as a design requirement.',
    kit: 'TypeScript · PostgreSQL · BullMQ',
    proof: 'Action Checkpoint + audit logging · ASKRE',
  },
]

const LOOP = [
  ['01', 'Prototype fast', 'a working agent beats a slide'],
  ['02', 'Evaluate hard', 'evals before vibes'],
  ['03', 'Harden', 'guardrails, audits, fallbacks'],
  ['04', 'Observe', 'production is the real benchmark'],
]

export default function Practice() {
  return (
    <section id="practice" className="panel">
      <div className="wrap">
        <div className="p-head rv">
          <span className="no">// 02</span>
          <h2>Practice</h2>
          <span className="lead">4 disciplines · 1 loop</span>
        </div>

        <div className="cards rv">
          {DISCIPLINES.map((d) => (
            <div className="card" key={d.h}>
              <div className="ic" aria-hidden="true">{d.ic}</div>
              <h3>{d.h}</h3>
              <p>{d.p}</p>
              <div className="kit">{d.kit}</div>
              <div className="proof">{d.proof}</div>
            </div>
          ))}
        </div>

        <div className="loop rv" aria-label="Working method">
          {LOOP.map(([n, h, s]) => (
            <div className="step" key={n}>
              <span className="sn">{n}</span>
              <span><b>{h}</b><span>{s}</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
