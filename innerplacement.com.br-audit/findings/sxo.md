# SXO — innerplacement.com.br (pt-BR, Brasil)

Data: 09/11/2026. Somente leitura; formulário não enviado. O "SXO Gap Score" abaixo é **separado** do SEO Health Score.

## Resumo

- **Não houve SERP real do Google.** A busca disponível é `WebSearch` (índice próprio, marcado como US-only, sem posições, PAA, anúncios, AI Overview ou local pack). A tentativa em `google.com.br/search` devolveu página de bloqueio. Todo achado de "tipo de SERP" abaixo usa essa lista como **proxy**, com confiança baixa a média.
- **Achado principal (High, confiança média-baixa): divergência de tipo.** Nos termos genéricos, o proxy traz quase só conteúdo informativo; as páginas-alvo são de serviço, sem definição do termo. Serviços aparecem quando a busca tem modificador comercial (consultoria, programa, empresa).
- **Título antigo x novo: a troca perde sinal de relevância na home**, que concentra 199 de 257 cliques orgânicos da linha de base. O efeito ainda não é mensurável: a v2 entrou no ar hoje.
- **Nenhum achado Critical verificado.** Texto e títulos são propostas e dependem de aprovação dos sócios.

## Evidência e método

### Verificado

- Render com `render_page.py --mode always` (Playwright, status 200, `is_spa=false`) das 5 páginas pedidas, mais `/para-sua-empresa/next-level/`, `/contato/`, `/quem-somos/`, `/perguntas-frequentes/` e um post. Capturas desktop de home, outplacement e transição; mobile de outplacement.
- Render de 12 páginas de concorrentes (2 outras falharam por erro TLS/certificado: aprimorha.com.br e smleon.com).
- Repositório: `src/pages/**`, `src/data/faq.ts`, `src/layouts/Base.astro`, `docs/mapa-redirecionamentos.md`, `docs/plano-migracao-producao.md`, `~/projetos/innerplacement/docs/PLANO-CONTEUDO.md`.

### Limites

| Item | Estado |
|---|---|
| Posições reais, volumes, PAA, anúncios, AI Overview, buscas relacionadas | **Não verificado** (sem SERP real nem dados de palavra-chave) |
| Dados de Search Console por consulta | Não disponíveis; só a linha de base agregada em `docs/plano-migracao-producao.md` §7.1 |
| Título antigo no ar | Consta como especificação de Yoast em `PLANO-CONTEUDO.md` (linha 186) e foi informado por você. O snapshot Wayback existe (01/11/2025), mas não pude ler o conteúdo |
| Efeito da troca | Impossível medir: v2 publicada em 09/11/2026. Qualquer SERP hoje ainda reflete o WordPress |
| Métricas de prova de concorrentes | Autodeclaradas por eles; não verificadas |
| Contagens de palavras | `extracted_text` (trafilatura, sem navegação/boilerplate). O DOM visível é maior e está indicado quando relevante |

## SERP proxy por termo

Modificadores comerciais em itálico são consultas **construídas por mim** para enxergar o lado de serviços; não são os termos-alvo.

| Consulta | Resultados | Composição observada (tipo pela taxonomia) | Tipo dominante | Confiança |
|---|---:|---|---|---|
| outplacement | 27 | Todos em inglês/internacional: 25 Blog/glossário ("what is"), 2 Serviço (FAQ Impact Group, Intoo) | Blog Post, 93% | Baixa: não é SERP brasileira |
| outplacement executivo | 27 | Mistura pt/es/en. Blog, notícia e PDF acadêmico; 2 anúncios no marketplace OHub. Nenhum serviço de consultoria brasileiro | Blog Post, cerca de 85% | Baixa |
| transição de carreira executivos | 15 | Matéria/editorial cerca de 11, acadêmico 3, LinkedIn 1. Nenhum serviço | Blog Post/notícia | Baixa-média |
| recolocação profissional executivos | 28 | Blog e matéria cerca de 20, acadêmico 4, OHub 2, manual PDF 1 | Blog Post | Baixa-média |
| desenvolvimento de executivos | 23 | Acadêmico/PDF cerca de 15, conteúdo de consultoria e glossário, 1 serviço (Korn Ferry) | Blog Post/acadêmico | Baixa-média |
| *consultoria de outplacement para executivos no Brasil* | 10 | 9 Serviço (6 são home), 1 Blog | Serviço, 90% | Média |
| *programa de transição de carreira para executivos consultoria São Paulo recolocação C-level* | 10 | 8 Serviço/Landing, 2 Blog/arquivo | Serviço, 80% | Média |
| *desenvolvimento de executivos consultoria programa alinhamento C-level coaching executivo empresa* | 9 | 6 Serviço (coaching executivo), 1 programa FGV, 2 artigos | Serviço, 67% | Média |

