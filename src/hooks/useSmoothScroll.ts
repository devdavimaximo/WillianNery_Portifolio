import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Ativa smooth scroll (Lenis) apenas quando o usuário não pediu
 * `prefers-reduced-motion: reduce` — variante calma cai no scroll nativo.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    let frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
