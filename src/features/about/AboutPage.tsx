import { SeoHead } from '../../lib/seo'
import { copy } from '../../content/copy'
import { BioSection } from './sections/BioSection'
import { ServicesSection } from './sections/ServicesSection'

function AboutPage() {
  return (
    <>
      <SeoHead
        title={`Sobre – ${copy('site.name')}`}
        description={`Conheça William Nery, fotógrafo de casamentos e ensaios em ${copy('contact.area')}.`}
      />
      <BioSection />
      <ServicesSection />
    </>
  )
}

export { AboutPage as Component }
