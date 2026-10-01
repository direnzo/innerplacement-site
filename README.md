# Inner Placement — site v2

Novo site da Inner Placement, estático, fora do WordPress: Astro 7 + Tailwind CSS 4 + Alpine.js.
Versão de teste publicada em
<https://innerplacement.com.br/v2-teste/> para aprovação dos sócios.

O site atual em WordPress (clone Docker, melhorias de SEO/GEO/performance, deploy em produção)
fica no repositório `innerplacement`, que será congelado quando esta versão entrar no ar.

## Comandos

- `npm install`
- `npm run dev` — servidor local
- `npm run build` — gera o site estático em `dist/` (é o conteúdo de `dist/` que sobe para a hospedagem)
- `python3 tools/versao-teste.py` — gera `teste/index.html`, a versão de testes num arquivo só
- `python3 tools/build-v2-teste.py` — depois do `npm run build`, gera `dist-v2-teste/` (e `.zip`) para a subpasta `/v2-teste/`: links com prefixo, `noindex, nofollow` em todas as páginas, sem canonical e sem o `.htaccess` de produção. É o que sobe para `~/innerplacement/v2-teste/` no servidor (a raiz do site é `~/innerplacement`, não `public_html`)
- `tools/publicar-v2-teste.sh [--simular]` — build + variante + backup no servidor (`~/backups-v2-teste/`) + envio só para `v2-teste/` + conferência das 10 páginas online. Exige a chave `inner-v2` destravada (comando no topo do script)

## Onde mexer

- Conteúdo é literal da documentação funcional aprovada pelos sócios, em `src/data/`.
- Texto do botão principal (pendência P1): `src/data/site.ts`, constante `CTA`
- Perguntas frequentes (fonte única da home e do FAQ): `src/data/faq.ts`
- Depoimentos: `src/data/depoimentos.ts`
- Logos de clientes e autorização de marca: `src/data/site.ts`, lista `logos`
- Tokens da marca: `src/styles/global.css`
- Redirecionamentos 301 das URLs do WordPress: `public/.htaccess`

## Estrutura

| Pasta | O que é | Versionado |
| --- | --- | --- |
| `src/` | Código-fonte Astro: `pages/` (10 páginas), `components/`, `layouts/`, `data/` (conteúdo), `styles/`, `scripts/` | sim |
| `public/` | Arquivos servidos como estão (`favicon.svg`, `.htaccess`) | sim |
| `build/v0.9/` | Site compilado v0.9, exportado do Claude Desktop em 29/09: 10 páginas (inclui `/obrigado/`), links na raiz do domínio, `.htaccess` com 301 das URLs do WordPress, `robots.txt` bloqueando tudo e `noindex` (ainda é teste). Referência para conferir que a fonte reproduz o que foi exportado | sim |
| `imagens/` | Peças de ilustração **aprovadas**, no padrão `inner-<código>-<assunto>-v<n>.png` + `.txt` com prompt e ferramenta | sim |
| `imagens/pendente/` | Peças geradas aguardando aprovação | não |
| `imagens/exploracao/` | Gerações descartadas e o registro da conversa de aprovação | não |
| `imagens/apoio/` | Kit oficial da marca (SVGs, fotos da equipe) copiado do Drive | não |
| `docs/guia-imagens.md` | Guia canônico de geração de imagens (74 peças, códigos H/P/G, prompts, checklist) | sim |
| `docs/plano-ilustracao.md` | Abordagem híbrida (SVG da marca + IA só para atmosfera), divisão em 5 blocos e estado de cada um | sim |
| `docs/ilustracao/` | Propostas em SVG de cada bloco, aguardando escolha | sim |
| `tools/ilustracao/` | Geradores das ilustrações em SVG a partir do kit (`node --experimental-strip-types tools/ilustracao/<bloco>.mts`) | sim |
| `tools/versao-teste.py` | Gera a versão de testes num HTML único a partir de `dist/` | sim |
| `tools/imagem/` | Acabamento das imagens com `sharp` (WebP, AVIF, PNG, SVG). Rodar `npm install` na pasta | sim |
| `referencia-v2-teste/` | Espelho do HTML publicado em `/v2-teste/`, só para consulta | não |
| `docs/README-original-desktop.md` | README como veio da sessão do Claude Desktop | sim |

## Fluxo de trabalho

- `main` é sempre o estado estável.
- Cada frente de trabalho em uma branch própria (`imagens/rodada-3`, `pagina/outplacement`…), com merge na `main` ao concluir.
- Nenhuma imagem entra em `imagens/` sem aprovação explícita; o `.txt` ao lado registra prompt e ferramenta.

## Pendências

### Antes de publicar em produção (vindas da fonte)

- Formulário: definir o destino do envio (P13). Enquanto isso ele só leva ao Agradecimento.
- Vídeos de depoimento: faltam as URLs publicadas.
- Logos: só Mosaic, BCG e Santillana estão autorizados na documentação.
- Quem somos e Blog continuam apontando para o WordPress atual.
- Indexação: a fonte já está pronta para produção (só `/obrigado/` tem `noindex`, sem `robots.txt`). O build `build/v0.9/` tem `robots.txt` bloqueando tudo e `noindex` na home porque foi preparado como teste — não reaproveitar esses dois arquivos no deploy final.

### Imagens

1. **Revisar as 8 peças aprovadas contra o checklist do guia.** Várias têm brilho/sombra, figuras em silhueta e skyline genérico, que o checklist proíbe. Todas têm uma franja de artefato na borda do recorte (defeito técnico, corrigível no acabamento). Detalhes no `.txt` de cada peça.
2. **P-03** aguarda aprovação (`imagens/pendente/`).

## Estado das imagens

Desde 29/09 as ilustrações seguem a abordagem híbrida, por blocos: ver `docs/plano-ilustracao.md`.

| Código | Peça | Status |
| --- | --- | --- |
| H-01 | Hero | aprovada: v4 em SVG no site (v3 do ChatGPT fica só como referência) |
| H-02/H-03 | Caminhos | aprovadas: discos em SVG no site (o PNG do ChatGPT fica só como referência) |
| H-04 | Por que a Inner, transição | aprovada: v1 em SVG (passagem) no site; o PNG antigo fica como referência |
| H-05 | Por que a Inner, crescer | aprovada: v1 em SVG (organograma) no site |
| H-06 | Capa de vídeo | aprovada: capa v2 em SVG no site e moldura v1 para quando houver miniatura |
| H-21 a H-23 | Ícones dos números | aprovados: calendário, multidão, rosca |
| M-01 | Diagrama do método (redesenho) | aprovado, animado com a rolagem |
| F-01 a F-04 | Formas de fundo das seções | aprovadas |
| G-01 | Fechamento | aprovada: v2 em SVG (a conversa) no site; o PNG v1 fica como referência |
| H-09 | Perguntas, ícone do título | aprovada (balões) |
| H-10 | Manifesto | aprovada (oval lapidado com a rolagem) |
| P-01 | Transição e Recolocação | aprovada |
| P-02 | Desenvolvimento de Carreira | aprovada |
| P-03 | Desenvolvimento de Executivos | pendente |
| demais | ver `docs/guia-imagens.md` | não iniciadas |
