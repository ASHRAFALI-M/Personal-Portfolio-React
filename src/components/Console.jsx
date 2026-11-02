import { useEffect, useRef, useState } from 'react'
import { INTENTS, SUGGESTED, AGENT, SECTIONS, CV_URL } from '../agent/script.js'
import Stream, { parse } from '../agent/Stream.jsx'
import AgentGraph from '../agent/AgentGraph.jsx'
import portrait from '../assets/portrait.jpg'

/* The frameless cut-out ships as a PAIR: a JPEG carrying the pixels and an
   8-bit greyscale PNG carrying the alpha, applied as a CSS mask. A single
   PNG with alpha was 2.5MB (1MB as greyscale+alpha) because PNG is lossless
   and this is a photograph; the pair is 238kB for the same result, and no
   WebP encoder exists on this machine to do it in one file.

   Both resolve at build time via import.meta.glob, which returns {} when the
   files are absent, so removing them falls back to the framed portrait with
   no code change. */
const CUT_RGB = Object.values(import.meta.glob('../assets/portrait-cut.jpg', { eager: true, import: 'default' }))[0] || null
const CUT_MASK = Object.values(import.meta.glob('../assets/portrait-cut-mask.png', { eager: true, import: 'default' }))[0] || null
const CUTOUT = CUT_RGB && CUT_MASK ? CUT_RGB : null

/* The hero: identity plate, then the console that answers for it.

   Answers never scroll the page on their own. An answer that maps to a
   section offers a jump instead; being yanked down the page mid-sentence is
   the failure mode of every chat-as-navigation site, and the reader should
   be the one who decides to leave. */

function sectionLabel(id) {
  return SECTIONS.find((s) => s.id === id)?.label || id
}

