/* The old version drew the toolset as a draggable canvas constellation. A
   table is the honest form for a tool list: it says what each thing is for
   and where it's actually running, which the constellation never could. */

const KIT = [
  {
    cat: 'Agentic',
    name: 'LangGraph',
    p: 'The ReAct loop behind the nine tool-using agents at ASKRE.',
    also: 'also: LangChain tools, MCP connectors, Claude · Gemini · OpenAI · Ollama',
  },
  {
    cat: 'Retrieval',
    name: 'Pinecone',
    p: 'The vector store under the shared RAG core, with Amazon Titan embeddings and BM25 re-ranking.',
    also: 'also: SQL pre-filters, embedding re-rank for valuation comparables',
  },
  {
    cat: 'ML · Research',
    name: 'TensorFlow',
    p: 'Where the models learn: the skin lesion and cotton disease classifiers.',
    also: 'also: Python, scikit-learn, NumPy, Pandas, Matplotlib, Grad-CAM, PCA/t-SNE',
  },
  {
    cat: 'Production',
    name: 'TypeScript',
    p: 'How it ships. The gateway, agents and guardrails are written in it.',
    also: 'also: Node.js, JavaScript, React, PostgreSQL, Redis, BullMQ, Jest, Docker, AWS (Bedrock), Git',
  },
]

export default function Stack() {
  return (
    <section id="stack" className="panel">
      <div className="wrap">
        <div className="p-head rv">
          <span className="no">// 04</span>
          <h2>Stack</h2>
          <span className="lead">what runs, and what it's for</span>
        </div>

        <div className="kit-table">
          {KIT.map((k) => (
            <div className="kit-row rv" key={k.name}>
              <div className="cat"><i aria-hidden="true" />{k.cat}</div>
              <b>{k.name}</b>
              <div>
                <p>{k.p}</p>
                <div className="also">{k.also}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
