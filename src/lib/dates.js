/* Role dates are authored as 'YYYY-MM' and every label is derived, so nothing
   goes stale. An open-ended role passes end = null and is measured against
   today, which is the whole point: "9 mo" was written in July 2026 and was
   already wrong by September.

   Month counting is inclusive, matching how LinkedIn and CVs read: Sep 2024 to
   Mar 2025 is 7 months, not 6. */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parse(ym) {
  const [y, m] = ym.split('-').map(Number)
  return { y, m } // m is 1-12
}

/** '2025-11' → 'Nov 2025' */
export function formatMonth(ym) {
  const { y, m } = parse(ym)
  return `${MONTHS[m - 1]} ${y}`
}

/** Inclusive month count between two 'YYYY-MM' values. end omitted = now. */
export function monthSpan(start, end) {
  const a = parse(start)
  const b = end ? parse(end) : (() => {
    const now = new Date()
    return { y: now.getFullYear(), m: now.getMonth() + 1 }
  })()
  return Math.max(1, (b.y - a.y) * 12 + (b.m - a.m) + 1)
}

/** 11 → '11 mo'; 12 → '1 yr'; 14 → '1 yr 2 mo' */
export function formatSpan(months) {
  const yrs = Math.floor(months / 12)
  const mos = months % 12
  if (!yrs) return `${mos} mo`
  if (!mos) return `${yrs} yr`
  return `${yrs} yr ${mos} mo`
}

/** The label under a role's dates, e.g. '11 mo'. */
export function duration(start, end) {
  return formatSpan(monthSpan(start, end))
}

/** 'YYYY-MM' → absolute month index, for positioning on a time axis. */
export function monthIndex(ym) {
  const { y, m } = parse(ym)
  return y * 12 + (m - 1)
}

/** Today as an absolute month index. */
export function nowIndex() {
  const n = new Date()
  return n.getFullYear() * 12 + n.getMonth()
}

/** The Januaries between two month indexes, for axis ticks. */
export function yearTicks(fromIdx, toIdx) {
  const out = []
  for (let i = Math.ceil(fromIdx / 12) * 12; i <= toIdx; i += 12) out.push({ idx: i, year: i / 12 })
  return out
}
