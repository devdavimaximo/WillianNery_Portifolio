import { Section } from '../../../components'
import { copy } from '../../../content/copy'
import styles from './ServicesSection.module.css'

/**
 * Three services: wedding, session, pre-wedding. Names and descriptions are cards.
 */
export function ServicesSection() {
  const services = [
    {
      key: 'wedding',
      name: copy('services.wedding.name'),
      description: copy('services.wedding.description'),
    },
    {
      key: 'prewedding',
      name: copy('services.prewedding.name'),
      description: copy('services.prewedding.description'),
    },
    {
      key: 'session',
      name: copy('services.session.name'),
      description: copy('services.session.description'),
    },
  ]

  return (
    <Section
      eyebrow="Serviços"
      title="O que oferecemos"
      ruled
    >
      <div className={styles.grid}>
        {services.map((service) => (
          <article key={service.key} className={styles.card}>
            <h3 className={styles.name}>{service.name}</h3>
            <p className={styles.description}>{service.description}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
