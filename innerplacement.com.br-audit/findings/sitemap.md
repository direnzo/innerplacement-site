# Auditoria do sitemap — innerplacement.com.br (09/11/2026)

Verificado (curl, somente leitura): sitemap-index.xml, sitemap-0.xml, robots.txt, as 26 URLs, /admin, /obrigado/, /whatsapp/, /sitemap.xml, `astro.config.*`, `src/pages`, `src/content/blog`.

## Resultado por checagem
| Checagem | Resultado |
|---|---|
| XML do índice e do sitemap-0 | OK (índice aponta para 1 sitemap; 26 URLs, bem abaixo de 50 mil) |
| Status das 26 URLs | 200, sem redirecionamento |
| Canonical das 26 URLs | OK, igual à própria URL (com barra final) |
| noindex em URL do sitemap | Nenhuma (nenhuma meta robots nas 26) |
| robots.txt referencia o sitemap | OK: `Sitemap: https://innerplacement.com.br/sitemap-index.xml`; `Allow: /` para o geral |
| /sitemap.xml | 404 (ver Info) |
| Cobertura vs. `src/pages` + `src/content/blog` | Completa: 10 posts + páginas indexáveis = 26. Faltam só /obrigado/ e /whatsapp/ (noindex, filtradas de propósito) e /404 |
| Links internos (home, blog, e-book, quem-somos) | Nenhum link interno para página fora do sitemap |

## Achados

### Critical / High
Nenhum.

### Medium
**M1. Sem `<lastmod>` em nenhuma URL** (0 ocorrências em sitemap-0.xml). O Google usa lastmod quando é confiável; hoje não há sinal de atualização, e os posts têm `data`/`atualizado` no frontmatter.
- Correção: no `sitemap()` de `astro.config.*` usar `serialize` para preencher lastmod dos posts com `atualizado ?? data` (páginas fixas: data do último commit do arquivo, ou omitir). Não usar a data do build para tudo (lastmod idêntico e falso é ignorado).
- Falhou se: `curl -s .../sitemap-0.xml | grep -c lastmod` continuar 0, ou todos os lastmod forem iguais.

### Low
**L1. /e-book/ está no sitemap.** É página de captura (formulário de lead + PDF), indexável, com canonical próprio e conteúdo curto (título "Faça o download do e-book"). Aceitável se a intenção é ranquear; se não, é conteúdo fino. Decisão do dono: manter ou aplicar noindex e filtrar. Observação: o PDF em `/e-book/Por-que-os-Planos-de-Sucessao-Falham-e-Como-Evitar.pdf` é público e acessível por URL direta (não verificado se está indexável).
- Falhou se: /e-book/ aparecer como "Rastreada, não indexada" ou "Conteúdo duplicado/fino" no Search Console.

### Info
- **/admin não está no sitemap** (correto). /admin/ responde 200 com `noindex, nofollow`; /admin redireciona 301 para /admin/. Sem canonical. OK.
- **/obrigado/ e /whatsapp/** estão fora do sitemap pelo `filter` e têm noindex. OK.
- **/politica-de-privacidade/** no sitemap, 200, canonical correto: aceitável.
- **/sitemap.xml retorna 404.** Esperado: o Astro gera `sitemap-index.xml`. Só vira problema se algum sistema externo (Search Console antigo, ferramentas) ainda apontar para /sitemap.xml, herança do Yoast do WordPress. Correção opcional: enviar `sitemap-index.xml` no Search Console; redirecionar /sitemap.xml para o índice (301) é opcional. Falhou se: o Search Console mostrar "Não foi possível buscar" para o sitemap enviado.
- O sitemap declara namespaces news/image/video/xhtml sem usá-los: inofensivo (padrão do @astrojs/sitemap).
- /blog/page/2/ retorna 404: não há paginação; sem impacto.

## Não verificado
Status no Search Console (indexação real), indexabilidade do PDF, e conteúdo de cabeçalhos X-Robots-Tag.
