import { SeoHead } from '../../lib/seo'
import { copy } from '../../content/copy'
import { GalleriesSection } from './sections/GalleriesSection'

function PortfolioPage() {
  return (
    <>
      <SeoHead
        title={`Portfólio – ${copy('site.name')}`}
        description={`Galerias de casamentos, ensaios e pré-weddings de ${copy('contact.area')}.`}
      />
      <GalleriesSection />
    </>
  )
}

export { PortfolioPage as Component }
