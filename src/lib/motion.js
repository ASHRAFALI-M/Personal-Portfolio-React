/* One place that asks about reduced motion, and survives an environment
   without matchMedia (jsdom, very old browsers) instead of taking the whole
   page down with it, three components depend on this answer at render time. */
export function prefersReduced() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}
