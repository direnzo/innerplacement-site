# CLAUDE.md — Inner Placement site v2

Instruções para sessões de agente neste repositório. Estrutura, comandos e "onde mexer" estão no
`README.md`; leia-o primeiro. Aqui ficam o contexto e as regras que não são óbvias pelo código.

## O que é este projeto

- Site novo da Inner Placement (consultoria de carreira para executivos), estático: Astro 7 +
  Tailwind CSS 4 + Alpine.js. Vai **substituir o WordPress** em innerplacement.com.br.
- Decisão do dono (29/09/2026): o caminho de melhorar o WordPress (SEO, GEO, performance) não deu
  resultado; a v2 é o caminho. O WordPress fica no repositório `~/projetos/innerplacement`
  (clone Docker), em modo manutenção, e será congelado quando a v2 entrar no ar.
- Versão de teste publicada em https://innerplacement.com.br/v2-teste/.
- Origem: a v2 foi criada no Claude Desktop (sessão Cowork "Innerplacement site redesign
  strategy") e importada aqui em 29/09/2026. `build/v0.9/` é o build exportado naquele momento,
  guardado como referência.

## Conteúdo

- **Fonte de verdade do texto:** a documentação funcional aprovada pelos sócios (Paula Oliveira,
  Débora Ereno, Cesar Cordeiro), em
  `D:\Google Drive\direnzo@gmail\CLIENTES\InnerPlacement\site_v3\Cópia de site-inner-documentacao-funcional.md`
  (no WSL: `/mnt/d/Google Drive/direnzo@gmail/CLIENTES/InnerPlacement/site_v3/`).
- O texto em `src/data/` é **literal** desse documento. Não parafrasear, "melhorar" nem abreviar.
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
- Cada commit na `main` publica a `/v2-teste/` pelo GitHub Actions (chave dedicada sem senha, só nos
  segredos do GitHub e no cPanel; o dono a cria — ela nunca passa pelo agente).

## LGPD, cookies e analytics

- Desde 02/10/2026 o site tem aviso de cookies por categoria (`CookieConsent.astro`) e o Gerenciador de
  Tags do Google (`GTM_ID` em `src/data/site.ts`), com o Consent Mode do Google: só mede com a permissão
  dada no aviso. **`GTM_ID` é o mesmo contêiner que o WordPress atual usa** (decisão deliberada, para não
  perder o histórico do Analytics na troca de site) — não trocar por um novo sem avisar o dono, porque
  isso quebra a continuidade dos dados.
- A Política de Privacidade (`src/pages/politica-de-privacidade.astro`) tem dois campos pendentes que só
  o dono pode preencher (CNPJ e o encarregado de dados/DPO) — a própria página avisa isso. Não inventar
  esses valores.

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

## Publicação do teste (/v2-teste/)

- `tools/publicar-v2-teste.sh` publica; `--simular` mostra o que mudaria. Nunca toca na raiz do
  domínio (WordPress). Backup automático em `~/backups-v2-teste/` no servidor.
- Acesso: host `inner-v2` no `~/.ssh/config` (usuário cPanel `s100c354`), chave `~/.ssh/inner_v2`
  **com senha**. O dono destrava a chave no terminal dele (comando no topo do script) num agente com
  socket fixo `~/.ssh/agente-inner-v2.sock`, válido por 4 h. Se o script disser "Sem acesso",
  peça ao dono para destravar; nunca peça nem manipule a senha.
- Formulário: `public/enviar.php` (envio como o WordPress fazia). No servidor, fora da pasta pública:
  `~/inner-formulario.php` (config; `destino_teste` = contato@innerplacement.com.br) e
  `~/inner-mensagens/` (registro de cada mensagem, com dados pessoais: não copiar para o repositório).
  Testar envio real gera e-mail na caixa da Inner: só com o dono ciente.
- A chave antiga `~/.ssh/innerplacement` (sem senha) é do repositório do WordPress; não usar aqui.
  Revogá-la fica para depois (decisão do dono, 29/09).

## Ambiente

- Windows + WSL2 (Ubuntu). Repositórios em `~/projetos/`. Downloads e Drive do Windows em `/mnt/d/`.
- Node 22 via nvm.
- O WordPress local (repo `innerplacement`) roda em Docker em `localhost:8080`. Depois de reiniciar
  o Docker Desktop, o container `ip_wp` não volta sozinho: rodar `docker compose up -d` naquele repo.

## Antes de publicar em produção

Pendências listadas no `README.md` (URLs dos vídeos, Quem somos/Blog ainda no WordPress; logos
todos autorizados pelo dono em 01/10/2026). Além delas:
- Não reaproveitar o `robots.txt` nem o `noindex` da home de `build/v0.9/`: eram bloqueios de teste.
  `public/robots.txt` (desde 02/10/2026) já é o certo para produção. A fonte já está certa (só
  `/obrigado/` tem `noindex`).
- O deploy troca o WordPress na raiz do domínio: planejar com backup e rollback, e conferir os 301
  de `public/.htaccess` contra as URLs reais do WordPress.
