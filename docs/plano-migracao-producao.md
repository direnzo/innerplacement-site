# Plano de migração para produção e rollback

Rascunho de 21/10/2026, revisado em 08/11/2026 depois da documentação funcional v2. Para execução **depois** do retorno dos sócios sobre a `/v2-teste/`. Nada deste plano foi executado.
Legenda: **[repo]** confirmado no repositório; **[público]** confirmado em 08/11/2026 por requisições HTTP de leitura ao site no ar; **[servidor]** confirmado em 08/11/2026 por leitura no servidor (resultado na seção 3.1).

## 1. Situação de partida

- Hospedagem cPanel (usuário `s100c354`). O WordPress ocupa a raiz do site, `~/innerplacement`, e a versão de teste vive em `~/innerplacement/v2-teste/` **[repo: `tools/publicar-v2-teste.sh`]**.
- O build de produção (`npm run build` → `dist/`) já sai com caminhos na raiz e `public/robots.txt`, `llms.txt`, `.htaccess` com os 301 e o GTM ligado. A variante `/v2-teste/` é derivada dele (`tools/build-v2-teste.py`) **[repo]**.
- O workflow `.github/workflows` publica a `/v2-teste/` a cada commit na `main`. **Ele precisa ser desligado antes da troca** (passo 1) e só religado já reapontado (passo 7), senão um commit, inclusive do painel `/admin`, envia uma cópia noindex para dentro da raiz nova.
- O e-mail (MX) e o DNS **não mudam**: o domínio continua na mesma hospedagem, só o conteúdo da pasta muda.
- A `/v2-teste/` fica dentro da pasta do WordPress e **herda o `.htaccess` da raiz**. O que funciona nela (PHP, compressão, HTTP→HTTPS) não prova que vai funcionar depois da troca, quando esse `.htaccess` deixa de valer.
- As respostas não trazem cabeçalhos do Cloudflare: `server: Apache`, sem `cf-*` **[público]**.

## 2. Estratégia: troca de pasta (rollback em segundos)

Em vez de apagar o WordPress e copiar a v2 por cima, preparar a v2 numa pasta ao lado e **renomear**:

```
~/innerplacement          (WordPress, no ar)
~/innerplacement-v2-novo  (v2 pronta, conferida)
  mv ~/innerplacement ~/innerplacement-wp-ANTIGO-<data>
  mv ~/innerplacement-v2-novo ~/innerplacement
rollback: os dois mv ao contrário
```

Confirmado **[servidor]**: `innerplacement.com.br` é domínio adicional do cPanel com raiz em `~/innerplacement`, sem site nenhum dentro dela. Os subdomínios `iqa.` e `teste.` têm pastas próprias fora dela, e o único cron da conta é do `iqa`. A pasta atual tem permissão `750` com grupo `nobody`, que o usuário não consegue atribuir: a pasta nova fica com `755`, como a `/v2-teste/`. O ensaio do passo 5 confirma que ela é servida assim.

## 3. Pré-requisitos (nada disso mexe no ar)

1. Documentação v2 e FAQ revisado aplicados em 08/11/2026 **[repo]**. Falta o retorno dos sócios sobre a `/v2-teste/`, e a `main` precisa estar estável, com build de produção sem erro.
2. Dono preencheu **CNPJ e encarregado de dados (DPO)** na política de privacidade (`src/pages/politica-de-privacidade.astro`).
3. Decisões abertas fechadas:
   - **condição para publicar:** base e período do 86% validados internamente (P10); dados do rodapé (P14); `/e-book/` com o PDF final;
   - **mudam texto:** grafia do nome (P15), "No Outplacement" (P17), relatório final (P18), programa do Vinícius (P7), "o/a Executive Alignment" e os termos "rede", "vagas" e "posições" no FAQ revisado;
   - **podem entrar depois da troca:** quatro dimensões na home (P16), ilustração do Manifesto (P19), depoimento da Alessandra (P12), vídeos (Gisele, Rafael, Fabíola editado) e ilustração dos hubs e da Executive Alignment.
