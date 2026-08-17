import { Head } from 'vite-react-ssg'

interface SeoHeadProps {
  title: string
  description?: string
  canonical?: string
}

const SITE_NAME = 'William Nery Fotógrafo'

/**
 * Meta tags por página. JSON-LD e image sitemap ficam para a F6
 * (SEO & Performance Hardening) — aqui só o essencial por rota.
 */
export function SeoHead({ title, description, canonical }: SeoHeadProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`

  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  )
}
