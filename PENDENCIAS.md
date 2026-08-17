# Pendências

> Rastreamento do que falta coletar do cliente (William) antes de preencher cada
> página/seção com conteúdo final. Enquanto pendente: bloco de cor sólida no lugar de
> imagem, e texto marcado `PENDENTE` em `content/copy.md` (CLAUDE.md, seções 3 e 4).

## Escopo / Direção de arte (F0)

- [x] Posicionamento: **casamentos + ensaios** (decisão Davi, 2026-08-17)
- [x] Sobre/Serviços: páginas separadas (decisão Davi, 2026-08-17)
- [x] Depoimentos: nenhum por enquanto (decisão Davi, 2026-08-17)
- [x] Valores de pacote: só sob consulta, não publica (decisão Davi, 2026-08-17)
- [x] Canal de contato principal: WhatsApp (decisão Davi, 2026-08-17)
- [x] Volume de fotos: site é landing page de anúncio/posicionamento, não arquivo —
      curadoria enxuta (decisão Davi, 2026-08-17; ver `docs/planning/ia-proposta.md`)
- [x] Rascunho de IA/estrutura de páginas aprovado pelo Davi (2026-08-17) — ver
      `docs/planning/ia-proposta.md`
- [ ] Fechar escopo/proposta com o William
- [ ] Referências visuais e direção de arte (moodboard, fotógrafos/sites de referência)

## Direção de arte / Design system (F1)

- [x] **Direção de arte escolhida (Davi, 2026-08-17): A "Passe-Partout" no site, com o
      lightbox do portfólio em B "Câmara Escura"** — proposta completa em
      `docs/planning/direcao-arte.md`.
- [x] **Skills obrigatórias instaladas** pelo Davi em `.claude/skills/` (2026-08-17):
      `ui-ux-pro-max` e `web-design-guidelines`. Bloqueio resolvido; tokens e
      componentes escritos sob as duas.
      *Observação:* o script de busca da `ui-ux-pro-max` exige Python, que não existe
      neste ambiente — os dados (`data/*.csv`) foram lidos direto. Se quiser o script
      funcionando, instalar Python 3.
- [ ] Validar tipografia (Archivo + Newsreader) com o William — trocar depois refaz a
      escala inteira.
- [ ] **Calibrar a paleta contra os arquivos originais** quando chegarem. Os hex atuais
      foram lidos a olho dos JPEGs em alta resolução (não dos 3 arquivos em qualidade
      Instagram) — nenhuma amostragem de pixel foi feita.

## Home / F2

- [ ] **Foto do herói — escolha de direção de arte.** Está provisoriamente com
      `portifolio_willian_casamento8`, a **única paisagem do acervo** (2731×1821) e por
      isso a única que preenche um quadro largo sem corte. As alternativas são todas
      retrato, o que obriga a cortar no desktop: `casamento10` e `casamento12`
      (contraluz, as mais autorais), `ensaio12` (outono, a mais acolhedora),
      `ensaio15` (P&B, a mais íntima). **O William decide.**
- [ ] **Curadoria do recorte da Home.** As 6 fotos são escolha nossa
      (`casamento10`, `ensaio12`, `ensaio3`, `casamento12`, `ensaio15`, `ensaio8`),
      pensadas para mostrar a amplitude do trabalho. Precisa da seleção dele.
- [ ] **Revisar os textos alternativos (`alt`) com o William.** Foram escritos por nós
      descrevendo o que se vê; só ele sabe nome de lugar, cidade e contexto. Ficam em
      `content/copy.md` → "Descrições de imagem".
- [ ] **CTA de contato está inerte.** O botão existe, aparece desabilitado e explica o
      motivo ao lado, porque o número de WhatsApp é `[PENDENTE]`. É a pendência que mais
      custa: a página inteira existe para gerar essa conversa.
- [ ] **Nav sem "Sobre" e "Serviços".** Só entram quando as páginas existirem (F4) —
      hoje "Portfólio" e "Contato" apontam para âncoras da própria Home.
- [ ] **Descrição de SEO genérica.** `seo.home.description` não cita cidade/região
      porque a área de atuação é `[PENDENTE]`. Busca local é metade do jogo de um
      fotógrafo — completar assim que ele informar.

## Performance medida (F2)

Lighthouse rodado em `npm run preview`, Chrome headless, build de produção:

| | Performance | A11y | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Desktop | **99** | 100 | 100 | 100 | 0,8 s | 0 |
| Mobile | **86** | 100 | 100 | 100 | 3,7 s | 0 |

- [ ] **Mobile abaixo da meta (86 < 95; LCP 3,7 s > 2,5 s).** O gargalo é FCP 2,6 s sob
      4G simulado — CSS bloqueante e as duas fontes (217 KB somadas). As alavancas que
      sobraram são **inline de CSS crítico** e **subset real das fontes**, ambas
      trabalho da F6, e nenhuma delas mexe na qualidade da foto. Não foi resolvido
      espremendo imagem, de propósito (§4).