4. Levar para a v2 o que hoje vem da raiz do WordPress **[servidor]**. Tudo que for do `.htaccess` entra em `public/.htaccess`, no repositório: a publicação automática sobrescreve o arquivo no servidor, e a `/v2-teste/` não usa esse arquivo.
   - **HTTP→HTTPS: obrigatório.** Hoje vem do bloco "Really Simple Security" do `.htaccess` do WordPress e some na troca.
   - **www→sem www: obrigatório.** Hoje só o WordPress faz: um arquivo estático em `https://www.` responde 200 sem redirecionar.
   - **Handler e diretivas de PHP:** copiar literalmente os blocos gerados pelo cPanel (`# php -- BEGIN cPanel-generated handler`, PHP 8.2 lsapi, e `# BEGIN cPanel-generated php ini directives`). O PHP da linha de comando é 8.3, então sem o handler a versão do site pode mudar.
   - **Compressão e cache:** hoje vêm do bloco do WP Rocket. Escrever versão enxuta para a v2 (`mod_deflate`; `mod_expires` com HTML sem cache e `_astro/`, fontes e imagens com cache longo).
   - Os itens acima e o `Options -Indexes` já estão em `public/.htaccess` (08/11/2026), testados em Apache local com HTTPS. No servidor, a confirmação é o ensaio do passo 5.
   - **Copiar para a pasta nova e proteger do `--delete`:** `.user.ini` e `php.ini` (têm uma mitigação de segurança aplicada pela hospedagem em 20/10/2026) e `.well-known/` (renovação do SSL).
   - **Não precisam ir:** não há `cgi-bin/`, `ads.txt` nem arquivo de verificação do Google na raiz. Os blocos de Imagify, Wordfence e WordPress morrem com o WordPress.
5. `.htaccess` da v2 testado em Apache 2.4 local em 08/11/2026, com o build da `main` (`f3cc2da`), contra as 45 URLs atuais dos sitemaps do WordPress: 44 corretas e `/locations.kml` em 404, como previsto em `docs/mapa-redirecionamentos.md`. Repetir no passo 3 com o `.htaccess` mesclado.
6. Página de erro: `src/pages/404.astro` criada em 08/11/2026, ligada por `ErrorDocument 404 /404.html` **[repo]**.
7. Regerar os derivados no commit final, se o texto mudar: `tools/llms.mts` e `tools/compartilhamento.mts`.
8. Sitemap antigo: `/sitemap_index.xml` (Yoast) tem 301 para `/sitemap-index.xml` em `public/.htaccess` **[repo]**.

### 3.1 Resultado das leituras no servidor (08/11/2026)

| Pergunta | Resultado |
| --- | --- |
| Raiz do domínio | `~/innerplacement`, domínio adicional (a conta principal é `s100.com.br`, em `public_html`) |
| Outros sites dentro dela | nenhum, só a `/v2-teste/` |
| Domínios alternativos (`winnerplacement.com.br`, `inner-placement.com.br` etc.) | apontam para a conta e hoje redirecionam para o site; a origem não foi identificada, por isso entram na conferência da seção 6 |
| Tamanho | 28 GB, dos quais 27 GB são `wp-content/uploads/backwpup` (19 backups do plugin, com dump do banco; responde 403 na web) |
| Espaço | 75 GB livres no disco, compartilhado e 96% ocupado |
| Tarefas agendadas | só a do `iqa`, que não depende desta pasta |

## 4. Backups (pontos de rollback)

Feitos no dia, antes de qualquer mudança, e **guardados fora da pasta que será trocada**:

| Backup | Como | Guardar |
| --- | --- | --- |
| Arquivos do WordPress | `tar czf ~/backups/wp-raiz-<ts>.tgz --exclude=innerplacement/wp-content/uploads/backwpup --exclude=innerplacement/error_log -C ~ innerplacement` (cerca de 1 GB) | servidor (`chmod 700`), pasta fora da raiz pública, e cópia na máquina do dono |
| Banco do WordPress | `wp db export` ou phpMyAdmin | servidor + cópia local; **por ≥ 30 dias** |
| Formulários já recebidos | tabela `wpbv_e_submissions` (leads do Elementor) e `~/inner-mensagens/` | cópia local; contém dados pessoais, **não** vai para o repositório |

