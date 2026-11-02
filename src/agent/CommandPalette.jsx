import { useEffect, useMemo, useRef, useState } from 'react'
import { INTENTS, SECTIONS, CASES, DOMAINS } from './script.js'

/* ⌘K. Also the only place the five case studies are reachable by keyboard,
   and one of two places they're reachable at all (the other being the Work
   records), before the redesign nothing linked to them. */

export default function CommandPalette({ open, onClose, onAsk, onAskDomain, onGo }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const items = useMemo(() => {
    const all = [
      ...INTENTS.map((i) => ({ kind: 'ask', id: i.id, label: i.q, hint: 'ask' })),
      ...DOMAINS.map((d) => ({ kind: 'domain', id: d.code, label: d.q, hint: d.label.toLowerCase() })),
      ...SECTIONS.map((s) => ({ kind: 'go', id: s.id, label: s.label, hint: s.hint })),
      ...CASES.map((c) => ({ kind: 'case', id: c.hash, label: c.label, hint: c.hint })),
    ]
    const needle = q.toLowerCase().trim()
    if (!needle) return all
    return all.filter((it) => (it.label + ' ' + it.hint).toLowerCase().includes(needle))
  }, [q])

  useEffect(() => { setSel(0) }, [q])

  useEffect(() => {
    if (open) {
      setQ('')
      setSel(0)
      // focus after the mount animation starts, so iOS doesn't fight the transform
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = prev }
  }, [open])

  // keep the highlighted row in view while arrowing through a filtered list
  useEffect(() => {
    listRef.current?.querySelector('.pal-item.on')?.scrollIntoView({ block: 'nearest' })
  }, [sel, q])

  if (!open) return null

  const run = (item) => {
    onClose()
    if (!item) return
    if (item.kind === 'ask') onAsk(item.id)
    else if (item.kind === 'domain') onAskDomain(item.id)
    else if (item.kind === 'go') onGo(item.id)
    else window.location.hash = item.id
  }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(items.length - 1, s + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)) }
    else if (e.key === 'Enter') { e.preventDefault(); run(items[sel]) }
    else if (e.key === 'Escape') { e.preventDefault(); onClose() }
  }

  let group = null

  return (
    <div id="pal" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => { if (e.target.id === 'pal') onClose() }}>
      <div className="pal-box">
        <div className="pal-in">
          <i aria-hidden="true">›</i>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="ask the agent, or jump to a section…"
            aria-label="Search commands"
          />
          <kbd>esc</kbd>
        </div>

        <div className="pal-list" ref={listRef}>
          {items.length === 0 && <div className="pal-empty">Nothing matches “{q}”.</div>}
          {items.map((it, i) => {
            const head = it.kind !== group ? (group = it.kind) : null
            return (
              <div key={it.kind + it.id}>
                {head && (
                  <div className="pal-group">
                    {head === 'ask' ? 'Ask' : head === 'domain' ? 'The 7 projects' : head === 'go' ? 'Jump to' : 'Case studies'}
                  </div>
                )}
                <button
                  className={`pal-item${i === sel ? ' on' : ''}`}
                  onMouseEnter={() => setSel(i)}
                  onClick={() => run(it)}
                >
                  <span className="k" aria-hidden="true">{it.kind === 'ask' ? '›' : it.kind === 'domain' ? '◆' : it.kind === 'go' ? '//' : '↗'}</span>
                  <span>{it.label}</span>
                  <span className="sub">{it.hint}</span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="pal-foot">
          <span>↑↓ navigate</span><span>↵ select</span><span>esc close</span>
        </div>
      </div>
    </div>
  )
}
