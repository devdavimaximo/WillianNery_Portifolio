import { Outlet } from 'react-router-dom'
import { SiteFooter, SiteHeader } from '../components'
import { copy } from '../content/copy'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

/**
 * Navigation only points at destinations that exist. "Sobre" and "Serviços" are F4
 * pages and are deliberately absent until they do — a nav item that leads nowhere is
 * a broken promise, and hiding it costs less than shipping it dead.
 *
 * The WhatsApp action is likewise withheld while the real number is pending
 * (content/copy.md); the Home carries the call to action in the meantime.
 */
function navItems() {
  return [
    { label: copy('nav.portfolio'), to: '#trabalho' },
    { label: copy('nav.contact'), to: '#contato' },
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
