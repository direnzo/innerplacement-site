# SEO Drift: home vs. baseline do WordPress

- **URL:** https://innerplacement.com.br/
- **Baseline:** id 1, capturada em 22/10/2026 (00:20 UTC), ainda no WordPress
- **Comparação:** 09/11/2026 (23:54 UTC), no mesmo dia da migração para a v2
- **Baseline nova:** não foi criada. A tabela `baselines` continua com 1 registro.

## Conclusão

Não há regressão crítica de indexação: status 200, canonical idêntico, sem `noindex` e robots.txt liberando o rastreamento. A regressão real está em **relevância e entidade**: a home deixou de citar os termos comerciais no title e no corpo, e o schema perdeu as pessoas, o `knowsAbout` e parte dos dados locais. O único CRITICAL da ferramenta (H1) é efeito esperado da migração.

| Severidade | Qtde. | Itens |
|---|---|---|
| Critical | 0 | nenhum |
| High | 1 | Termos-chave fora do title e do corpo da home |
| Medium | 3 | `Person`/`employee`, `knowsAbout`, dados locais do schema |
| Low | 5 | Diretivas de preview, `alternateName`, `sameAs` do X, tamanho da description, `AdsBot` (anterior à migração) |
| Info | 11 | Efeitos esperados da migração |

Resultado bruto da ferramenta: 17 regras, 6 disparadas (1 CRITICAL, 3 WARNING, 2 INFO).

## Reclassificação das regras disparadas

| Regra | Ferramenta | Valor antigo | Valor novo | Classificação final |
|---|---|---|---|---|
| `h1_changed` | CRITICAL | Toda transição executiva deixa uma marca. Faça a sua com clareza e estratégia — não com urgência e arrependimento. | Momentos decisivos da trajetória executiva exigem clareza, contexto e precisão. | **Info:** esperado |
| `title_changed` | WARNING | Transição de Carreira, Outplacement e Recolocação Profissional \| InnerPlacement | Inner Placement · Consultoria de desenvolvimento de carreira | **High:** mudança esperada, mas com perda real de termos |
| `meta_description_changed` | WARNING | Soluções personalizadas para profissionais e empresas: desenvolvimento executivo, transição de carreira, outplacement e crescimento com suporte especializado. | A Inner Placement é uma consultoria que apoia executivos e empresas quando uma trajetória precisa avançar, ajustar-se ou fazer uma transição, com método, leitura cuidadosa e acompanhamento individual. | **High** (parte do achado H1) e **Low** (tamanho) |
| `schema_modified` | WARNING | 11 blocos (`c1f034ed4d53…`) | 2 blocos (`df858362f83f…`) | **Medium** nas perdas abaixo, **Info** no restante |
| `h2_structure_changed` | INFO | 8 H2 | 7 H2 | **Info:** esperado |
| `content_hash_changed` | INFO | `9e43e8a7f4fc…` | `d1113946092d…` | **Info:** esperado |

## Critical

Nenhum achado. As regras de status, canonical, `noindex`, remoção de title, H1 e schema não dispararam.

## High

### H1. A home perdeu os termos comerciais no title, na description e no corpo

**Fato confirmado:**

| Termo | Title antigo | Title novo | Description nova | Corpo da home (HTML) |
|---|---|---|---|---|
| Outplacement | sim | não | não | 1 vez, dentro de um depoimento |
| Transição de carreira | sim | não | não ("fazer uma transição") | 0 |
| Recolocação | sim | não | não | 0 (só "recolocados", em um dado numérico) |

- Os links da home para esses serviços usam âncoras de produto ("Transition", "Next Level") ou de situação ("Cuidar de quem sai", "Estou saindo, ou já saí"), sem os termos de busca.
- A mudança de vocabulário na página é deliberada. A documentação funcional v2 (itens 11.1 e introdução) define "Transition" como nome de produto, mas mantém os nomes antigos "no kicker, na URL e no título da aba, **para não perder o vocabulário de busca**".
- As páginas internas seguem essa regra: `Transition · Outplacement · Inner Placement` e `Transition · Transição e Recolocação · Inner Placement`, com os termos também na URL. Isso atenua a perda, mas o H1 de ambas é só "Transition".
- A busca textual na documentação v2 não encontrou o title atual da home, definido em `src/pages/index.astro:38`.

**Desconhecido:** o tráfego real da home para esses termos. O Search Console não foi consultado e a migração é de hoje, então ainda não existe efeito mensurável.

