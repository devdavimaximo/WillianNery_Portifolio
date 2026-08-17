import { SeoHead } from '../../lib/seo'

/**
 * Placeholder técnico da Home. Sem fotos nem copy do cliente ainda —
 * ver PENDENCIAS.md. Bloco de cor no lugar do herói (regra da seção 4
 * do CLAUDE.md); nenhum texto aqui é copy final.
 */
function HomePage() {
  return (
    <>
      <SeoHead title="William Nery Fotógrafo" />
      <section className="placeholder-block" aria-label="Herói (aguardando material do cliente)">
        <p>Home em construção — aguardando fotos e textos do William.</p>
      </section>
    </>
  )
}

export { HomePage as Component }
