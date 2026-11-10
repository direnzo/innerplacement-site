# SEO técnico — innerplacement.com.br (auditoria de 09/11/2026, pós-migração)

Somente leitura, ~1 req/s, sem POST em /enviar.php. Evidência: `curl` contra produção (saída resumida abaixo).

## Nota: 86/100

| Categoria | Status |
| --- | --- |
| Crawlabilidade (robots, sitemap) | Passa, com ressalva (AdsBot, Medium) |
| Indexabilidade (canonical, noindex) | Passa, com falha em /index.html (High) |
| Migração / redirects | Passa (45 mapeadas, todas 1 salto); lacunas Low |
| Segurança | Parcial (HSTS curto, sem clickjacking/CSP) |
| URLs | Passa |
| Mobile | Passa (viewport presente) |
| Cache / CWV potencial | Passa, ressalvas |

## O que está bom (verificado)

- Todas as 26 URLs do sitemap: HTTP 200, 1 canonical autorreferente absoluto, `https://innerplacement.com.br/...` com barra final, 1 `<h1>`, 1 meta description, sem `meta robots` (indexáveis). Sitemap-index -> sitemap-0.xml com exatamente 26 `<loc>`, iguais a urls.txt.
- Cadeias: todos os redirects testados têm 1 salto (`num_redirects=1`): `http://innerplacement.com.br/` -> https (301), `http://www.../contato/` -> `https://innerplacement.com.br/contato/` (301 direto, sem passar por https://www), `https://www.` idem.
- Mapa de redirecionamentos conferido na produção, todos 301 e destino 200: `/profissionais-transicao-de-carreira-outplacement/`, `/profissionais-evolucao-de-carreira/`, `/empresas-desenvolvimento-de-executivos/`, `/empresas/`, `/empresa/` (+ sem barra), `/profissionais/`, os 4 slugs de teste (`/transicao-e-recolocacao/` etc.), `/faq/` e `/faq`, `/sitemap_index.xml` -> `/sitemap-index.xml`, `/depoimento/ana/` -> `/depoimentos/`, `/politica-de-cookies-br/`, `/termos-e-condicoes/`, `/endereços/` e `/endereços/curitiba/` -> `/contato/`, `/category/x/` e `/author/y/` -> `/blog/`. `/whatsapp/` 200 (noindex, canonical próprio). `/locations.kml` e `/geo-sitemap.xml` 404 (esperado, conforme o mapa).
- Sem barra final (`/contato`, `/para-voce`) -> 301 para a versão com barra; query string preservada (`/contato?x=1` -> `/contato/?x=1`).
- 404 real: `/pagina-inexistente-xyz`, `/para-voce/x/`, `/wp-admin/`, `/wp-login.php`, `/wp-json/` retornam 404 (status correto, não soft 404); a página 404 tem `<title>Página não encontrada · Inner Placement`, `noindex`, sem canonical.
- Segurança presente: HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`; HTTP->HTTPS; gzip ativo (`content-encoding: gzip`); `/_astro/*.woff2` com `cache-control: public, max-age=31536000, immutable`; imagem OG com `max-age=2592000`.
- robots.txt: `User-agent: *` Allow, declara `Sitemap: https://innerplacement.com.br/sitemap-index.xml`, bots de IA liberados. `llms.txt` 200.

## Achados

### High

**H1. `/index.html` (e `/blog/index.html`, `/contato/index.html`) respondem 200 duplicando as páginas**
- Evidência: `curl -sI https://innerplacement.com.br/index.html` -> `HTTP/2 200`; idem `/blog/index.html` e `/contato/index.html`.
- Impacto: duplicata servida sem redirect. Mitigado porque o canonical da home aponta para `/` (verificado no HTML), mas o `/index.html` ainda pode ser rastreado/linkado e diluir sinais.
- Correção (`public/.htaccess`, antes dos RedirectMatch):
  `RewriteCond %{THE_REQUEST} \s/+(.*/)?index\.html[\s?] [NC]` + `RewriteRule ^(.*/)?index\.html$ /$1 [R=301,L]`
  (a condição em THE_REQUEST evita loop com o DirectoryIndex interno).
- Como saber se falhou: `curl -sI /index.html` ainda 200, ou `/` entrar em loop de redirect/ERR_TOO_MANY_REDIRECTS.

### Medium

**M1. `User-agent: AdsBot` / `Disallow: /` no robots.txt**
- Evidência: robots.txt acima. AdsBot é o rastreador de qualidade de landing page do Google Ads. Ele ignora `User-agent: *`, mas respeita grupo nomeado; aqui o grupo nomeado o bloqueia totalmente.
- Efeito: não afeta indexação orgânica nem o Googlebot. Se a Inner roda ou rodar anúncios (o site tem GTM e conversão de WhatsApp), o Google não consegue avaliar as páginas de destino: risco de reprovação/baixa "experiência da página de destino" e anúncios suspensos. Se nunca haverá Google Ads, é inofensivo, mas é regra herdada sem justificativa documentada.
- Correção: se há/haverá anúncios, remover o bloco (ou `Allow: /`). Se foi intencional, registrar o motivo. Não é um achado de SEO orgânico. Decisão do dono (confirmar se herdado do WordPress).
- Como saber se falhou: Google Ads reportar "Não foi possível rastrear a página de destino" ou o relatório do robots.txt no Search Console ainda mostrar a regra.

**M2. HSTS curto (`max-age=2592000` = 30 dias), sem `includeSubDomains`/`preload`**
- Evidência: `strict-transport-security: max-age=2592000` na home. A escolha é deliberada (o .htaccess explica: subdomínios teste/IQA têm vida própria), portanto não é erro.
- Recomendação: após 1-2 semanas estáveis, subir para 6 meses (15552000) e depois 1 ano (31536000). `includeSubDomains`/preload só se todos os subdomínios (iqa.) tiverem HTTPS válido garantido. Ganho de segurança, não de ranking.
- Como saber se falhou: iqa. ou outro subdomínio ficar inacessível por certificado vencido (só se incluir subdomínios).

**M3. Sem proteção contra clickjacking nem CSP**
- Evidência: cabeçalhos da home sem `X-Frame-Options`, `Content-Security-Policy`, `Permissions-Policy` (grep de `frame-ancestors` no HTML também = 0).
- Correção no .htaccess: `Header always set X-Frame-Options "SAMEORIGIN"` (ou CSP `frame-ancestors 'self'`) e `Permissions-Policy "camera=(), microphone=(), geolocation=()"`. Cuidado: o `/admin` (Sveltia) e o GTM exigem teste; CSP completa só em modo Report-Only primeiro.
- Como saber se falhou: GTM/painel /admin quebrarem, ou erro de CSP no console.

### Low

**L1. Títulos longos (>60 caracteres) em posts e na metodologia.** Contagem de caracteres do `<title>`: 110 (quando-o-terreno-muda...), 109 (seguranca-psicologica), 107 (sonhos-desconectados), 95 (metodologia), 81, 78, 75. Podem ser truncados na SERP. Os textos são literais de documento aprovado: só ajustar com aprovação (ex.: omitir o sufixo da marca nos posts). Verificar depois no Search Console se a CTR cai.

**L2. Sem paginação do blog (`/blog/page/2/` = 404)** e todas as URLs de `/category/*`, `/author/*` mandam para `/blog/`. Aceitável com 9-10 posts; se o blog crescer, planejar paginação com canonical próprio.

**L3. Feeds e URLs do WordPress ainda indexadas dão 404:** `/feed/`, `/blog/feed/`, `/comments/feed/`, `/wp-json/`, `/?p=123` (este devolve 200 da home, com canonical `/`, ok). 404 em feed é aceitável, mas o Google pode ter `/feed/` descoberto; verifique no Search Console. Opcional: 301 `/feed/` -> `/blog/` ou gerar `rss.xml` com @astrojs/rss.

**L4. `/sitemap.xml` é 404** (o sitemap fica em `/sitemap-index.xml`, declarado no robots.txt e redirecionado de `/sitemap_index.xml`). Funciona, mas muitas ferramentas tentam `/sitemap.xml` primeiro. Correção: `RedirectMatch 301 ^/sitemap\.xml$ /sitemap-index.xml`. Falha se: `curl -I /sitemap.xml` != 301.

**L5. Sitemap sem `<lastmod>`.** Verificado no sitemap-0.xml: só `<loc>`. Adicionar lastmod (opção `serialize` do `@astrojs/sitemap`, usando a data do post) ajuda o recrawl dos posts.

**L6. `/favicon.ico` 404.** Navegadores e alguns bots pedem esse caminho por padrão, gerando 404 em log. Se já houver `<link rel="icon">` no HTML, só considere um `favicon.ico` na raiz. Confirme o `<link rel="icon">` (não verificado em detalhe).

**L7. Query strings (`/?utm_source=x`, `/e-book/?x`) respondem 200** com canonical limpo (verificado em `/` que o canonical é `https://innerplacement.com.br/` e sem parâmetros no código; para `?utm_source=x` não conferi o canonical servido, pois o HTML é estático e idêntico). Sem ação, só manter o canonical absoluto sempre.

### Info

- **I1. Cache:** HTML com `cache-control: max-age=0` + `expires` igual à data da resposta; revalidação sempre. Decisão consciente (doc. no .htaccess) e correta para um site editado via CMS com publicação imediata. Não há `ETag` na resposta observada; só `last-modified` (revalidação funciona). Sem regra para `.js`/`.css` fora de `/_astro/`, `.woff2` fora de `/_astro/`, `.pdf` (e-book): ficam sem `Expires` definido; os de `/_astro/` têm 1 ano `immutable` (verificado em woff2). Imagens (OG) 1 mês. Considerar `Expires` longo para `/og/` não é necessário.
- **I2. Servidor misto:** respostas 200 vêm com `server: Apache`; a 404 vem com `server: nginx/1.29.8` (proxy/nginx na frente). Não prejudica, mas indica dois componentes; o `.htaccess` só vale para o que o Apache atende. Verificar que as regras de 404 do `ErrorDocument` e HEAD vs GET são consistentes (ver abaixo).
- **I3. HEAD vs GET divergentes:** `curl -sI /_astro/` -> 200, mas `GET /_astro/` -> 403 ("403 - Acesso negado", `Options -Indexes` funcionando). Sem impacto para o Googlebot (que usa GET); só atenção ao testar com `-I`.
- **I4. `/enviar.php`:** GET retorna 303 (não testei POST, por regra). `/admin/` -> 200 (painel Sveltia): confirmar que tem `noindex` e que não está no sitemap (não está; 26 URLs).
- **I5. Renderização:** HTML estático Astro (home ~198 KB, 200 com conteúdo e `<h1>` no HTML cru); não depende de JS para indexar. Viewport correto (`width=device-width, initial-scale=1, viewport-fit=cover`). CWV (LCP/INP/CLS) não medidos aqui (sem dados de campo): rode PageSpeed/CrUX após alguns dias de tráfego.
- **I6. Não verificado:** dados estruturados (delegar ao agente de schema), hreflang (o site é só pt-BR; não encontrei hreflang na home), IndexNow, conteúdo duplicado entre posts, e redirects de imagens do WordPress (`/wp-content/uploads/...` dá 404: perde-se eventual tráfego de Google Imagens para URLs antigas).

## Priorização

1. H1: redirecionar `/index.html`.
2. M1: decidir sobre AdsBot (depende de Google Ads).
3. M3 + M2: cabeçalhos de segurança e escalonar HSTS.
4. L4, L5, L3 (sitemap.xml, lastmod, feed).
5. L1: revisão de títulos longos com os sócios.
6. Monitorar no Search Console nas próximas semanas: Cobertura (404 de URLs antigas do WordPress), Páginas com redirecionamento, e impressões de `/empresa/` (658 impressões) após o 301.
