import { Outlet } from 'react-router-dom'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export function Layout() {
  useSmoothScroll()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <main id="main-content">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
