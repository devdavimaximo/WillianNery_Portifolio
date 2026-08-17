import { useState } from 'react'
import { Container, Figure, WallLabel } from '../../../components'
import { copy } from '../../../content/copy'
import { Lightbox } from '../../../components/Lightbox/Lightbox'
import type { LightboxImage } from '../../../components/Lightbox/Lightbox'
import { useStaggerReveal } from '../../../hooks/useStaggerReveal'
import styles from './PortfolioGalleries.module.css'

type Category = 'wedding' | 'session' | 'prewedding'

const GALLERIES_DATA: Record<Category, { label: string; slugs: string[] }> = {
  wedding: {
    label: 'Casamento',
    slugs: [
      'portifolio_willian_casamento8',
      'portifolio_willian_casamento10',
      'portifolio_willian_casamento12',
      'portifolio_willian_casamento15',
      'portifolio_willian_casamento9',
      'portifolio_willian_casamento7',
    ],
  },
  session: {
    label: 'Ensaio',
    slugs: [
      'portifolio_willian_ensaio3',
      'portifolio_willian_ensaio8',
      'portifolio_willian_ensaio12',
      'portifolio_willian_ensaio15',
      'portifolio_willian_ensaio10',
      'portifolio_willian_ensaio2',
    ],
  },
  prewedding: {
    label: 'Pré-Wedding',
    slugs: [
      'portifolio_willian_ensaio11',
      'portifolio_willian_casamento11',
      'portifolio_willian_ensaio14',
      'portifolio_willian_casamento13',
    ],
  },
}

export function PortfolioGalleries() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxCategory, setLightboxCategory] = useState<Category>('wedding')
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const gridRef = useStaggerReveal<HTMLDivElement>(`.${styles.photo}`)

  const buildLightboxImages = (category: Category): LightboxImage[] => {
    return GALLERIES_DATA[category].slugs.map((slug) => ({
      slug,
      alt: copy(`image.${slug}.alt`),
      category: GALLERIES_DATA[category].label,
    }))
  }

  const categories = Object.entries(GALLERIES_DATA) as Array<[Category, typeof GALLERIES_DATA[Category]]>

  return (
    <>
      {categories.map(([key, { label, slugs }]) => (
        <section
          key={key}
          className={styles.section}
          id={`portfolio-${key}`}
          aria-labelledby={`portfolio-${key}-title`}
        >
          <Container>
            <WallLabel
              id={`portfolio-${key}-title`}
              parts={[label]}
              emphasis
            />

            <div className={styles.grid} ref={gridRef}>
              {slugs.map((slug, idx) => (
                <div
                  key={slug}
                  className={styles.photo}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setLightboxCategory(key)
                    setLightboxIndex(idx)
                    setLightboxOpen(true)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setLightboxCategory(key)
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
        </section>
      ))}

      {lightboxOpen && (
        <Lightbox
          images={buildLightboxImages(lightboxCategory)}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