### O que as páginas de serviço concorrentes fazem (render)

| Página | Palavras | Termo no título | Termo em H1 ou H2 principal | Schema |
|---|---:|---|---|---|
| Brasil Vagas Executivas `/servico/outplacement` | 1745 | Sim | H1 "Outplacement Executivo para Empresas" | Organization |
| Blumen `/recolocacao-profissional-outplacement/` | 951 | Sim | H1 igual ao termo | WebPage, Breadcrumb |
| IBRA (home) | 859 | Sim | H1 vazio | ProfessionalService, FAQPage, ItemList, Breadcrumb |
| My Career by LHH (LP) | 617 | Sim | H1 "...consultoria de Outplacement..." | Nenhum |
| PrataCorp (LP) | 511 | Sim | H2 "Outplacement para Executivos e C-Levels." | Nenhum |
| Thomas Case `/transicao-de-carreira/` | 377 | Sim | H2 "TRANSIÇÃO DE CARREIRA" | WebPage, Organization, Breadcrumb |
| Career Group (home) | 373 | Sim | H1 "...Melhor Consultoria de Outplacement 2024" | Nenhum |

Conteúdo informativo renderizado: Flash 1377 palavras, Senior 1220 (ambos com "O que é outplacement?" em H2 e BlogPosting/Article), IBRA blog 375 palavras (Article + FAQPage).

**Leitura:** 317 a 375 palavras nas páginas da Inner estão na faixa baixa, mas dentro do que serviços concorrentes usam. O diferencial observado não é tamanho: é o **termo declarado em título e cabeçalho visível**.

## Classificação de cada página e divergência

| Página | Tipo (taxonomia) | Termo a que serve | Tipo no proxy | Severidade |
|---|---|---|---|---|
| Home | Hybrid (institucional com distribuição por público) | Marca; termos comerciais | Serviço (6 de 9 em consulta com modificador comercial são home) | MEDIUM |
| `/para-sua-empresa/outplacement/` | Service Page | outplacement, outplacement executivo | Blog (genérico); Serviço (comercial) | **HIGH** no termo genérico; ALIGNED no comercial |
| `/para-voce/transicao-e-recolocacao/` | Service Page | transição de carreira executivos, recolocação profissional executivos | Blog/notícia (genérico); Serviço (comercial) | **HIGH** no termo genérico; ALIGNED no comercial |
| `/para-voce/next-level/` | Service Page | Nenhum termo pedido de forma direta | Serviço/coaching (comercial) | MEDIUM |
| `/para-sua-empresa/executive-alignment/` | Service Page | Não atende "desenvolvimento de executivos" diretamente (termo ausente) | Blog/acadêmico; Serviço de coaching | MEDIUM |

A página natural para "desenvolvimento de executivos" é `/para-sua-empresa/next-level/`, fora da sua lista. Seu título já é "Next Level · Desenvolvimento de Executivos · Inner Placement".

## Título antigo x novo

| | Título | Caracteres | outplacement | transição de carreira | recolocação |
|---|---|---:|---|---|---|
| Antigo | Transição de Carreira, Outplacement e Recolocação Profissional \| InnerPlacement | 79 | Sim | Sim | Sim |
| Novo | Inner Placement · Consultoria de desenvolvimento de carreira | 60 | Não | Não | Não |

**Fatos.** Os três termos saíram da home. O novo título descreve bem a marca, mas nomeia a categoria "desenvolvimento de carreira", diferente do que o público procura nos termos pedidos. Na home, "outplacement" fica só dentro de um depoimento e "recolocação" só em "recolocados". 5 concorrentes comerciais observadas têm a home com a categoria no título (Career Group e IBRA por render; Thomas Case "Transição de Carreira & Recolocação Profissional", Aprimorha e Orientha pelo título listado na busca).

**Linha de base (16 meses até 06/11/2026):** 257 cliques, 3.872 impressões, 115 cliques em "inner placement" (45%), home 199 cliques.

