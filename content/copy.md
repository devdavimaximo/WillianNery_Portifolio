# Copy — William Nery Fotógrafo

> Fonte única da verdade de todo texto do site (CLAUDE.md, seção 3). Nenhum texto é
> escrito direto nos componentes — os componentes leem daqui, por chave.

> ## ⚠️ STATUS: RASCUNHO DE APROVAÇÃO — ainda não é copy final
>
> Todo texto marcado **[RASCUNHO]** foi escrito pelo Claude a pedido explícito do Davi
> (2026-08-17), para servir de proposta de tom/estrutura a ser aprovada com o William —
> não é copy do cliente e não deve ser tratada como definitiva. Nada de fato biográfico,
> número, data ou depoimento foi inventado: onde isso seria necessário, ficou como
> `[placeholder entre colchetes]` ou **[PENDENTE]**. Ao validar com o William,
> substituir cada rascunho pela copy real e trocar a marca para **[APROVADO]**.

## Como este arquivo é lido pelo site

Cada texto do site é um **campo** com uma chave estável. O formato é simples e existe
para o arquivo continuar legível por gente e, ao mesmo tempo, ser carregado pelo código
(`src/content/copy.ts`) sem string solta em componente:

```
**chave.do.campo** — [RASCUNHO]
> O texto vai aqui, numa ou mais linhas de citação.
>
> Linha em branco com `>` separa parágrafos.
```

Tudo que **não** for um campo (títulos, estas explicações, notas entre parênteses) é
ignorado pelo carregador — serve para quem está revisando. Trocar a marca de status ou o
texto de um campo altera o site; renomear a chave quebra o build de propósito, para
ninguém perder texto sem perceber.

Status possíveis: **[RASCUNHO]** (proposta), **[APROVADO]** (validado com o William),
**[PENDENTE]** (falta o dado real — o site mostra a lacuna em vez de inventar).

---

## Identidade

**site.brand** — [APROVADO]
> William Nery

**site.name** — [APROVADO]
> William Nery Fotógrafo

*(Posicionamento: casamentos + ensaios — decisão Davi, 2026-08-17.)*

## Navegação

*(Rótulos vindos da estrutura de páginas aprovada pelo Davi em
`docs/planning/ia-proposta.md`. Confirmar com o William junto com o resto da copy.)*

**nav.portfolio** — [RASCUNHO]
> Portfólio

**nav.about** — [RASCUNHO]
> Sobre

**nav.services** — [RASCUNHO]
> Serviços

**nav.contact** — [RASCUNHO]
> Contato

**nav.menu** — [RASCUNHO]
> Menu

**nav.footer** — [RASCUNHO]
> Rodapé

## SEO

*(Título e descrição que aparecem no Google e no card de compartilhamento. A descrição
é o que decide o clique na busca — precisa citar o que ele faz e onde atua. A área de
atuação está **[PENDENTE]**, então a descrição abaixo ainda é genérica de propósito:
completar assim que o William informar a cidade/região.)*

**seo.home.description** — [RASCUNHO]
> Fotografia de casamentos e ensaios com olhar autoral, por William Nery. Veja o
> portfólio e fale sobre a sua data.

## Home

### Herói

**home.hero.headline** — [RASCUNHO]
> Fotografia que se aproxima do silêncio de uma cena bem vivida.

**home.hero.subtitle** — [RASCUNHO]
> William Nery fotografa casamentos e ensaios com um olhar autoral — cada imagem pensada
> para durar.

