import { useState } from 'react'

const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'ashrafali31018@gmail.com'
// digits only, country code first: what wa.me expects
const WHATSAPP = import.meta.env.VITE_CONTACT_WHATSAPP || '97336712356'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi Ashrafali, I saw your portfolio')}`

/* Closes the loop the hero opened: the page starts with the agent being
   asked a question and ends with the visitor being handed the prompt. */
export default function Contact({ clock }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked (http, permissions, older browser), the mailto still works
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="panel">
      <div className="wrap">
        <div className="p-head rv">
          <span className="no">// 06</span>
          <h2>Contact</h2>
          <span className="lead">open to work · replies under 24h</span>
        </div>

        <div className="hail rv">
          <div className="hail-in">
            <div className="q"><i aria-hidden="true">›</i><span>your turn</span></div>
            <h2>Let's build something <em>intelligent</em></h2>
            <p>
              Research collaboration, speaking, and agent architecture chats. If you're building
              a system that needs to think and still be accountable for it, I'd like to hear about it.
            </p>
            <div className="hail-actions">
              <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL} <span aria-hidden="true">→</span></a>
              <button className="copy" onClick={copy}>{copied ? '✓ copied' : '⧉ copy'}</button>
            </div>
          </div>
          <div className="hail-bar">
            <span>Manama <b>{clock}</b> AST · UTC+3</span>
            <span>based in <b>Bahrain</b></span>
            <span><b>remote-friendly</b></span>
            <span>
              <a href="https://www.linkedin.com/in/ashrafali-m-769b25246" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </span>
            <span>
              <a href="https://github.com/ASHRAFALI-M" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </span>
            <span>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