**Hipótese (não verificada):** como boa parte do tráfego é de marca, o impacto absoluto em cliques deve ser pequeno no curto prazo. A perda maior é de oportunidade, porque a home concentra a força da marca e o título deixa de declarar o serviço. O título antigo também tinha 79 caracteres e tende a ser cortado na SERP.

**Recomendação (proposta):** não voltar ao título antigo. Manter "Inner Placement" e devolver um termo central, nas opções do achado H3.

## Achados

### Critical

Nenhum verificado.

### High

**H1. Termos genéricos pedem conteúdo informativo; as páginas-alvo são de serviço, sem definição. (Confiança média-baixa: SERP proxy.)**
- Evidência: `/para-sua-empresa/outplacement/` tem 0 ocorrências de definição de outplacement; os termos genéricos no proxy trazem de 85% a 93% de Blog/glossário/matéria. Em consultas comerciais de outplacement e transição, 80% a 90% são serviços: as páginas atuais servem esse lado.
- Correção (proposta; texto novo): criar um conteúdo-pilar no blog com tipo Hybrid. Candidato: "Outplacement executivo: o que é e como funciona", ligado à página de programa, sem substituir a página de serviço. Reaproveitar o post `/por-que-transicao-de-carreira-e-recolocacao-nao-sao-o-mesmo/` como par do pilar. O texto precisa de aprovação.
- Como saber se falhou: no Search Console, consultas contendo "o que é outplacement" sem impressões no pilar após 8 a 12 semanas de indexado; ou o proxy comercial continuar sem a Inner e os termos genéricos sem URL do site.

**H2. Termos-alvo ausentes de H1, H2 e corpo das páginas de programa.**
- Evidência (DOM visível): em `/para-voce/transicao-e-recolocacao/`, "executivo" 0 vezes e "transição de carreira" 0 vezes. H1 em todos: nome do programa ("Transition", "Next Level", "Executive Alignment"). Em `/para-sua-empresa/outplacement/`, "outplacement" aparece só no kicker "Transitar · Outplacement" e no título; "desenvolvimento de executivos" não aparece em nenhuma das 5 páginas (só no título de `/para-sua-empresa/next-level/`). Na home, os links para a página de outplacement usam "Transition" e "Cuidar de quem sai".
- Correção (proposta; texto, depende de aprovação): manter o nome do programa e adicionar o descritor no H1 ou no H2 logo abaixo, sem trocar o nome. Exemplos: "Transition: outplacement para executivos" e "Transition: transição e recolocação de executivos". O kicker pode virar parte do H1 semanticamente (ajuste de marcação, não de texto novo).
- Como saber se falhou: após indexação, consultas com o termo trazem impressões em URLs erradas (home ou blog) ou nenhuma; ou o `h1` renderizado continua igual ao nome do programa isolado.

**H3. Home sem nenhum dos três termos de serviço no título.**
- Evidência: seção anterior. Home é 77% dos cliques da linha de base. Título é gerado em `src/layouts/Base.astro:22` a partir de `titulo` em `src/pages/index.astro:38`.
- Correção (proposta, escolher uma; o texto do título depende de aprovação):
  - A (54 caracteres): `Inner Placement · Transição de carreira e outplacement`
  - B (66 caracteres): `Inner Placement · Consultoria de carreira e outplacement executivo`. Tende a truncar no final da SERP, sem perder a marca.
- Como saber se falhou: Search Console, em comparação com a linha de base (16 meses até 06/11/2026): impressões da home nessas consultas não aparecem em 8 a 12 semanas; ou o Google reescreve o título na SERP (verificação manual do título exibido).

**H4. Página do RH sem as provas que estão na página do executivo.**
- Evidência: "+15 anos", "+1500 profissionais" e "86% recolocados, em média, em 4,5 meses" aparecem na home e em `/para-voce/transicao-e-recolocacao/`, e não em `/para-sua-empresa/outplacement/`. A página de empresa tem 2 depoimentos (Katia Fernandes, Fabíola Dotta), sem marca de empresa contratante nem lista de clientes. Concorrentes usam tempo de mercado, prêmio e número de atendidos como argumento principal (autodeclarados).
- Correção: reutilizar o bloco de números já aprovado (86% liberado pelos sócios, `docs/plano-migracao-producao.md` §3). A inclusão na página de empresa é decisão de conteúdo e depende de aprovação, embora o texto já esteja aprovado noutro lugar.
- Como saber se falhou: bloco não renderiza em `/para-sua-empresa/outplacement/`; ou taxa de clique de CTA da página de empresa no GA4 continuar abaixo da de `/para-voce/transicao-e-recolocacao/` (eventos `whatsapp_click` e `/obrigado`).

