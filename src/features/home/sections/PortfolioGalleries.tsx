import { useRef, useState } from 'react'
import { Container, Figure } from '../../../components'
import { copy } from '../../../content/copy'
import { Lightbox } from '../../../components/Lightbox/Lightbox'
import type { LightboxImage } from '../../../components/Lightbox/Lightbox'
import styles from './PortfolioGalleries.module.css'

// All photos in one portfolio, mixed categories
const ALL_PORTFOLIO: string[] = [
  'portifolio_willian_casamento8',
  'portifolio_willian_ensaio3',
  'portifolio_willian_casamento10',
  'portifolio_willian_ensaio12',
  'portifolio_willian_casamento12',
  'portifolio_willian_ensaio8',
  'portifolio_willian_casamento15',
  'portifolio_willian_ensaio15',
  'portifolio_willian_casamento9',
  'portifolio_willian_ensaio10',
  'portifolio_willian_casamento7',
  'portifolio_willian_ensaio2',
  'portifolio_willian_ensaio11',
  'portifolio_willian_casamento11',
  'portifolio_willian_ensaio14',
  'portifolio_willian_casamento13',
]

export function PortfolioGalleries() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const gridRef = useRef<HTMLDivElement>(null)

  const lightboxImages: LightboxImage[] = ALL_PORTFOLIO.map((slug) => ({
    slug,
    alt: copy(`image.${slug}.alt`),
    category: 'Portfólio',
  }))

  return (
    <section
      className={styles.section}
      id="portfolio-wedding"
      aria-label="Portfólio completo"
    >
      <Container>
        <div className={styles.grid} ref={gridRef}>
          {ALL_PORTFOLIO.map((slug, idx) => (
            <div
              key={slug}
              className={styles.photo}
              role="button"
              tabIndex={0}
              onClick={() => {
                setLightboxIndex(idx)
                setLightboxOpen(true)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightboxIndex(idx)
                  setLightboxOpen(true)
                }
              }}
              aria-label={`Abrir foto ${idx + 1}`}
            >
              <Figure
                slug={slug}
                alt={copy(`image.${slug}.alt`)}
                sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 92vw"
                ratio="4 / 5"
              />
            </div>
          ))}
        </div>
      </Container>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  )
}
