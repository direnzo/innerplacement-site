# Plano de ação SEO: innerplacement.com.br

Base: `FULL-AUDIT-REPORT.md`, 09/11/2026. Códigos (A1, M1…) remetem ao relatório. Status em 09/11/2026: Fase 1 feita na branch `seo/fase-1`, com São Paulo como matriz e Curitiba como unidade em M7, exceto o CSS externo em M9 (não compensa: cerca de 14 KB comprimidos por página, com pedido bloqueante na primeira visita). Fase 0: sitemap enviado (confirmado pelo dono) e links externos conferidos no Search Console em 09/11/2026: só a home aparece, com 16 links de 3 sites, e responde 200; nenhum 301 novo necessário. Demais fases não executadas.

## Fase 0: vigília da migração (agora, por 2 semanas)

| Ação | Por quê | Como saber se falhou | Indicador |
|---|---|---|---|
| Enviar `sitemap-index.xml` no Search Console e exportar "Páginas com mais links externos" | É a única fonte de dados reais de indexação e backlinks; destrava M12 | Sitemap com erro ou URLs "descobertas, não indexadas" crescendo | Páginas indexadas e relatório de 404 |
| Testar com `curl` a lista de páginas linkadas e criar os 301 que faltarem | URL antiga com link que vira 404 perde autoridade | Sobra URL linkada em 404 | Contagem de 404 no relatório de cobertura |

## Fase 1: pode ser feito já, só com código (semana 1)

| Item | Ação | Depende de | Como saber se falhou | Indicador |
|---|---|---|---|---|
| A2 | Corrigir markdown (`git pull` antes). O "Veja também:" vazio precisa de destino ou sai | Nada | Texto das páginas ainda mostra `**` ou `[` | Busca por `**` no `dist/` |
| A5 | Aviso de cookies compacto no mobile | Nada | Em 390x844, botão Enviar segue coberto | Conversão mobile no GA4 |
| M1 | 301 de `/index.html` e `/sitemap.xml` | Nada | Loop de redirect ou home fora do ar | `curl` nas 3 URLs |
| M5 | FAQ sem `display:none` no carregamento | Nada | Respostas ausentes do texto extraído | Palavras extraídas sem JS |
| M8 | `lastmod` no sitemap | Nada | Datas iguais em todas as URLs | Search Console |
| M7 e A6 (parte) | Schema: `@id`, um nó por sede e `Person` dos sócios sem cargos não confirmados | Confirmar dados de cada sede | Erro no Teste de Resultados | Validação nas 26 URLs |
| M10 e M9 | `srcset` nas miniaturas; CSS externo | Nada | LCP ou CLS piores | Peso da página de blog |
| M13 | Alvos de toque maiores | Nada | Layout quebra no mobile | Screenshots |

## Fase 2: precisa de decisão dos sócios (semanas 2 e 3)

| Item | Decisão | Depende de | Como saber se falhou | Indicador |
|---|---|---|---|---|
| A1 | Aprovar novo title da home | Nada; é o de maior valor | Impressões em "outplacement" sem subir em 8 semanas | Impressões por consulta |
| A3 | Remover ou autorizar "150 empresas" | Nada | Número segue publicado | Busca no `src/` |
| A4 | Aprovar bloco de definição nas páginas de serviço | A1, para vocabulário único | Sem ganho em consultas genéricas em 12 semanas | Consultas não-marca por página |
| A6 | Definir quem assina cada post | Schema da Fase 1 | Posts em primeira pessoa seguem sem autor | Campo `autor` |
| M2 e M6 | Aprovar descriptions; confirmar fontes das estatísticas | Nada | Duplicatas ou estatísticas sem fonte | Relatório on-page |
| M4 | Liberar ou não CCBot e Amazonbot | Definir política | `curl` com o UA segue em 406 | Presença no Common Crawl |
| M11 | Unificar o método e revisar posts antigos | Nada | Duas versões seguem no ar | Leitura das páginas |

## Fase 3: conteúdo e autoridade (mês 2)

- M3: links internos entre posts e programas, com as palavras já publicadas, seguidos de bloco relacionado por tema.
- Lacuna principal: outplacement executivo e Executive Alignment têm 0 posts de apoio. Temas em `findings/cluster.md`; texto novo depende de aprovação.
- M14: verificar o Perfil da Empresa no Google, com o mesmo NAP do site. Esforço mínimo: SEO local tem baixa relevância para este público.
- Presença externa: Wikidata e menções em imprensa do setor, nessa ordem.

## Fase 4: monitoramento (contínuo)

- Conectar credenciais gratuitas do Google para ter Search Console, CrUX e PageSpeed nas próximas auditorias.
- Criar nova baseline de drift depois da Fase 1, mantendo a do WordPress.
- Rever em 8 semanas: cliques não-marca, páginas indexadas e 404. Se houver queda, conferir antes as atualizações do Google no período.
- Rever `AdsBot` antes de ativar campanhas.