### Medium

**M1. "Desenvolvimento de executivos" não tem página certa no conjunto analisado.**
- Evidência: 0 ocorrências em `/para-voce/next-level/` e `/para-sua-empresa/executive-alignment/`. Quem atende é `/para-sua-empresa/next-level/`, para onde o 301 de `/empresas-desenvolvimento-de-executivos/` já aponta. No proxy, a variante comercial usa majoritariamente "coaching executivo"; "coaching" hoje só aparece em `socios.ts` e em posts.
- Correção: usar `/para-sua-empresa/next-level/` como alvo de "desenvolvimento de executivos" e não forçar o termo em Executive Alignment. Decisão dos sócios: se "coaching executivo" é aceitável no vocabulário da marca. Não verifiquei isso na documentação aprovada.
- Como saber se falhou: impressões na consulta caindo em Executive Alignment ou em `/para-voce/next-level/` no Search Console.

**M2. As duas páginas Transition têm H1 e primeiro H2 idênticos.**
- Evidência: H1 "Transition" e H2 "Quando um ciclo termina, o próximo movimento precisa ser construído." nas duas. Similaridade de caracteres do corpo 46%: não são duplicatas, mas o cabeçalho não diferencia B2C de B2B.
- Correção (proposta; depende de aprovação): descritor do H1 diferente em cada página (H2 acima).
- Como saber se falhou: Search Console mostra as duas URLs alternando para a mesma consulta.

**M3. Executive Alignment sem prova nenhuma.**
- Evidência: 0 depoimentos e 215 palavras. É a única das 5 sem bloco "Quem já fez esse caminho".
- Correção (proposta): se houver depoimento autorizado, ou referência institucional permitida pelo sigilo, incluir. Caso não possa, deixar explícita a razão do sigilo e o método.
- Como saber se falhou: bloco continua sem evidência; ou a página segue sem envio de CTA em GA4.

**M4. Perguntas já aprovadas sobre outplacement sem link contextual.**
- Evidência: `/perguntas-frequentes/` traz "Como funciona o outplacement para um grupo?" e "Quando utilizar Transition Platinum ou Transition Focus no outplacement?" (`src/data/faq.ts:76`), mas a página de outplacement não linka para essa seção. O limite dos sócios é de duas perguntas por página de programa.
- Correção: link contextual, com âncora, para a seção "Transitar | Outplacement" do FAQ. Requer aprovação da frase-link; não exige texto novo de conteúdo.
- Como saber se falhou: link não aparece no DOM ou aponta para o topo do FAQ.

**M5. Sem schema de serviço nas páginas de programa.**
- Evidência: só `ProfessionalService` + `BreadcrumbList`. Confirmado em `findings/schema.md`. O nome do Breadcrumb "Transition" também não declara o serviço.
- Correção: `Service` com `serviceType`, `provider` por `@id` e `areaServed` em cada programa; sem alterar texto visível. Ver `/seo schema`.
- Como saber se falhou: Rich Results Test sem nó `Service`.

### Low

**L1. "Transition Focus" na página de outplacement fala com "especialistas, analistas e coordenadores".** Para a busca "outplacement executivo" o executivo vê uma linha fora do perfil logo no primeiro card. Faz parte da oferta aprovada: não remover. Correção (proposta): deixar Platinum visivelmente associado a executivos. Como saber se falhou: leitura com a persona RH continua misturando os dois.

**L2. Primeiro viewport mobile sem CTA próprio.** Na captura mobile, o CTA não aparece no primeiro viewport e o banner de cookies cobre os cards (primeira visita). No desktop, o CTA está no cabeçalho e o WhatsApp flutua. Correção: botão no herói. Como saber se falhou: captura mobile sem CTA acima da dobra após aceitar cookies.

**L3. Anchors internos com o nome do programa ou frase genérica** ("Transition", "Cuidar de quem sai"). Correção: variar para ao menos um anchor com o serviço, sem mudar o texto dos cards. Como saber se falhou: rastreamento interno sem o termo em nenhum link para a URL.

### Info

