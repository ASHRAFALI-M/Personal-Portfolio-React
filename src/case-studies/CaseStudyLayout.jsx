import { useEffect } from 'react'
import { useReveal } from './useReveal.js'
import './case-study.css'

/* Shared shell for the five case studies: the .cs-root overlay wrapper
   (carries the per-page accent + signature-motif classes), the fixed
   nav-back bar, scroll-reveal wiring, and per-page document.title
   (restored to the portfolio's title on unmount). */
export default function CaseStudyLayout({ title, wrapClass, backHash, brandLink, children }) {
  const rootRef = useReveal()

  /* Horizontally scrollable blocks, the architecture diagram and the code
     samples, are unreachable by keyboard unless they are focusable, so a
     keyboard user cannot scroll them at all. Applied here rather than on each
     element so every case study gets it. */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let n = 0
    root.querySelectorAll('pre, .arch-diagram, .scrollable').forEach((el) => {
      if (el.scrollWidth > el.clientWidth && !el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0')
        el.setAttribute('role', 'region')
        if (!el.hasAttribute('aria-label')) {
          el.setAttribute('aria-label', el.tagName === 'PRE' ? 'Code sample, scrollable' : 'Diagram, scrollable')
          // identically named regions fail landmark-unique, so number repeat diagrams
          if (el.tagName !== 'PRE' && ++n > 1) el.setAttribute('aria-label', `Diagram ${n}, scrollable`)
        }
      }
    })
  }, [])

  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => { document.title = prev }
  }, [title])

  return (
    <div ref={rootRef} className={`cs-root ${wrapClass}`}>
      <nav className="nav">
        <a href={backHash} className="nav-back">&larr; Back to work</a>
        {brandLink
          ? <a href={backHash} className="nav-name">ashrafali.m</a>
          : <span className="nav-name">Ashrafali M.</span>}
      </nav>
      {/* A landmark, so the body isn't a pile of orphaned sections, but NOT
          <main>: the portfolio underneath still has one, and two mains in the
          document is its own violation. A named region is a landmark too. */}
      <div role="region" aria-label={`${title}, case study`}>{children}</div>
    </div>
  )
}
