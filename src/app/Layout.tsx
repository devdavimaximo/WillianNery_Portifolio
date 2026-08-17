import { Outlet } from 'react-router-dom'
import { SiteFooter, SiteHeader } from '../components'
import { copy } from '../content/copy'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

/**
 * Navigation points at sections within the single landing page via anchor links.
 */
function navItems() {
  return [
    { label: copy('nav.portfolio'), to: '#portfolio-wedding' },
    { label: copy('nav.about'), to: '#sobre' },
    { label: copy('nav.services'), to: '#servicos' },
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
