import { useEffect, useRef } from 'react'

/**
 * Staggers the entrance of a group of siblings once the container scrolls into view.
 *
 * Like the photo reveal, GSAP is imported inside the effect so the animation engine
 * stays out of the initial bundle.
 *
 * `selector` targets children by class rather than by index, so a re-render never
 * re-targets the wrong element. The timeline is reverted on unmount.
 */
export function useStaggerReveal<T extends HTMLElement>(selector: string) {
  const container = useRef<T | null>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false

    void import('../animations/motion').then(({ createStaggerReveal }) => {
      if (cancelled || !container.current) return
      cleanup = createStaggerReveal(container.current, selector)
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [selector])

  return container
}
