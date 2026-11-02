const DEGREES = [
  {
    gpa: '8.38',
    pct: '83.8%',
    when: '2023 to 2025',
    h: 'M.Sc. Data Science',
    org: 'Bishop Heber College · Tiruchirappalli',
    p: 'Machine learning, deep learning, NLP and visualisation, with research-driven projects in predictive modelling. Executive Member, Student Council.',
    tech: ['Deep learning', 'NLP', 'Predictive modelling'],
  },
  {
    gpa: '8.11',
    pct: '81.1%',
    when: '2020 to 2023',
    h: 'B.Sc. Computer Science',
    org: 'Jamal Mohamed College · Tiruchirappalli',
    p: 'Algorithms, data structures, databases, networks, software engineering. The ground the agent work stands on.',
    tech: ['Algorithms', 'Databases', 'Software engineering'],
  },
]

export default function Education() {
  return (
    <section id="education" className="panel">
      <div className="wrap">
        <div className="p-head rv">
          <span className="no">// 05</span>
          <h2>Education</h2>
          <span className="lead">2 degrees · systems that learn</span>
        </div>

        <div className="degrees">
          {DEGREES.map((d) => (
            <article className="deg rv" key={d.h}>
              <div className="gpa"><b>{d.gpa}</b><span>CGPA / 10</span></div>
              <div className="bar"><i style={{ '--gw': d.pct }} /></div>
              <div className="when">{d.when}</div>
              <h3>{d.h}</h3>
              <div className="org">{d.org}</div>
              <p>{d.p}</p>
              <div className="tech">
                {d.tech.map((t) => <span key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
