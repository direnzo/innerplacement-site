# Auditoria de conteúdo, E-E-A-T e on-page: innerplacement.com.br

Data: 09/11/2026. Escopo: as 26 URLs de `urls.txt`, buscadas em produção com `render_page.py --mode never` (site estático, sem SPA). Somente leitura; nenhum formulário foi enviado.

**Regra que vale para todo este documento:** o texto do site é literal da documentação aprovada pelos sócios. Toda mudança de texto abaixo, inclusive title e meta description, é **PROPOSTA que depende de aprovação dos sócios**, nunca correção automática. Antes de mexer em `src/content/blog/`, `git pull`, porque há edições pelo painel `/admin`.

## Notas

| Dimensão | Nota |
|---|---|
| **Content Quality** | **65/100** |
| **On-Page SEO** | **74/100** |
| Prontidão para citação por IA | 60/100 |

| E-E-A-T (modelo interno desta auditoria, não do Google) | Peso | Nota | Base |
|---|---|---|---|
| Experience | 20% | 72 | Casos vividos em 02, 11, 23 e 26; depoimentos nominais. Posts antigos são genéricos. |
| Expertise | 25% | 58 | Formações fortes em /quem-somos/, mas nenhum post tem autor pessoa; dados externos sem fonte. |
| Authoritativeness | 25% | 52 | Logos autorizados (Mosaic, BCG, Santillana) e depoimentos com empresa. Reputação externa não foi medida. |
| Trustworthiness | 30% | 68 | Endereços, telefone, CNPJ, política de privacidade, sigilo bem explicado. Pesam contra os números sem base e os defeitos visíveis. |
| **Composto** | | **62** | |

Metadados em lote (`metadata_template.py`, 26 pares): `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`. Nenhum padrão de CTA repetido.

## O que está bom

- **Fundamentos on-page sem falha nas 26 URLs:** status 200, um único H1 por página, canonical igual à URL, nenhum title duplicado, `lang="pt-BR"`, sem `noindex` indevido. `/obrigado/` e `/whatsapp/` estão com `noindex`, como devem.
- **Páginas de programa com posicionamento claro e limites honestos:** "A Inner não conduz investigações ou decisões disciplinares" (/para-sua-empresa/executive-alignment/); "não promete acesso exclusivo ou direto a oportunidades não divulgadas" (/perguntas-frequentes/). Isso é sinal raro de confiança no setor.
- **Sigilo tratado com precisão:** /perguntas-frequentes/ e as páginas de empresa separam o que a empresa acompanha do que fica confidencial.
- **Experiência real nos posts de 2026:** 02, 11, 23 e 26 têm cena, fala e detalhe. Em /o-sobrenome-que-ficou-no-cracha/: "Eu perdi o crachá. Eu era a [meu nome] da empresa tal. Era o meu sobrenome."
- **Depoimentos com nome, função e, em vários casos, empresa** (/depoimentos/: Rafael Massardo, Mosaic; Vinícius Conde, FTD Educação; /para-voce/: Thiago Celso, BHP).
- **Credenciais dos sócios verificáveis** em /quem-somos/, com formação específica e LinkedIn de cada um.
- **Meta descriptions de programa seguem a documentação** (v2, seção 3.5: "usar a frase de destaque (h2) da página").
- **Prontidão para IA:** `llms.txt` publicado, `robots.txt` libera bots de IA, respostas diretas e autocontidas em /perguntas-frequentes/.

## Achados

Não há achado Critical. Nada impede indexação nem expõe dado sensível.

### High

**H1. Dados de terceiros sem link e sem como conferir**
- Evidência:
  - /por-que-novos-lideres-fracassam/: "cerca de 60% das falhas em processos de sucessão [...] (Harvard Business Review, 2021)"; "rotatividade até 40% maior [...] (LinkedIn Talent Solutions, 2022)"; "em até 25% (Gallup, 2020)".
  - /por-que-transicao-de-carreira-e-recolocacao-nao-sao-o-mesmo/: "Segundo a Forbes [...] aumentam em até 2,5 vezes sua clareza".
  - /quando-o-terreno-muda-.../: Korn Ferry, "79% dos líderes" e "79% mais probabilidade"; "A Harvard Business Review identificou ao menos três mecanismos"; "Frontiers in Psychology".
  - /o-diferencial-invisivel-.../: "Mais de 40% dos sucessores falham nos primeiros 18 meses".
