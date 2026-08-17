import { Head } from 'vite-react-ssg'
import { Button, Caption, Container, Display, Essay, Figure } from '../../../components'
import { copy, copyStatus, pendingNote } from '../../../content/copy'
import { getImage } from '../../../lib/images'
import styles from './Hero.module.css'

/** Provisional pick — the only landscape photograph in the set, so it is the one that
 *  fills a wide frame without being cropped. Art direction still to confirm. */
const HERO_SLUG = 'portifolio_willian_casamento8'

/**
 * Opening of the site: the photograph, then the headline under it.
 *
 * The primary call to action is deliberately inert while the real WhatsApp number is
 * missing — a button that goes nowhere is worse than a button that admits it is not
 * wired yet, and inventing a number is out of the question (CLAUDE.md §3).
 */
export function Hero() {
  const whatsappPending = copyStatus('contact.whatsapp.number') === 'PENDENTE'
  const hero = getImage(HERO_SLUG)

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/**
       * The only image on the site allowed to preload (CLAUDE.md §5.2). The srcset is
       * the same one the <picture> uses, so the browser preloads exactly the variant
       * it will end up rendering instead of a second file.
       */}
      <Head>
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet={hero.srcSet.avif}
          imageSizes="100vw"
          fetchPriority="high"
        />
      </Head>

      <Container width="bleed">
        <div className={styles.photo}>
          <Figure
            slug={HERO_SLUG}
            alt={copy(`image.${HERO_SLUG}.alt`)}
            sizes="100vw"
            ratio="var(--hero-ratio)"
            priority
            flush
          />
        </div>
      </Container>

      <Container>
        <div className={styles.text}>
          <Display id="hero-title">{copy('home.hero.headline')}</Display>
          <Essay>{copy('home.hero.subtitle')}</Essay>
        </div>

        <div className={styles.actions}>
          {whatsappPending ? (
            <Button variant="primary" disabled aria-describedby="cta-pending">
              {copy('home.cta.primary')}
            </Button>
          ) : (
            <Button variant="primary" href={copy('contact.whatsapp.number')}>
              {copy('home.cta.primary')}
            </Button>
          )}

          <Button href="#trabalho" variant="quiet">
            {copy('home.cta.secondary')}
          </Button>
        </div>

        {whatsappPending && (
          <div className={styles.blocked} id="cta-pending">
            <Caption>{pendingNote('contact.whatsapp.number')}</Caption>
          </div>
        )}
      </Container>
    </section>
  )
}