O backup completo pelo cPanel não entra: geraria mais de 27 GB num disco 96% ocupado, por causa do BackWPup. A pasta inteira continua intacta depois da troca, só renomeada; o BackWPup para de rodar com o WordPress e os arquivos dele ficam como cópia extra até a etapa da seção 9.

A tabela de envios do Elementor guarda os contatos do formulário antigo: exportá-la antes de congelar o WordPress.

## 5. Passo a passo

1. **Congelar conteúdo e desligar a publicação automática.** Combinar com os sócios um horário sem edição no painel `/admin` nem no WordPress. `git pull` para trazer o que o painel gravou na `main`. **Desabilitar o workflow** "Publicar v2-teste" no GitHub (Actions): enquanto estiver desligado, edições do painel não vão ao ar.
2. **Build de produção** no commit final: `npm run build`. Conferir que `dist/` tem `.htaccess`, `robots.txt` sem `Disallow: /` geral, `sitemap-index.xml`, e que só `/obrigado/` tem `noindex`.
3. **Ensaiar os 301** com o `.htaccess` já mesclado: subir `dist/` no Apache local (`/usr/sbin/apache2`, com configuração própria numa pasta temporária, `AllowOverride All`) e rodar as URLs de `docs/mapa-redirecionamentos.md` com `curl`. O PHP do `enviar.php` só se confirma no servidor (seção 6).
4. **Enviar para `~/innerplacement-v2-novo`** (rsync do `dist/`, mais o que o inventário do passo 3.4 mandou preservar). Nada muda no ar ainda.
5. **Ensaiar no servidor de verdade**, antes da troca. O dono cria no cPanel um subdomínio temporário (por exemplo `ensaio.innerplacement.com.br`) com raiz em `~/innerplacement-v2-novo`. Em `https://ensaio…`, conferir páginas, 301, compressão, cache e o `enviar.php` (cai na caixa da Inner: só com o dono ciente). É o único jeito de testar o `.htaccess` novo sem o do WordPress por cima. Durante o ensaio, usar nessa cópia um `robots.txt` com `Disallow: /`, restaurar o arquivo certo e **remover o subdomínio** antes da troca.
   Conferir também: arquivos presentes, permissões (`D755/F644`), `~/inner-formulario.php` intacto e que **`destino_teste` não vale em produção** (o `enviar.php` só usa `destino_teste` na `/v2-teste/`) **[repo]**.
6. **Troca**, no horário combinado, com o dono presente. Daqui em diante, **não rodar o deploy do repositório do WordPress** (`~/projetos/innerplacement`): ele escreveria na raiz nova.
   `mv ~/innerplacement ~/innerplacement-wp-ANTIGO-<data> && mv ~/innerplacement-v2-novo ~/innerplacement`
7. **Reapontar a publicação automática** (`.github/workflows` e `tools/publicar-v2-teste.sh`): destino passa a ser a raiz, com filtros que **protegem** `.well-known/`, `.user.ini` e `php.ini` do `--delete`; remover a geração noindex. Só religar o workflow (desligado no passo 1) depois disso e de um `--dry-run` conferido.
8. **Limpar caches**: hoje não há sinal de Cloudflare na frente do site **[público]**, embora o plano de deploy do WordPress cite "Purge Everything"; purgar só se isso mudar. O cache do WP Rocket some com a pasta antiga.
9. **Retirar a `/v2-teste/`** (já não existe depois do `mv`, pois estava dentro da pasta antiga). Se quiser manter uma cópia de testes, mover para outro lugar com `noindex`.

## 6. Verificação logo após a troca

Automática (`curl`, sem efeito colateral):
- as URLs principais respondem 200, inclusive os hubs e as cinco páginas de programa; cada 301 do mapa responde 301 para o destino certo;
- `http://` e `www.` redirecionam para `https://innerplacement.com.br/`, inclusive em arquivo estático; o HTML e o CSS saem comprimidos; `winnerplacement.com.br` e `inner-placement.com.br` continuam chegando ao site;
- `robots.txt`, `sitemap-index.xml`, `llms.txt` abrem; apenas `/obrigado/` tem `noindex`;
- `/e-book/` e o PDF abrem; assets `_astro/*` respondem 200; HTTPS sem aviso de conteúdo misto.

