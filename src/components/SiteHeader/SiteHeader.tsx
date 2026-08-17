import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { TextLink } from '../TextLink/TextLink'
import styles from './SiteHeader.module.css'

export interface NavItem {
  label: string
  to: string
}

export interface HeaderAction {
  label: string
  href: string
}

interface SiteHeaderProps {
  /** Wordmark text. Comes from content/copy.md — never written here. */
  brand: string
  items: NavItem[]
  /** Contact call to action. The only accent-coloured element in the header. */
  action?: HeaderAction
  /** Accessible name of the menu button, in pt-BR, supplied by the page. */
  menuLabel: string
}

/**
 * Site navigation. Content-agnostic on purpose: every visible string arrives as a
 * prop so the copy stays in content/copy.md (CLAUDE.md §3) and this component
 * never becomes a place where text lives.
 *
 * Mobile uses a disclosure, not a modal — the page stays where it is, Escape
 * closes it, and focus returns to the button that opened it.
 */
export function SiteHeader({ brand, items, action, menuLabel }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  // Navigating away is a resolution of the menu's purpose, so it closes itself.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.bar}>
          <Link to="/" className={styles.wordmark}>
            {brand}
          </Link>

          <nav className={styles.nav} aria-label={menuLabel}>
            {items.map((item) => (
              <TextLink key={item.to} to={item.to} variant="nav">
                {item.label}
              </TextLink>
            ))}
          </nav>

          <div className={styles.actions}>
            {action && (
              <Button href={action.href} variant="primary">
                {action.label}
              </Button>
            )}
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {menuLabel}
          </button>
        </div>
      </Container>

      {/* Stays in the DOM so `aria-controls` always resolves to a real element. */}
      <div id={panelId} className={styles.panel} hidden={!open}>
        <Container>
          <nav aria-label={menuLabel}>
            <ul className={styles.panelList}>
              {items.map((item) => (
                <li key={item.to}>
                  <TextLink to={item.to} variant="nav">
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>
          {action && (
            <div className={styles.panelAction}>
              <Button href={action.href} variant="primary" fullWidth>
                {action.label}
              </Button>
            </div>
          )}
        </Container>
      </div>
    </header>
  )
}
