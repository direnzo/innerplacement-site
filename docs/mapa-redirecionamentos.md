# Mapa de redirecionamentos 301 (WordPress → v2)

Base: sitemaps públicos do WordPress em 21/10/2026 (45 URLs) contra as rotas da v2.
Regras em `public/.htaccess`. Testadas em 21/10/2026 num Apache 2.4 local (docroot = `dist/`) contra as 45 URLs dos sitemaps: 44 respondem 301 ou 200 no destino certo; só `/locations.kml` dá 404 (esperado). Revalidar com `curl -I` no deploy real.

**Correção do mesmo dia:** as regras usavam `Redirect`, que anexa o resto do caminho ao destino (`/depoimento/nome/` ia para `/depoimentos/nome/`, 404; idem `/category/x/`). Trocadas por `RedirectMatch` ancorado, com barra final opcional (`/faq` também redireciona).

| URL no WordPress | Destino na v2 | Situação |
| --- | --- | --- |
| `/` , `/contato/`, `/manifesto/`, `/quem-somos/`, `/depoimentos/`, `/blog/`, `/obrigado/`, `/politica-de-privacidade/` | mesma URL | existe |
| 9 posts do blog (mesmo slug) | mesmo slug | existe (os 9 slugs batem com `src/content/blog`; o 10º post do WordPress está nas pendências) |
| `/metodologia-inner-gestao-carreira/` | mesma URL | existe |
| `/profissionais-transicao-de-carreira-outplacement/` | `/transicao-e-recolocacao/` | 301 já existia |
| `/profissionais-evolucao-de-carreira/` | `/desenvolvimento-de-carreira/` | 301 já existia |
| `/empresas-desenvolvimento-de-executivos/` | `/desenvolvimento-de-executivos/` | 301 já existia |
| `/empresas/` | `/outplacement/` | 301 já existia |
| `/faq/` | `/perguntas-frequentes/` | 301 já existia |
| `/depoimento/<nome>/` (14) | `/depoimentos/` | 301 novo (`RedirectMatch`) |
| `/whatsapp/` (trampolim do GTM) | `https://wa.me/5511984311675` | 301 novo |
| `/termos-e-condicoes/` | `/politica-de-privacidade/` | 301 novo |
| `/politica-de-cookies-br/` | `/politica-de-privacidade/` | 301 novo (a política da v2 cobre cookies por categoria) |
| `/endereços/`, `/endereços/curitiba/`, `/endereços/sao-paulo/` | `/contato/` | 301 novo |
| `/profissionais/`, `/category/*`, `/author/*` | `/blog/` | 301 novo |
| `/locations.kml`, `geo-sitemap.xml` | — | sem destino (ficam 404; fonte: plugin de SEO local) |

## Decisões do dono (21/10/2026)

- `/e-book/` — recriada na v2 (`src/pages/e-book.astro`): mesmo texto e mesmos campos do WordPress (Nome, E-mail, Telefone); o envio avisa contato@innerplacement.com.br e libera o botão de download do PDF (`public/e-book/`). Mesma URL, sem redirecionamento.
- `/termos-e-condicoes/` — 301 para `/politica-de-privacidade/`.
- `/o-sobrenome-que-ficou-no-cracha/` — post novo (05/10/2026), importado para `src/content/blog` com `SLUGS=o-sobrenome-que-ficou-no-cracha node tools/migracao/migrar-blog.mjs`. Mesma URL.
