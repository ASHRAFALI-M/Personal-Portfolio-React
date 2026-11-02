import { useEffect, useState } from 'react'
import { prefersReduced } from '../lib/motion.js'
import { INTENTS, CASES } from '../agent/script.js'

/* Replaces the old count-to-100 preloader. Same job: cover the first paint,
   but it states what the site is instead of performing a fake load bar.
   Skipped entirely under reduced motion. */

const LINES = [
  ['agent', 'ashrafali.m', 'ready'],
  ['index', `${CASES.length} projects · ${CASES.length} case studies`, 'ok'],
  ['script', `${INTENTS.length} answers · 0 model calls`, 'local'],
  ['mesh', '7 projects → 1 gateway', 'live'],
]

const STEP = 190
const HOLD = 320

export default function Boot() {
  const reduce = prefersReduced()
  const [gone, setGone] = useState(reduce)
  const [done, setDone] = useState(false)
  // starts at 1: index.html paints the first line before React exists
  const [n, setN] = useState(reduce ? LINES.length : 1)

  useEffect(() => {
    if (reduce) return
    const timers = []
    LINES.forEach((_, i) => { if (i) timers.push(setTimeout(() => setN(i + 1), i * STEP)) })
    timers.push(setTimeout(() => setDone(true), LINES.length * STEP + HOLD))
    timers.push(setTimeout(() => setGone(true), LINES.length * STEP + HOLD + 520))
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  if (gone) return null

  return (
    <div id="boot" className={done ? 'done' : ''} aria-hidden="true">
      <div className="boot-in">
        {LINES.slice(0, n).map(([key, val, state]) => (
          <div className="boot-line" key={key}>
            <b>{key}</b>
            <span>{val}</span>
            <s>{'·'.repeat(60)}</s>
            <i>{state}</i>
          </div>
        ))}
      </div>
    </div>
  )
}
