import { SeoHead } from '../../lib/seo'
import { copy } from '../../content/copy'
import { ContactCta } from './sections/ContactCta'
import { CuratedWork } from './sections/CuratedWork'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'

function HomePage() {
  return (
    <>
      <SeoHead title={copy('site.name')} description={copy('seo.home.description')} />
      <Hero />
      <Intro />
      <CuratedWork />
      <ContactCta />
    </>
  )
}

export { HomePage as Component }
