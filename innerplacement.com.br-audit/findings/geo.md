# Auditoria GEO / AI Search: innerplacement.com.br

Data: 09/11/2026. Escopo: as 26 URLs de `urls.txt`, em HTML bruto, mais `robots.txt`, `llms.txt`, `llms-full.txt`, sitemaps e fontes externas públicas.
Somente leitura: nada foi alterado no site ou no repositório, exceto este arquivo.

**Resultado: nota 58/100. Nenhum achado Critical.** O acesso técnico está bom. O que limita a citação é a entidade pouco corroborada fora do site, a autoria anônima e páginas de serviço que não definem o serviço nos termos que o mercado usa.

## Como ler este relatório

- **Confirmado:** medido nesta auditoria, com a evidência indicada.
- **Hipótese:** efeito provável, não medido em motores reais.
- **Não verificado:** a fonte bloqueou ou não permitiu checar.
- **PROPOSTA:** muda texto aprovado pelos sócios. Só entra com aprovação; o `src/data/` é literal da documentação.
- Nenhuma citação real em ChatGPT, Perplexity, Copilot ou AI Overviews foi medida: não há ferramenta DataForSEO nesta sessão. As notas por plataforma são estimativas.
- Os testes de bloqueio usaram o User-Agent do robô a partir desta máquina. O robô real, vindo de IP próprio, pode receber tratamento diferente.

## Nota por dimensão

| Dimensão | Peso | Nota | Pontos | Motivo principal |
|---|---:|---:|---:|---|
| Citabilidade | 25% | 58 | 14,5 | FAQ forte; serviços sem definição; estatísticas sem link |
| Legibilidade estrutural | 20% | 68 | 13,6 | Hierarquia boa; perguntas do acordeão perdidas na extração |
| Multimodal | 15% | 35 | 5,3 | 1 vídeo nas 26 URLs, sem transcrição; nenhuma tabela |
| Autoridade e marca | 20% | 38 | 7,6 | Sócios qualificados, mas sem autoria por pessoa e sem presença externa verificável |
| Acessibilidade técnica | 20% | 85 | 17,0 | HTML estático, robots aberto; ModSecurity recusa alguns robôs |
| **Total** | | | **58** | |

Estimativa por plataforma, por julgamento e sem medição: Google AI Overviews 60, Perplexity 58, Bing Copilot 55, ChatGPT 52.

## Acesso de crawlers de IA (confirmado)

`robots.txt` responde 200 e libera os robôs de propósito, como informado. Resposta testada em `/perguntas-frequentes/` ou na home.

| Robô | O que governa | robots.txt | Resposta HTTP |
|---|---|---|---|
| OAI-SearchBot | ChatGPT Search | Allow explícito | 200 |
| ChatGPT-User | Busca iniciada pelo usuário no ChatGPT | Allow explícito | 200 |
| GPTBot | Treino OpenAI (não ChatGPT Search) | Allow explícito | 200 |
| Claude-SearchBot | Busca do Claude | Não citado; vale `*` Allow | 200 |
| Claude-User | Busca iniciada pelo usuário no Claude | Allow explícito | 200 |
| ClaudeBot | Treino Anthropic (não busca do Claude) | Allow explícito | 200 |
| PerplexityBot | Índice do Perplexity | Allow explícito | 200 |
| Perplexity-User | Busca iniciada pelo usuário | Allow explícito | 200 |
| Googlebot | Google Search e AI Overviews | `*` Allow | 200 |
| Google-Extended | Treino e grounding Gemini/Vertex; não afeta Search nem AI Overviews | Allow explícito | Token só de robots |
| Bingbot | Índice Bing, base do Copilot | `*` Allow | 200 |
| Applebot | Siri, Spotlight, Safari | `*` Allow | 200 |
| Applebot-Extended | Treino Apple Intelligence | Allow explícito | Token só de robots |
| cohere-ai | Treino | `*` Allow | 200 |
| Bytespider | Treino | Allow explícito | 200 |
| **CCBot** | Treino (Common Crawl) | Allow explícito | **406 (ModSecurity)** |
| **Amazonbot** | Rastreador da Amazon | `*` Allow | **406** |

Também recebem 406: `python-requests`, `Python-urllib`, `Go-http-client`. Recebem 200: `curl`, `httpx`, `aiohttp`, `axios`, `node-fetch` e navegador.