- Impacto: é o principal risco de confiança. **Não verifiquei se esses estudos existem nem se os números estão certos** (sem busca nesta execução); o achado é a impossibilidade de o leitor conferir.
- Correção (PROPOSTA): os sócios localizam a fonte original de cada número e incluem link, título e ano. O que não tiver fonte primária sai do texto. Vale também a regra da v2, 11.4: "Só os três números da home [...] Nenhum outro".
- Como saber se falhou: procurar nos posts cada percentual listado; se ele continuar sem `<a href>` para a fonte primária no mesmo parágrafo ou em "Referências", não foi resolvido.

**H2. Número não autorizado e frase corrompida por troca automática**
- Evidência: /abordagem-baseada-habilidades-futuro-forca-trabalho/ e /metodologia-inner-gestao-carreira/: "Com +15 anos de experiência dos sócios de mercado, 150 empresas atendidas".
- Impacto: "150 empresas" não está entre os três números autorizados (v2, 11.4). "dos sócios de mercado" é resíduo visível da substituição global.
- Correção (PROPOSTA): os sócios decidem se "150 empresas" sai ou entra na lista autorizada, com base registrada. Texto sugerido: "Com +15 anos de experiência dos sócios e um time multidisciplinar com vivência corporativa".
- Como saber se falhou: `grep -rn "150 empresas\|sócios de mercado" src/content/blog/` deve voltar vazio, ou os sócios devem ter registrado a autorização.

**H3. Nenhum post tem autor identificado, nem os escritos em primeira pessoa**
- Evidência: os 10 posts assinam "Inner Placement" e o JSON-LD traz `author: {"@type":"Organization"}`. Em /a-coluna-que-estava-faltando-na-planilha/ há "quando olhei com cuidado" e "Em algum momento da nossa sessão"; em /sonhos-desconectados-.../, "Como observou um dos nossos sócios".
- Impacto: há um autor real por trás da experiência relatada e ele não aparece. É a maior perda de Expertise, porque as credenciais já existem em /quem-somos/. Carreira e renda são temas sensíveis para o leitor.
- Correção (PROPOSTA): os sócios informam quem escreveu cada post. Não atribuir autoria por dedução. O campo `autor` já existe no painel, mas `src/pages/[slug].astro` fixa `@type: Organization`; seria preciso emitir `Person` com link para /quem-somos/ quando o autor for pessoa.
- Como saber se falhou: o JSON-LD do post publicado deve trazer `"@type":"Person"` e o nome visível igual ao do schema.

**H4. Dois posts com blocos de palavra-chave enxertados e resíduos de geração**
- Evidência:
  - /abordagem-baseada-habilidades-futuro-forca-trabalho/: 15 ocorrências de "recolocação" em cerca de 1.000 palavras, com variações em sequência: "consultoria em recolocação profissional", "empresa de recolocação profissional", "serviço de recolocação profissional".
  - No mesmo post: "integrando insights da conversa sobre a importância das habilidades" (não há conversa alguma no texto); seção "Case Study" sem nenhum caso; "Recentemente, a McKinsey publicou" para relatório de 2022 em post de dez/2025.
  - /metodologia-inner-gestao-carreira/: parágrafos que interrompem o raciocínio, como "Esses quatro pilares se mostram fundamentais quando se tem ao lado um serviço de recolocação profissional".
