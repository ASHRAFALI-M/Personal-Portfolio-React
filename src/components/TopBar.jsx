import { useEffect, useRef, useState } from 'react'
import { SECTIONS, CV_URL } from '../agent/script.js'

/* Window chrome, not a navbar; the site presents itself as an app.
   `cur` comes from App's scrollspy. At <=960px the nav collapses into a menu panel. */
export default function TopBar({ cur, onPalette, clock, theme, onTheme }) {
  const [open, setOpen] = useState(false)
  const headRef = useRef(null)
  const btnRef = useRef(null)
  /* Escape closes and hands focus back; a press outside the header (button and panel included) closes too. */
  useEffect(() => {
    if (!open) return
    const key = (e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current && btnRef.current.focus() } }
    const away = (e) => { if (headRef.current && !headRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('keydown', key)
    document.addEventListener('pointerdown', away)
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', away) }
  }, [open])
  return (
    <header id="top" ref={headRef}>
      <div className="top-in">
        <div className="dots" aria-hidden="true"><i /><i /><i /></div>
        {/* Reads as a shell prompt, so no separator glyph is needed. */}
        <div className="top-title" aria-label="ashrafali.m, agent console">
          <b>ashrafali.m</b><s>:~/<em>agent-console</em></s><i className="caret" aria-hidden="true" />
        </div>
        <nav className="top-nav" aria-label="Page sections">
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
        <button
          ref={btnRef}
          className={`top-menu${open ? ' on' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="top-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M2 4.5h12" /><path d="M2 8h12" /><path d="M2 11.5h12" />
          </svg>
        </button>
      </div>
      <nav className={`top-panel${open ? ' open' : ''}`} id="top-menu" aria-label="Menu">
        {/* 00, not 01: home sits before the numbered sections. Same target as the footer's back-to-top. */}
        <a href="#hero" onClick={() => setOpen(false)} tabIndex={open ? undefined : -1}>
          <i>00</i><span>Home</span><em>top</em>
        </a>
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className={cur === s.id ? 'cur' : ''} onClick={() => setOpen(false)}
            tabIndex={open ? undefined : -1}>
            <i>{String(i + 1).padStart(2, '0')}</i><span>{s.label}</span><em>{s.hint}</em>
          </a>
        ))}
        <a href={CV_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} tabIndex={open ? undefined : -1}>
          <i aria-hidden="true">↓</i><span>CV</span><em>PDF</em>
        </a>
        {/* The header theme button is hidden at <=400px, so the panel carries the toggle there. */}
        <button className="tp-theme" onClick={onTheme} tabIndex={open ? undefined : -1}>
          <i>◐</i><span>Theme</span><em>{theme === 'light' ? 'Light' : 'Dark'}</em>
        </button>
      </nav>
    </header>
  )
}
