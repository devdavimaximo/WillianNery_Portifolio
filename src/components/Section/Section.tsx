import type { ElementType, ReactNode } from 'react'
import { Container } from '../Container/Container'
import { Title } from '../Text/Text'
import { WallLabel } from '../WallLabel/WallLabel'
import styles from './Section.module.css'

interface SectionProps {
  children: ReactNode
  /** Wall-label eyebrow above the heading. */
  eyebrow?: string
  title?: string
  /**
   * Heading level for the section title. The opening section of a page passes
   * `h1`; everything below it stays on the default so the outline never skips.
   */
  titleAs?: ElementType
  /** Ties the section's `aria-labelledby` to its heading. */
  id?: string
  /** Hairline above the section. Off for the first section of a page. */
  ruled?: boolean
  width?: 'default' | 'prose' | 'bleed'
  className?: string
}

/**
 * Vertical rhythm unit. Owns the band spacing and the optional hairline, so no
 * page ever hand-rolls its own section padding.
 */
export function Section({
  children,
  eyebrow,
  title,
  titleAs = 'h2',
  id,
  ruled = true,
  width = 'default',
  className,
}: SectionProps) {
  const headingId = id && title ? `${id}-title` : undefined
  const classes = [styles.section, ruled && styles.ruled, className].filter(Boolean).join(' ')

  return (
    <section id={id} className={classes} aria-labelledby={headingId}>
      <Container width={width}>
        {(eyebrow || title) && (
          <div className={styles.header}>
            {eyebrow && <WallLabel parts={[eyebrow]} />}
            {title && (
              <Title as={titleAs} id={headingId}>
                {title}
              </Title>
            )}
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </Container>
    </section>
  )
}
