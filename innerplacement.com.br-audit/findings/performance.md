# Auditoria de performance: innerplacement.com.br (2026-11-09)

**Escopo de medição: somente laboratório.** Não há dados de campo (CrUX) nem PSI com chave. Nenhum número abaixo representa usuários reais nem o critério de aprovação do Google (p75 de campo). Valores de lab variam de uma execução para outra (rede, servidor).

**INP:** não se mede de forma confiável em laboratório sem interação real. Não foi medido. Como proxy, medi o tempo bloqueado por tarefas longas (soma de duração-50 ms de cada tarefa maior que 50 ms) durante o carregamento, que é um indicador de risco, não INP. Valores acima de 200 ms de INP só podem ser confirmados com CrUX ou RUM (ver achado M-3).

## Método

- Resposta HTTP: `curl` (com `Accept-Encoding: gzip, br`) em 4 URLs: home, `/para-sua-empresa/outplacement/`, `/blog/`, `/por-que-novos-lideres-fracassam/`. Tamanho descomprimido via `curl --compressed` + `wc -c`. TTFB via `time_starttransfer` (1 amostra por URL).
- Análise do HTML por script (Python): tamanho de `<style>`, `<script>`, `<svg>`, contagem de elementos e `<img>`.
- Navegador: Chromium (Playwright) em viewport 390x844, DPR 2, CPU 4x mais lenta, rede emulada via CDP (latência 150 ms, 1,6 Mbps, parecido com "4G lento"), 1 execução por URL, janela de 4 s após o `load`. Mede FCP, LCP, CLS, tarefas longas. Bytes de terceiros (GTM) aparecem como 0 porque são cross-origin sem `Timing-Allow-Origin`: **o peso do GTM não foi medido**.
- Não rodei Lighthouse/PSI (exigiria instalação). Não há nota Lighthouse; a nota abaixo é um julgamento meu a partir destas medições.

## Nota de performance: 82/100 (laboratório, julgamento do auditor)

| Página | HTML descomprimido | HTML gzip (transferido) | TTFB | FCP | LCP (elemento) | CLS | Tarefas longas (excesso >50 ms) | Elementos DOM |
|---|---|---|---|---|---|---|---|---|
| Home | 198.372 B | 71.653 B | 0,43 s (1 amostra) | 572 ms | 572 ms (texto `<p>`) | 0 | 541 ms | 1.016 |
| Outplacement | 124.200 B | 41.927 B | 0,13 s | 524 ms | 524 ms (texto `<p>`) | 0 | 454 ms | 511 |
| Blog (índice) | 128.785 B | 44.004 B | 0,43 s | 820 ms | 1.332 ms (imagem) | 0 | 627 ms | 512 |
| Post | 117.088 B | n/a | 0,56 s (curl) | 880 ms | 1.888 ms (imagem do topo) | 0 | 669 ms | 403 |

(O TTFB do navegador foi 86-452 ms; o do curl, 0,13-0,56 s. Ambos variam; vários passam de 0,4 s em páginas estáticas.)

Status de Core Web Vitals em lab (não é aprovação oficial): LCP bom (<2,5 s) nas 4 páginas; CLS 0 nas 4 páginas; INP **não medido**.

## Achados

### High

**H-1. 62,6 KB de CSS inline repetidos em todas as páginas, e a home carrega 93 KB de SVG inline.**
- Evidência: home 198.372 B descomprimidos = 62.603 B de `<style>` (idêntico em home, outplacement, blog e post) + 93.114 B em 59 `<svg>` + o restante. O `<svg>` de sprite do `Sprite` pesa 15.554 B, presente em todas as páginas. Outras páginas têm 24-33 KB de SVG.
- Impacto: o CSS inline não é cacheado entre páginas; cada navegação rebaixa ~62 KB (gzip menor, o HTML da home vai a 71,6 KB). Em rede lenta isso atrasa o parse e o FCP. O inline do CSS acelera a 1ª visita mas custa nas seguintes.
- Correção: avaliar `build.inlineStylesheets: 'auto'` ou `'never'` no `astro.config.mjs` (CSS externo com `cache-control: immutable`, que o servidor já aplica a `/_astro/`), ou manter inline só o CSS crítico. Para os SVGs da home, mover ilustrações não visíveis na primeira dobra para arquivos `.svg` referenciados (cacheáveis) ou `<use>` de um sprite externo.
- Como saber se falhou: HTML da home descomprimido continua acima de ~100 KB; segunda visita à home não reduz o transferido; FCP em rede lenta não melhora.