- Impacto: a densidade (1,8% e 1,3%) não caracteriza stuffing numérico, mas o padrão é de inserção mecânica. Texto genérico, sem insight próprio, é o marcador de baixa qualidade do QRG. **A origem do texto não é verificável**; o problema é o resultado, não a ferramenta.
- Correção (PROPOSTA): os sócios decidem entre reescrever com caso real ou retirar os parágrafos enxertados. Se o post não tiver mais função, avaliar redirecionamento.
- Como saber se falhou: reler o post sem os parágrafos com variação de "recolocação profissional"; se o texto perder sentido, ou "integrando insights da conversa" persistir, não foi resolvido.

**H5. Markdown quebrado visível ao leitor**
- Evidência no HTML publicado:
  - /abordagem-baseada-.../: `[**<em>Por que transição de carreira e recolocação não são o mesmo?</em>` seguido de `**](/por-que-transicao-de-carreira-e-recolocacao-nao-sao-o-mesmo/)`, colado em "Referências". O link não funciona e **este é o único vínculo interno previsto para esse destino neste post**.
  - No mesmo post: parágrafo solto "Veja também:" sem link, antes de "Um Novo Paradigma em Recursos Humanos".
  - /o-sobrenome-que-ficou-no-cracha/: `**“E com vergonha, né?” **` com asteriscos à mostra, na frase central do texto.
- Correção: ajustar a marcação em `src/content/blog/abordagem-*.md` (linha 69) e `o-sobrenome-*.md` (linha 19). Não muda nenhuma palavra, exceto a remoção do "Veja também:" vazio, que é PROPOSTA. Como o arquivo é de conteúdo, avisar os sócios.
- Como saber se falhou: `curl -s <URL> | grep -c '\*\*\|\](/'` deve retornar 0 nas duas páginas.

### Medium

**M1. Meta description idêntica em dois posts, e errada em um deles**
- Evidência: /a-coluna-que-estava-faltando-na-planilha/ e /sou-bom-no-que-faco-.../ usam "Coaching de carreira para decisões mais conscientes: descubra por que razão e propósito importam tanto quanto currículo e oportunidades." O segundo post trata de narrativa profissional na recolocação.
- Correção (PROPOSTA, para o segundo): "Competência não basta se a trajetória não for bem contada: por que bons executivos travam na recolocação e três pontos de partida para mudar isso."
- Como saber se falhou: descriptions iguais entre URLs devem ser zero em nova extração.

**M2. Descriptions cortadas, com erro ou longas**
- Evidência:
  - Excerto cortado: /o-sobrenome-.../ (273 car., termina em "olhar para trás e…"); /por-que-transicao-.../ (300 car., termina em "de um olhar estruturado").
  - Erro: /metodologia-inner-.../ termina em "mais consciente. ."
  - Acima de 160 car.: home (200), abordagem (186), blog (180), para-sua-empresa (185), quem-somos (185), sonhos (162).
  - Curta e sem conteúdo: /contato/ (59), /e-book/ (75).
- Correção (PROPOSTA):
  - /o-sobrenome-.../: "Uma executiva, uma palavra deixada para o fim da lista. O que a vergonha faz com quem perde o emprego e o que muda quando ela é dita em voz alta."
  - /por-que-transicao-.../: "Transição de carreira e recolocação têm foco e profundidade diferentes. Entenda o que separa os dois caminhos e qual faz sentido para o seu momento."
  - /metodologia-inner-.../: remover o " ." final.
- Observação: essas descriptions também aparecem nos cards de /blog/. Comprimento é questão de exibição, não penalidade; o Google pode reescrever o trecho.
- Como saber se falhou: nenhuma description termina em "…", " ." ou no meio de frase; as propostas ficam em até 160 caracteres.

**M3. Método descrito de duas formas**
- Evidência: home e /para-voce/ falam em quatro dimensões (Pessoa e momento, Contexto, Recursos e pontos de ajuste, Direção). /metodologia-inner-gestao-carreira/ fala em quatro pilares (Histórico Pessoal, Potencial e Recursos, Momento Presente, Tendências).
- Impacto: o método é o argumento central da Inner, e leitor ou motor de resposta recebe duas versões.
- Correção (PROPOSTA): os sócios definem se o post é atualizado, recebe nota histórica ou sai.
- Como saber se falhou: os quatro nomes de /metodologia-inner-gestao-carreira/ devem coincidir com os da home.

