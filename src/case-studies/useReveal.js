import { useEffect, useRef } from 'react'

/* The case studies' scroll-reveal (was public/case-studies/case-study.js),
   as a hook: reveal .reveal elements on scroll, once. Returns the ref to
   put on the .cs-root wrapper. */
export function useReveal() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return rootRef
}