Sem `meta robots` restritivo nas 26 URLs; sem `X-Robots-Tag` na home (cabeçalho checado só nela). Renderização: `is_spa=false` nas 26 URLs, com conteúdo no HTML.

## llms.txt e licenciamento

- `/llms.txt`: **presente e bem formado** (H1, blockquote, seções H2 com links), 200, 3.597 bytes.
- `/llms-full.txt`: **presente**, 200, 14.668 bytes; FAQ completo, mas serviços e posts só em resumo (GEO-11).
- São opcionais e o Google Search os ignora. Não há confirmação de uso por parte das plataformas, por isso a prioridade é baixa.
- RSL 1.0: ausente (`/rsl.xml`, `/.well-known/rsl.xml` e `/license.xml` em 404; sem diretiva `License` no robots). Coerente com a política de querer ser usado como fonte; nenhuma ação necessária.

## Sinais de marca externos

| Sinal | Situação | Status |
|---|---|---|
| Wikipedia pt e en | 0 resultados para "Inner Placement" | Confirmado |
| Wikidata | 0 entidades | Confirmado |
| YouTube `@InnerPlacement` | Existe: 8 vídeos, 3 inscritos | Confirmado |
| Google Notícias (RSS) | 0 itens para a busca exata | Confirmado, cobertura limitada do RSS |
| Reddit | API respondeu 403 | Não verificado |
| LinkedIn empresa | 403 | Não verificado |
| Facebook / Instagram | 400 / 200 sem conteúdo avaliável | Não verificado |
| Menções em busca aberta | Brave 429, Mojeek 403, DuckDuckGo vazio, Bing devolveu resultados sem relação | Não verificado |

Estudos de terceiros associam menções em YouTube, Reddit e Wikipedia a citações em IA, e backlinks mais fracamente. É correlação, não causa.

---

## Achados

### Critical

Nenhum. Rastreadores de busca por IA conseguem acessar e ler o site.

### High

**GEO-01. Páginas de serviço não definem o serviço nos termos do mercado** (confirmado)
- Evidência: `/para-sua-empresa/outplacement/` tem H1 "Transition" e H2 "Quando um ciclo termina, o próximo movimento precisa ser construído."; "outplacement" aparece só no título e numa etiqueta curta, e 0 vezes no texto extraído. Nenhuma página responde "o que é outplacement". O hub `/para-sua-empresa/` também tem 0 ocorrências no texto extraído. O FAQ já tem "O que é o Executive Alignment?", mas não há equivalente para Next Level nem Transition.
- Correção (**PROPOSTA**): abrir cada página de serviço com 1 ou 2 frases autônomas, com nome, tipo de serviço, público e formato. Rascunho para os sócios: "Outplacement é o apoio que a empresa oferece a um profissional desligado para conduzir sua transição de carreira. Na Inner Placement, esse programa se chama Transition e tem dois formatos: Platinum e Focus." Confirmar antes se termos como "coaching" e "outplacement" são aceitos pela regra da seção 11 da documentação.
- Como saber se falhou: rodar o `render_page.py` na página; o `extracted_text` não traz a frase com "outplacement" e "Inner Placement" nas primeiras 60 palavras. Depois, perguntar a Perplexity e ChatGPT "o que é o Transition da Inner Placement" e a resposta não refletir a definição.

**GEO-02. Autoria sem pessoa identificada** (confirmado)
- Evidência: os 10 posts têm `autor: "Inner Placement"` e `BlogPosting.author` do tipo `Organization`. `/quem-somos/` traz formação sólida dos 3 sócios (PUC/SP, FIA/USP, Bocconi, Harvard Extension) e LinkedIn, mas sem schema `Person`, sem `founder`/`employee` na organização e sem ligação entre autor e post.
- Correção: os sócios indicam quem assina cada post, sem presumir; o campo `autor` já existe. Em `src/pages/[slug].astro`, emitir `author` como `Person` com `url` e `sameAs` (LinkedIn). Em `/quem-somos/`, schema `Person` para os 3 sócios, ligado a `#organizacao`. Dados já publicados bastam; a atribuição de autor é **PROPOSTA**.
- Como saber se falhou: o JSON-LD de um post continua com `author.@type = Organization`, ou o Rich Results Test / validator.schema.org acusa erro em `Person`.

