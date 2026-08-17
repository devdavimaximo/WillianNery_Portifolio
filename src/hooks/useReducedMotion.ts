import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tracks the user's motion preference and keeps following it if they change the
 * system setting mid-session.
 *
 * Starts as `false` so the prerendered HTML and the first client render agree;
 * the real value lands on the first effect, before any animation is allowed to
 * start. GSAP timelines should still use `gsap.matchMedia()` (see
 * src/animations/motion.ts) — this hook is for React-side decisions such as not
 * mounting an animated wrapper at all.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    setPrefersReduced(media.matches)

    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    media.addEventListener('change', onChange)

    return () => media.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}
