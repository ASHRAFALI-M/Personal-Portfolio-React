import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'

import ErrorBoundary from './components/ErrorBoundary.jsx'
import Boot from './components/Boot.jsx'
import TopBar from './components/TopBar.jsx'
import Console from './components/Console.jsx'
import Work from './components/Work.jsx'
import Practice from './components/Practice.jsx'
import Experience from './components/Experience.jsx'
import Stack from './components/Stack.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

import CommandPalette from './agent/CommandPalette.jsx'
import { useAgent } from './agent/useAgent.js'
import { INTENTS, SECTIONS } from './agent/script.js'
import { getTheme, setTheme } from './lib/theme.js'

/* Case studies stay lazy: the portfolio bundle doesn't pay for them until
   one is opened. They're reachable from every Work record and from ⌘K. */
const LaylaCaseStudy = lazy(() => import('./case-studies/LaylaCaseStudy.jsx'))
const AskreCaseStudy = lazy(() => import('./case-studies/AskreCaseStudy.jsx'))
const AutomationsCaseStudy = lazy(() => import('./case-studies/AutomationsCaseStudy.jsx'))
const SkinLesionCaseStudy = lazy(() => import('./case-studies/SkinLesionCaseStudy.jsx'))
const CottonDiseaseCaseStudy = lazy(() => import('./case-studies/CottonDiseaseCaseStudy.jsx'))

const CASES = {
  'layla': { Component: LaylaCaseStudy, row: 'work-layla' },
  'askre': { Component: AskreCaseStudy, row: 'work-askre' },
  'automations': { Component: AutomationsCaseStudy, row: 'work-automations' },
  'skin-lesion': { Component: SkinLesionCaseStudy, row: 'work-skin-lesion' },
  'cotton-disease': { Component: CottonDiseaseCaseStudy, row: 'work-cotton' },
}

const ROW_HASH = /^#work-(layla|askre|automations|skin-lesion|cotton)$/
const ASK_HASH = /^#ask\/([a-z-]+)$/

/* #ask/<intent-id>: a link that opens with one question already answered.
   Shareable per audience: #ask/hire for a recruiter, #ask/practice for an
   engineer. The ids are the `id` fields in agent/script.js. */
function parseAsk() {
  const m = window.location.hash.match(ASK_HASH)
  // an id that matches no intent is treated as no deep link at all, so a
  // typo'd link degrades to the normal landing rather than a wrong one
  return m && INTENTS.some((i) => i.id === m[1]) ? m[1] : null
}

function parseRoute() {
  const m = window.location.hash.match(/^#\/case\/(layla|askre|automations|skin-lesion|cotton-disease)$/)
  return m ? m[1] : null
}

function manamaTime() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Bahrain',
    }).format(new Date())
  } catch {
    return '--:--'
  }
}

export default function App() {
  const [route, setRoute] = useState(parseRoute)
  const [pal, setPal] = useState(false)
  const [cur, setCur] = useState('')
  const [clock, setClock] = useState(manamaTime)
  const [theme, setThemeState] = useState(getTheme)
  const prevRouteRef = useRef(route)
  const initialAsk = useRef(parseAsk()).current
  const agent = useAgent(initialAsk)

  /* ── hash route ── */
  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute())
      const ask = parseAsk()
      if (ask && ask !== initialAsk) {
        agent.askIntent(ask)
        document.getElementById('console')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [agent, initialAsk])

  /* ── clock, ticking on the minute ── */
  useEffect(() => {
    const id = setInterval(() => setClock(manamaTime()), 30000)
    return () => clearInterval(id)
  }, [])

  /* ── ⌘K / Ctrl+K ── */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPal((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ── lock the page behind an open case study ── */
  useEffect(() => {
    if (!route) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = prev }
  }, [route])

  /* ── closing a case study lands on its work record ── */
  useEffect(() => {
    const prev = prevRouteRef.current
    prevRouteRef.current = route
    if (prev && !route) {
      const row = document.getElementById(CASES[prev].row)
      if (row) requestAnimationFrame(() => {
        row.scrollIntoView({ behavior: 'auto', block: 'start' })
        /* The back link navigates to #work-<slug> to get here, and that hash
           would otherwise persist: a later reload would land mid-page on a
           record the visitor never asked for. Strip it once we've scrolled,
           a genuinely shared #work-* link still works on first load, because
           this only runs when a case study was open a moment ago. */
        if (ROW_HASH.test(window.location.hash)) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search)
        }
      })
    }
  }, [route])

  /* ── where a load starts.
        No hash → the top. A hash naming something on the page (#work,
        #experience, #work-layla, #work-automations …) → that element, which is what a shared or
        bookmarked link means. #/case/* and #ask/* are routes and handle
        themselves. Scroll restoration is manual so the browser doesn't park a
        reload wherever the last visit ended. ── */
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    const hash = window.location.hash
    if (/^#\/case\//.test(hash) || ASK_HASH.test(hash)) return

    const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : null
    if (!target) { window.scrollTo(0, 0); return }

    const jump = () => target.scrollIntoView({ behavior: 'auto', block: 'start' })
    let raf1, raf2
    raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(jump) })
    const t = setTimeout(jump, 1200) // re-assert once the boot overlay is gone
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); clearTimeout(t) }
  }, [])

  /* ── a #ask/ deep link scrolls to the console once the boot overlay clears ── */
  useEffect(() => {
    if (!initialAsk) return
    const jump = () => document.getElementById('console')?.scrollIntoView({ behavior: 'auto', block: 'start' })
    const t1 = setTimeout(jump, 60)
    const t2 = setTimeout(jump, 1250)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [initialAsk])

  /* ── reveal on scroll. Every panel renders synchronously, so one pass over
        the document is enough, no observer can miss a late-arriving row. ── */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.rv'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* ── scrollspy for the chrome nav ── */
  useEffect(() => {
    const secs = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (!secs.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCur(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    secs.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((t) => setTheme(t === 'light' ? 'dark' : 'light'))
  }, [])

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const Case = route ? CASES[route].Component : null

  return (
    <ErrorBoundary>
      <a className="skip" href="#work">Skip to content</a>

      <Boot />
      <TopBar cur={cur} clock={clock} onPalette={() => setPal(true)} theme={theme} onTheme={toggleTheme} />

      <main>
        <Console
          theme={theme}
          agent={agent}
          onGo={go}
          onPalette={() => setPal(true)}
          clock={clock}
        />
        <Work />
        <Practice />
        <Experience />
        <Stack />
        <Education />
        <Contact clock={clock} />
      </main>

      <Footer clock={clock} onPalette={() => setPal(true)} />

      <CommandPalette
        open={pal}
        onClose={() => setPal(false)}
        onAsk={(id) => { agent.askIntent(id); go('console') }}
        onAskDomain={(code) => { agent.askDomain(code); go('console') }}
        onGo={go}
      />

      {Case && (
        <Suspense fallback={null}>
          <Case />
        </Suspense>
      )}
    </ErrorBoundary>
  )
}