**H-2. Miniaturas do blog usam as imagens grandes (1600 px) em cards de 640x360.**
- Evidência: `<img width="640" height="360">` aponta para os mesmos arquivos WebP de 1600 px do post (ex.: `quando-o-terreno-muda...webp` = 381.402 B, 1600 px). As 10 imagens do blog somam 862.062 B. No lab móvel, `/blog/` transferiu 551.735 B no total até 4 s.
- Impacto: peso e LCP do índice (LCP = imagem, 1.332 ms) desnecessariamente altos; mais caro em rede móvel.
- Correção: gerar variantes (ex.: 640 e 1200 px) com `srcset`/`sizes` ou usar `<Image>`/`getImage` do Astro; recomprimir a de 381 KB (alvo <120 KB, pesos como as demais).
- Como saber se falhou: `/blog/` transfere >300 KB de imagens na dobra inicial; o maior WebP continua >150 KB.

### Medium

**M-1. HTML sem cache de navegador (`cache-control: max-age=0`, `expires` igual à hora da resposta).** Evidência: cabeçalhos da home; `x-server-cache: true` indica cache no servidor. Impacto: toda navegação revalida (aceitável para conteúdo editável, mas sem ETag visível na resposta, não confirmei revalidação condicional 304). Correção: manter, mas confirmar `ETag`/`Last-Modified` e resposta 304; opcionalmente `s-maxage` se houver CDN. Falha se: a segunda visita retorna 200 com corpo completo.

**M-2. TTFB acima de 0,4 s na home, no blog e no post (curl), contra 0,13 s no outplacement.** Meta web.dev: <=0,8 s (bom), menor ajuda o LCP. Hoje está dentro da meta, mas é variável; 1 amostra por URL, repita antes de agir. Correção se persistir: verificar o cache do servidor (cPanel/nginx) e usar CDN. Falha se: p75 de TTFB em RUM >0,8 s.

**M-3. Terceiros (GTM + gtag AW e G) carregam em toda página e produzem 450-670 ms de excesso de tarefas longas no lab com CPU 4x.** Evidência: pedidos para `gtm.js?id=GTM-ND356DQM`, `gtag/js?id=AW-17293202267` e `gtag/js?id=G-669R79ZWTE` (peso não medido, ver Método). O GTM carrega sempre (`async`, injetado no `<head>`), mesmo sem consentimento, conforme `Base.astro`. Não é possível separar quanto das tarefas longas é do GTM e quanto do Alpine/JS próprio sem perfil.
- Correção: (a) medir com perfil de CPU no DevTools, com e sem GTM; (b) adiar a injeção do GTM para `requestIdleCallback`/após `load` se o contêiner permitir (cuidado: decisão do dono, o `GTM_ID` não deve ser trocado; atrasar a injeção pode perder visitas que saem rápido); (c) auditar as tags dentro do contêiner (AW e G-); (d) instrumentar INP em campo (`web-vitals` enviando ao GA4) já que não há CrUX.
- Como saber se falhou: INP p75 >200 ms em RUM/CrUX; excesso de tarefas longas >300 ms em lab.

### Low

**L-1. Cookie banner (Alpine, `x-cloak`, `position: fixed`) sem deslocamento de layout medido (CLS 0).** Em celular o `<p>` do banner não foi o LCP (o LCP foi texto do herói). Sem ação; só garantir que `x-cloak` tenha CSS `display:none` para evitar o flash antes do Alpine iniciar (não verifiquei o flash visualmente).

