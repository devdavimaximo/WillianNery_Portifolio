import { SeoHead } from '../../lib/seo'
import {
  Button,
  Caption,
  Container,
  Display,
  Essay,
  Figure,
  Section,
  SiteFooter,
  SiteHeader,
  Subtitle,
  TextLink,
  Title,
  WallLabel,
} from '../../components'
import styles from './DesignSystemPage.module.css'

/**
 * Internal preview of the F1 design system — not a site page.
 *
 * Every string here describes the design system itself; none of it is copy for
 * the site (CLAUDE.md §3). The nav and footer labels are demonstration data for
 * the components, which take all their text as props precisely so real copy can
 * live in content/copy.md.
 *
 * Noindexed, unlinked, and to be removed before launch — tracked in PENDENCIAS.md.
 */

const DEMO_NAV = [
  { label: 'Portfólio', to: '/design-system' },
  { label: 'Sobre', to: '/design-system' },
  { label: 'Serviços', to: '/design-system' },
]

const SURFACES = [
  { token: '--color-surface', name: 'Cartão', note: 'Fundo da página' },
  { token: '--color-surface-raised', name: 'Cartão claro', note: 'Superfície elevada' },
  { token: '--color-surface-sunken', name: 'Cartão fundo', note: 'Bloco sem foto · base do LQIP' },
  { token: '--color-text', name: 'Tinta', note: '15.0:1 · AAA' },
  { token: '--color-text-muted', name: 'Tinta secundária', note: '6.3:1 · AA' },
  { token: '--color-rule', name: 'Fio', note: 'Filete de 1px' },
  { token: '--color-accent', name: 'Óxido', note: '6.1:1 · AA · só contato' },
  { token: '--color-accent-hover', name: 'Óxido claro', note: 'Hover do óxido' },
]

const TYPE_SCALE = [
  { role: 'display', Component: Display, sample: 'Casamentos & Ensaios' },
  { role: 'title', Component: Title, sample: 'Título de seção' },
  { role: 'subtitle', Component: Subtitle, sample: 'Nome de pacote' },
  { role: 'essay', Component: Essay, sample: 'Prosa em Newsreader — a única serifada do sistema, reservada a texto de verdade como a bio e a descrição de pacote.' },
  { role: 'caption', Component: Caption, sample: 'Legenda de fotografia.' },
]

function DesignSystemPage() {
  return (
    <>
      <SeoHead title="Design System (interno)" noindex />

      <SiteHeader
        brand="William Nery"
        items={DEMO_NAV}
        action={{ label: 'WhatsApp', href: '/design-system' }}
        menuLabel="Menu"
      />

      <Section
        id="abertura"
        ruled={false}
        eyebrow="F1 · Design System"
        title="Passe-Partout"
        titleAs="h1"
      >
        <Essay>
          O sistema é a moldura de uma gravura: cartão cinza-quente de baixa croma, tinta quase
          preta e nenhuma cor saturada na interface. Toda saturação da tela vem de dentro da
          fotografia. A única superfície colorida é a ação de contato.
        </Essay>
        <div className={styles.note}>
          <Caption>
            Página interna de verificação dos componentes, marcada como <code>noindex</code> e sem
            link no site. Nenhum texto aqui é copy do William — ver{' '}
            <TextLink to="/design-system">content/copy.md</TextLink> e PENDENCIAS.md.
          </Caption>
        </div>
      </Section>

      <Section id="cor" eyebrow="Token" title="Cor">
        <ul className={styles.swatches}>
          {SURFACES.map((surface) => (
            <li key={surface.token} className={styles.swatch}>
              <div className={styles.chip} style={{ backgroundColor: `var(${surface.token})` }} />
              <WallLabel parts={[surface.name]} emphasis />
              <Caption>{surface.note}</Caption>
              <Caption>{surface.token}</Caption>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tipografia" eyebrow="Token" title="Tipografia">
        <ul className={styles.scaleList}>
          {TYPE_SCALE.map(({ role, Component, sample }) => (
            <li key={role}>
              <WallLabel parts={[role]} />
              <Component as="p">{sample}</Component>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="acao" eyebrow="Componente" title="Ação e link">
        <div className={styles.row}>
          <Button variant="primary" href="/design-system">
            Falar no WhatsApp
          </Button>
          <Button variant="quiet">Ver portfólio</Button>
          <Button variant="quiet" loading>
            Enviando
          </Button>
          <Button variant="quiet" disabled>
            Indisponível
          </Button>
        </div>
        <Essay>
          Um link dentro de prosa se comporta assim:{' '}
          <TextLink to="/design-system">sublinhado no fio</TextLink>, óxido no hover. A cor nunca é
          a única pista.
        </Essay>
      </Section>

      <Section id="figura" eyebrow="Componente" title="Figura e passe-partout">
        <div className={styles.pair}>
          <Figure
            slug="portifolio_willian_casamento12"
            alt="Noivos em contraluz diante de uma janela alta de vidros quadriculados; ela de vestido branco e véu, ele de smoking, ambos recortados contra a luz."
            sizes="(min-width: 48rem) 45vw, 92vw"
            label={['Casamento', 'Contraluz']}
            caption="Margem pesada: topo e laterais 1, base 1.35. O véu de revelação sai por cima da foto no scroll."
          />
          <Figure
            pending="Foto pendente — herói da Home. Ver PENDENCIAS.md."
            label={['Home', 'Herói']}
            caption="Sem fotografia disponível, o sistema mostra um bloco de cor sólida e nomeia a lacuna. Nunca stock, nunca placeholder externo."
          />
        </div>
      </Section>

      <Section id="lightbox" eyebrow="Escopo" title="Câmara Escura — lightbox">
        <Essay>
          A direção B não é um tema do site: é o escopo local do lightbox. Os mesmos componentes,
          lidos através dos mesmos tokens, trocam de sala sem saber disso.
        </Essay>
        <div className={styles.darkScope} data-theme="dark">
          <div className={styles.stack}>
            <WallLabel parts={['Ensaio', 'Outono']} emphasis />
            <Title as="p">A foto abre sobre a sala escura</Title>
            <Caption>
              Tinta osso 15.2:1 · secundária 6.3:1 · óxido 4.6:1. Todos passam AA sobre a sala.
            </Caption>
            <div className={styles.row}>
              <Button variant="primary" href="/design-system">
                Falar no WhatsApp
              </Button>
              <Button variant="quiet">Fechar</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section id="prosa" eyebrow="Layout" title="Medida de leitura" width="prose">
        <Essay>
          A largura <code>prose</code> limita a linha a 62 caracteres. É onde a bio e a descrição
          de pacote vão morar quando o texto real do William chegar — hoje esse conteúdo está
          pendente, e nenhum parágrafo dele foi escrito por antecipação.
        </Essay>
      </Section>

      <Container>
        <SiteFooter
          brand="William Nery"
          items={DEMO_NAV}
          navLabel="Rodapé"
          credit="Página interna de design system. Remover antes do lançamento."
        />
      </Container>
    </>
  )
}

export { DesignSystemPage as Component }
