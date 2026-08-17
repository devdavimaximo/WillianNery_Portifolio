import source from '../../content/copy.md?raw'

/**
 * Loads site copy from content/copy.md — the single source of truth (CLAUDE.md §3).
 *
 * No component writes a user-facing string; they ask for a key. A missing or renamed
 * key throws at module load, which fails the build on purpose: losing a piece of the
 * client's text silently is worse than a red build.
 */

export type CopyStatus = 'RASCUNHO' | 'APROVADO' | 'PENDENTE'

export interface CopyField {
  key: string
  status: CopyStatus
  value: string
}

const FIELD_HEADER = /^\*\*([A-Za-z0-9._]+)\*\*\s*[—-]\s*\[(RASCUNHO|APROVADO|PENDENTE)\]\s*$/
const FENCE = /^\s*```/

function parse(markdown: string): Map<string, CopyField> {
  const fields = new Map<string, CopyField>()
  const lines = markdown.split(/\r?\n/)
  let insideFence = false

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? ''

    // The document documents its own format, so the example block must not parse.
    if (FENCE.test(line)) {
      insideFence = !insideFence
      continue
    }
    if (insideFence) continue

    const header = FIELD_HEADER.exec(line)
    if (!header) continue

    const [, key, status] = header as unknown as [string, string, CopyStatus]

    const paragraphs: string[] = []
    let current: string[] = []

    let cursor = index + 1
    while (cursor < lines.length) {
      const next = lines[cursor] ?? ''
      if (!next.startsWith('>')) break

      const text = next.replace(/^>\s?/, '').trimEnd()
      if (text === '') {
        if (current.length > 0) {
          paragraphs.push(current.join(' '))
          current = []
        }
      } else {
        current.push(text)
      }
      cursor += 1
    }
    if (current.length > 0) paragraphs.push(current.join(' '))

    if (fields.has(key)) {
      throw new Error(`content/copy.md: chave duplicada "${key}"`)
    }

    fields.set(key, { key, status, value: paragraphs.join('\n\n') })
    index = cursor - 1
  }

  return fields
}

const FIELDS = parse(source)

/** Every key present in the file, for tooling and for the pending-copy audit. */
export function allCopy(): CopyField[] {
  return [...FIELDS.values()]
}

export function copyField(key: string): CopyField {
  const field = FIELDS.get(key)
  if (!field) {
    throw new Error(
      `content/copy.md: chave "${key}" não existe. Adicione o campo lá — não escreva o texto no componente (CLAUDE.md §3).`,
    )
  }
  return field
}

/**
 * Text ready to render. Throws for a `[PENDENTE]` key, because a pending field has no
 * real text yet — the page must show the gap instead. Use `pendingCopy` for those.
 */
export function copy(key: string): string {
  const field = copyField(key)
  if (field.status === 'PENDENTE') {
    throw new Error(
      `content/copy.md: "${key}" está [PENDENTE] e não tem texto real. Use pendingCopy(key) e mostre a lacuna.`,
    )
  }
  return field.value
}

/**
 * Returns the text when it exists, or `null` when the field is still pending.
 * Callers render the gap — a solid block, an omitted section — never a stand-in.
 */
export function pendingCopy(key: string): string | null {
  const field = copyField(key)
  return field.status === 'PENDENTE' ? null : field.value
}

/** The note written where the real data should be, for the pending placeholder. */
export function pendingNote(key: string): string {
  return copyField(key).value
}

export function copyStatus(key: string): CopyStatus {
  return copyField(key).status
}
