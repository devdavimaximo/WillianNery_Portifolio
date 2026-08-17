import { SeoHead } from '../../lib/seo'
import { copy } from '../../content/copy'
import { ContactCta } from './sections/ContactCta'
import { Hero } from './sections/Hero'
import { BioSection } from './sections/BioSection'
import { ServicesSection } from './sections/ServicesSection'
import { PortfolioGalleries } from './sections/PortfolioGalleries'

function HomePage() {
  return (
    <>
      <SeoHead title={copy('site.name')} description={copy('seo.home.description')} />
      <Hero />
      <BioSection />
      <ServicesSection />
      <PortfolioGalleries />
      <ContactCta />
    </>
  )
}

export { HomePage as Component }
