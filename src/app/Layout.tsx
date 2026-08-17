import { Outlet } from 'react-router-dom'
import { SiteFooter, SiteHeader } from '../components'
import { copy } from '../content/copy'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

/**
 * Navigation points at all pages that now exist.
 * The WhatsApp action is now live (content/copy.md).
 */
function navItems() {
  return [
    { label: copy('nav.portfolio'), to: '/portfolio' },
    { label: copy('nav.about'), to: '/about' },
    { label: copy('nav.services'), to: '/about' },
    { label: copy('nav.contact'), to: '/contact' },
  ]
}

export function Layout() {
  useSmoothScroll()

  const items = navItems()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>

      <SiteHeader brand={copy('site.brand')} items={items} menuLabel={copy('nav.menu')} />

      <main id="main-content">
        <Outlet />
      </main>

      <SiteFooter brand={copy('site.brand')} items={items} navLabel={copy('nav.footer')} />
    </>
  )
}

export default Layout
