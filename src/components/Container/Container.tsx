import type { ElementType, ReactNode } from 'react'
import styles from './Container.module.css'

type ContainerWidth = 'default' | 'prose' | 'bleed'

interface ContainerProps {
  children: ReactNode
  /** `prose` clamps to the reading measure; `bleed` removes the outer mat. */
  width?: ContainerWidth
  as?: ElementType
  className?: string
}

/**
 * Horizontal frame of the page: the outer mat margin and the maximum width.
 * Nothing else in the system sets page-level horizontal padding.
 */
export function Container({
  children,
  width = 'default',
  as: Tag = 'div',
  className,
}: ContainerProps) {
  const classes = [styles.container, styles[width], className].filter(Boolean).join(' ')

  return <Tag className={classes}>{children}</Tag>
}