**Recomendação (decisão do dono e dos sócios, porque é texto novo):** incluir os termos no title da home, por exemplo `Outplacement e transição de carreira · Inner Placement` (54 caracteres). O vocabulário da documentação v2 permite esses nomes no título da aba. Vale também avaliar o mesmo ajuste na description. Consulte `/seo page https://innerplacement.com.br/` e acompanhe consultas e CTR no Search Console por pelo menos 2 semanas.

## Medium

### M1. As três pessoas e o vínculo `employee` sumiram do schema

- **Antes:** 3 blocos `Person` (César Cordeiro, Débora Ereno, Paula Oliveira), com cargo, descrição, foto, LinkedIn em `sameAs` e `alumniOf`, ligados à organização por `employee`.
- **Agora:** nenhum `Person` na home. `/quem-somos/` traz apenas `ProfessionalService`, e a busca em `src/` não encontrou `Person`.
- **Impacto:** não afeta rich result nem indexação. Reduz os sinais de autoria e autoridade (E-E-A-T) e o que mecanismos de resposta conseguem associar à marca.
- **Hipótese não confirmada:** a remoção pode ter relação com a regra "sócios aparecem só como fato" da documentação v2, que trata do texto visível e não menciona schema.
- **Recomendação:** reintroduzir os `Person` em `/quem-somos/`, com `@id` estável e referência a partir da organização. Consulte `/seo schema https://innerplacement.com.br/quem-somos/`.

### M2. `knowsAbout` removido

- **Antes:** Outplacement, Recolocação executiva, Transição de carreira, Desenvolvimento de executivos, Desenvolvimento de liderança.
- **Agora:** propriedade ausente.
- **Impacto:** são exatamente os termos que saíram do title e do corpo (H1).
- **Recomendação:** restaurar em `ProfessionalService`. É uma compensação barata, não altera o texto visível e não substitui a correção de H1.

### M3. Dados locais e de contato reduzidos no schema

- **Removidos:** `geo` (-23.5829239, -46.6781108), `postalCode` (04533-001), `contactPoint`, `vatID` e `priceRange`.
- **Ponto novo:** há dois `PostalAddress` (São Paulo e Curitiba) no mesmo nó `ProfessionalService`, enquanto o formato usual para negócio local é um nó por unidade.
- **Recomendação:** restaurar `postalCode` e `geo` de São Paulo. Definir CEP e coordenadas de Curitiba com os sócios (não inventar) e separar as unidades. Consulte `/seo schema https://innerplacement.com.br/`.

## Low

### L1. Diretivas de preview perdidas (não é restrição de indexação)

- **Antes:** `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
- **Agora:** sem meta robots na home, e sem `X-Robots-Tag` nos headers da captura de 09/11 (`home-render.json`). A ausência equivale a `index, follow`, portanto **a diretiva não ficou mais restritiva**.
- **Efeito:** sem `max-image-preview:large`, perde-se a autorização explícita de imagem grande em preview, relevante para o Discover.
- **Recomendação:** adicionar `max-image-preview:large, max-snippet:-1, max-video-preview:-1` no layout, evitando as páginas `noindex`.

### L2. `alternateName` "InnerPlacement" removido

A grafia "Inner Placement" é regra do cliente. Porém o `alternateName` ajudava a associar a variante sem espaço, usada no site antigo. Decisão do dono, pois a regra de grafia vale para "qualquer texto do site".

### L3. Perfil do X fora do `sameAs`, mas ainda em `twitter:site`

`https://x.com/innerplacement` saiu do `sameAs`, enquanto `twitter:site` continua `@innerplacement`. Convém alinhar os dois conforme o perfil siga ativo ou não.

### L4. Meta description com cerca de 200 caracteres (antes: 158)

Tende a ser cortada no resultado de busca, por volta de 155 a 160 caracteres, e o trecho final se perderia. Ajuste depende de aprovação do texto.

### L5. `AdsBot` bloqueado no robots.txt (anterior à migração, não é drift)

`User-agent: AdsBot` com `Disallow: /` veio do WordPress (herança do Yoast, segundo `docs/PLANO-OTIMIZACAO.md` do repositório antigo). Não afeta a busca orgânica, mas o site usa Google Ads (`AW-17293202267`, em `docs/plano-migracao-producao.md`). A baseline não guarda o robots.txt, e não testei se esse grupo alcança o `AdsBot-Google`. Recomendo validar com `/seo technical https://innerplacement.com.br/`.

## Info: efeitos esperados da migração

