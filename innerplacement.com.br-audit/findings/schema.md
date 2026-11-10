# Dados estruturados (Schema.org) — innerplacement.com.br

Data: 09/11/2026. Verificado: HTML ao vivo das 26 URLs (curl, extração dos blocos `application/ld+json`) e o código (`src/layouts/Base.astro`, `src/components/TopoPagina.astro`, `src/pages/[slug].astro`, `src/data/socios.ts`). Somente leitura.

## Nota: 68/100

Base técnica limpa (JSON-LD válido, @context https, @id estável, ISO 8601, URLs absolutas). Perde pontos por posts sem @id/ligação com a organização e sem breadcrumb, ausência de Person em /quem-somos/, nenhum schema de serviço e `ProfessionalService` repetido sem papel claro nas páginas internas.

## Detecção (26 URLs, todas com JSON-LD válido, só JSON-LD, sem Microdata/RDFa)

| Grupo | URLs | Blocos |
|---|---|---|
| Home | 1 | ProfessionalService (+PostalAddress x2) e WebSite, em um array |
| Páginas por público/serviço | para-voce, para-voce/next-level, para-voce/transicao-e-recolocacao, para-sua-empresa, .../executive-alignment, .../next-level, .../outplacement (7) | ProfessionalService + BreadcrumbList |
| Institucionais | blog, contato, depoimentos, e-book, manifesto, perguntas-frequentes, politica-de-privacidade, quem-somos (8) | só ProfessionalService |
| Posts | 10 | só BlogPosting (substitui a organização) |

Nenhum FAQPage, HowTo, AggregateRating ou Review no site (confirmado por busca no código).

## O que está bom

- @context `https://schema.org`; JSON válido em todas as páginas.
- `@id` `#organizacao` e `#site` estáveis; WebSite.publisher referencia a organização por @id.
- URLs absolutas; logo (`/logo.svg`, 200, image/svg+xml) e imagem existem.
- Datas ISO 8601; `dateModified` real nos posts que têm `atualizado` (ex.: sou-bom-no-que-faco, 2026-07-20).
- BreadcrumbList correto nas 7 páginas por público/serviço (posições, `item` absoluto, última sem link).
- Endereços de SP e Curitiba como PostalAddress com dados reais do site.
- Sem placeholders. Posts com `image`.

## Achados

### Medium

**M1. Posts: BlogPosting sem @id, sem ligação com a organização e sem breadcrumb.**
- Em `src/pages/[slug].astro`, `author` e `publisher` são `Organization` duplicados e inline (sem `@id`), e o bloco da organização `#organizacao` não existe nas páginas de post (o `schema` prop substitui o `org` em `Base.astro`). Isso cria uma segunda entidade "Inner Placement" desconectada da principal. Também não há BreadcrumbList (a trilha Início / Blog é só HTML) nem `isPartOf`/`WebSite`.
- Correção: usar `author`/`publisher` como `{ "@id": "https://innerplacement.com.br/#organizacao" }`, incluir o nó da organização (ou `@graph` com ela), adicionar `@id` ao post (`<url>#post`), `mainEntityOfPage` como `WebPage` com `@id`, `isPartOf: {"@id": ".../#site"}`, `inLanguage: "pt-BR"`, e BreadcrumbList Início > Blog > título.
- Como saber se falhou: Rich Results Test/Schema Markup Validator mostram duas organizações distintas; ou o `@id` da organização some do post.

**M2. /quem-somos/ sem Person.**
- Os três sócios têm dados reais em `src/data/socios.ts`: nome, LinkedIn (`sameAs`), formação e foto. Hoje a página só repete o ProfessionalService.
- Correção (só com o que está no site): três `Person` com `@id` (`/quem-somos/#cesar-cordeiro`, `#debora-ereno`, `#paula-oliveira`), `name`, `image` (URL absoluta da foto), `sameAs` (LinkedIn), `worksFor: {"@id": ".../#organizacao"}`; ligar na organização por `founder`/`employee` apenas se o dono confirmar o papel (o texto do site os chama de sócios; "founder" não está comprovado, então não usar sem confirmação). `alumniOf` pode usar as instituições listadas em `formacao`, mas é opcional e exige conferir cada uma. Não inventar `jobTitle`.
- Como saber se falhou: tipos Person ausentes no JSON-LD da página.