**GEO-03. Entidade sem corroboração externa verificável** (confirmado no que foi possível checar)
- Evidência: tabela acima. Wikipedia e Wikidata zeradas, YouTube com 3 inscritos e 8 vídeos, nenhum item no Google Notícias.
- Correção: priorizar imprensa de negócios e RH com artigos assinados pelos sócios; publicar no YouTube depoimentos e conteúdo já aprovados. Não criar verbete na Wikipedia sem cobertura independente (critério de notoriedade). Wikidata só com referências externas.
- Como saber se falhou: em 3 a 6 meses, sem novas menções de terceiros em busca manual e sem aumento de citações num painel de 20 perguntas fixas.

### Medium

**GEO-04. Perguntas do acordeão somem na extração e respostas ficam ocultas no HTML** (confirmado na extração; efeito em motores reais é hipótese)
- Evidência: em `/perguntas-frequentes/`, **0 de 26 perguntas** aparecem no `extracted_text` (trafilatura): a resposta "Não. A Inner não tem vagas prontas..." fica sem a pergunta. As perguntas estão em `h3 > button > span` em `src/components/Acordeao.astro`. Além disso, **25 de 26** respostas têm `style="display:none"` no HTML inicial; o mesmo vale para parte dos blocos da home e dos serviços. Extratores que descartam nós invisíveis podem perder as respostas.
- Correção (código, sem mudar texto): testar uma marcação que mantenha o acordeão acessível e deixe a pergunta extraível e as respostas sem `display:none` no HTML inicial (ocultar por script ou usar `<details>`). Comparar variantes com trafilatura e Readability antes de escolher. Preservar `aria-expanded`/`aria-controls`.
- Como saber se falhou: no `extracted_text`, menos de 26 perguntas; ou `grep -c 'style="display:none"'` nas regiões do acordeão ainda acima de 0; ou o acordeão deixa de funcionar por teclado.

**GEO-05. Estatísticas de terceiros sem link para a fonte** (confirmado; veracidade não verificada)
- Evidência: `por-que-novos-lideres-fracassam` cita HBR 2021 (60%), "Talent Gap Report"/LinkedIn 2022 (40%) e Gallup 2020 (25%) sem link. `quando-o-terreno-muda...` cita Korn Ferry (79%) sem link. `o-diferencial-invisivel...` liga BCG à página genérica `bcg.com/brazil`, traz "mais de 40% dos sucessores falham" sem fonte, e usa como referência um especial publicitário do g1. Só o link da McKinsey é específico. Não confirmei se esses números existem nas fontes citadas; alguns merecem checagem antes de qualquer reforço.
- Correção (**PROPOSTA**): sócios ou redação localizam a fonte primária e incluem link; o número que não for localizado sai.
- Como saber se falhou: post com percentual atribuído e sem `<a>` externo no parágrafo, ou link que não leva ao estudo citado.

**GEO-06. O dado próprio mais citável não tem base nem período** (confirmado)
- Evidência: "86% dos nossos assessorados se recolocam, em média, em 4,5 meses" aparece na home, em `/para-voce/transicao-e-recolocacao/` e no FAQ, como "referência histórica", sem amostra, período ou critério. "150 empresas" e "+15 anos" aparecem em poucos pontos.
- Correção (**PROPOSTA**, dados dos sócios): acrescentar período, amostra e critério de "recolocado" numa frase única e reutilizada. Não inferir esses valores.
- Como saber se falhou: a frase publicada continua sem período e amostra.

**GEO-07. Dados de entidade incompletos e grafo fragmentado** (confirmado)
- Evidência: `ProfessionalService` (`#organizacao`) tem nome, endereços, `sameAs`, e-mail e telefone, mas não `description`, `legalName`, `taxID`, `foundingDate`, `founder` nem `knowsAbout`. O CNPJ só consta na Política de Privacidade. `BlogPosting.author` e `publisher` repetem `Organization` sem `@id`, sem ligar a `#organizacao`. Páginas de serviço não têm `Service`.
- Correção (código em `src/layouts/Base.astro` e `src/pages/[slug].astro`): referenciar `@id`; incluir `description` já aprovada e `Service` com nome, `provider` e `url`. `legalName` e `foundingDate` dependem dos sócios; não inventar.
- Como saber se falhou: validator.schema.org acusa erro; ou o JSON-LD de um post continua sem `@id` igual a `https://innerplacement.com.br/#organizacao`.