| Item | Mudança | Por que é esperado |
|---|---|---|
| H1 | Texto novo | Novo posicionamento. O H1 antigo também não trazia os termos comerciais. |
| Similaridade do H1 (39%) | Medida um pouco distorcida | O parser junta "executivaexigem". O HTML real tem espaço, então não há defeito no site. O mesmo ocorre em H2. |
| H2 | 8 para 7, seções novas | Nova estrutura da home |
| Hash do HTML | Diferente | Troca de plataforma |
| Marca | "InnerPlacement" para "Inner Placement" | Regra de grafia do cliente |
| `WebPage`, `ImageObject`, `BreadcrumbList` | Removidos da home | Blocos gerados pelo Yoast. O breadcrumb tinha só "Início" e não gerava rich result útil. |
| `WebSite` / `SearchAction` | Removida | Apontava para `?s=` do WordPress, e o Google aposentou a caixa de pesquisa de sitelinks em 2024. |
| `@id` | `#organization` para `#organizacao`, `#website` para `#site` | Identificadores internos, consistentes dentro do site novo |
| Telefone | 11-3090-1646 e 11-96071-8990 para +55 11 98431-1675 | É o número da documentação v2. Confirme se o Perfil da Empresa no Google usa o mesmo. |
| Endereço de Curitiba | Adicionado | A documentação v2 cita "São Paulo · Curitiba" |
| Open Graph | Imagem, nome e textos novos; sai `og:image:type`, entra `og:image:alt` | Conjunto completo; `/og/inicio.jpg` e `/logo.svg` respondem 200 |

## Sem alteração (conferido)

- Status 200 e canonical `https://innerplacement.com.br/`.
- Nenhum `noindex`.
- robots.txt com `Allow: /` para `*`, os bots de IA liberados e `Sitemap` declarado.
- As páginas `/quem-somos/`, `/perguntas-frequentes/`, `/para-sua-empresa/outplacement/` e `/para-voce/transicao-e-recolocacao/` respondem 200, sem meta robots e com canonical próprio.

## Limitações

- **Só a home tem baseline.** Redirecionamentos 301 das URLs antigas e demais páginas não fizeram parte desta comparação.
- **CWV e performance não comparados:** a baseline não tem esses dados (`has_cwv: false`).
- **Limite das regras:** `schema_removed` e `og_tags_removed` só disparam se **tudo** sumir. Por isso as perdas parciais de schema acima foram levantadas manualmente, comparando os JSON-LD.
- **Valores das regras não disparadas:** a saída da ferramenta traz valores fixos (como "0 schema blocks") que não refletem a página. A home tem 2 blocos.
- **Sem dados de desempenho orgânico:** Search Console e posições não foram consultados.
- **Registro local:** o `drift_compare.py` gravou 1 linha na tabela `comparisons` de `~/.cache/claude-seo/drift/baselines.db`. Isso é próprio da ferramenta. O site e a baseline não foram alterados.

## Dados estruturados (SEO Drift)

```json
{
  "category": "SEO Drift",
  "url": "https://innerplacement.com.br/",
  "baseline_id": 1,
  "baseline_available": true,
  "new_baseline_created": false,
  "compared_at": "2026-11-09T23:54:22Z",
  "tool_summary": {"rules": 17, "triggered": 6, "critical": 1, "warning": 3, "info": 2},
  "final_summary": {"critical": 0, "high": 1, "medium": 3, "low": 5, "info": 11},
  "findings": [
    {"id": "H1", "severity": "High", "type": "regression", "title": "Termos-chave fora do title e do corpo da home"},
    {"id": "M1", "severity": "Medium", "type": "regression", "title": "Person e employee removidos do schema"},
    {"id": "M2", "severity": "Medium", "type": "regression", "title": "knowsAbout removido"},
    {"id": "M3", "severity": "Medium", "type": "regression", "title": "Dados locais e de contato reduzidos no schema"},
    {"id": "L1", "severity": "Low", "type": "regression", "title": "Diretivas de preview perdidas, sem restrição de indexação"},
    {"id": "L2", "severity": "Low", "type": "regression", "title": "alternateName removido"},
    {"id": "L3", "severity": "Low", "type": "inconsistency", "title": "X fora do sameAs, mas presente em twitter:site"},
    {"id": "L4", "severity": "Low", "type": "regression", "title": "Meta description com cerca de 200 caracteres"},
    {"id": "L5", "severity": "Low", "type": "pre_existing", "title": "AdsBot bloqueado no robots.txt"}
  ]
}
```
