# CLAUDE.md — Inner Placement site v2

Instruções para sessões de agente neste repositório. Estrutura, comandos e "onde mexer" estão no
`README.md`; leia-o primeiro. Aqui ficam o contexto e as regras que não são óbvias pelo código.

## O que é este projeto

- Site novo da Inner Placement (consultoria de carreira para executivos), estático: Astro 7 +
  Tailwind CSS 4 + Alpine.js. **Substituiu o WordPress** em innerplacement.com.br em 09/11/2026.
- Decisão do dono (29/09/2026): o caminho de melhorar o WordPress (SEO, GEO, performance) não deu
  resultado; a v2 é o caminho. O WordPress fica no repositório `~/projetos/innerplacement`
  (clone Docker), em modo manutenção, e será congelado quando a v2 entrar no ar.
- Origem: a v2 foi criada no Claude Desktop (sessão Cowork "Innerplacement site redesign
  strategy") e importada aqui em 29/09/2026. `build/v0.9/` é o build exportado naquele momento,
  guardado como referência.

## Conteúdo

- **Fonte de verdade do texto:** a documentação funcional aprovada pelos sócios (Paula Oliveira,
  Débora Ereno, Cesar Cordeiro), em
  `D:\Google Drive\direnzo@gmail\CLIENTES\InnerPlacement\site_v3\Cópia de site-inner-documentacao-funcional.md`
  (no WSL: `/mnt/d/Google Drive/direnzo@gmail/CLIENTES/InnerPlacement/site_v3/`).
- **Desde 08/11/2026 vale a documentação funcional v2** (`site_v3/revisoes/site-inner-documentacao-funcional-v2 07Nov26.docx`), que substitui a v1, e o `FAQ revisado NOV26.docx` na mesma pasta, que prevalece sobre a seção 9 da v2 (decisão do dono). Pendências dos sócios: seção 14 da v2, respondidas em 09/11/2026 (registro em `docs/plano-migracao-producao.md`, seção 3); em caso de conflito, valem essas respostas. Grafia: sempre "Inner Placement", e "o Executive Alignment".
- O texto em `src/data/` é **literal** desses documentos. Não parafrasear, "melhorar" nem abreviar.
  Texto novo só com aprovação.
- Identidade visual: Hanken Grotesk, coral `#FF6558`, tinta `#231F20`, areia `#D3CEC4`, areia clara
  `#EFEBE4`, âmbar `#F2B45C`. Tokens em `src/styles/global.css`.

## Blog, depoimentos e painel

- Blog e depoimentos saíram do WordPress em 01/10/2026: posts em `src/content/blog/*.md`, depoimentos em
  `src/data/depoimentos.json`. Os sócios editam pelo painel `/admin` (Sveltia CMS), que grava commits na
  `main` do repositório privado. **Antes de mexer nesses arquivos, `git pull`**: pode haver edição nova
  feita pelo painel.
- Os textos dos posts vieram do WordPress com as trocas da seção 11 aplicadas pelo script; o termo
  "rede" no post `quando-o-terreno-muda…` ficou para decisão do dono.
- Cada commit na `main` publica o site, na raiz do domínio, pelo GitHub Actions (chave dedicada sem senha, só nos
  segredos do GitHub e no cPanel; o dono a cria — ela nunca passa pelo agente).

## LGPD, cookies e analytics

- Desde 02/10/2026 o site tem aviso de cookies por categoria (`CookieConsent.astro`) e o Gerenciador de
  Tags do Google (`GTM_ID` em `src/data/site.ts`), com o Consent Mode do Google: só mede com a permissão
  dada no aviso. **`GTM_ID` é o mesmo contêiner que o WordPress atual usa** (decisão deliberada, para não
  perder o histórico do Analytics na troca de site) — não trocar por um novo sem avisar o dono, porque
  isso quebra a continuidade dos dados.
- **Metricool** (desde 12/11/2026): carregado por `src/scripts/app.ts`, só com consentimento de Estatísticas e
  depois da primeira interação (como o GTM). Não colar o script nem o pixel `<img>` do Metricool no HTML: mediriam
  quem recusou cookies e contariam a visita em dobro. Citado na Política de Privacidade.
- **CSP** em `public/.htaccess` (Report-Only até 23/11/2026, depois definitiva): todo domínio novo de script,
  pixel ou tag do GTM precisa entrar nela, e script embutido novo exige o hash (o build falha sem ele).
- A Política de Privacidade (`src/pages/politica-de-privacidade.astro`) traz na seção 10 um texto
  provisório, com o canal contato@, até os sócios definirem o encarregado de dados (DPO). Não inventar
  esse nome.

## Imagens — regras que já custaram retrabalho

- **Abordagem atual (decisão do dono, 29/09/2026): híbrida e por blocos.** Ilustrações, ícones e
  padrões são SVG desenhados no código a partir do kit (`tools/ilustracao/`); IA só para peças de
  atmosfera (capas de vídeo, texturas). Plano, diagnóstico e estado dos blocos em
  `docs/plano-ilustracao.md`. Um bloco por vez, com comparação no layout antes de encaixar.

- As ilustrações são geradas **pelo dono direto no ChatGPT**, seguindo `docs/guia-imagens.md`
  (74 peças com códigos H-xx, P-xx, G-xx; prompts, especificações, checklist, ordem de rodadas).
- O dono exporta aquela conversa periodicamente como
  `D:\Downloads\inner-placement-conversa-exportada.zip`, com um registro de aprovações
  (`conversa-inner-placement.md`: APROVADA / PENDENTE / EXPLORAÇÃO). **Antes de tratar do estado das
  imagens, procure um export mais novo no Downloads.**
- **Case as peças pelo hash do conteúdo contra esse registro, nunca pelo nome do arquivo.** Um nome
  repetido já fez uma exploração descartada ser commitada como se fosse a H-01 aprovada.
- `imagens/` (raiz) só recebe peças **aprovadas**, no padrão `inner-<código>-<assunto>-v<n>.png`,
  cada uma com um `.txt` ao lado (prompt, ferramenta, arquivo original, desvios conhecidos).
  `imagens/pendente/`, `imagens/exploracao/` e `imagens/apoio/` são locais, fora do git.
- **Questão em aberto (não decidida):** várias das 8 peças aprovadas violam o checklist do próprio
  guia (brilho/sombra/3D, figuras em silhueta em vez de pessoas com proporção realista, skyline
  genérico; a P-02 se aproxima do clichê proibido "escada para o céu"). Todas têm uma franja de
  artefato vermelho/amarelo/preto na borda do recorte transparente. A franja é defeito técnico e
  se corrige no acabamento; manter ou regenerar as peças é decisão do dono. Não decida por ele.
- Acabamento: `tools/imagem/` (sharp; `npm install` dentro da pasta). Converter para WebP/AVIF ou
  SVG, respeitando os pesos máximos da tabela do guia.
- Canvas de comparação das peças no layout: https://claude.ai/artifact/XWKjSsoA9eG757TM2RQM7i

## Git e fluxo de trabalho

- `main` é sempre estável. Cada frente de trabalho numa branch própria (`imagens/rodada-3`,
  `pagina/outplacement`, `deploy/producao`…), com merge na `main` ao concluir.
- Remote: github.com/direnzo/innerplacement-site. **O WSL não tem credenciais do GitHub**: o dono faz
  push/sync pela extensão de Git do VS Code. Commite e avise; não tente autenticar.
- Nunca versionar `node_modules/`, `dist/`, `.astro/`, `teste/` nem as pastas locais de imagens.

## Publicação

- **Desde 09/11/2026 a v2 está no ar na raiz de innerplacement.com.br.** `tools/publicar-producao.sh` publica; `--simular` mostra o que mudaria. Backup automático em `~/backups-producao/` no servidor.
- O WordPress está guardado em `~/innerplacement-wp-ANTIGO-20261109` (fora do ar). **Não rodar o deploy do repositório `innerplacement`**: ele escreveria na raiz nova. Rollback e limpeza: `docs/plano-migracao-producao.md`, seções 8 e 9.
- Acesso: host `inner-v2` no `~/.ssh/config` (usuário cPanel `s100c354`), chave `~/.ssh/inner_v2`
  **com senha**. O dono destrava a chave no terminal dele (comando no topo do script) num agente com
  socket fixo `~/.ssh/agente-inner-v2.sock`, válido por 4 h. Se o script disser "Sem acesso",
  peça ao dono para destravar; nunca peça nem manipule a senha.
- Formulário: `public/enviar.php` (envio como o WordPress fazia). No servidor, fora da pasta pública:
  `~/inner-formulario.php` (config; `destino_teste` = contato@innerplacement.com.br) e
  `~/inner-mensagens/` (registro de cada mensagem, com dados pessoais: não copiar para o repositório).
  Testar envio real gera e-mail na caixa da Inner: só com o dono ciente.
- E-mail do domínio (híbrido): o MX é o Google Workspace, onde contato@ é um **grupo**; as contas `iqa@` e `webmaster@` são do cPanel, e por isso o roteamento do `.com.br` fica em **Local** (não mudar para Remoto). Para o `mail()` do site chegar ao grupo, há no cPanel o encaminhador `contato@innerplacement.com.br` → `contato@innerplacement.com.br.test-google-a.com` (criado em 09/11/2026). Sem ele, o servidor recusa com "No Such User Here".
- A chave antiga `~/.ssh/innerplacement` (sem senha) é do repositório do WordPress; não usar aqui.
  Revogá-la fica para depois (decisão do dono, 29/09).

## IQA

- Aplicação PHP à parte, no ar em https://iqa.innerplacement.com.br/ (`~/iqa` no servidor, banco próprio). `iqa/` neste
  repositório é só cópia de segurança do código; detalhes em `docs/iqa.md`.
- Nunca versionar `iqa/src/config.php`, `iqa/src/google-service-account.json` nem dump do banco (dados pessoais).

## Ambiente

- Windows + WSL2 (Ubuntu). Repositórios em `~/projetos/`. Downloads e Drive do Windows em `/mnt/d/`.
- Node 22 via nvm.
- O WordPress local (repo `innerplacement`) roda em Docker em `localhost:8080`. Depois de reiniciar
  o Docker Desktop, o container `ip_wp` não volta sozinho: rodar `docker compose up -d` naquele repo.