*(Alternativa mais direta, caso o William prefira menos poético: "Casamentos e ensaios
fotografados com direção de arte própria, por William Nery.")*

### Apresentação do trabalho

**home.intro.body** — [RASCUNHO]
> O trabalho de William nasce da atenção aos detalhes que passam despercebidos — a luz
> entre duas pessoas, o gesto que não se repete, a pausa antes do abraço. Cada casamento
> e cada ensaio são tratados como uma narrativa própria, não uma fórmula repetida.

### Chamada para contato (CTA)

**home.cta.primary** — [RASCUNHO]
> Solicitar orçamento

**home.cta.secondary** — [RASCUNHO]
> Ver portfólio

## Portfólio

**portfolio.category.wedding** — [APROVADO]
> Casamento

**portfolio.category.session** — [APROVADO]
> Ensaio

*(Título e texto de abertura da seção de portfólio na Home: ainda não existem. Não foram
inventados — a seção abre direto nas fotografias, com as etiquetas de categoria acima.
Se o William quiser um título ali, ele entra aqui como campo novo.)*

## Descrições de imagem (alt)

*(Texto alternativo de cada foto usada no site. Não é enfeite: é o que leitor de tela
anuncia, o que o Google indexa em busca de imagem e o que vai alimentar o `ImageObject`
do JSON-LD na F6. São descrições do que se vê na foto, escritas por nós — **o William
precisa revisar**, porque só ele sabe nome de lugar, cidade e contexto de cada imagem.)*

**image.portifolio_willian_casamento8.alt** — [RASCUNHO]
> Noiva e noivo encostados no batente de uma janela antiga de vidros quadriculados; ela
> de vestido branco acetinado com buquê de copos-de-leite, ele de smoking preto e gravata
> borboleta, ambos iluminados pela luz que entra pela janela.

**image.portifolio_willian_casamento10.alt** — [RASCUNHO]
> Noiva sozinha em contraluz diante de uma janela alta de vidros quadriculados, recortada
> contra a claridade; o vestido e o véu longo aparecem em silhueta clara sobre a escada
> escura.

**image.portifolio_willian_casamento12.alt** — [RASCUNHO]
> Noivos frente a frente em contraluz diante de uma janela alta; ela de vestido branco e
> véu comprido, ele de smoking, os dois recortados contra a luz que vem de fora.

**image.portifolio_willian_ensaio3.alt** — [RASCUNHO]
> Casal de costas caminhando de mãos dadas na beira de um lago, com ponte de madeira e
> árvores de outono ao fundo; ela olha por cima do ombro para a câmera, de vestido branco
> de costas nuas, ele de terno bege.

**image.portifolio_willian_ensaio8.alt** — [RASCUNHO]
> Casal atravessando uma faixa de pedestres de mãos dadas numa rua arborizada; ela de
> vestido branco e casaco de pelo, ele de terno bege, com árvores de folhas alaranjadas
> ao fundo.

**image.portifolio_willian_ensaio12.alt** — [RASCUNHO]
> Casal em pé sobre a grama sob uma grande árvore de folhagem alaranjada de outono; ela
> de vestido branco de manga longa com buquê, ele de terno bege, os dois sorrindo.

**image.portifolio_willian_ensaio15.alt** — [RASCUNHO]
> Retrato em preto e branco de um casal bem próximo, rostos quase encostados; ela sorri
> de olhos fechados, ele inclina a cabeça em direção a ela.

## Sobre

### Bio / história

**about.bio** — [PENDENTE]
> Estrutura apenas, sem fatos inventados. Os `[colchetes]` marcam exatamente o que
> precisa vir do William; a prosa ao redor é só armação, para ser reescrita com a voz
> dele — não apenas preenchida.
>
> "William Nery fotografa casamentos e ensaios há [tempo de atuação]. Seu olhar valoriza
> [características do estilo — luz natural, espontaneidade, composição, o que for real],
> construído a partir de [formação/trajetória, se houver]. Atua principalmente em
> [cidade/região de atuação].
>
> Para ele, fotografar é [visão pessoal do William sobre o próprio trabalho — frase que
> só ele pode dar]."

## Serviços / Pacotes

*(Sem valores — decisão Davi, 2026-08-17: só sob consulta.)*

**services.wedding.name** — [RASCUNHO]
> Casamento

**services.wedding.description** — [RASCUNHO]
> Cobertura completa do dia, dos preparativos à festa.

**services.session.name** — [RASCUNHO]
> Ensaio

**services.session.description** — [RASCUNHO]
> Sessão externa, em casal ou individual, para quem quer fotos fora do ritmo do grande
> dia.

*(Confirmar com o William se há mais categorias de pacote — ex. elopement/mini wedding,
pré-wedding — antes de tratar esta lista como fechada.)*

## Depoimentos

Não incluído no lançamento (decisão Davi, 2026-08-17). Se entrar depois, precisa ser
depoimento real de cliente, com nome e autorização de uso — **nunca inventar**.

## Contato

**contact.cta.label** — [RASCUNHO]
> Vamos conversar sobre a sua data.

**contact.whatsapp.number** — [PENDENTE]
> Número real de WhatsApp do William. Não dá para rascunhar: contato inventado quebra a
> função da página, não é questão de tom.

**contact.email** — [PENDENTE]
> E-mail, se houver.

**contact.area** — [PENDENTE]
> Cidade / região de atuação.

**contact.instagram** — [PENDENTE]
> Perfil no Instagram e demais redes.
