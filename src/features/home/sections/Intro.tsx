import { Container, Essay } from '../../../components'
import { copy } from '../../../content/copy'
import styles from './Intro.module.css'

/**
 * Editorial opening. One paragraph, set at the reading measure, with a lot of air
 * around it — the pause between the hero photograph and the work itself.
 */
export function Intro() {
  return (
    <section className={styles.section} aria-label={copy('site.name')}>
      <Container width="prose">
        <Essay className={styles.lead}>{copy('home.intro.body')}</Essay>
      </Container>
    </section>
  )
}
