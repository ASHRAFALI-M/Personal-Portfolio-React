import { useCallback, useRef, useState } from 'react'
import { INTENTS, FALLBACK, resolve, findDomain } from './script.js'

/* The conversation state machine: you → thinking → streaming → idle.
   The "thinking" pause is 380ms of honesty theatre, it's there so the
   transition reads as a turn rather than an instant text swap. */

const THINK_MS = 380

/* The opening turn is pre-asked on load. It's 'who are you?' by default, or
   whatever a #ask/<id> deep link names, so a shared link lands with exactly
   the question its recipient should see already answered. */
export function useAgent(openingId) {
  const opening = INTENTS.find((i) => i.id === openingId) || INTENTS[0]
  const [turns, setTurns] = useState([
    { role: 'you', text: opening.q, id: 'q0' },
    { role: 'bot', text: opening.a, id: 'a0', streaming: true, goto: opening.goto },
  ])
  const [busy, setBusy] = useState(true)
  const nRef = useRef(1)
  const timerRef = useRef(null)

  const settle = useCallback(() => setBusy(false), [])

  /* Both a typed question and a tapped mesh node end up here: `question` is
     what gets shown as the visitor's turn, `intent` supplies the answer. */
  const run = useCallback((intent, question) => {
    const n = nRef.current++

    setBusy(true)
    setTurns((prev) => [
      ...prev,
      { role: 'you', text: question, id: `q${n}` },
      { role: 'bot', id: `t${n}`, thinking: true },
    ])

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setTurns((prev) => [
        ...prev.slice(0, -1),
        { role: 'bot', text: intent.a, id: `a${n}`, streaming: true, goto: intent.goto },
      ])
    }, THINK_MS)

    return intent
  }, [])

  const ask = useCallback((raw) => {
    const input = raw.trim()
    if (!input) return null
    return run(resolve(input) || FALLBACK, input)
  }, [run])

  const askIntent = useCallback((id) => {
    const intent = INTENTS.find((i) => i.id === id)
    return intent ? run(intent, intent.q) : null
  }, [run])

  const askDomain = useCallback((code) => {
    const d = findDomain(code)
    return d ? run(d, d.q) : null
  }, [run])

  return { turns, busy, ask, askIntent, askDomain, settle }
}
