import { Container, Figure, Essay } from '../../../components'
import { copy } from '../../../content/copy'
import styles from './BioSection.module.css'

/**
 * Bio + portrait. Editorial layout: text on one side, photo on the other (desktop),
 * stacked on mobile.
 */
export function BioSection() {
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <Container>
        <div className={styles.layout}>
          <div className={styles.text}>
            <h1 id="about-title" className={styles.title}>
              {copy('site.brand')}
            </h1>
            <Essay>{copy('about.bio')}</Essay>
          </div>

          <div className={styles.photo}>
            <Figure
              slug="img_willian_sobre"
              alt="Retrato de William Nery, fotógrafo"
              sizes="(min-width: 64rem) 40vw, 92vw"
              ratio="1 / 1"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
