import { Fragment } from 'react'

/* Static records. Each slug is the row's anchor id, which is what the case
   studies link back to (#work-layla / #work-askre / #work-automations / #work-skin-lesion / #work-cotton) and
   what App.jsx's return-to-row scroll looks up. */

const PROJECTS = [
  {
    slug: 'layla',
    group: 'production',
    title: 'Layla · AI Sales Agent',
    state: 'live',
    description:
      'A WhatsApp AI sales agent in production since spring 2026. Assign it a lead and it opens the conversation, qualifies the customer, checks live inventory, and books a meeting with a human specialist at the time the customer names, then hands the agent the client\'s details. Deterministic stage handlers decide what happens; the model writes the sentences.',
    technologies: ['TypeScript', 'Node.js', 'WhatsApp Cloud API', 'Anthropic Claude', 'Redis', 'PostgreSQL'],
    caseHash: '#/case/layla',
    links: {},
  },
  {
    slug: 'askre',
    group: 'production',
    title: 'Enterprise AI Platform · CRM Integration',
    state: 'live',
    description:
      'The AI layer on ASK Real Estate\'s enterprise ERP and CRM: a multi-provider LLM gateway with cost caps, guardrails on at least 23 AI write and messaging paths, tool-using agents with human approvals, LLM signal classifiers, and a property valuation pipeline. Layla runs on top of it. The ERP itself was built by a team before I joined.',
    technologies: ['TypeScript', 'Node.js', 'Anthropic Claude', 'LangGraph', 'MCP', 'Pinecone', 'PostgreSQL', 'Redis', 'BullMQ'],
    caseHash: '#/case/askre',
    links: {},
  },
  {
    slug: 'automations',
    group: 'production',
    title: 'ERP AI Automations',
    state: 'live',
    description:
      'Seventy-two AI features I built into the ERP across facility management, CRM, procurement, property management, HR and DealRooms: 15 signal radars that read what staff write, on-demand investigators, drafters that write the chase for a person to send, document readers, and automations that raise work orders from failed inspections. The model explains and drafts; code computes, checks and decides.',
    technologies: ['TypeScript', 'Node.js', 'Anthropic Claude', 'LangGraph', 'PostgreSQL', 'Redis'],
    caseHash: '#/case/automations',
    links: {},
  },
  {
    slug: 'skin-lesion',
    group: 'research',
    title: 'Skin Cancer Detection',
    state: '84.5%',
    description:
      'Seven-class skin lesion classifier from my ML research internship at NIT Tiruchirappalli: 35,000 skin lesion images, 84.5% accuracy, with PCA (95% variance retained) and t-SNE to inspect the feature space.',
    technologies: ['TensorFlow', 'PCA', 't-SNE', 'Python'],
    caseHash: '#/case/skin-lesion',
    links: {},
  },
  {
    slug: 'cotton',
    group: 'research',
    title: 'Smart Agriculture AI',
    state: '95%',
    description:
      'Four-class cotton leaf disease classification on ResNet101V2 transfer learning at 95% accuracy, with Grad-CAM heatmaps so every diagnosis arrives with the evidence that produced it: the difference between a prediction and a usable one.',
    technologies: ['ResNet101V2', 'Transfer learning', 'Grad-CAM', 'TensorFlow', 'Python'],
    caseHash: '#/case/cotton-disease',
    links: {},
  },
]

export default function Work() {
  return (
    <section id="work" className="panel">
      <div className="wrap">
        <div className="p-head rv">
          <span className="no">// 01</span>
          <h2>Work</h2>
          <span className="lead">5 records · production and research</span>
        </div>

        {PROJECTS.map((p, i) => (
          <Fragment key={p.slug}>
          {(i === 0 || PROJECTS[i - 1].group !== p.group) && (
            <div className="rec-group rv"><span>{p.group === 'production' ? 'Production' : 'Research'}</span><i aria-hidden="true" /></div>
          )}
          <article className="rec rv" id={`work-${p.slug}`}>
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>
                {p.title}
                <span className={`tag${p.state === 'live' ? '' : ' ghost'}`}>{p.state}</span>
              </h3>
              <p>{p.description}</p>
              <div className="tech">
                {p.technologies.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
            <div className="go">
              <a className="primary" href={p.caseHash}>read case study <i aria-hidden="true">→</i></a>
              {p.links.github && (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer">github <i aria-hidden="true">↗</i></a>
              )}
              {p.links.demo && (
                <a href={p.links.demo} target="_blank" rel="noopener noreferrer">live <i aria-hidden="true">↗</i></a>
              )}
            </div>
          </article>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