**M3. Posts apontam autor como a organização, não uma pessoa.**
- Todos os 10 posts têm `autor: "Inner Placement"` no frontmatter; é o dado real do site, então `Organization` é correto e não é erro. Mas o Google privilegia autor identificável para Article. Não há como atribuir pessoas sem inventar.
- Correção: só se o dono definir o autor real de cada post (campo no CMS), então usar `author` como Person com `@id` apontando para o Person de /quem-somos/. Até lá, manter a organização.
- Como saber se falhou: n/a (decisão editorial).

### Low

**L1. Páginas internas repetem o bloco completo da organização.** Em 25 das 26 URLs o ProfessionalService inteiro é reemitido (com os dois endereços). Funciona, mas o padrão é o nó completo só na home (ou em /contato/ e /quem-somos/) e, nas demais, referenciar por `@id`. Correção: em `Base.astro`, emitir a organização completa só em home/contato/quem-somos e, nas outras, um WebPage com `isPartOf`/`publisher` por @id. Falha se o `@id` ficar inconsistente entre páginas.

**L2. Sem WebPage/subtipo nas páginas internas.** /contato/ poderia ser `ContactPage`, /quem-somos/ `AboutPage`, /blog/ `Blog` (ou CollectionPage), /depoimentos/ e /perguntas-frequentes/ `CollectionPage`/`WebPage`. Sem impacto de rich result; ajuda a clareza de entidade.

**L3. Páginas de serviço sem schema `Service`.** As 7 páginas de programa (Outplacement, Executive Alignment, Next Level, Transição e Recolocação) só têm organização + breadcrumb. Cabe um `Service` por página com `@id`, `name`, `description`, `provider: {"@id": ".../#organizacao"}`, `areaServed`, `url` e `audience` (`BusinessAudience`/`Audience`) — usando literalmente o texto aprovado de `src/data/`. Não há rich result para Service; o ganho é de entendimento de entidade. Não incluir preço nem `offers` (não há valores públicos no site).

**L4. ProfessionalService: campos recomendados ausentes.**
- `telephone` está como `+55 11 98431-1675` (válido, mas o formato E.164 sem espaços/hífen `+5511984311675` é o mais seguro).
- Faltam `description`, `legalName` e `foundingDate` (só com dado oficial, não inventar), `contactPoint` (ContactPoint com `telephone`/`email`/`contactType`/`availableLanguage`) e `openingHours` (não há no site; omitir).
- Os dois endereços ficam como array de PostalAddress sem `postalCode` (CEP não está no site; não inventar). Para cada escritório, o mais preciso seria `location` com dois `Place`/`ProfessionalService` filhos, mas é opcional.
- `areaServed: "BR"` ok.

**L5. Imagem do post pode ser relativa à OG.** `image` usa `d.imagem` convertido em URL absoluta (ok); porém só há uma imagem. Recomendação do Google é várias proporções (1:1, 4:3, 16:9) — opcional.

### Info

**I1. FAQPage:** não existe no site (`/perguntas-frequentes/` tem só a organização). Como FAQPage não gera rich result desde 07/05/2026, nada a fazer por SERP. Registrado como Info.

**I2. AggregateRating/Review:** /depoimentos/ não emite nenhum, e depoimentos próprios não dão rich result (self-serving). Nada a fazer.

**I3. Imagens de logo em SVG:** aceitas; se o Search Console reclamar, usar PNG.

## Ordem de correção sugerida

1. M1 (posts: @id, @graph, breadcrumb) — alteração pequena em `[slug].astro`.
2. M2 (Person em /quem-somos/) a partir de `socios.ts`.
3. L3 + L2 (Service e subtipos de página).
4. L1 / L4 conforme prioridade.

## Validação após as mudanças

Rich Results Test (BreadcrumbList e Article) e Schema Markup Validator em: home, um post, uma página de serviço e /quem-somos/. Falha se: aparecer mais de uma entidade "Inner Placement", `@id` referenciado sem nó correspondente na mesma página, ou erro/aviso no Search Console em Melhorias (Fragmentos de navegação, Artigos).
