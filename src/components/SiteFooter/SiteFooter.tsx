import { Container } from '../Container/Container'
import { Caption } from '../Text/Text'
import { TextLink } from '../TextLink/TextLink'
import { WallLabel } from '../WallLabel/WallLabel'
import type { NavItem } from '../SiteHeader/SiteHeader'
import styles from './SiteFooter.module.css'

export interface FooterLink {
  label: string
  href: string
}

interface SiteFooterProps {
  brand: string
  items: NavItem[]
  /** Social and contact channels. Pending real data — see PENDENCIAS.md. */
  channels?: FooterLink[]
  /** Navigation landmark name, in pt-BR, supplied by the page. */
  navLabel: string
  credit?: string
}

/**
 * Closing furniture. Like the header, every visible string arrives as a prop so
 * the copy stays in content/copy.md (CLAUDE.md §3).
 */
export function SiteFooter({ brand, items, channels, navLabel, credit }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <WallLabel parts={[brand]} emphasis />

          <nav aria-label={navLabel}>
            <ul className={styles.nav}>
              {items.map((item) => (
                <li key={item.to}>
                  <TextLink to={item.to} variant="nav">
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>

          {channels && channels.length > 0 && (
            <ul className={styles.nav}>
              {channels.map((channel) => (
                <li key={channel.href}>
                  <TextLink to={channel.href} variant="nav" external>
                    {channel.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        {credit && (
          <div className={styles.legal}>
            <Caption>{credit}</Caption>
          </div>
        )}
      </Container>
    </footer>
  )
}