**M4. Blog e programas quase não se ligam**
- Evidência: só 3 links de post para programa, todos para /para-voce/next-level/ (dois em /o-diferencial-invisivel-.../, um em /sonhos-desconectados-.../). Nenhum post liga para Transition, Executive Alignment ou /para-sua-empresa/. Nenhuma página fora do blog liga para post no conteúdo principal. "Leia também" sempre mostra os posts mais recentes, então /abordagem-.../, /metodologia-.../ e /por-que-transicao-.../ recebem só 1 link (o de /blog/).
- Correção (PROPOSTA): até 2 links contextuais por post para o programa correspondente, com o nome do produto como âncora; "Leia também" por tema em vez de data (mudança de código no template, não de texto do post).
- Como saber se falhou: nova contagem deve mostrar todo post com ao menos 1 link para programa e ao menos 2 links internos recebidos.

**M5. Âncoras que prometem método e levam à home**
- Evidência: "Conheça a metodologia da Inner" aponta para `/` em /o-diferencial-.../, /por-que-transicao-.../ e /sonhos-.../. "Metodologia Inner" (/metodologia-.../) e "Inner Placement atua com excelência" (/por-que-novos-lideres-.../) também vão para `/`.
- Correção: apontar para o bloco de método da home com âncora de seção, ou para /para-voce/, cujo texto trata do método. Só apontar para o post de metodologia depois de M3.
- Como saber se falhou: clicar a âncora deve levar o leitor diretamente ao trecho sobre método, sem precisar rolar a home.

**M6. Fontes citadas fracas ou genéricas**
- Evidência em /o-diferencial-invisivel-.../: "Boston Consulting Group (BCG)" aponta para `bcg.com/brazil`, não para o estudo. "Segurança psicológica" aponta para uma URL do G1 em `/especial-publicitario/`, ou seja, conteúdo pago. O PDF da McKinsey não respondeu em 20 s e `bcg.com` devolveu 403 ao robô; ambos inconclusivos.
- Correção (PROPOSTA): trocar pelos estudos originais e não usar publieditorial como fonte.
- Como saber se falhou: nenhum link de citação aponta para home de empresa ou caminho `/especial-publicitario/`.

**M7. Vocabulário vetado pela v2 ainda presente, sobretudo em posts**
- Evidência (v2, 11.2; vale para meta descriptions): "alta performance" e "vaga" em /a-coluna-.../ ("Você aceita a vaga certa"); "excelência" em /por-que-novos-lideres-.../; "jornada" (4x) em /metodologia-.../; "propósito" em 02, 09, 22, 25 e 26; "transformação profissional" na meta de /quem-somos/.
- Exceções: "a gente" em /o-sobrenome-.../ e "vagas" em /perguntas-frequentes/ são fala literal ou texto aprovado; não mexer.
- Correção (PROPOSTA): os sócios decidem se 11.2 retroage aos posts legados. Se sim, listar por post para aprovação, sem troca em lote; foi uma troca em lote que causou H2.
- Como saber se falhou: nova varredura retorna apenas ocorrências aprovadas e citações literais.

**M8. "Coaching" versus posicionamento**
- Evidência: /a-coluna-.../ usa "coaching de carreira" 3x e "executive coaching" no fecho, repetido em /o-sobrenome-.../. A home define "consultoria de desenvolvimento de carreira". A v1 dizia "O Next Level é coaching? Não"; a v2 não trata do tema. /quem-somos/ lista "Master Coach" como credencial, o que é fato.
- Correção: decisão dos sócios: "coaching" é termo aceito no blog ou não? Não há erro objetivo.
- Como saber se falhou: a decisão fica registrada e os posts ficam coerentes com ela.

