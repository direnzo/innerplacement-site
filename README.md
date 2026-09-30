# Inner Placement — site v2

Novo site da Inner Placement, estático, fora do WordPress. Versão de teste publicada em
<https://innerplacement.com.br/v2-teste/> para aprovação dos sócios.

O site atual em WordPress (clone Docker, melhorias de SEO/GEO/performance, deploy em produção)
fica no repositório `innerplacement`, que será congelado quando esta versão entrar no ar.

## Estrutura

| Pasta | O que é | Versionado |
| --- | --- | --- |
| `src/` | Código-fonte Astro do site (**ainda não importado** — ver Pendências) | sim |
| `build/v0.9/` | Site compilado v0.9, exportado do Claude Desktop em 29/09: 10 páginas (inclui `/obrigado/`), links na raiz do domínio, `.htaccess` com 301 das URLs do WordPress, `robots.txt` bloqueando tudo e `noindex` (ainda é teste). Linha de base enquanto a fonte não chega | sim |
| `imagens/` | Peças de ilustração **aprovadas**, no padrão `inner-<código>-<assunto>-v<n>.png` + `.txt` com prompt e ferramenta | sim |
| `imagens/pendente/` | Peças geradas aguardando aprovação | não |
| `imagens/exploracao/` | Gerações descartadas e o registro da conversa de aprovação | não |
| `imagens/apoio/` | Kit oficial da marca (SVGs, fotos da equipe) copiado do Drive | não |
| `docs/guia-imagens.md` | Guia canônico de geração de imagens (74 peças, códigos H/P/G, prompts, checklist) | sim |
| `tools/imagem/` | Acabamento das imagens com `sharp` (WebP, AVIF, PNG, SVG). Rodar `npm install` na pasta | sim |
| `referencia-v2-teste/` | Espelho do HTML publicado em `/v2-teste/`, só para consulta | não |

## Fluxo de trabalho

- `main` é sempre o estado estável.
- Cada frente de trabalho em uma branch própria (`imagens/rodada-3`, `pagina/outplacement`…), com merge na `main` ao concluir.
- Nenhuma imagem entra em `imagens/` sem aprovação explícita; o `.txt` ao lado registra prompt e ferramenta.

## Pendências

1. **Importar o código-fonte Astro da v2.** O zip `site-inner-teste-v0.9.zip` trouxe só o site compilado (guardado em `build/v0.9/`). A fonte (`src/*.astro`, `package.json`, `astro.config.*`, estilos) continua na sessão do Claude Desktop "Innerplacement site redesign strategy".
2. **Revisar as 8 peças aprovadas contra o checklist do guia.** Várias têm brilho/sombra, figuras em silhueta e skyline genérico, que o checklist proíbe. Todas têm uma franja de artefato na borda do recorte (defeito técnico, corrigível no acabamento). Detalhes no `.txt` de cada peça.
3. **P-03** aguarda aprovação (`imagens/pendente/`).

## Estado das imagens

| Código | Peça | Status |
| --- | --- | --- |
| H-01 | Hero | aprovada |
| H-02/H-03 | Caminhos | aprovada |
| H-04 | Selo transição | aprovada |
| H-05 | Selo crescimento | aprovada |
| H-06 | Capa de vídeo | aprovada |
| G-01 | Fechamento | aprovada |
| P-01 | Transição e Recolocação | aprovada |
| P-02 | Desenvolvimento de Carreira | aprovada |
| P-03 | Desenvolvimento de Executivos | pendente |
| demais | ver `docs/guia-imagens.md` | não iniciadas |
