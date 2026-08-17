import { SeoHead } from '../../lib/seo'
import { copy } from '../../content/copy'
import { ContactSection } from './sections/ContactSection'

function ContactPage() {
  return (
    <>
      <SeoHead
        title={`Contato – ${copy('site.name')}`}
        description={`Fale com William sobre sua data. WhatsApp e Instagram em ${copy('contact.area')}.`}
      />
      <ContactSection />
    </>
  )
}

export { ContactPage as Component }
