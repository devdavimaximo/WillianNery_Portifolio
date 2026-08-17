import { useEffect, useRef } from 'react'

interface PhotoRevealRefs {
  root: React.RefObject<HTMLElement | null>
  image: React.RefObject<HTMLElement | null>
  veil: React.RefObject<HTMLElement | null>
}

/**
 * Wires a figure's reveal timeline and tears it down on unmount.
 *
 * GSAP is pulled in dynamically, inside the effect: the reveal is an enhancement of
 * content that is already on screen, so the animation engine must not sit in the
 * initial bundle competing with the photograph it decorates.
 *
 * `enabled` is read once per mount rather than watched, so toggling it never leaves a
 * half-played timeline behind: when it is false nothing is ever created.
 *
 * The pre-reveal state (veil covering, image overscaled) is declared in CSS, so the
 * prerendered HTML never paints an uncovered photo that then snaps back.
 */
export function usePhotoReveal(enabled: boolean): PhotoRevealRefs {
  const root = useRef<HTMLElement | null>(null)
  const image = useRef<HTMLElement | null>(null)
  const veil = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    void import('../animations/motion').then(({ createPhotoReveal }) => {
      if (cancelled || !root.current || !image.current || !veil.current) return
      cleanup = createPhotoReveal({
        trigger: root.current,
        image: image.current,
        veil: veil.current,
      })
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [enabled])

  return { root, image, veil }
}
