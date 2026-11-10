# Prontidão para agentes: innerplacement.com.br (2026-11-09)

Somente leitura; formulário não enviado. Conteúdo buscado tratado como dado não confiável.

## Lighthouse Agentic Browsing
Não medido. O PageSpeed Insights devolveu HTTP 429 (cota diária) em mobile e desktop. Nenhuma fração X/N foi estimada. Correção: configurar chave de API do Google (`/seo google setup`) e repetir.

## Agent-UX (heurística 0-100, separada do Lighthouse; status: completo)
- Home: 100 (537 nós, 59 interativos, 0 sem nome, 0 widgets div+onclick, 16 landmarks).
- /contato/: 100 (223 nós, 45 interativos, 0 sem nome, 0 inputs sem label; 7 inputs sem aria-* explícito, aceitável quando há label).

## Achados
### Critical / High / Medium
Nenhum.

### Low
- Lighthouse não medido (cota PSI). Repetir com chave de API.
- robots.txt: o grupo `User-agent: AdsBot` não corresponde ao token oficial (`AdsBot-Google`), logo não tem efeito. Se a intenção for bloquear anúncios, usar o token correto; senão remover. (Observação de leitura, não verificada contra a intenção do dono.)
- Content-Signal ausente (opcional). Se quiser declarar a preferência, ex.: `Content-Signal: search=yes, ai-input=yes, ai-train=<decisão do dono>` nos grupos desejados. Rascunho, não aplicado pelo Google (verificado em 2026-09-23).

### Info (oportunidades, não defeitos)
- Markdown: sem `Accept: text/markdown`, sem alternate, `/index.md` = 404. Opcional.
- WebMCP: 0 chamadas registerTool, 0 `<form>` na home; sem `navigator.modelContext`. Baixa prioridade para site institucional (rascunho W3C CG; WebKit contra, Mozilla neutro; checado 2026-09-23). Não escanear o `<form>` de /contato/ para WebMCP foi decisão de escopo: o check estático cobriu só a home.
- ai-catalog.json, api-catalog, OAuth, agent-card, UCP em /.well-known: todos 404, não aplicáveis (não há serviço correspondente). ai-catalog/ARD é spec em rascunho (2026-09-23).
- Web Bot Auth: não verificado (proposta/rascunho).

## Aprovado
- Conteúdo server-rendered: 1008 palavras sem JS.
- robots.txt acessível (200), grupos explícitos para os agentes de IA.
- llms.txt: 200, text/plain, 3530 bytes, passa nas regras do Lighthouse; llms-full.txt 200 também.
- 404 real para URL inexistente (sem catch-all).

## Política de acesso (robots.txt)
- Treino: GPTBot, ClaudeBot, anthropic-ai, CCBot, Google-Extended, Applebot-Extended, Bytespider: Allow. Decisão deliberada (comentário no arquivo); confirmar com o dono que permitir treino é desejado.
- Busca: OAI-SearchBot, PerplexityBot, Googlebot/wildcard: Allow.
- Acionado pelo usuário: ChatGPT-User, Claude-User, Perplexity-User: Allow (Claude-User respeita robots; Perplexity-User e Google-Agent costumam ignorar; ChatGPT-User pode não se aplicar, conforme documentação dos fornecedores).
- Teste de user-agent (`--ua-matrix`) não executado: sem autorização.

## Notas de status de padrões (datas da base: 2026-09-23)
WebMCP, Content-Signal, ai-catalog.json e Web Bot Auth são rascunhos/propostas. Nenhum efeito em ranking, citação ou tráfego é prometido.
