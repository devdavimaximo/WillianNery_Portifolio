import type { CSSProperties, ReactNode } from 'react'
import { usePhotoReveal } from '../../hooks/usePhotoReveal'
import { getImage } from '../../lib/images'
import { Caption } from '../Text/Text'
import { WallLabel } from '../WallLabel/WallLabel'
import styles from './Figure.module.css'

interface FigureBaseProps {
  /** Wall-label line: category · place · year. */
  label?: string[]
  caption?: ReactNode
  /** Full-bleed variant — drops the mat entirely. For the hero only. */
  flush?: boolean
  /** Aspect ratio of the plate, e.g. `'4 / 5'`. Derived from the file when omitted. */
  ratio?: string
  className?: string
}

interface PhotoProps extends FigureBaseProps {
  /** Manifest slug — the file name in public/images/ without its extension. */
  slug: string
  /**
   * Descriptive alt text. Required — a photographer's site lives on image search
   * and this is also what feeds `ImageObject` in F6.
   */
  alt: string
  /** How wide the photo renders, so the browser picks the right variant. */
  sizes?: string
  /**
   * Hero image: loads eagerly, is never covered by a reveal veil, and is the only
   * image on a page allowed to preload.
   */
  priority?: boolean
  pending?: never
}

interface PendingProps extends FigureBaseProps {
  /**
   * What is missing and for which section, mirroring the entry in PENDENCIAS.md.
   * Renders the solid colour block required by CLAUDE.md §4 — never a stock or
   * placeholder image.
   */
  pending: string
  slug?: never
  alt?: never
  sizes?: never
  priority?: never
}

type FigureProps = PhotoProps | PendingProps

const DEFAULT_RATIO = '4 / 5'
const DEFAULT_SIZES = '100vw'

/**
 * A photograph mounted the way a print is mounted: weighted mat, wall label, and a
 * reveal that behaves like a copy being uncovered.
 *
 * The browser is handed AVIF, then WebP, then the untouched original as the last
 * fallback — all derived at visually lossless quality, so no viewer ever sees a
 * degraded version of the photographer's work.
 *
 * With no photograph to show it renders the solid block the project requires, naming
 * the gap out loud rather than filling it with something that is not his work.
 */
export function Figure(props: FigureProps) {
  const { label, caption, flush = false, ratio, className } = props
  const isPending = props.pending !== undefined
  const isPriority = !isPending && props.priority === true

  // The hero is never veiled: it is the LCP element and must paint immediately.
  const revealing = !isPending && !isPriority
  const { root, image, veil } = usePhotoReveal(revealing)

  const photo = isPending ? null : getImage(props.slug)

  const plateStyle: CSSProperties = {
    aspectRatio: ratio ?? (photo ? `${photo.width} / ${photo.height}` : DEFAULT_RATIO),
    ...(photo ? { backgroundImage: `url(${photo.lqip})` } : null),
  }

  const classes = [styles.figure, flush && styles.flush, revealing && styles.revealing, className]
    .filter(Boolean)
    .join(' ')

  return (
    <figure ref={root as React.RefObject<HTMLElement>} className={classes}>
      <div className={styles.mat}>
        <div
          className={[styles.plate, isPending && styles.pending].filter(Boolean).join(' ')}
          style={plateStyle}
        >
          {photo === null ? (
            <p className={styles.pendingText}>{props.pending}</p>
          ) : (
            <>
              <picture>
                <source type="image/avif" srcSet={photo.srcSet.avif} sizes={props.sizes ?? DEFAULT_SIZES} />
                <source type="image/webp" srcSet={photo.srcSet.webp} sizes={props.sizes ?? DEFAULT_SIZES} />
                <img
                  ref={image as React.RefObject<HTMLImageElement>}
                  className={styles.image}
                  src={photo.src}
                  alt={props.alt}
                  width={photo.width}
                  height={photo.height}
                  loading={isPriority ? 'eager' : 'lazy'}
                  fetchPriority={isPriority ? 'high' : 'auto'}
                  decoding="async"
                />
              </picture>
              {revealing && (
                <span
                  ref={veil as React.RefObject<HTMLSpanElement>}
                  className={styles.veil}
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </div>

        {(label || caption) && (
          <figcaption className={styles.caption}>
            {label && <WallLabel parts={label} />}
            {caption && <Caption as="span">{caption}</Caption>}
          </figcaption>
        )}
      </div>
    </figure>
  )
}
