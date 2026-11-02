import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from '../lib/motion.js'
import { DOMAINS } from './script.js'

/* ==========================================================================
   THE AGENT MESH: the site's one signature visual.
   The 7 pieces of the AI layer at ASKRE around a single gateway hub: every
   LLM call routes through one gateway rather than its own model integration. Messages travel the edges; when the agent is
   answering, traffic accelerates and shifts to the thinking colour.

   Canvas 2D, ~7kB, no three.js. Replaces the old particle cloud (450kB).
   ========================================================================== */

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

/* Canvas can't read CSS custom properties, so the mesh samples them from the
   document once per theme. Hardcoding the dark values would leave lime pulses
   and white edges on a white page. */
function readTokens(el) {
  const cs = getComputedStyle(el || document.documentElement)
  const parse = (name, fallback) => {
    const v = cs.getPropertyValue(name).trim()
    const m = v.match(/^#([0-9a-f]{6})$/i)
    if (!m) return fallback
    const n = parseInt(m[1], 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  }
  return {
    acid: parse('--acid-ink', [184, 255, 60]),
    think: parse('--think', [139, 92, 246]),
    ink: parse('--mesh-ink', [255, 255, 255]),
    inkAlpha: parseFloat(cs.getPropertyValue('--mesh-alpha')) || 1,
  }
}

export default function AgentGraph({ active = false, onPick, theme }) {
  const cvRef = useRef(null)
  const [hover, setHover] = useState(null)
  const activeRef = useRef(active)
  const pickRef = useRef(onPick)
  const hoverRef = useRef(null)
  activeRef.current = active
  pickRef.current = onPick

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const { acid: ACID, think: THINK, ink: INK, inkAlpha: INK_A } = readTokens(cv)
    const reduce = prefersReduced()

    let w = 0, h = 0, dpr = 1
    let raf = null
    let disposed = false

    /* --- topology: gateway at centre, domains on a jittered ring --- */
    const nodes = DOMAINS.map((d, i) => {
      const a = (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2
      return { code: d.code, label: d.code, a, r: 0.82 + ((i * 37) % 11) / 45, x: 0, y: 0, lit: 0 }
    })
    const gate = { x: 0, y: 0, lit: 0 }

    /* a few lateral edges, so it reads as a mesh and not a star */
    const lateral = [[0, 2], [1, 4], [3, 5], [2, 6]]

    const pulses = []
    const spawn = () => {
      const lateralHop = Math.random() < 0.28
      if (lateralHop) {
        const [a, b] = lateral[(Math.random() * lateral.length) | 0]
        pulses.push({ from: nodes[a], to: nodes[b], t: 0, sp: 0.5 + Math.random() * 0.4 })
      } else {
        const n = nodes[(Math.random() * nodes.length) | 0]
        const up = Math.random() < 0.5
        pulses.push({ from: up ? n : gate, to: up ? gate : n, t: 0, sp: 0.55 + Math.random() * 0.5, node: n })
      }
    }

    const layout = () => {
      const box = cv.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = box.width; h = box.height
      cv.width = Math.max(1, Math.round(w * dpr))
      cv.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cx = w / 2, cy = h / 2
      const ring = Math.min(w, h) * 0.335
      gate.x = cx; gate.y = cy
      nodes.forEach((n) => {
        n.x = cx + Math.cos(n.a) * ring * n.r
        n.y = cy + Math.sin(n.a) * ring * n.r
      })
    }

    const edge = (a, b, alpha) => {
      ctx.strokeStyle = rgba(INK, alpha * INK_A)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }

    let last = performance.now()
    let acc = 0

    const draw = (now) => {
      if (disposed) return
      if (!w || !h) { raf = requestAnimationFrame(draw); return }
      const dt = Math.min(64, now - last)
      last = now
      const hot = activeRef.current
      const col = hot ? THINK : ACID

      ctx.clearRect(0, 0, w, h)

      /* edges */
      const small = Math.min(w, h) < 260
      nodes.forEach((n) => edge(gate, n, small ? 0.085 : 0.055))
      lateral.forEach(([a, b]) => edge(nodes[a], nodes[b], small ? 0.055 : 0.035))

      /* spawn traffic */
      if (!reduce) {
        acc += dt
        const every = hot ? 90 : 320
        while (acc > every) { acc -= every; if (pulses.length < 46) spawn() }
      } else if (pulses.length === 0) {
        for (let i = 0; i < 6; i++) { spawn(); pulses[i].t = 0.3 + i * 0.1 }
      }

      /* pulses */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        if (!reduce) p.t += (dt / 1000) * p.sp * (hot ? 1.9 : 1)
        if (p.t >= 1) {
          if (p.node) p.node.lit = 1
          gate.lit = Math.max(gate.lit, p.node ? 0.7 : 1)
          pulses.splice(i, 1)
          continue
        }
        const x = p.from.x + (p.to.x - p.from.x) * p.t
        const y = p.from.y + (p.to.y - p.from.y) * p.t

        /* a short comet tail along the edge */
        const tl = Math.max(0, p.t - 0.13)
        const tx = p.from.x + (p.to.x - p.from.x) * tl
        const ty = p.from.y + (p.to.y - p.from.y) * tl
        const g = ctx.createLinearGradient(tx, ty, x, y)
        g.addColorStop(0, rgba(col, 0))
        g.addColorStop(1, rgba(col, hot ? 0.75 : 0.5))
        ctx.strokeStyle = g
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.fillStyle = rgba(col, hot ? 0.95 : 0.75)
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      /* domain nodes */
      const showLabels = w > 300
      nodes.forEach((n) => {
        if (!reduce) n.lit *= 0.955
        const lit = n.lit
        ctx.fillStyle = lit > 0.05 ? rgba(col, 0.25 + lit * 0.7) : rgba(INK, 0.34 * INK_A)
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.2 + lit * 1.6, 0, Math.PI * 2)
        ctx.fill()

        if (lit > 0.04) {
          ctx.strokeStyle = rgba(col, lit * 0.32)
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(n.x, n.y, 5 + (1 - lit) * 9, 0, Math.PI * 2)
          ctx.stroke()
        }

        const isHover = hoverRef.current === n.code
        if (isHover) {
          ctx.strokeStyle = rgba(col, 0.55)
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(n.x, n.y, 9, 0, Math.PI * 2)
          ctx.stroke()
        }

        if (showLabels) {
          const out = n.x > gate.x + 4 ? 1 : n.x < gate.x - 4 ? -1 : 0
          ctx.font = `${isHover ? 600 : 500} ${isHover ? 9.5 : 8.5}px "JetBrains Mono",monospace`
          ctx.textAlign = out === 0 ? 'center' : out > 0 ? 'left' : 'right'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = isHover ? rgba(col, 1) : lit > 0.08 ? rgba(col, 0.55 + lit * 0.45) : rgba(INK, 0.45 * INK_A)
          ctx.fillText(n.label, n.x + out * (isHover ? 12 : 9), n.y + (out === 0 ? (n.y < gate.y ? -10 : 10) : 0))
        }
      })

      /* the gateway */
      if (!reduce) gate.lit *= 0.94
      const gl = gate.lit
      ctx.strokeStyle = rgba(col, 0.2 + gl * 0.5)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.rect(gate.x - 7, gate.y - 7, 14, 14)
      ctx.stroke()
      ctx.fillStyle = rgba(col, 0.35 + gl * 0.55)
      ctx.beginPath()
      ctx.rect(gate.x - 2.5, gate.y - 2.5, 5, 5)
      ctx.fill()

      if (!reduce) raf = requestAnimationFrame(draw)
    }

    /* ---- picking: the nodes are the only interactive thing on the canvas,
            so a nearest-hit test with a touch-sized radius is enough ---- */
    const HIT = 26
    const nodeAt = (ev) => {
      const box = cv.getBoundingClientRect()
      const px = ev.clientX - box.left
      const py = ev.clientY - box.top
      let best = null
      let bestD = HIT
      for (const n of nodes) {
        const d = Math.hypot(n.x - px, n.y - py)
        if (d < bestD) { bestD = d; best = n }
      }
      return best
    }

    const onMove = (ev) => {
      const n = nodeAt(ev)
      const code = n ? n.code : null
      if (code !== hoverRef.current) {
        hoverRef.current = code
        setHover(code)
        cv.style.cursor = code ? 'pointer' : 'default'
      }
      if (n) n.lit = Math.max(n.lit, 0.85)
    }
    const onLeave = () => {
      hoverRef.current = null
      setHover(null)
      cv.style.cursor = 'default'
    }
    const onClick = (ev) => {
      const n = nodeAt(ev)
      if (n && pickRef.current) {
        n.lit = 1
        gate.lit = 1
        pickRef.current(n.code)
      }
    }
    cv.addEventListener('pointermove', onMove)
    cv.addEventListener('pointerleave', onLeave)
    cv.addEventListener('click', onClick)

    layout()
    raf = requestAnimationFrame(draw)

    const ro = new ResizeObserver(() => {
      layout()
      if (reduce) draw(performance.now())
    })
    ro.observe(cv)

    return () => {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      cv.removeEventListener('pointermove', onMove)
      cv.removeEventListener('pointerleave', onLeave)
      cv.removeEventListener('click', onClick)
    }
  }, [theme])

  return (
    <div className="mesh">
      <canvas ref={cvRef} aria-hidden="true" />
      <div className="mesh-cap">
        <span>
          {hover
            ? <><b>{hover}</b> · tap to ask</>
            : <><b>mesh</b> · tap a project</>}
        </span>
        <span>{active ? 'routing' : `${DOMAINS.length} projects`}</span>
      </div>
    </div>
  )
}
