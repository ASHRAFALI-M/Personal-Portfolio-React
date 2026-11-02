import { SECTIONS } from '../agent/script.js'

const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'ashrafali31018@gmail.com'
// digits only, country code first: what wa.me expects
const WHATSAPP = import.meta.env.VITE_CONTACT_WHATSAPP || '97336712356'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi Ashrafali, I saw your portfolio')}`

/* The end of the session: a closing prompt (with a way back into the agent),
   a small index of the page, and the status line the console header opened with. */
export default function Footer({ clock, onPalette }) {
  return (
    <footer>
      <div className="f-in">
        <div className="f-end">
          <p className="f-prompt">
            <i aria-hidden="true">›</i>
            <span>end of session. still <span className="f-nb">curious?<span className="f-caret" aria-hidden="true" /></span></span>
          </p>
          <button type="button" className="f-ask" onClick={onPalette}>
            ask another <kbd>⌘K</kbd>
          </button>
        </div>

        <div className="f-grid">
          <div className="f-who">
            <span className="f-brand">ashrafali<span>.</span>m</span>
            <p>AI Developer at ASK Real Estate. Building the AI layer on an enterprise ERP, from Manama, Bahrain.</p>
            <a className="f-mail" href={`mailto:${EMAIL}`}>{EMAIL} <span aria-hidden="true">→</span></a>
          </div>

          <nav className="f-col" aria-label="Sections">
            <b>Index</b>
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}><s>{String(i + 1).padStart(2, '0')}</s>{s.label.split(' ')[0]}</a>
            ))}
          </nav>

          <div className="f-col">
            <b>Elsewhere</b>
            <a href="https://www.linkedin.com/in/ashrafali-m-769b25246" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/ASHRAFALI-M" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href={`mailto:${EMAIL}`}>Email <span aria-hidden="true">↗</span></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="f-bar">
          <span>© {new Date().getFullYear()} Ashrafali M. All rights reserved.</span>
          <span>Manama <b>{clock}</b> AST</span>
          <a href="#hero" className="f-top">↑ top</a>
        </div>
      </div>
    </footer>
  )
}
