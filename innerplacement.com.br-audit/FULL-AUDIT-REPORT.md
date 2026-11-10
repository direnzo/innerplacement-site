# Auditoria SEO completa: innerplacement.com.br

Data: 09/11/2026, no dia da troca do WordPress pelo site novo. Tipo de negócio: consultoria de serviços profissionais (B2B e B2C), com blog e endereços físicos.

## Resumo executivo

**Nota geral: 73/100.** Nenhum problema crítico. A migração técnica foi bem executada: o site está indexável e os redirecionamentos do mapa funcionam. O que puxa a nota para baixo é relevância e autoridade: os termos que o público busca saíram da home, as páginas de serviço não explicam o serviço, e não há autoria nem pessoas identificadas nos dados do site.

| Categoria | Peso | Nota | Pontos |
|---|---:|---:|---:|
| SEO técnico | 22% | 86 | 18,9 |
| Qualidade de conteúdo | 23% | 65 | 15,0 |
| SEO on-page | 20% | 74 | 14,8 |
| Dados estruturados | 10% | 68 | 6,8 |
| Performance (laboratório) | 10% | 82 | 8,2 |
| Prontidão para busca com IA | 10% | 58 | 5,8 |
| Imagens | 5% | 74 | 3,7 |
| **Total** | | | **73,2** |

As notas são julgamento analítico de cada especialista sobre evidências coletadas, não métricas oficiais do Google.

### O que não pôde ser medido

- **Efeito da migração em posições e cliques:** o site entrou no ar hoje, e o Search Console não está conectado a esta ferramenta.
- **Core Web Vitals de campo (CrUX) e Lighthouse:** sem chave de API do Google; o PageSpeed público devolveu 429. INP não foi medido.
- **SERP real do Brasil:** o Google bloqueou a consulta e a busca disponível é restrita aos EUA. A análise de intenção usa aproximação, com confiança baixa a média.
- **Backlinks:** sem Moz nem Bing, e o domínio não está no grafo do Common Crawl. Sem nota.
- **Perfil da Empresa no Google, citações externas e reputação:** não verificados.
- **Envio real do formulário:** não testado, de propósito, porque gera e-mail na caixa da Inner.

### Cinco principais problemas

1. A home perdeu "Outplacement", "Transição de Carreira" e "Recolocação" do título e do corpo.
2. Defeitos de formatação publicados em posts (link quebrado, `**` visível, "Veja também:" vazio).
3. "150 empresas atendidas" em 2 posts, fora dos três números autorizados.
4. As páginas de serviço não definem o serviço, e o termo quase não aparece no corpo delas.
5. O aviso de cookies cobre cerca de 25% da tela no mobile, incluindo CTAs e o botão Enviar.

### Cinco ganhos rápidos

1. Corrigir o markdown quebrado dos posts.
2. Separar a meta description repetida nos 2 posts.
3. Compactar o aviso de cookies no mobile.
4. Acrescentar `lastmod` ao sitemap.
5. Redirecionar `/index.html` e `/sitemap.xml`.

## O que funciona bem

- As 26 URLs do sitemap respondem 200, com canonical autorreferente, sem `noindex`, um H1 e uma description cada. Nenhum title duplicado.
- Todos os redirecionamentos de `docs/mapa-redirecionamentos.md` dão 301 em um salto para um destino 200. http, www e URL sem barra também resolvem em um salto.
- Página 404 real, com status 404 e `noindex`.
- HTML estático com conteúdo completo sem JavaScript.
- LCP e CLS bons em laboratório (home: LCP 572 ms, CLS 0). Fonte bem resolvida, `/_astro/` com cache imutável de 1 ano.
- JSON-LD válido nas 26 URLs, com `@id` estável na organização.
- NAP consistente dentro do site. Nenhum overflow horizontal nas 10 combinações de página e tela.
- Robots.txt e `llms.txt` válidos. Árvore de acessibilidade sem elementos sem nome na home e em `/contato/`.

## Achados por prioridade

