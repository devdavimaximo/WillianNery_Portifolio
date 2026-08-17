import type { ElementType, ReactNode } from 'react'
import styles from './Text.module.css'

interface TextProps {
  children: ReactNode
  /**
   * Semantic element. Kept separate from the visual role on purpose: a page can
   * need a `Display` that is an `h1` on the Home and an `h2` elsewhere without
   * breaking the heading order.
   */
  as?: ElementType
  className?: string
  id?: string
}

function cx(base: string, className?: string) {
  return className ? `${base} ${className}` : base
}

/** Hero and page opening. One per page. */
export function Display({ children, as: Tag = 'h1', className, id }: TextProps) {
  return (
    <Tag id={id} className={cx(styles.display, className)}>
      {children}
    </Tag>
  )
}

/** Section heading. */
export function Title({ children, as: Tag = 'h2', className, id }: TextProps) {
  return (
    <Tag id={id} className={cx(styles.title, className)}>
      {children}
    </Tag>
  )
}

/** Package name, card heading. */
export function Subtitle({ children, as: Tag = 'h3', className, id }: TextProps) {
  return (
    <Tag id={id} className={cx(styles.subtitle, className)}>
      {children}
    </Tag>
  )
}

/** Real prose only — bio, service description. The only serif in the system. */
export function Essay({ children, as: Tag = 'p', className, id }: TextProps) {
  return (
    <Tag id={id} className={cx(styles.essay, className)}>
      {children}
    </Tag>
  )
}

/** Photo caption, footnote. */
export function Caption({ children, as: Tag = 'p', className, id }: TextProps) {
  return (
    <Tag id={id} className={cx(styles.caption, className)}>
      {children}
    </Tag>
  )
}