**M9. Proteção de identidade nos casos relatados**
- Evidência: /quando-o-terreno-muda-.../ cita "Renato", "25 anos na mesma empresa" e empresa adquirida; /a-coluna-.../ cita saída de grande consultoria e interesse em biotecnologia de doenças raras. Não há aviso de nome fictício ou de autorização.
- Impacto: o sigilo é a premissa pública da Inner. **Não sei se há autorização;** o ponto é que o leitor não tem como saber.
- Correção (PROPOSTA): sócios confirmam autorização e, se aplicável, adicionam nota curta ("nomes e detalhes alterados para preservar o sigilo").
- Como saber se falhou: cada caso identificável tem autorização registrada e a nota publicada, se for o caso.

**M10. /e-book/ órfã**
- Evidência: 0 links internos recebidos, embora esteja no sitemap. /o-diferencial-invisivel-.../ cita "nosso e-book “Por que os Planos de Sucessão Falham e Como Evitar”" sem link. Title "E-book · Inner Placement" não diz qual é. A capa usa `alt` vazio (`src/pages/e-book.astro`), como imagem decorativa, embora identifique o material.
- Correção (PROPOSTA): linkar a menção existente em /o-diferencial-.../; incluir o nome do material em title e description; avaliar `alt` com o nome do e-book (só se a capa não for tratada como decorativa).
- Como saber se falhou: /e-book/ tem ao menos 1 link interno e o title cita o nome do material.

**M11. Posts abaixo do piso de cobertura e com repetição**
- Evidência: todos os 10 posts estão abaixo de 1.500 palavras. Os mais finos: /o-diferencial-.../ (450), /sonhos-.../ (468), /por-que-novos-lideres-.../ (653), /por-que-transicao-.../ (652). Em /o-diferencial-.../, "A boa notícia é que segurança psicológica pode ser desenvolvida" e a frase sobre o Next Level aparecem duas vezes. Em /sonhos-.../, "Conclusão" e "Reflexão Final" repetem a mesma ideia.
- Observação: o piso é referência de cobertura. Word count não é fator de ranking, e 02, 11 e 23 funcionam bem com cerca de 1.000 palavras.
- Correção (PROPOSTA): prioridade para retirar a repetição; expandir apenas com experiência real.
- Como saber se falhou: nenhuma frase duplicada no mesmo post.

**M12. Titles longos**
- Evidência: 8 acima de 60 caracteres; os piores: /quando-o-terreno-muda-.../ (110), /o-diferencial-.../ (109), /sonhos-.../ (107), /metodologia-.../ (95). O sufixo " · Inner Placement" soma 18.
- Correção (PROPOSTA): manter o H1 literal e usar title mais curto nos posts acima de 60 caracteres. Exibição é questão de largura em pixels; o título não é penalizado.
- Como saber se falhou: Search Console mostra CTR igual ou maior após 4 a 6 semanas nessas URLs; títulos passam a aparecer inteiros no resultado.

**M13. Títulos dos hubs sem termo de busca**
- Evidência: "Para você · Inner Placement"; "Para sua empresa · Inner Placement".
- Correção (PROPOSTA), mantendo o H1: "Para você · Desenvolvimento e transição de carreira · Inner Placement"; "Para sua empresa · Desenvolvimento e transição de executivos · Inner Placement". Ambos passam de 60 caracteres, portanto cabe escolher a forma mais curta com os sócios.
- Como saber se falhou: impressões para consultas não relacionadas à marca não aumentam em 6 a 8 semanas.

### Low