export default function Console({ agent, onGo, onPalette, clock }) {
  const { turns, busy, ask, askIntent, askDomain, settle } = agent

  /* The chrome bar reports what the agent is doing rather than carrying a
     standing label: ready → thinking → answering, mirroring the mesh, which
     shifts to the thinking colour over the same state. */
  const last = turns[turns.length - 1]
  const state = last?.thinking ? 'thinking' : busy ? 'answering' : 'ready'
  const [draft, setDraft] = useState('')
  const tapeRef = useRef(null)
  const firstRender = useRef(true)

  // keep the newest turn in view inside the tape only, never the page
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    const tape = tapeRef.current
    if (tape) tape.scrollTop = tape.scrollHeight
  }, [turns])

  /* An answer grows for as long as it streams, so a single scroll when the
     turn is added leaves the tail clipped. Pin the tape to the bottom for the
     duration, but only while the reader is already there, so scrolling up
     mid-answer isn't fought. */
  useEffect(() => {
    if (!busy) return
    let raf
    const pin = () => {
      const tape = tapeRef.current
      if (tape) {
        const atBottom = tape.scrollHeight - tape.scrollTop - tape.clientHeight < 72
        if (atBottom) tape.scrollTop = tape.scrollHeight
      }
      raf = requestAnimationFrame(pin)
    }
    raf = requestAnimationFrame(pin)
    return () => cancelAnimationFrame(raf)
  }, [busy])

  const submit = (e) => {
    e.preventDefault()
    if (!draft.trim() || busy) return
    ask(draft)
    setDraft('')
  }

  return (
    <section id="hero">
      <div className="wrap">
        <div className="eyebrow">
          <span className="pulse" aria-hidden="true" />
          <b>AI developer</b> · production AI · Manama
        </div>

        <div className={`plate${CUTOUT ? ' has-cut' : ''}`}>
          <div className="plate-txt">
            <h1 className="ident" aria-label="Ashrafali M.">
              <span>Ashrafali</span>
              <span className="lo">M.</span>
            </h1>
            <p className="tagline">
              I design and build <b>production AI systems</b>: tool-using agents, RAG pipelines and
              LLM infrastructure, with the guardrails and human oversight that let them work safely
              on real business data.
            </p>

            <div className="facts">
              <div className="fact live"><b>1</b><span>agent live on WhatsApp</span></div>
              <div className="fact"><b>9</b><span>tool-using agents</span></div>
              <div className="fact"><b>14</b><span>signal classifiers</span></div>
              <div className="fact"><b>23</b><span>gated paths</span></div>
            </div>

            <div className="go cv">
              <a className="primary" href={CV_URL} target="_blank" rel="noopener noreferrer">download cv <i aria-hidden="true">↓</i></a>
            </div>
          </div>

          <figure
            className={`shot${CUTOUT ? ' cut' : ''}`}
            style={CUTOUT ? { '--cut': `url(${CUT_MASK})` } : undefined}
          >
            <span className="rail" aria-hidden="true">production agentic AI</span>
            <div className="shot-in">
              <img
                src={CUTOUT || portrait}
                alt="Portrait of Ashrafali M."
                width={CUTOUT ? 1040 : 720}
                height={CUTOUT ? 1299 : 900}
              />
              <span className="scan" aria-hidden="true" />
              <figcaption>
                <span>emb 63/63 · origin</span>
                <span>Manama · AST</span>
              </figcaption>
            </div>
          </figure>
        </div>

        {/* ── the console ── */}
        <div className="console" id="console">
          <div className="c-head">
            <span className={`pulse${state === 'thinking' ? ' think' : ''}`} aria-hidden="true" />
            <span>{AGENT.name}</span>
            <span className="sep" aria-hidden="true">·</span>
            <b className={`st st-${state}`}>{state}</b>
            <span className="sep" aria-hidden="true">·</span>
            <span className="turns">{turns.filter((t) => t.role === 'you').length} asked</span>
            <span className="right"><span className="loc">Manama · </span>{clock}</span>
          </div>

          <div className="c-main">
            <div className="tape" ref={tapeRef} aria-live="polite" aria-atomic="false">
              {turns.map((t) =>
                t.role === 'you' ? (
                  <div className="turn you" key={t.id}>
                    <div className="who">you</div>
                    <div className="q"><i aria-hidden="true">›</i><span>{t.text}</span></div>
                  </div>
                ) : (
                  <div className={`turn bot${t.thinking ? ' think' : ''}`} key={t.id}>
                    <div className="who">
                      {t.thinking ? (
                        <>
                          <span>thinking</span>
                          <span className="think-dots" aria-hidden="true"><i /><i /><i /></span>
                        </>
                      ) : (
                        AGENT.name
                      )}
                    </div>
                    {t.thinking ? null : t.streaming ? (
                      <Stream text={t.text} onDone={settle} />
                    ) : (
                      <div className="a">{parse(t.text)}</div>
                    )}
                    {t.goto && !t.thinking && (
                      <button className="chip" onClick={() => onGo(t.goto)} style={{ alignSelf: 'flex-start', marginLeft: 14 }}>
                        // open {sectionLabel(t.goto)} ↓
                      </button>
                    )}
                  </div>
                )
              )}
            </div>

            <form className="prompt" onSubmit={submit}>
              <div className="p-row">
                <i aria-hidden="true">›</i>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={busy ? 'answering…' : 'ask about the work…'}
                  aria-label="Ask the agent"
                  spellCheck="false"
                  autoComplete="off"
                />
                <button type="button" className="p-send p-k" onClick={onPalette}>⌘K</button>
                <button type="submit" className="p-send" disabled={busy}>send</button>
              </div>
              <div className="chips">
                {SUGGESTED.map((id) => {
                  const intent = INTENTS.find((i) => i.id === id)
                  return (
                    <button type="button" className="chip" key={id} onClick={() => askIntent(id)} disabled={busy}>
                      {intent.q}
                    </button>
                  )
                })}
              </div>
            </form>
          </div>

          <div className="c-side">
            <AgentGraph active={busy} onPick={(code) => { if (!busy) askDomain(code) }} />
          </div>
        </div>
      </div>
    </section>
  )
}