**L-2. Primeira linha do blog com `loading="lazy"`.** O LCP de `/blog/` é a 1ª miniatura (1.332 ms), mas `loading="lazy"` e sem `fetchpriority`. Correção: `loading="eager"` + `fetchpriority="high"` nas 1-2 primeiras do grid. Falha se: LCP do blog continua sendo imagem tardia.

**L-3. Brotli: o servidor respondeu só com `gzip`** mesmo com `Accept-Encoding: br` (cabeçalho `Vary: Accept-Encoding,User-Agent`). Brotli reduziria ~15-20% o HTML/CSS/JS; o WOFF2 já é comprimido, e gzip nele é desperdício (o servidor aplicou `content-encoding: gzip` ao `.woff2`: 34.815 B transferidos). Correção: habilitar Brotli no nginx/cPanel e excluir `font/woff2` e `.webp` da compressão.

**L-4. Alpine/JS: bundle de ~26 KB gzip** (`Base.astro_astro_type_script_index_0_lang.*.js`), módulo, com cache imutável de 1 ano. Aceitável. O hash do arquivo em produção (`DTbL4aL3`) difere do `dist/` local (`Ddw4fDU3`), o que indica que o `dist/` local não é o build publicado; as medições foram feitas no site no ar.

### Info (pontos positivos confirmados)

- Fonte Hanken Grotesk: 1 arquivo WOFF2 variável (34.815 B transferidos), `font-display: swap`, `preload` com `crossorigin`, e fallback com `size-adjust`/`ascent-override` (Hanken Reserva). CLS 0 nas 4 páginas.
- Estáticos em `/_astro/`: `cache-control: public, max-age=31536000, immutable`. Imagens do blog e `favicon.svg`: `max-age=2592000` (30 dias); sem hash no nome das imagens do blog, 30 dias é uma escolha conservadora e correta.
- HTML comprimido com gzip: 198 KB para 71,6 KB na home.
- LCP lab bom e CLS 0 nas 4 páginas; home e outplacement têm LCP de texto (sem imagem), o que é o melhor caso.
- DOM da home com 1.016 elementos (abaixo de 1.500).

## Imagens: nota 74/100

| Critério | Resultado |
|---|---|
| Alt | Blog índice: todos com texto. Post: imagem do topo com alt `imagem-banner-por-que-novos-lideres-fracassam` (nome de arquivo, fraco; trocar por descrição). Cards de "leia também" no post com `alt=""` (aceitável se decorativos, já que o título ao lado repete). Alts do índice como `abordagem baseada em habilidades` são curtos mas válidos. |
| Peso | 10 imagens de blog = 862.062 B; uma de 381.402 B (excessiva), outra de 117.662 B; as demais 12-85 KB. Fotos da equipe em `/_astro/*.webp`. |
| Formatos | WebP nos conteúdos; JPG só nas imagens OG (até 218.674 B no maior). Sem AVIF (opcional). |
| width/height | Presentes em todas as `<img>` verificadas (640x360 nos cards, 1600x900 no topo do post); sem risco de CLS (CLS 0 medido). Atenção: o arquivo `o-sobrenome...webp` é 1600x916 mas declarado 640x360 nos cards (proporção diferente, mascarada por `object-cover`). |
| Lazy | Cards com `loading="lazy"` e `decoding="async"`; imagem do topo do post com `fetchpriority="high"` sem lazy (correto). Falta o mesmo tratamento na 1ª linha do blog (L-2). |
| Responsivas | Sem `srcset`/`sizes`: principal perda (H-2). |
| Home | Nenhuma `<img>` no HTML; ilustrações são SVG inline (ver H-1). |

Ordem de prioridade: H-2 (srcset + recomprimir a de 381 KB), H-1 (CSS/SVG inline), M-3 (medir GTM e instrumentar INP), L-3 (Brotli), L-2.

## Limites

1 amostra por URL e por métrica; 1 localização (WSL, Brasil provavelmente); sem Lighthouse nem CrUX; peso e custo do GTM/gtag não medidos; sem teste de interação, logo sem INP.