**GEO-08. Robôs recusados pelo ModSecurity, em contradição com o robots.txt** (confirmado por UA)
- Evidência: CCBot recebe 406 até em `/robots.txt` e `/llms.txt`, embora o robots libere. Amazonbot, `python-requests`, `Python-urllib` e `Go-http-client` também recebem 406. Impacto direto em busca por IA é pequeno: CCBot é treino.
- Correção: decisão do dono. Se a política é mesmo liberar, excluir essas regras no ModSecurity do cPanel ou pedir à hospedagem, identificando a regra pelo log. Se o bloqueio for desejado, tirar CCBot do robots para a política ficar coerente.
- Como saber se falhou: `curl -s -o /dev/null -w "%{http_code}" -A "CCBot/2.0" https://innerplacement.com.br/robots.txt` continua 406.

**GEO-09. Descrições erradas ou duplicadas chegam ao llms-full e às metas** (confirmado)
- Evidência: `a-coluna-que-estava-faltando-na-planilha` e `sou-bom-no-que-faco...` têm a mesma descrição, que não corresponde ao segundo post. `metodologia-inner...` termina em "consciente. .". O resumo de `por-que-transicao...` termina cortado. Vieram do WordPress e alimentam `llms-full.txt` via `tools/llms.mts`.
- Correção (**PROPOSTA**): reescrever essas 3 ou 4 descrições no frontmatter e regenerar os arquivos llms.
- Como saber se falhou: descrições repetidas no `llms-full.txt` após a nova publicação.

**GEO-10. Multimodal fraco** (confirmado)
- Evidência: apenas 1 vídeo (miniatura YouTube em `/para-voce/next-level/`) nas 26 URLs, nenhuma transcrição, nenhum `VideoObject`, 0 tabelas. As comparações Platinum x Focus e Next Level x Executive Alignment só existem em prosa.
- Correção: tabela comparativa com o texto já aprovado (a nova apresentação é **PROPOSTA**); transcrição aprovada para vídeos; `VideoObject` onde houver vídeo incorporado.
- Como saber se falhou: nenhuma `<table>` no HTML das páginas comparativas; vídeo sem transcrição visível.

### Low

**GEO-11. `llms-full.txt` promete conteúdo completo e não entrega; `llms.txt` não aponta para ele** (confirmado)
- Evidência: serviços têm 1 ou 2 frases e posts só resumo; `llms.txt` não cita `llms-full.txt` nem lista posts.
- Correção: em `tools/llms.mts`, incluir corpo das páginas de serviço e dos posts e um link para o arquivo completo. Sem efeito no Google Search.
- Como saber se falhou: `llms-full.txt` continua sem o corpo do texto dos serviços ou `grep llms-full` em `llms.txt` não retorna nada.

**GEO-12. Sitemap sem `lastmod`** (confirmado)
- Evidência: 26 URLs, 0 `lastmod`.
- Correção: gerar `lastmod` real só nos posts (`atualizado` ou `data`); não usar a data do build em todas as URLs.
- Como saber se falhou: `grep -c lastmod` em `/sitemap-0.xml` retorna 0, ou todas as datas são iguais.

**GEO-13. Nomes pouco uniformes da entidade e dos programas** (confirmado)
- Evidência: site "consultoria que apoia executivos e empresas"; FAQ e título "consultoria de desenvolvimento de carreira"; YouTube "empresa especializada em desenvolvimento humano e de carreira, dedicada a desenvolver talentos e formar sucessores". "Transition" tem URLs `outplacement` e `transicao-e-recolocacao`. O site usa "César Cordeiro"; as instruções do projeto usam "Cesar".
- Correção (**PROPOSTA**): adotar uma frase-padrão em YouTube, LinkedIn e perfis; confirmar a grafia do nome com o sócio.
- Como saber se falhou: perfis com descrições divergentes após a revisão.

**GEO-14. Detalhes de imagem e texto alternativo** (confirmado)
- Evidência: capa do e-book sem atributo `alt`; `alt="imagem-banner-por-que-novos-lideres-fracassam"` é resíduo de nome de arquivo.
- Correção: `alt` descritivo.
- Como saber se falhou: `<img>` sem `alt` na `/e-book/`, ou o texto com hífens segue no post.

### Info

