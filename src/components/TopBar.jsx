import { useEffect, useRef } from 'react'
import { prefersReduced } from '../lib/motion.js'
import { SECTIONS } from '../agent/script.js'

/* Window chrome, not a navbar; the site presents itself as an app.
   `cur` comes from App's scrollspy. */
export default function TopBar({ cur, onPalette, clock, theme, onTheme }) {
  const navRef = useRef(null)
  /* Keep the active link visible in the scrolling nav; scrollTo on the nav only, never the page. */
  useEffect(() => {
    const nav = navRef.current
    const a = nav && nav.querySelector('.cur')
    if (!a || nav.scrollWidth <= nav.clientWidth) return
    const left = a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2
    nav.scrollTo({ left, behavior: prefersReduced() ? 'auto' : 'smooth' })
  }, [cur])
  return (
    <header id="top">
      <div className="top-in">
        <div className="dots" aria-hidden="true"><i /><i /><i /></div>
        {/* Reads as a shell prompt, so no separator glyph is needed. */}
        <div className="top-title" aria-label="ashrafali.m, agent console">
          <b>ashrafali.m</b><s>:~/<em>agent-console</em></s><i className="caret" aria-hidden="true" />
        </div>
        <nav className="top-nav" ref={navRef} aria-label="Page sections">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={cur === s.id ? 'cur' : ''}>{s.label.split(' ')[0]}</a>
          ))}
        </nav>
        <button
          className="top-theme"
          onClick={onTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
        </button>
        <button className="top-k" onClick={onPalette} aria-label="ask ⌘K, open command palette">
          <span>ask</span><kbd>⌘K</kbd>
        </button>
      </div>
    </header>
  )
}
