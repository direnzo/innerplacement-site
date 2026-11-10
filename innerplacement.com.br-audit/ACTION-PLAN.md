# Plano de ação SEO: innerplacement.com.br

Pendências em 10/11/2026. Base: `FULL-AUDIT-REPORT.md` (09/11/2026), com os códigos A e M, e relatório técnico do Naia (09/11/2026), com os códigos CORE, SEC e similares. O que já foi feito está no histórico do git.

## Depende dos sócios

| Item | Decisão | Como saber se falhou | Indicador |
|---|---|---|---|
| A4 | Acrescentar frase de definição em Next Level e Executive Alignment, como já feito na Transition | Sem ganho em consultas genéricas em 12 semanas | Consultas não-marca por página |
| A6 | Definir quem assina cada post (o schema `Person` já existe) | Posts em primeira pessoa seguem sem autor | Campo `autor` |
| M2 e CORE-04 | Aprovar descriptions e titles. Sugestão para a home (141 caracteres): "A Inner Placement é uma consultoria que apoia executivos e empresas quando uma trajetória precisa avançar, ajustar-se ou fazer uma transição." | Duplicatas ou textos cortados | Relatório on-page |
| M3 (parte) | Aprovar módulo "Leia também" nas páginas de programa (`findings/cluster.md`, seção 6) | Páginas de programa seguem sem link para posts | Links internos por página |
| M6 | Confirmar ou remover as fontes das estatísticas dos posts | Estatísticas sem fonte seguem no ar | Leitura dos posts |
| M11 | Unificar as duas versões do método e revisar posts antigos | Duas versões seguem no ar | Leitura das páginas |
| Conteúdo | Aprovar novos posts sobre outplacement executivo e Executive Alignment, que têm 0 posts de apoio (`findings/cluster.md`) | Hubs seguem sem satélites | Consultas não-marca por hub |

## Depende de servidor ou de contas

| Item | Ação | Como saber se falhou | Indicador |
|---|---|---|---|
| M4 | Pedir ao suporte da hospedagem uma exceção no ModSecurity para CCBot e Amazonbot, sem desligá-lo no domínio. Causa confirmada em 10/11/2026 pela página de erro. A conta não tem o recurso de ModSecurity no cPanel, e as regras só são legíveis com root | `curl` com o User-Agent segue em 406 | Status em `/robots.txt` |
| M14 | Verificar o Perfil da Empresa no Google, com o mesmo NAP do site | Perfil sem vínculo com o site | `hasMap` e `sameAs` no schema |
| M16 | Revisar as tags no GTM e medir o INP real | Tarefas longas seguem acima de 450 ms | INP no CrUX |
| Fase 4 | Conectar credenciais gratuitas do Google às próximas auditorias | Auditoria sem dados reais | Search Console, CrUX e PageSpeed |
| Presença externa | Wikidata e menções em imprensa do setor, nessa ordem | Entidade sem corroboração externa | Citações em buscas por IA |

## Agenda

| Quando | Ação |
|---|---|
| A partir de 23/11/2026 | SEC-02: subir o HSTS para 1 ano, sem `includeSubDomains` |
| Sem data | SEC-03: testar CSP em `Report-Only`, por causa de GTM e YouTube |
| Agora que a Fase 1 está no ar | Criar nova baseline de drift, mantendo a do WordPress |
| 04/01/2027 | Rever cliques não-marca, páginas indexadas e 404. Se houver queda, conferir antes as atualizações do Google no período |
| Antes de ativar campanhas | Rever o bloqueio de `AdsBot` no `robots.txt` |

## Descartado (não reabrir sem fato novo)

| Item | Motivo |
|---|---|
| M9 e PERF-07, CSS externo | Cerca de 14 KB comprimidos por página, com pedido bloqueante na primeira visita |
| M12 (parte), `/wp-content/uploads/*` | O Search Console só mostra links externos para a home |
| CIT-02 e CIT-08, reescrever a home para ganhar nota | O texto é literal da documentação aprovada, e só há três números autorizados |
| ACC-21, versão em Markdown | O site já tem `llms.txt` e `llms-full.txt`, e o ganho é incerto |
| ACC-23 e ACC-24, WebMCP e `/.well-known` | O site não tem busca, API nem servidor MCP para declarar |
