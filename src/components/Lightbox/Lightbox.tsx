import { useEffect, useState } from 'react'
import { Figure } from '../Figure/Figure'
import styles from './Lightbox.module.css'

export interface LightboxImage {
  slug: string
  alt: string
  category: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  onClose: () => void
}

/**
 * Fullscreen lightbox with dark theme (Câmara Escura).
 * Prefers-reduced-motion respected; navigation via arrow keys or buttons.
 */
export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
      if (e.key === 'ArrowRight') setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length, onClose])

  const current = images[index]

  return (
    <div className={styles.backdrop} onClick={onClose} data-theme="dark">
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.figure}>
          <Figure
            slug={current.slug}
            alt={current.alt}
            sizes="100vw"
            ratio="4 / 3"
            priority
          />
        </div>

        <div className={styles.info}>
          <p className={styles.counter}>
            {index + 1} / {images.length}
          </p>
          <p className={styles.category}>{current.category}</p>
        </div>

        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Fechar galeria"
        >
          ✕
        </button>

        {images.length > 1 && (
          <div className={styles.nav}>
            <button
              className={styles.prev}
              onClick={() =>
                setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
              }
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              className={styles.next}
              onClick={() =>
                setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
              }
              aria-label="Próxima foto"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
