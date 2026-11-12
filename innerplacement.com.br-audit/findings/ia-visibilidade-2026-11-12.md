# Visibilidade em buscas por IA e concorrência: 12/11/2026

Linha de base para repetir em 8 semanas (por volta de 07/01/2027), com as mesmas consultas.

## Método e limites

- Busca: `WebSearch` do Claude Code (índice próprio, marcado como US-only). É o tipo de busca que assistentes de IA usam para responder; não é a SERP do Google Brasil.
- Não medido: Google Brasil (bloqueia consulta automatizada), Bing (devolveu página de verificação), respostas diretas do ChatGPT, Gemini e Perplexity. O conector Naia está instalado, mas sem autorização nesta sessão.
- Uma consulta por termo, sem repetição. O resultado de busca por IA varia entre execuções.

## Consultas e marcas citadas

| Consulta | Inner aparece? | Marcas e fontes citadas |
|---|---|---|
| consultoria outplacement executivo São Paulo | Não | Stato Intoo, Orientha, Trilha Carreiras, Connection HR, Nexo HR, Career Center (quase tudo via oHub); InfoMoney |
| melhores consultorias de transição de carreira para executivos no Brasil | Não | Leaders League (ranking de RH 2026), Korn Ferry, Andrea Thibes e AM Consulting (oHub), Stanton Chase, Robert Half |
| Inner Placement consultoria carreira | Não | "Nenhum resultado sobre uma empresa chamada Inner Placement"; sugere Placement Consulting |
| empresas de recolocação executiva C-level Brasil outplacement ranking | Não | Orientha, Connection HR, IBRA, Thomas Case, Robert Half |
| "Inner Placement" outplacement | Não | Só fornecedores estrangeiros (Careerminds, LHH, Korn Ferry) |
| innerplacement.com.br | Não | Nenhum resultado do domínio |
| "Inner Placement" Paula Oliveira Débora Ereno | Não | Homônimas sem relação |
| quanto custa outplacement executivo e quanto tempo dura | Não | Só fontes em inglês (Intoo, Careerminds, Randstad); nenhuma fonte brasileira com faixa de preço ou prazo |
| consultoria de recolocação executiva Curitiba outplacement | Não | Chess Human Resources (oHub), Senior, Gupy, FIA |
| fui demitido diretor qual consultoria de transição de carreira contratar | Não | Stato (Reclame Aqui), Korn Ferry, Monitor Mercantil, Exame |

## Leitura

- A entidade "Inner Placement" não existe para esse índice: nem a busca pelo nome nem pelo domínio trazem o site.
- As fontes que as IAs usam neste nicho são diretórios (oHub em quase todas), Reclame Aqui, artigos de opinião assinados por consultores (Monitor Mercantil, Exame) e páginas de marcas grandes.
- "Quanto custa e quanto dura" não tem resposta brasileira citável: é a página-pilar já proposta no plano.
- Curitiba tem um único concorrente citado (Chess), o que torna a unidade de Curitiba uma oportunidade local.

## Robôs de IA no site (12/11/2026)

`robots.txt` libera todos. Resposta HTTP da home: 200 para GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Googlebot, bingbot, Applebot e meta-externalagent; 406 para CCBot e Amazonbot (item M4).

## Sinais técnicos dos concorrentes (home, 12/11/2026)

| Domínio | `llms.txt` | Blocos JSON-LD |
|---|---|---|
| innerplacement.com.br | Sim | 2 (ProfessionalService, FAQPage, WebSite) |
| ibrabr.com.br | Sim | 6 |
| orientha.com.br | Sim | 15 |
| thomascase.com.br | Não | 1 (Yoast) |
| stato.com.br | Não | 1 (Yoast) |
| blumenconsultoria.com.br | Não | 1 (Yoast) |
| brasilvagasexecutivas.com.br | Não | 1 |
| careergroup.com.br | Não | 0 |

## Lighthouse mobile das homes (12/11/2026, Lighthouse 12.8.2, um site por vez)

| Site | Perf. | Acessib. | Boas práticas | SEO | LCP |
|---|---:|---:|---:|---:|---:|
| Inner (no ar, antes de `perf/gtm-adiado`) | 92 | 100 | 100 | 100 | 1,7 s |
| Inner (build local com `perf/gtm-adiado`) | 100 | 100 | 100 | 100 | 1,4 s |
| Orientha | 98 | 90 | 75 | 92 | 1,3 s |
| IBRA | 77 | 93 | 79 | 100 | 2,4 s |
| Stato Intoo | 67 | 96 | 96 | 92 | 6,6 s |
| Brasil Vagas Executivas | 57 | 76 | 93 | 100 | 13,4 s |
| Career Group | 50 | 92 | 75 | 100 | 6,6 s |
| LHH | 49 | 87 | 89 | 85 | 10,0 s |
| Thomas Case | 34 | 91 | 57 | 92 | 8,2 s |
| Blumen | 28 | 94 | 79 | 85 | 16,3 s |