Com o dono:
- enviar o formulário de contato **e** o do e-book (cai na caixa da Inner: avisar antes);
- aceitar/recusar o aviso de cookies e conferir, no Tag Assistant ou no Analytics em tempo real, que o GTM `GTM-ND356DQM` só mede com o consentimento;
- abrir no celular e no desktop; clicar nos botões de WhatsApp.

## 7. Search Console e Analytics (dia 0 a 14)

- Search Console: confirmar que a propriedade continua verificada (a verificação provavelmente é pelo próprio GTM, ver README); **enviar `sitemap-index.xml`** e remover o `sitemap_index.xml` antigo; solicitar indexação da home, dos dois hubs e das cinco páginas de programa; acompanhar "Páginas" e erros 404 por 2 semanas.
- Conferir canonical das páginas novas e se Googlebot e OAI-SearchBot não estão bloqueados (Orientações do Q&A, item 10). O `robots.txt` da v2 libera os dois **[repo]**, mas o servidor tem um filtro que recusa alguns User-Agents com 406 **[público]**: testar por ele também, não só pelo `robots.txt`.
- Analytics: conferir que os dados continuam no mesmo contêiner (histórico preservado).
- Cada URL antiga com tráfego que ficou sem 301 vira 404: revisar o relatório de 404 e acrescentar regras.

## 8. Rollback

| Quando | Ação | Tempo |
| --- | --- | --- |
| Algo grave logo após a troca | `mv ~/innerplacement ~/innerplacement-v2-falhou && mv ~/innerplacement-wp-ANTIGO-<data> ~/innerplacement`; manter o workflow desligado | segundos |
| Problema só no `.htaccess` | restaurar o `.htaccess` anterior (cópia guardada no passo 5.4) | segundos |
| Pasta antiga já apagada | restaurar o `tar` e o banco do passo 4 (ou o backup do cPanel) | dezenas de minutos |

Regra: **não apagar `~/innerplacement-wp-ANTIGO-<data>` nem o dump do banco por pelo menos 30 dias** e só depois que o Search Console e o Analytics estiverem estáveis.

## 9. Eliminar o WordPress (só depois da janela de segurança)

1. 30 dias sem rollback, Search Console estável, leads antigos exportados. Copiar para fora do servidor o backup mais recente do BackWPup, se quiser guardá-lo: os 27 GB saem junto com a pasta.
2. Apagar a pasta antiga e o banco do WordPress no cPanel; revogar a chave antiga `~/.ssh/innerplacement` (sem senha, do repositório do WordPress) e desligar o clone Docker `ip_wp` em `~/projetos/innerplacement`.
3. Arquivar o repositório `innerplacement` (manutenção) no GitHub.

## 10. Riscos conhecidos

| Risco | Mitigação |
| --- | --- |
| `--delete` do rsync na raiz apagar `.well-known`, `.user.ini` ou `php.ini` | filtros de proteção; ensaiar com `--dry-run` |
| PHP do `enviar.php` não rodar por falta do bloco do cPanel no `.htaccess` | mesclar o bloco (passo 3.4) e testar o envio no dia |
| 301 errados ou ausentes derrubarem posições | mapa em `docs/mapa-redirecionamentos.md`, teste com `curl` e vigília de 404 por 2 semanas |
| Analytics contar duas vezes ou parar | mesmo contêiner GTM; conferir no tempo real |
| HTTP→HTTPS, www, compressão ou PHP pararem ao sair o `.htaccess` do WordPress | item 3.4 em `public/.htaccess`, ensaio do passo 5 e conferência da seção 6 |
| Links externos para arquivos em `wp-content/uploads/` passarem a 404 | conferir no Search Console, antes da troca, os mais linkados, e criar 301 ou copiar os que importarem |
| Publicação automática enviar cópia noindex para a raiz nova | workflow desligado no passo 1 |
| Dados pessoais dos formulários antigos perdidos | exportar `wpbv_e_submissions` e `~/inner-mensagens/` antes |
