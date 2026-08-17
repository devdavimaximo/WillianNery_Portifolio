import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './TextLink.module.css'

interface TextLinkProps {
  to: string
  children: ReactNode
  /** `nav` is the header/footer treatment; `inline` sits inside prose. */
  variant?: 'inline' | 'nav'
  /** Anything off-site: renders a plain anchor and opens in a new tab. */
  external?: boolean
  className?: string
}

/**
 * Internal links go through `NavLink` so the current page marks itself; external
 * links fall back to a plain anchor with the safe `rel`.
 */
export function TextLink({
  to,
  children,
  variant = 'inline',
  external = false,
  className,
}: TextLinkProps) {
  const base = [styles[variant === 'nav' ? 'nav' : 'link'], className].filter(Boolean).join(' ')

  if (external) {
    return (
      <a href={to} className={base} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  // An in-page anchor is not a route: NavLink would try to navigate to "/#trabalho".
  if (to.startsWith('#')) {
    return (
      <a href={to} className={base}>
        {children}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => [base, isActive && styles.current].filter(Boolean).join(' ')}
      /* Exact match only for the root, so a nested route keeps its parent marked. */
      end={to === '/'}
    >
      {children}
    </NavLink>
  )
}
