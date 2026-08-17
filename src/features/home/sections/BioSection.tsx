import { Figure, Essay } from '../../../components'
import { copy } from '../../../content/copy'
import styles from './BioSection.module.css'

export function BioSection() {
  return (
    <section className={styles.section} id="sobre" aria-labelledby="bio-title">
      <div className={styles.layout}>
        <div className={styles.text}>
          <h2 id="bio-title" className={styles.title}>
            Sobre {copy('site.brand')}
          </h2>
          <Essay>{copy('about.bio')}</Essay>
        </div>

        <div className={styles.photo}>
          <Figure
            slug="image"
            alt="Retrato de William Nery, fotógrafo"
            sizes="(min-width: 64rem) 40vw, 92vw"
            ratio="1 / 1"
          />
        </div>
      </div>
    </section>
  )
}
