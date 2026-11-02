import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from '../lib/motion.js'

/* Answers are authored with **bold** and [label](#href). Streaming shows the
   plain text, markup characters would flicker through the typewriter, and
   the parsed version swaps in on completion. Nothing reflows: only weight
   and colour change. */

const TOKEN = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g

export function toPlain(text) {
  return text.replace(TOKEN, (_, bold, label) => bold || label)
}

export function parse(text) {
  const out = []
  let last = 0
  let m
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) {
      out.push(<strong key={m.index}>{m[1]}</strong>)
    } else {
      out.push(<a key={m.index} href={m[3]}>{m[2]}</a>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const CHARS_PER_MS = 0.22

export default function Stream({ text, onDone }) {
  const reduce = useRef(prefersReduced()).current
  const plain = toPlain(text)
  const [shown, setShown] = useState(reduce ? plain.length : 0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (reduce) { onDone?.(); return }

    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const n = Math.min(plain.length, Math.floor((now - t0) * CHARS_PER_MS))
      setShown(n)
      if (n < plain.length) {
        raf = requestAnimationFrame(tick)
      } else if (!doneRef.current) {
        doneRef.current = true
        onDone?.()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // onDone is a stable callback from useAgent; text is the identity of a turn
  }, [text, plain.length, reduce])

  const complete = shown >= plain.length

  return (
    <div className="a">
      {complete ? parse(text) : plain.slice(0, shown)}
      {!complete && <span className="caret" aria-hidden="true" />}
    </div>
  )
}