- **I1.** Sem CTA de contratação por perfil: o formulário de contato tem nome, e-mail, WhatsApp e mensagem, sem campo "Sou empresa / Sou profissional". Baixa fricção; o custo é triagem.
- **I2.** `HEAD` em URL inexistente devolve 200, `GET` devolve 404 (`/transicao-de-carreira/`, `/nao-existe-xyz-123/`). Não afeta navegação comum, mas pode enganar monitores que usam `HEAD`. Para o crawler, o que vale é `GET`.
- **I3.** Site em produção desde 09/11/2026: a comparação antes e depois só faz sentido depois do reprocessamento pelo Google.

## SXO Gap Score

| Dimensão (máx.) | Home | Transição/Recolocação | Outplacement | Next Level (você) | Executive Alignment |
|---|---:|---:|---:|---:|---:|
| Page Type (15) | 9 | 10 | 7 | 8 | 5 |
| Content Depth (15) | 6 | 5 | 4 | 4 | 3 |
| UX Signals (15) | 12 | 11 | 9 | 11 | 11 |
| Schema (15) | 9 | 6 | 6 | 6 | 6 |
| Media (15) | 9 | 8 | 7 | 11 | 6 |
| Authority (15) | 10 | 11 | 6 | 9 | 3 |
| Freshness (10) | 6 | 5 | 5 | 5 | 5 |
| **SXO Gap Score** | **61** | **56** | **44** | **54** | **39** |

Notas de evidência: palavras úteis 428, 375, 317, 306 e 215 respectivamente. Next Level tem vídeo de depoimento (`Thiago Celso`); Executive Alignment não tem prova. Sem data visível nas páginas de serviço; `publication_date` 2026-01-01 é inferência do extrator, sem valor comprobatório. Pontuações são julgamento analítico, não medição.

## User stories

| # | História | Sinal observado (proxy) | Estágio |
|---|---|---|---|
| 1 | Como RH avaliando um desligamento, quero entender o que é outplacement e se minha empresa deve ter, porque preciso justificar internamente, mas estou bloqueado por falta de informação objetiva | H2 da Senior "Será que minha empresa deve ter um programa de outplacement?"; Flash "Como implementar o outplacement?" | Conscientização |
| 2 | Como CHRO escolhendo fornecedor, quero comparar consultorias com provas, porque a saída de um executivo é sensível, mas estou bloqueado pela falta de evidência comparável | Título BVE "Outplacement Executivo para Empresas"; IBRA "Para empresas que tratam reputação e saídas..." | Consideração, Decisão |
| 3 | Como executivo recém-desligado, quero saber quanto tempo leva e o que fazer, porque a incerteza pesa, mas estou bloqueado por não saber como é o processo | "Como buscar recolocação profissional para cargos executivos"; InfoMoney "Executivos levam em torno de seis meses" | Conscientização, Consideração |
| 4 | Como executivo ainda empregado, quero iniciar uma mudança sem exposição, porque minha posição corre risco, mas estou bloqueado pelo medo de ser identificado | IBRA: B2C "de forma confidencial, mesmo estando empregado" | Consideração |
| 5 | Como RH que precisa desenvolver um executivo, quero um processo com objetivos claros e alinhamento com o gestor, mas estou bloqueado por não saber como se mede a evolução | Fala Company: avaliação, metas/KPIs e reunião com gestor e RH; títulos "Coaching Executivo" | Consideração |

## Personas (notas ordenadas pela mais fraca)

As personas 2 e 4 foram as pedidas. As 1 e 3 vêm dos sinais do proxy.

| Persona / página | Relevância | Clareza | Confiança | Ação | Total | Faixa |
|---|---:|---:|---:|---:|---:|---|
| 1. Quem busca definição (RH analista) em `/para-sua-empresa/outplacement/` | 5 | 5 | 12 | 8 | **30** | Critical Mismatch |
| 2. RH/CHRO em `/para-sua-empresa/executive-alignment/` | 12 | 16 | 9 | 17 | **54** | Needs Work |
| 2. RH/CHRO em `/para-sua-empresa/outplacement/` | 14 | 11 | 13 | 17 | **55** | Needs Work |
| 2. RH/CHRO na home | 11 | 13 | 17 | 18 | **59** | Needs Work |
| 3. Executivo em desenvolvimento em `/para-voce/next-level/` | 14 | 13 | 15 | 18 | **60** | Good |
| 4. Executivo em transição na home | 13 | 14 | 19 | 20 | **66** | Good |
| 4. Executivo em transição em `/para-voce/transicao-e-recolocacao/` | 17 | 15 | 19 | 19 | **70** | Good |

### Persona mais fraca (persona 1 em Outplacement, 30)

