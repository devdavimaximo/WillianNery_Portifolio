/**
 * Guarda do build — confere, sem depender de sharp, que as variantes descritas em
 * src/lib/image-manifest.json existem em public/images/derived/.
 *
 * As variantes são geradas na máquina (`npm run images`) e commitadas: rodar o
 * pipeline de imagem dentro do build da Vercel estourava tempo e memória, e a régua
 * de compressão (CLAUDE.md §4) precisa ser conferida contra o original a olho, não
 * no CI. Este script só existe para que "esqueci de rodar `npm run images`" falhe
 * aqui, em segundos, em vez de virar imagem quebrada em produção.
 */

import { access, readFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const MANIFEST = path.join(ROOT, 'src', 'lib', 'image-manifest.json')
const PUBLIC_DIR = path.join(ROOT, 'public')

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'))
const entries = Object.values(manifest)

if (entries.length === 0) {
  console.error('✖ image-manifest.json vazio — rode `npm run images`.')
  process.exit(1)
}

const missing = []

for (const entry of entries) {
  const files = [entry.source, ...entry.variants.map((variant) => variant.path)]
  for (const file of files) {
    if (!(await exists(path.join(PUBLIC_DIR, file)))) missing.push(file)
  }
}

if (missing.length > 0) {
  console.error(
    `✖ ${missing.length} arquivo(s) do manifesto não estão em public/:\n` +
      `${missing.slice(0, 10).map((file) => `  ${file}`).join('\n')}` +
      `${missing.length > 10 ? `\n  … e mais ${missing.length - 10}` : ''}\n\n` +
      '  Rode `npm run images` e commite public/images/derived/ + o manifesto.',
  )
  process.exit(1)
}

console.log(
  `✓ ${entries.length} imagens · ${entries.reduce((sum, entry) => sum + entry.variants.length, 0)} variantes presentes`,
)