Reconfirmados diretamente no site ao consolidar: itens marcados com ✔.

### Crítico

Nenhum.

### Alto

| # | Achado | Evidência | Correção | Quem decide |
|---|---|---|---|---|
| A1 | Termos comerciais saíram da home ✔ | Title atual: "Inner Placement · Consultoria de desenvolvimento de carreira". A documentação v2 (3.5 e 11.1) recomenda os nomes antigos no título da aba das páginas de programa e os permite nesse campo, mas não define o title da home. Nas 100 principais consultas de 16 meses, termos com recolocação e variações somam 186 impressões, outplacement 44 e transição 9. A home tem 199 de 257 cliques orgânicos dos 16 meses até 06/11/2026; 115 cliques são da marca | Incluir os termos no title, por exemplo "Inner Placement · Outplacement, transição e recolocação" (55 caracteres). Ver `findings/sxo.md` e `findings/drift.md` | Sócios |
| A2 | Defeitos de markdown publicados ✔ | `/abordagem-baseada-habilidades-futuro-forca-trabalho/`: link com colchetes visíveis e "Veja também:" vazio. `/o-sobrenome-que-ficou-no-cracha/`: `**` visível | Corrigir a formatação nos `.md`, depois de `git pull` | Agente (é conserto de formatação; o link vazio precisa de destino) |
| A3 | "150 empresas atendidas" fora dos números autorizados ✔ | `metodologia-inner-gestao-carreira.md` e `abordagem-…md`, junto do resíduo "experiência dos sócios de mercado". Documentação v2, 11.4 | Remover ou autorizar o número | Sócios |
| A4 | Páginas de serviço não definem o serviço ✔ | `/para-sua-empresa/outplacement/`: H1 "Transition", e "outplacement" só em rótulos. `/para-voce/transicao-e-recolocacao/` não tem "executivo" nem "transição de carreira" no corpo. Em buscas genéricas, a aproximação da SERP mostra sobretudo conteúdo explicativo | Bloco curto de definição, sem trocar o H1, que é decisão registrada na v2 | Sócios (texto novo) |
| A5 | Aviso de cookies cobre conversão no mobile | Cerca de 215 px em tela de 844; cobre CTAs, campos e botão Enviar de `/contato/`, e o botão do WhatsApp | Versão compacta no mobile, sem perder a escolha por categoria | Agente (o texto do aviso não muda) |
| A6 | Autoria e pessoas ausentes | 10 de 10 posts assinados pela organização, inclusive os em primeira pessoa. Os 3 `Person` e `employee` do schema antigo sumiram; `/quem-somos/` não tem `Person` | Schema `Person` a partir de `src/data/socios.ts`; autor de cada post definido pelos sócios | Agente para o schema; sócios para a autoria |

### Médio

