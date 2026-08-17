/**
 * Image pipeline — derives responsive variants from the photographs.
 *
 * Rules this script exists to enforce (CLAUDE.md §4):
 * - originals in public/images/ are read-only and never written to;
 * - every variant is an ADDITIONAL derived file under public/images/derived/;
 * - encoding aims at visually lossless, not at small bytes: AVIF keeps 4:4:4 chroma,
 *   WebP uses smart subsampling at high quality;
 * - never upscale — only widths strictly smaller than the original are produced;
 * - the LQIP is a separate tiny thumbnail swapped for the full-quality photo, so it
 *   never degrades the final image.
 *
 * The compression bar itself still has to be validated with William against the
 * originals before production (PENDENCIAS.md). Run `npm run images` after adding photos.
 */

import { createHash } from 'node:crypto'
import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const SOURCE_DIR = path.join(ROOT, 'public', 'images')
const OUTPUT_DIR = path.join(SOURCE_DIR, 'derived')
const MANIFEST = path.join(ROOT, 'src', 'lib', 'image-manifest.json')

/** Display widths worth serving. Anything ≥ the original is dropped, never upscaled. */
const WIDTHS = [480, 768, 1080, 1440, 1920, 2560]

/** Deliberately conservative: quality wins over bytes, every time. */
const AVIF = { quality: 78, effort: 6, chromaSubsampling: '4:4:4' }
const WEBP = { quality: 90, effort: 6, smartSubsample: true }
const LQIP_WIDTH = 24

const SOURCE_PATTERN = /\.(jpe?g|png)$/i

async function readSources() {
  const entries = await readdir(SOURCE_DIR, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && SOURCE_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort()
}

async function buildLqip(image) {
  const buffer = await image
    .clone()
    .resize({ width: LQIP_WIDTH })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer()

  return `data:image/webp;base64,${buffer.toString('base64')}`
}

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

/** A previous run counts only if the source is unchanged AND its outputs are on disk. */
async function isUpToDate(previous, hash) {
  if (!previous || previous.hash !== hash) return false

  const checks = await Promise.all(
    previous.variants.map((variant) => exists(path.join(ROOT, 'public', variant.path))),
  )
  return checks.every(Boolean)
}

async function processFile(fileName, previousEntry) {
  const sourcePath = path.join(SOURCE_DIR, fileName)
  const bytes = await readFile(sourcePath)
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16)

  if (await isUpToDate(previousEntry, hash)) {
    return { ...previousEntry, skipped: true }
  }

  // The extension lies on a few files (WebP saved as .jpg), so trust the decoder.
  const image = sharp(bytes)
  const meta = await image.metadata()
  const { width, height } = meta

  if (!width || !height) {
    throw new Error(`${fileName}: não foi possível ler as dimensões`)
  }

  const slug = fileName.replace(SOURCE_PATTERN, '')
  const targets = WIDTHS.filter((candidate) => candidate < width)
  // Always keep one variant at full size so large viewports never fall back to the
  // original encode; still never larger than the source.
  targets.push(width)

  const variants = []

  for (const target of targets) {
    const resized = image.clone().resize({ width: target, withoutEnlargement: true })

    for (const [format, options] of [
      ['avif', AVIF],
      ['webp', WEBP],
    ]) {
      const outputName = `${slug}-${target}.${format}`
      const buffer = await resized.clone()[format](options).toBuffer()
      await writeFile(path.join(OUTPUT_DIR, outputName), buffer)
      variants.push({ format, width: target, path: `/images/derived/${outputName}`, bytes: buffer.length })
    }
  }

  const lqip = await buildLqip(image)

  return {
    slug,
    source: `/images/${fileName}`,
    sourceFormat: meta.format,
    width,
    height,
    sourceBytes: bytes.length,
    lqip,
    variants,
    hash,
  }
}

async function readPreviousManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST, 'utf8'))
  } catch {
    return {}
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = await readSources()
  if (files.length === 0) {
    throw new Error('public/images/ está vazio — nada para derivar')
  }

  const previous = await readPreviousManifest()
  const manifest = {}
  const inefficient = []
  let sourceTotal = 0
  let derivedTotal = 0
  let rebuilt = 0

  const results = await Promise.all(
    files.map((fileName) => {
      const slug = fileName.replace(SOURCE_PATTERN, '')
      return processFile(fileName, previous[slug])
    }),
  )

  for (const entry of results) {
    const { skipped, ...record } = entry
    manifest[record.slug] = record

    sourceTotal += record.sourceBytes
    derivedTotal += record.variants.reduce((sum, variant) => sum + variant.bytes, 0)

    const largestAvif = record.variants
      .filter((variant) => variant.format === 'avif')
      .sort((a, b) => b.width - a.width)[0]

    const ratio = (largestAvif.bytes / record.sourceBytes) * 100
    if (ratio > 100) inefficient.push(record.slug)
    if (!skipped) rebuilt += 1

    console.log(
      `${skipped ? '·' : '↻'} ${record.slug.padEnd(34)} ${String(record.width).padStart(5)}px  ` +
        `original ${(record.sourceBytes / 1024).toFixed(0).padStart(5)} KB  ` +
        `avif ${(largestAvif.bytes / 1024).toFixed(0).padStart(5)} KB (${ratio.toFixed(0)}%)`,
    )
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)

  console.log(
    `\n${files.length} imagens (${rebuilt} regeradas) · originais intactos · ` +
      `${(sourceTotal / 1024 / 1024).toFixed(1)} MB de origem → ` +
      `${(derivedTotal / 1024 / 1024).toFixed(1)} MB em variantes derivadas`,
  )

  if (inefficient.length > 0) {
    console.log(
      `\n⚠ AVIF ficou MAIOR que o original em: ${inefficient.join(', ')}.\n` +
        '  Sinal de origem já recomprimida (os arquivos em qualidade Instagram).\n' +
        '  Não é para baixar a qualidade: é para pedir o arquivo original ao William\n' +
        '  (CLAUDE.md §4 — qualidade vence bytes). Ver PENDENCIAS.md.',
    )
  }

  console.log(`\nManifesto: ${path.relative(ROOT, MANIFEST)}`)
}

await main()