**Problema:** não há "o que é outplacement" na página. **Correção:** ver achado H1, com conteúdo-pilar e link; não transformar a página de serviço em artigo.

### Problemas sistêmicos

- **Clareza:** H1 só com nome do programa em todas as páginas de programa. Sem descrição imediata, o visitante precisa ler o parágrafo para saber do que se trata.
- **Confiança para RH:** muito menor que para o executivo, porque os números ficaram só no lado "para você".

### Ações, na ordem

1. RH/definição: conteúdo-pilar (H1), com aprovação de texto.
2. RH em Outplacement e Executive Alignment: números e descritor no cabeçalho (H2, H4, M3).
3. Executivo em transição: citar "transição de carreira" e "executivos" na página (H2); home com opção de título (H3).

## Referências cruzadas

- Lacunas E-E-A-T e autores dos posts: `/seo content`.
- Schema de serviço: `/seo schema`; já tratado em `findings/schema.md`.
- Endereços em SP e Curitiba e intenção local: `/seo local`.
- Quer gerar um relatório em PDF? Use `/seo google report`.

## Fontes do proxy

Listas retornadas por `WebSearch` em 09/11/2026; as páginas de concorrentes usadas nas comparações:

[Brasil Vagas Executivas](https://www.brasilvagasexecutivas.com.br/servico/outplacement), [Blumen](https://blumenconsultoria.com.br/recolocacao-profissional-outplacement/), [IBRA](https://ibrabr.com.br/), [IBRA, blog](https://ibrabr.com.br/blog/o-que-e-outplacement-executivo.html), [My Career by LHH](https://recolocacao.mycareer.com.br/), [PrataCorp](https://lp.pratacorp.com.br/), [Thomas Case](https://thomascase.com.br/transicao-de-carreira/), [Career Group](https://careergroup.com.br/), [Flash](https://flashapp.com.br/blog/outplacement), [Senior](https://www.senior.com.br/blog/outplacement), [Korn Ferry](https://www.kornferry.com/br/solucoes/desenvolvimento-profissional-e-de-lideranca/desenvolvimento-de-lideranca), [Salt](https://saltbr.com/en/coaching-executivo/).

## Dados estruturados para `audit-data.json` (categoria Search Experience)

```json
{
  "category": "Search Experience",
  "serp_real": false,
  "sxo_gap_score": {"home": 61, "transicao_recolocacao": 56, "outplacement": 44, "next_level_voce": 54, "executive_alignment": 39},
  "findings": [
    {"id": "H1", "severity": "High", "title": "Termos genéricos com SERP informativa; páginas-alvo de serviço sem definição", "confidence": "media-baixa", "requires_approval": true},
    {"id": "H2", "severity": "High", "title": "Termos-alvo ausentes de H1, H2 e corpo das páginas de programa", "requires_approval": true},
    {"id": "H3", "severity": "High", "title": "Home sem nenhum dos três termos de serviço no título", "requires_approval": true},
    {"id": "H4", "severity": "High", "title": "Página de RH sem as provas da página do executivo", "requires_approval": true},
    {"id": "M1", "severity": "Medium", "title": "Desenvolvimento de executivos sem página certa no conjunto", "requires_approval": true},
    {"id": "M2", "severity": "Medium", "title": "H1 e primeiro H2 iguais nas duas páginas Transition", "requires_approval": true},
    {"id": "M3", "severity": "Medium", "title": "Executive Alignment sem prova", "requires_approval": true},
    {"id": "M4", "severity": "Medium", "title": "Perguntas aprovadas de outplacement sem link contextual", "requires_approval": true},
    {"id": "M5", "severity": "Medium", "title": "Sem schema de serviço nas páginas de programa", "requires_approval": false},
    {"id": "L1", "severity": "Low", "title": "Transition Focus fala com não executivos na página de outplacement", "requires_approval": true},
    {"id": "L2", "severity": "Low", "title": "Primeiro viewport mobile sem CTA próprio", "requires_approval": false},
    {"id": "L3", "severity": "Low", "title": "Anchors internos sem o serviço", "requires_approval": true},
    {"id": "I1", "severity": "Info", "title": "Formulário sem campo de perfil"},
    {"id": "I2", "severity": "Info", "title": "HEAD devolve 200 em URL inexistente"},
    {"id": "I3", "severity": "Info", "title": "Comparação só faz sentido depois do reprocessamento pelo Google"}
  ]
}
```
