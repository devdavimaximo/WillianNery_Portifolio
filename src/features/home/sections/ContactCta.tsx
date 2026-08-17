import { Button, Caption, Container, Title } from '../../../components'
import { copy, copyStatus, pendingNote } from '../../../content/copy'
import styles from './ContactCta.module.css'

/**
 * Closing call to action — the page's one job. It stays honest while the real channel
 * is missing: the button is present and inert, with the reason stated next to it,
 * instead of a link pointing nowhere.
 */
export function ContactCta() {
  const whatsappPending = copyStatus('contact.whatsapp.number') === 'PENDENTE'

  return (
    <section id="contato" className={styles.section} aria-labelledby="contato-title">
      <Container>
        <div className={styles.inner}>
          <Title id="contato-title" className={styles.line}>
            {copy('contact.cta.label')}
          </Title>

          {whatsappPending ? (
            <>
              <Button variant="primary" disabled aria-describedby="contato-pendente">
                {copy('home.cta.primary')}
              </Button>
              <div className={styles.blocked} id="contato-pendente">
                <Caption>{pendingNote('contact.whatsapp.number')}</Caption>
              </div>
            </>
          ) : (
            <Button variant="primary" href={copy('contact.whatsapp.number')}>
              {copy('home.cta.primary')}
            </Button>
          )}
        </div>
      </Container>
    </section>
  )
}
