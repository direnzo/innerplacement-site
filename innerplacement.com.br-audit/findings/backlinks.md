# Backlinks: innerplacement.com.br (09/11/2026)

## Limitação declarada

Só o Tier 0 estava disponível (sem chave Moz, Bing ou DataForSEO). Fontes usadas: Common Crawl (domain-level, confiança 0,50; release `cc-main-2026-jan-feb-mar`) e `curl` direto nas URLs (confiança 0,95).

**Nota de Saúde de Backlinks: DADOS INSUFICIENTES.** Menos de 4 fatores têm fonte. Não há nota numérica, nem contagem de domínios referenciadores, DA/PA, spam score, âncoras, velocidade de links ou geografia.

**Não foi possível listar as URLs antigas que recebem links externos.** Nenhuma fonte disponível fornece links por URL. A checagem abaixo parte, então, das URLs conhecidas do WordPress (mapa de redirects, sitemaps) e de padrões típicos do WP. Ela não prova que essas URLs têm backlinks.

## Common Crawl (0,50)

- `in_crawl: false`, `in_rankings: false`; PageRank, harmonic centrality e n_hosts nulos.
- O domínio não aparece no grafo do trimestre jan-mar/2026 (grafos trimestrais, defasados). Interpretação: é um domínio pequeno ou ausente do grafo. Não é evidência de ausência de backlinks nem de penalidade.

## Achados

### Critical
Nenhum.

### High
Nenhum.

### Medium

**M1. `/wp-content/uploads/*` responde 404 (sem redirect).** Testado: `/wp-content/uploads/` e um arquivo de exemplo (inexistente por construção; só confirma o 404 genérico). Imagens e PDFs do WordPress que tenham sido linkados ou hotlinkados por terceiros perderam o link. `public/.htaccess` não tem regra para `wp-content`, e `src/` e `public/` não referenciam `wp-content`.
Correção: no Search Console (Links, Páginas com mais links externos) e nos logs do servidor (`~/backups-producao/` e o WordPress antigo em `~/innerplacement-wp-ANTIGO-20261109`), listar os `/wp-content/uploads/...` mais acessados ou linkados. Copiar esses arquivos para `public/wp-content/uploads/` com o mesmo caminho, ou criar 301 para equivalentes. Para o resto, um 410 é aceitável.

**M2. Feeds do WordPress em 404:** `/feed/`, `/blog/feed/`, `/comments/feed/`. Leitores RSS e agregadores que assinavam o feed perdem o conteúdo.
Correção: gerar `rss.xml` (`@astrojs/rss`) e fazer 301 de `/feed/` e `/blog/feed/` para ele.

### Low

- **L1.** `/sitemap.xml` (404). O Yoast usava `/sitemap_index.xml`, que redireciona. Ajuste opcional: 301 de `/sitemap.xml` para `/sitemap-index.xml`.
- **L2.** Outros padrões de URL do WP em 404, sem backlink esperado: `/page/2/`, `/blog/page/2/`, `/tag/carreira/`, `/wp-json/`, `/wp-login.php`, `/wp-admin/`. Verificar no Search Console se alguma tem links externos antes de decidir (410 ou 301 para `/blog/`).
- **L3.** `/xmlrpc.php` responde 403. Comportamento bom, nenhuma ação.
- **L4.** Cadeia `http://www.innerplacement.com.br/faq/` → `https://innerplacement.com.br/faq/` → `/perguntas-frequentes/` (2 saltos, observado apenas por `Location` do primeiro salto e do segundo testado separadamente). Aceitável; consolidar em um salto se possível.
- **L5.** `/locations.kml` e `/geo-sitemap.xml` em 404, esperado e documentado no mapa (arquivos do plugin de SEO local).

### Info (confirmado por curl)

Todos retornam o destino certo, em 301 de um salto, e coincidem com `docs/mapa-redirecionamentos.md`:

| URL antiga | Resultado |
| --- | --- |
| `/empresas/`, `/empresa/`, `/empresas` | 301 para `/para-sua-empresa/outplacement/` |
| `/faq/`, `/faq` | 301 para `/perguntas-frequentes/` |
| `/profissionais/` | 301 para `/para-voce/` |
| `/profissionais-transicao-de-carreira-outplacement/` | 301 para `/para-voce/transicao-e-recolocacao/` |
| `/profissionais-evolucao-de-carreira/` | 301 para `/para-voce/next-level/` |
| `/empresas-desenvolvimento-de-executivos/` | 301 para `/para-sua-empresa/next-level/` |
| `/depoimento/<nome>/` (testado com nome fictício) | 301 para `/depoimentos/` (as 14 URLs reais não foram testadas uma a uma) |
| `/category/*`, `/author/*` | 301 para `/blog/` |
| `/endereços/...` (acento codificado e não codificado) | 301 para `/contato/` |
| `/termos-e-condicoes/`, `/politica-de-cookies-br/` | 301 para `/politica-de-privacidade/` |
| `/sitemap_index.xml` | 301 para `/sitemap-index.xml` (200) |
| `/`, `/e-book/`, `/whatsapp/`, `/sitemap-index.xml`, `/robots.txt` | 200 |
| `http://` e `www` | 301 para `https://` sem www |

- O sitemap atual lista 25 URLs em `urls.txt`. Os 9 posts e as páginas institucionais mantêm o slug do WordPress, então links externos a eles continuam válidos. Não verifiquei o status de cada slug individualmente.
- Os redirects 301 transferem a maior parte do valor dos links, mas redirecionar várias páginas para uma só (`/depoimento/*`, `/category/*`, `/endereços/*`) pode ser tratado como soft 404. Esse comportamento é do Google, não observado aqui.

## Próximos passos recomendados

1. Exportar do Google Search Console (Links, Páginas com mais links externos) a lista de URLs com backlinks e rodar `curl -I` nela. É o único jeito de fechar a pergunta das URLs antigas sem Moz ou Bing.
2. Configurar chave Moz (grátis, 2.500 linhas por mês) e Bing Webmaster para chegar ao Tier 2.
3. Tratar M1 e M2.
4. Reexecutar este relatório em 2 a 4 semanas, quando a v2 estiver recrawleada.
