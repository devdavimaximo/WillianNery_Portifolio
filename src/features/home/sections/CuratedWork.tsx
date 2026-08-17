import { Container, Figure, WallLabel } from '../../../components'
import { copy } from '../../../content/copy'
import { useStaggerReveal } from '../../../hooks/useStaggerReveal'
import styles from './CuratedWork.module.css'

/**
 * Provisional curation — six photographs across both fronts, chosen to show the range
 * the work actually has: backlit interiors, autumn, black and white. The selection is
 * ours until William makes his own (PENDENCIAS.md); the site is a landing page, so the
 * bar is impact, not coverage.
 */
const SELECTION = [
  { slug: 'portifolio_willian_casamento10', category: 'wedding' },
  { slug: 'portifolio_willian_ensaio12', category: 'session' },
  { slug: 'portifolio_willian_ensaio3', category: 'session' },
  { slug: 'portifolio_willian_casamento12', category: 'wedding' },
  { slug: 'portifolio_willian_ensaio15', category: 'session' },
  { slug: 'portifolio_willian_ensaio8', category: 'session' },
] as const

const CATEGORY_KEY = {
  wedding: 'portfolio.category.wedding',
  session: 'portfolio.category.session',
} as const

/** Matches the grid spans in the stylesheet, so the browser fetches the right variant. */
const SIZES = [
  '(min-width: 64rem) 44vw',
  '(min-width: 48rem) 46vw',
  '92vw',
].join(', ')

const WIDE_SIZES = '(min-width: 48rem) 62vw, 92vw'

export function CuratedWork() {
  const grid = useStaggerReveal<HTMLDivElement>(`.${styles.item}`)

  // Named by its own category labels — the section has no invented title.
  return (
    <section id="trabalho" className={styles.section} aria-labelledby="cat-wedding cat-session">
      <Container>
        <div className={styles.categories}>
          <WallLabel id="cat-wedding" parts={[copy('portfolio.category.wedding')]} emphasis />
          <WallLabel id="cat-session" parts={[copy('portfolio.category.session')]} emphasis />
        </div>

        <div className={styles.grid} ref={grid}>
          {SELECTION.map((photo, index) => (
            <div key={photo.slug} className={styles.item}>
              <Figure
                slug={photo.slug}
                alt={copy(`image.${photo.slug}.alt`)}
                sizes={index === 2 ? WIDE_SIZES : SIZES}
                label={[copy(CATEGORY_KEY[photo.category])]}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