- **FAQPage:** ausente. É uma opção que explicita os pares pergunta/resposta sem mexer em texto, mas não há benefício confirmado para IA, e não deve ser tratada como correção.
- **O que está bom:** FAQ com 26 respostas de 27 a 81 palavras (média 45) e resposta direta na primeira frase; 23 delas entre 30 e 80 palavras. Blocos de 130 a 170 palavras são heurística de terceiros, e o Google diz que conteúdo não precisa ser fatiado para IA, por isso não proponho alongar.
- **Migração de hoje (09/11):** 301 testados e corretos em 5 URLs antigas, HTTP, `www` e barra final. Motores de IA podem seguir citando URLs e textos antigos por algum tempo. `/feed/` e `/rss.xml` respondem 404.
- **Depoimentos** com nome e cargo são bom sinal de experiência. Não recomendo schema `Review` próprio, por não dar elegibilidade a resultado avançado em avaliações da própria empresa.
- `AdsBot` bloqueado no robots: fora do escopo de GEO, cabe à auditoria de SEO. `anthropic-ai` é token legado, sem prejuízo.

## Cinco mudanças de maior impacto

| # | Mudança | Tipo | Esforço | Achado |
|---|---|---|---|---|
| 1 | Definições autônomas nas páginas de serviço | PROPOSTA de texto | 2 a 4 h, mais aprovação | GEO-01 |
| 2 | Autoria por sócio e schema `Person` | Código + decisão | 3 a 4 h | GEO-02, GEO-07 |
| 3 | Acordeão extraível, sem `display:none` inicial | Código | 2 a 3 h com testes | GEO-04 |
| 4 | Fontes com link e base do dado de 86% | PROPOSTA + dados | 2 a 4 h, mais apuração | GEO-05, GEO-06 |
| 5 | Presença externa: imprensa, YouTube, artigos assinados | Marca | Contínuo, 3 a 6 meses | GEO-03 |

Ajuste rápido à parte: decidir CCBot e Amazonbot no ModSecurity (até 1 h, GEO-08).

## Limites da auditoria

- Sem Playwright: o HTML bruto já continha o conteúdo.
- Sem medição de citações reais nem de indexação no Bing ou no Google; recomenda-se checar em Bing Webmaster Tools e Search Console.
- Links externos de BCG e McKinsey não responderam ao teste automatizado (403 e erro HTTP/2), o que não indica link quebrado.
- Extração feita com um único extrator (trafilatura, via `render_page.py`).

## Dados estruturados para `audit-data.json`

```json
{
  "category": "AI Search Readiness",
  "score": 58,
  "dimensions": {"citability": 58, "structure": 68, "multimodal": 35, "authority": 38, "technical": 85},
  "llms_txt": "present", "llms_full_txt": "present_partial", "rsl": "absent",
  "findings": [
    {"id": "GEO-01", "severity": "High", "title": "Serviços sem definição nos termos do mercado", "requires_approval": true},
    {"id": "GEO-02", "severity": "High", "title": "Autoria sem pessoa e sem schema Person", "requires_approval": true},
    {"id": "GEO-03", "severity": "High", "title": "Entidade sem corroboração externa verificável", "requires_approval": false},
    {"id": "GEO-04", "severity": "Medium", "title": "Perguntas do acordeão perdidas na extração; respostas com display:none", "requires_approval": false},
    {"id": "GEO-05", "severity": "Medium", "title": "Estatísticas sem link para a fonte", "requires_approval": true},
    {"id": "GEO-06", "severity": "Medium", "title": "86% sem base nem período", "requires_approval": true},
    {"id": "GEO-07", "severity": "Medium", "title": "Dados de entidade incompletos e grafo fragmentado", "requires_approval": false},
    {"id": "GEO-08", "severity": "Medium", "title": "ModSecurity recusa CCBot e Amazonbot", "requires_approval": false},
    {"id": "GEO-09", "severity": "Medium", "title": "Descrições erradas ou duplicadas", "requires_approval": true},
    {"id": "GEO-10", "severity": "Medium", "title": "Multimodal fraco", "requires_approval": true},
    {"id": "GEO-11", "severity": "Low", "title": "llms-full parcial e sem link no llms.txt", "requires_approval": false},
    {"id": "GEO-12", "severity": "Low", "title": "Sitemap sem lastmod", "requires_approval": false},
    {"id": "GEO-13", "severity": "Low", "title": "Nomes pouco uniformes", "requires_approval": true},
    {"id": "GEO-14", "severity": "Low", "title": "Alt ausente ou residual", "requires_approval": false}
  ]
}
```
