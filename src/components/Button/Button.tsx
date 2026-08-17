import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'quiet'

interface CommonProps {
  children: ReactNode
  /** `primary` is the contact action and carries the system's only accent colour. */
  variant?: Variant
  fullWidth?: boolean
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: never
    /** Blocks repeat submits and announces the wait to assistive tech. */
    loading?: boolean
  }

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string
    loading?: never
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

function classesFor(variant: Variant, fullWidth: boolean, className?: string) {
  return [styles.button, styles[variant], fullWidth && styles.full, className]
    .filter(Boolean)
    .join(' ')
}

/**
 * Renders an `<a>` when given `href` (WhatsApp, e-mail, route) and a `<button>`
 * otherwise — the two are visually identical because to the reader they are the
 * same object, but only one of them is correct markup in each case.
 */
export function Button(props: ButtonProps) {
  const { children, variant = 'quiet', fullWidth = false, className } = props
  const classes = classesFor(variant, fullWidth, className)

  if ('href' in props && props.href !== undefined) {
    const { children: _children, variant: _v, fullWidth: _f, className: _c, ...anchor } = props
    return (
      <a {...anchor} className={classes}>
        {children}
      </a>
    )
  }

  const {
    children: _children,
    variant: _v,
    fullWidth: _f,
    className: _c,
    loading = false,
    disabled,
    type = 'button',
    ...button
  } = props as ButtonAsButton

  return (
    <button
      {...button}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  )
}
