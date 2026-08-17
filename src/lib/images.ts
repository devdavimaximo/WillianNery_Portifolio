import manifestJson from './image-manifest.json'

/**
 * Typed access to the derived image variants produced by scripts/optimize-images.mjs.
 *
 * Components never spell out a file path: they ask for a slug and get back everything
 * an `<img>` needs — srcSet per format, intrinsic size for CLS, and the LQIP.
 * A slug that is not in the manifest throws, so a renamed photo fails the build
 * instead of shipping a broken image.
 */

export type ImageFormat = 'avif' | 'webp'

interface ManifestVariant {
  format: string
  width: number
  path: string
  bytes: number
}

interface ManifestEntry {
  slug: string
  source: string
  sourceFormat: string
  width: number
  height: number
  sourceBytes: number
  lqip: string
  variants: ManifestVariant[]
  hash: string
}

const MANIFEST = manifestJson as unknown as Record<string, ManifestEntry>

export interface ResponsiveImage {
  /** Original file, used as the `<img src>` fallback. */
  src: string
  width: number
  height: number
  /** Inline blurred thumbnail — a separate tiny file, never the photo degraded. */
  lqip: string
  srcSet: Record<ImageFormat, string>
}

export function imageSlugs(): string[] {
  return Object.keys(MANIFEST).sort()
}

function entry(slug: string): ManifestEntry {
  const found = MANIFEST[slug]
  if (!found) {
    throw new Error(
      `Imagem "${slug}" não existe no manifesto. Rode \`npm run images\` ou confira o nome do arquivo em public/images/.`,
    )
  }
  return found
}

function srcSetFor(item: ManifestEntry, format: ImageFormat): string {
  return item.variants
    .filter((variant) => variant.format === format)
    .sort((a, b) => a.width - b.width)
    .map((variant) => `${variant.path} ${variant.width}w`)
    .join(', ')
}

export function getImage(slug: string): ResponsiveImage {
  const item = entry(slug)

  return {
    src: item.source,
    width: item.width,
    height: item.height,
    lqip: item.lqip,
    srcSet: {
      avif: srcSetFor(item, 'avif'),
      webp: srcSetFor(item, 'webp'),
    },
  }
}

/**
 * Photographs whose high-quality re-encode came out heavier than the source — the
 * fingerprint of an already-recompressed file. Not something to fix by lowering
 * quality; it means the original file is still owed by the client (CLAUDE.md §4).
 */
export function recompressedSources(): string[] {
  return Object.values(MANIFEST)
    .filter((item) => {
      const largest = item.variants
        .filter((variant) => variant.format === 'avif')
        .sort((a, b) => b.width - a.width)[0]
      return largest !== undefined && largest.bytes > item.sourceBytes
    })
    .map((item) => item.slug)
    .sort()
}
