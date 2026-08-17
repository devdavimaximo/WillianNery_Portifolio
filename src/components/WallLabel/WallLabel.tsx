import type { ElementType } from 'react'
import { Fragment } from 'react'
import styles from './WallLabel.module.css'

interface WallLabelProps {
  /**
   * Label segments, rendered separated by a hairline middot — the technical line
   * of a museum label. A single item is fine and renders without a separator.
   */
  parts: string[]
  /** Full-ink variant, for when the label is the section heading's eyebrow. */
  emphasis?: boolean
  as?: ElementType
  className?: string
  /** Lets a section point `aria-labelledby` at the label that names it. */
  id?: string
}

/**
 * The system's smallest typographic unit. Used as photo caption line, section
 * eyebrow and nav marker — the same object in three places, so the site reads
 * as one catalogue.
 */
export function WallLabel({
  parts,
  emphasis = false,
  as: Tag = 'p',
  className,
  id,
}: WallLabelProps) {
  const classes = [styles.label, emphasis && styles.strong, className].filter(Boolean).join(' ')

  return (
    <Tag id={id} className={classes}>
      <span className={styles.parts}>
        {parts.map((part, index) => (
          <Fragment key={part}>
            <span>{part}</span>
            {index < parts.length - 1 && (
              <span className={styles.separator} aria-hidden="true">
                ·
              </span>
            )}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
