import { Head } from 'vite-react-ssg'

interface SeoHeadProps {
  title: string
  description?: string
  canonical?: string
  /** Keeps internal pages (design system preview) out of the index. */
  noindex?: boolean
}

const SITE_NAME = 'William Nery Fotógrafo'

/**
 * Meta tags por página. JSON-LD e image sitemap ficam para a F6
 * (SEO & Performance Hardening) — aqui só o essencial por rota.
 */
export function SeoHead({ title, description, canonical, noindex }: SeoHeadProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`

  return (
    <Head>
      {/**
       * These two must be the first thing in <head>. vite-react-ssg injects everything
       * from <Head> ahead of index.html's own tags, so declaring them here is the only
       * way they land first. It is not cosmetic: with the viewport tag arriving late,
       * the preload scanner resolves `sizes` against the 980px fallback viewport and
       * downloads a far larger hero variant than the phone needs.
       */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{fullTitle}</title>
      {noindex && <meta name="robots" content="noindex, nofollow" />}
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