- Já feito nesta fase: preload do herói com o `srcset` correto, `charset`/`viewport`
  emitidos primeiro (sem isso o preload scanner baixava a variante de 1920 no celular),
  GSAP em chunk dinâmico (fora do bundle inicial), `content-visibility` no grid,
  CSS num arquivo só.

## Dívidas abertas pela F1 (nossas, não do cliente)

- [ ] **Remover a rota `/design-system` antes do lançamento.** É página interna de
      verificação dos componentes (`src/features/design-system/`), marcada `noindex` e
      sem link no site, mas hoje ela é gerada no build.
- [x] ~~Home sem `<h1>`~~ — resolvido na F2: a headline do herói é o `<h1>`.
- [ ] **Fontes ainda não subsetadas de verdade.** Os `.woff2` em `public/fonts/` são os
      cortes latin/latin-ext completos (636 KB no total; 88 KB da Archivo e 129 KB da
      Newsreader entram no carregamento da Home). Um subset real (`pyftsubset`, só os
      eixos e glifos usados) corta bastante — depende de Python, que não existe neste
      ambiente. É uma das duas alavancas que faltam para o mobile bater a meta. F6.
- [x] ~~Pipeline de imagem não existe~~ — feito na F2:
      `scripts/optimize-images.mjs` + `src/lib/images.ts`. Gera AVIF (4:4:4, q78) e
      WebP (q90) em até 7 larguras, mais LQIP, **sem tocar nos originais**, e é
      incremental (só regera o que mudou). Roda no `prebuild`; as derivadas são
      gitignored.
- [ ] **Validar o nível de compressão com o William** (§4). A régua atual foi escolhida
      por nós no lado conservador. Sinal já capturado pelo script: em
      `casamento.jpg` e `casamento2.jpg` o AVIF ficou **maior** que o arquivo de
      origem — impressão digital de arquivo já recomprimido, exatamente os dois em
      qualidade Instagram. Não é para baixar qualidade: é para pedir o original.

## Fotos (`public/images/`)

- [x] 15 fotos de casamento + 14 de ensaio + 1 retrato para Sobre (após o Davi
      remover o duplicado `portifolio_willian_ensaio5.jpg` em 2026-08-17)
- [x] **Decisão registrada (Davi, 2026-08-17):** usar este conjunto mesmo assim,
      incluindo os 2 arquivos com padrão de export do Instagram
      (`portifolio_willian_casamento.jpg`, `portifolio_willian_casamento2.jpg` —
      WebP 1080×1440) e o retrato `img_willian_sobre.png` (PNG 1080×1080), **só
      para chegar num draft e conseguir aprovação do William**. Não são tratados
      como arquivo final de produção.
- [ ] **Antes do lançamento (não antes):** pedir ao William o arquivo original
      (export do Lightroom/câmera, não salvo de rede social) para essas 3 posições
      específicas, e perguntar quais outras fotos ele quer incluir além do que já
      está aqui — ver seção 4 do `CLAUDE.md`, fidelidade é inegociável pra produção,
      ainda que o draft de aprovação rode com o que temos.
- [x] Inventário completo (arquivo por arquivo: formato real, resolução, candidata a
      herói) registrado em `docs/planning/inventario-fotos.md` (2026-08-17)
- [ ] **Duplicata a remover:** `portifolio_willian_ensaio9.jpg` é byte a byte idêntica a
      `portifolio_willian_casamento4.jpg` (mesmo MD5, detectada na F1 em 2026-08-17).
      São **28 fotos únicas de portfólio + 1 retrato**, não 29 + 1. Decidir com o
      William em qual categoria a imagem fica e apagar a outra cópia. *(Lote inteiro
      já conferido por hash — é a única duplicata restante.)*

## Textos (`content/copy.md`)

- [x] Rascunho de aprovação escrito (Davi pediu explicitamente, 2026-08-17 — CLAUDE.md
      seção 3 permite mediante pedido dele). Headline, apresentação, CTAs e nomes de
      pacote têm texto **[RASCUNHO]** pronto. Bio ficou como prosa-armação com
      `[placeholders]` — nenhum fato foi inventado.
- [ ] Validar/reescrever o **[RASCUNHO]** inteiro com o William antes de ir pro ar
- [ ] Bio/história: preencher os `[colchetes]` com fatos reais do William — **não
      inventar**, nem mesmo como rascunho
- [ ] Confirmar se há mais pacotes além de Casamento/Ensaio (ex. elopement,
      pré-wedding)
- [ ] Canais de contato reais: número de WhatsApp, e-mail (se houver), redes sociais,
      área de atuação — **não dá pra rascunhar, precisa ser o dado real**

## Técnico (para fases futuras — apenas registro, sem ação agora)

- [ ] Dados reais para JSON-LD (`LocalBusiness`/`Person`): endereço/área de atuação,
      redes sociais (`sameAs`) — F6
- [ ] Domínio final para canonical/sitemap — F6