| # | Achado | Correção |
|---|---|---|
| M1 | `/index.html`, `/blog/index.html` e `/contato/index.html` respondem 200 ✔. O canonical correto reduz o risco | 301 por `THE_REQUEST` no `.htaccess` |
| M2 | Description idêntica em 2 posts ✔ (errada em `/sou-bom-…`); 2 cortadas; 8 acima de 160 caracteres; 8 titles acima de 60 | Reescrever, com aprovação |
| M3 | Links internos fracos: 0 de páginas de programa para posts; 0 de posts para as páginas Transition; "Leia também" cronológico deixa 6 posts sem receber links | Links com palavras já publicadas (`findings/cluster.md`, seção 6); bloco relacionado por tema |
| M4 | ModSecurity devolve 406 a CCBot e Amazonbot, até no `robots.txt` ✔, contrariando a política do próprio arquivo. Hipótese: contribui para o domínio não estar no Common Crawl | Decidir a política e liberar no servidor, se for o caso |
| M5 | FAQ: 25 de 26 respostas com `display:none` no HTML inicial ✔. Efeito em motores reais é hipótese | Trocar por `<details>` ou conteúdo aberto por padrão, sem CSS que oculte no carregamento |
| M6 | Estatísticas de HBR, Gallup, Korn Ferry, LinkedIn e Forbes sem link; citação do G1 é publieditorial; link da BCG aponta para a home | Sócios confirmam a fonte ou removem |
| M7 | Schema: `BlogPosting` com organização sem `@id`; 2 sedes em um único nó; faltam `geo`, `postalCode`, `contactPoint`, `knowsAbout` | Referenciar `#organizacao`; um nó por unidade; só dados já confirmados |
| M8 | Sitemap sem `lastmod` | `serialize` usando `atualizado ?? data` |
| M9 | HTML pesado: 198 KB na home, com 62,6 KB de CSS inline repetido em toda página e 93 KB de SVG inline | CSS externo com cache; reduzir SVG inline |
| M10 | Miniaturas do blog (640x360) usam WebP de 1600 px, sem `srcset`: 862 KB nas 10 imagens | `srcset`/`sizes` no pipeline do Astro |
| M11 | Duas versões do método (quatro pilares e quatro dimensões); parágrafos enxertados em posts antigos ("integrando insights da conversa", "Case Study" sem caso) | Sócios unificam e revisam |
| M12 | `/wp-content/uploads/*` e feeds antigos dão 404 | Conferir os mais linkados no Search Console; gerar RSS com 301 dos feeds |
| M13 | Alvos de toque abaixo de 44 px (breadcrumbs, rodapé, ícones, links no corpo) | Aumentar área clicável |
| M14 | Perfil da Empresa sem vínculo no site (sem `hasMap` nem `sameAs`); `/contato/` sem endereço, horário ou mapa no corpo | Verificar o perfil; ajustar `/contato/`, com aprovação do texto |
| M15 | HSTS de 30 dias (deliberado); faltam `frame-ancestors`/X-Frame-Options, Permissions-Policy e CSP | Subir o HSTS aos poucos; acrescentar os cabeçalhos |
| M16 | GTM, AW e G- em toda página; tarefas longas de 450 a 670 ms em CPU 4x | Revisar tags; medir INP real |

### Baixo e informativo

- `User-agent: AdsBot / Disallow: /` veio do WordPress. Sem efeito orgânico. Não há campanhas ativas no Google Ads (registro de 09/11/2026), e não foi confirmado se esse grupo alcança o `AdsBot-Google`. Rever antes de ligar campanhas.
- `/sitemap.xml` e `/favicon.ico` em 404; sem Brotli; alt de banner com nome de arquivo; `/blog/page/2/` em 404.
- `/e-book/` no sitemap, com pouco conteúdo e 0 links internos: decisão do dono.
- Não criar páginas por cidade: seriam doorway pages.
- `FAQPage` ausente: sem ação, pois o Google não oferece mais esse resultado desde 07/05/2026.
- WebMCP, Markdown e `.well-known`: não se aplicam a este site.
- Presença externa fraca: 0 em Wikipedia, Wikidata e Google Notícias; YouTube com 3 inscritos. LinkedIn e Reddit não puderam ser checados.

## Comparação com o WordPress (baseline de 22/10/2026)

Mudanças esperadas: H1, H2, marca, telefone, inclusão de Curitiba, blocos do Yoast. Regressões reais: A1 e a perda dos `Person` e de campos da organização (A6 e M7). Robots não ficou mais restritivo, canonical idêntico. A baseline cobre só a home. Nenhuma baseline nova foi criada, para que a do WordPress siga disponível.

## Limites das conclusões

- Uma amostra por URL nas medições de laboratório.
- Agrupamento de tópicos é editorial, sem volume de busca nem sobreposição de SERP.
- Veracidade das estatísticas citadas e autorização dos casos não foram verificadas.
- Divergências entre analisadores foram resolvidas assim: `/index.html` rebaixado de Alto para Médio; `AdsBot` rebaixado para Baixo; H1 "Transition" mantido como decisão da v2, sem recomendação de troca.

Detalhes e evidências de cada categoria em `findings/`; capturas em `screenshots/`.
