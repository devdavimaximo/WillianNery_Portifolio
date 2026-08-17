import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Motion primitives for the "Passe-Partout" system.
 *
 * House rules, enforced here so no caller has to remember them:
 * - only `transform` and `opacity` are animated — nothing that forces reflow;
 * - every timeline is built inside a `gsap.matchMedia()` so the reduced-motion
 *   variant is a real alternative, not a disabled animation;
 * - callers get a cleanup function back and must call it on unmount.
 *
 * Durations and easings mirror the CSS custom properties in styles/tokens.css.
 * They are duplicated here rather than read from the DOM so a timeline can be
 * built before first paint without forcing a style recalculation.
 */

export const EASE = {
  /** Photo and hero entrance — long, expo-like settle. */
  reveal: 'expo.out',
  /** Hover, focus, button, menu. */
  quiet: 'power2.out',
  /** Reveal veil, lightbox, route change. */
  veil: 'power3.inOut',
} as const

export const DURATION = {
  d1: 0.18,
  d2: 0.32,
  d3: 0.62,
  d4: 1.1,
  /** Exit reads ~65% of entrance so the UI stays responsive. */
  exit: 0.21,
} as const

export const STAGGER = 0.06

const MOTION_OK = '(prefers-reduced-motion: no-preference)'
const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'

let registered = false

/** ScrollTrigger touches `window`, so registration is deferred to the client. */
export function registerScrollTrigger(): void {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export interface PhotoRevealTargets {
  /** The element that carries the photograph; scales down into place. */
  image: HTMLElement
  /** The mat-coloured veil that slides off the photograph. */
  veil: HTMLElement
  /** Scroll trigger element — usually the figure itself. */
  trigger: HTMLElement
}

/**
 * The signature move: a print being revealed. The veil slides up off the image
 * while the image relaxes from a slight overscale into place.
 *
 * The reduced-motion variant is handled entirely in CSS: the veil's covering
 * state only exists inside `@media (prefers-reduced-motion: no-preference)`, so
 * these readers get the photograph present from the first paint and no timeline
 * is ever built for them. Registering one here would only add a ScrollTrigger
 * with nothing to do.
 *
 * @returns cleanup that kills the timeline and its ScrollTrigger.
 */
export function createPhotoReveal({ image, veil, trigger }: PhotoRevealTargets): () => void {
  registerScrollTrigger()

  const media = gsap.matchMedia()

  media.add(MOTION_OK, () => {
    gsap.set(image, { scale: 1.06 })
    gsap.set(veil, { yPercent: 0 })

    const timeline = gsap.timeline({
      scrollTrigger: { trigger, start: 'top 85%', once: true },
    })

    timeline
      .to(veil, { yPercent: -101, duration: DURATION.d3, ease: EASE.veil })
      .to(image, { scale: 1, duration: DURATION.d4, ease: EASE.reveal }, 0)
  })

  return () => media.revert()
}

/**
 * Staggered entrance for a group of siblings (gallery grid, service list).
 * Distance shrinks to zero under reduced motion; only opacity remains.
 *
 * @returns cleanup that kills the timelines and their ScrollTriggers.
 */
export function createStaggerReveal(container: HTMLElement, items: string): () => void {
  registerScrollTrigger()

  const media = gsap.matchMedia()

  const build = (distance: number) => () => {
    const targets = container.querySelectorAll<HTMLElement>(items)
    if (targets.length === 0) return

    gsap.from(targets, {
      opacity: 0,
      y: distance,
      duration: DURATION.d3,
      ease: EASE.reveal,
      stagger: STAGGER,
      scrollTrigger: { trigger: container, start: 'top 85%', once: true },
    })
  }

  media.add(MOTION_OK, build(24))
  media.add(MOTION_REDUCED, build(0))

  return () => media.revert()
}
