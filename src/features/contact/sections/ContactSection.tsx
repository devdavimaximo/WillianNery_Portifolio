import { Section, Button } from '../../../components'
import { copy } from '../../../content/copy'
import { TextLink } from '../../../components/TextLink/TextLink'
import styles from './ContactSection.module.css'

/**
 * Contact channels: WhatsApp CTA + Instagram link.
 * Whatsapp number and region are live from copy.md.
 */
export function ContactSection() {
  const whatsappUrl = copy('contact.whatsapp.number')
  const instagramUrl = copy('contact.instagram')
  const area = copy('contact.area')

  return (
    <Section eyebrow="Contato" title={copy('contact.cta.label')} ruled>
      <div className={styles.channels}>
        <div className={styles.channel}>
          <h3 className={styles.channelTitle}>WhatsApp</h3>
          <p className={styles.channelText}>
            Converse com William sobre sua data em {area}.
          </p>
          <Button
            variant="primary"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir WhatsApp
          </Button>
        </div>

        <div className={styles.channel}>
          <h3 className={styles.channelTitle}>Instagram</h3>
          <p className={styles.channelText}>
            Veja o trabalho de William em tempo real.
          </p>
          <TextLink to={instagramUrl} variant="nav">
            @wilneryfotografia
          </TextLink>
        </div>
      </div>
    </Section>
  )
}