- **L1. Salto de heading:** /a-coluna-.../ vai de H1 a H3 ("Você tem feito as perguntas certas..."). Como saber se falhou: sequência H1→H3 na nova extração.
- **L2. Posts longos sem subtítulos:** /quando-o-terreno-muda-.../ (940 palavras) e /por-que-transicao-.../ não têm H2 no corpo; /por-que-novos-lideres-.../ só tem um H2 de fechamento. PROPOSTA: subtítulos a partir de frases já existentes. Como saber se falhou: H2 de corpo ausente.
- **L3. Blocos sem heading nas páginas de programa:** "Como a empresa acompanha" e "O que a empresa acompanha" são rótulos visuais em /para-sua-empresa/ e nas três páginas de programa para empresas. Avaliar H2/H3 (só marcação). Como saber se falhou: o texto não aparece na lista de headings.
- **L4. Legibilidade irregular:** Flesch adaptado (estimativa): /a-coluna-.../ 63, /o-sobrenome-.../ 68, contra /por-que-novos-lideres-.../ 17, /abordagem-.../ 21, /metodologia-.../ 26. Posts antigos têm frases de 19 a 24 palavras em média. Como saber se falhou: média de palavras por frase segue acima de 20 nesses posts.
- **L5. Detalhes editoriais:** "diferentes.Ambas" sem espaço (/por-que-transicao-.../); emoji "👉" em /o-diferencial-.../ e /sonhos-.../; rótulos como "Sonhos", "Focus" e "Platinum" funcionando como categorias de post. PROPOSTA.
- **L6. CNPJ só na política de privacidade:** apenas em /politica-de-privacidade/. PROPOSTA: incluir no rodapé (decisão dos sócios). Como saber se falhou: CNPJ ausente no HTML de /contato/.
- **L7. Datas de atualização:** o sitemap não tem `lastmod`, e /por-que-transicao-.../ e /sou-bom-.../ têm `dateModified` no schema sem exibir essa data ao leitor. Como saber se falhou: o sitemap segue sem `<lastmod>`.
- **L8. /para-voce/next-level/ e hubs sem caminho para /quem-somos/** no conteúdo principal (só no menu e rodapé). A regra "os sócios conduzem como argumento: não usar" impede citar nomes ali; link discreto é opção (PROPOSTA).

### Info: decisões já tomadas, sem ação recomendada

- **FAQ estruturado:** por regra de 2026, FAQPage não dá rich result; não há recomendação de adicionar nem remover por esse motivo.
- **H1 "Next Level" (2 páginas) e "Transition" (2 páginas):** decisão da v2 (seção "Nomes antigos de página"). Títulos, kickers e URLs diferenciam as páginas. Acompanhar no Search Console se as duas versões disputam a mesma consulta.
- **86% sem base e período publicados:** liberados pelos sócios em 09/11/2026, com base em registro interno. Do ponto de vista de E-E-A-T, publicar a base seria mais forte, mas a decisão é deles.
- **Páginas de programa curtas (271 a 446 palavras contra piso de 800):** a v2 proíbe contagem de sessões, duração e etapas, e "Só os três números". Expansão, se houver, só com material qualitativo aprovado.
- **Executive Alignment sem depoimento:** documentado na v2 ("nenhum depoimento autorizado").
- **Sócios não aparecem nas páginas de programa:** regra da documentação.

## Tabela: title, description e headings das 26 URLs

Palavras: conteúdo de `<main>` (inclui CTA, depoimentos e FAQ repetidos) / `extracted_text` (conteúdo principal segundo o trafilatura, que descarta parte das páginas compostas por cards).

| # | URL | Title (car.) | Desc. (car.) | H1 | H2/H3 | Palavras main/extr. | Piso | Observação |
|---|---|---|---|---|---|---|---|---|
| 01 | / | 60 | 200 | Momentos decisivos da trajetória executiva exige… | 7/5 | 822/428 | 500 |  |
| 02 | /a-coluna-que-estava-faltando-na-planilh… | 58 | 136 | A coluna que estava faltando na planilha | 2/1 | 1120/1028 | 1500 | salto H1→H3; sem H2 de corpo |
| 03 | /abordagem-baseada-habilidades-futuro-fo… | 81 | 186 | Abordagem Baseada em Habilidades: O Futuro da Fo… | 6/0 | 1087/990 | 1500 |  |
| 04 | /blog/ | 22 | 180 | Blog | 11/0 | 535/67 | n/a |  |
| 05 | /contato/ | 25 | 59 | Vamos conversar. | 0/0 | 40/29 | n/a | só H1 |
| 06 | /depoimentos/ | 29 | 128 | Depoimentos | 4/0 | 461/416 | n/a |  |
| 07 | /e-book/ | 24 | 75 | Faça o download do e-book | 0/0 | 28/96 | n/a | só H1 |
| 08 | /manifesto/ | 27 | 155 | Manifesto | 1/0 | 117/110 | n/a | H1 e H2 de CTA |
| 09 | /metodologia-inner-gestao-carreira/ | 95 | 121 | Metodologia Inner de Gestão de Carreira: constru… | 7/0 | 1035/944 | 1500 |  |
| 10 | /o-diferencial-invisivel-da-seguranca-ps… | 109 | 148 | O diferencial invisível da segurança psicológica… | 7/0 | 553/456 | 1500 |  |
| 11 | /o-sobrenome-que-ficou-no-cracha/ | 49 | 273 | O sobrenome que ficou no crachá | 6/0 | 1047/953 | 1500 |  |
| 12 | /para-sua-empresa/ | 34 | 185 | Para sua empresa | 5/0 | 300/126 | 800 |  |
| 13 | /para-sua-empresa/executive-alignment/ | 68 | 120 | Executive Alignment | 5/1 | 337/215 | 800 |  |
| 14 | /para-sua-empresa/next-level/ | 60 | 140 | Next Level | 6/2 | 380/283 | 800 |  |
| 15 | /para-sua-empresa/outplacement/ | 43 | 143 | Transition | 6/1 | 404/317 | 800 |  |
| 16 | /para-voce/ | 27 | 128 | Para você | 5/0 | 271/239 | 800 |  |
| 17 | /para-voce/next-level/ | 58 | 139 | Next Level | 5/2 | 371/306 | 800 |  |
| 18 | /para-voce/transicao-e-recolocacao/ | 54 | 157 | Transition | 6/2 | 446/375 | 800 |  |
| 19 | /perguntas-frequentes/ | 38 | 159 | Perguntas frequentes | 6/26 | 1485/1219 | n/a |  |
| 20 | /politica-de-privacidade/ | 41 | 160 | Política de Privacidade | 12/0 | 829/841 | n/a |  |
| 21 | /por-que-novos-lideres-fracassam/ | 50 | 123 | Por que novos líderes fracassam? | 3/0 | 750/659 | 1500 | só H2 de fechamento no corpo |
| 22 | /por-que-transicao-de-carreira-e-recoloc… | 78 | 300 | Por que transição de carreira e recolocação não … | 2/0 | 745/655 | 1500 | sem H2 de corpo |
| 23 | /quando-o-terreno-muda-o-que-separa-exec… | 110 | 130 | Quando o terreno muda: o que separa executivos q… | 2/0 | 1027/945 | 1500 | sem H2 de corpo |
| 24 | /quem-somos/ | 28 | 185 | Quem somos | 4/0 | 495/145 | n/a |  |
| 25 | /sonhos-desconectados-e-realizacao-profi… | 107 | 162 | A Diferença entre sonhos desconectados e realiza… | 8/0 | 565/471 | 1500 |  |
| 26 | /sou-bom-no-que-faco-entao-por-que-ningu… | 75 | 136 | “Sou bom no que faço, então por que ninguém me c… | 9/0 | 1081/990 | 1500 |  |

## Limites desta auditoria

- **Não verificado:** veracidade dos estudos citados, reputação externa da marca, autoria real dos posts, autorização dos casos e dados de Search Console.
- **Legibilidade:** Flesch adaptado para português com contagem de sílabas aproximada; use como comparação entre posts.
- **Links externos:** McKinsey (timeout) e BCG (403 para robô) ficaram inconclusivos, sem indicar link quebrado.
- **Pisos de palavras:** referência de cobertura, não meta.
- **Revisar antes de publicar:** todas as PROPOSTAS de texto precisam de aprovação dos sócios e, quando novas, de checagem contra a v2, seções 11 e 12.
