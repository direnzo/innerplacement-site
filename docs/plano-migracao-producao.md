# Plano de migração para produção e rollback

Rascunho de 21/10/2026, revisado em 08/11/2026 depois da documentação funcional v2. Para execução **depois** do retorno dos sócios sobre a `/v2-teste/`. Nada deste plano foi executado.
Legenda: **[repo]** confirmado no repositório; **[público]** confirmado em 08/11/2026 por requisições HTTP de leitura ao site no ar; **[verificar]** só dá para saber no servidor (leitura, com a chave destravada pelo dono; lista na seção 3.1).

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

Pontos a confirmar antes **[verificar]**: se o document root do domínio é mesmo `~/innerplacement` (e não um link para `public_html`); se há subdomínios ou outros sites dentro dela; se a renomeação de pasta é permitida pelo cPanel nesse plano.

## 3. Pré-requisitos (nada disso mexe no ar)

1. Documentação v2 e FAQ revisado aplicados em 08/11/2026 **[repo]**. Falta o retorno dos sócios sobre a `/v2-teste/`, e a `main` precisa estar estável, com build de produção sem erro.
2. Dono preencheu **CNPJ e encarregado de dados (DPO)** na política de privacidade (`src/pages/politica-de-privacidade.astro`).
3. Decisões abertas fechadas:
   - **condição para publicar:** base e período do 86% validados internamente (P10); dados do rodapé (P14); `/e-book/` com o PDF final;
   - **mudam texto:** grafia do nome (P15), "No Outplacement" (P17), relatório final (P18), programa do Vinícius (P7), "o/a Executive Alignment" e os termos "rede", "vagas" e "posições" no FAQ revisado;
   - **podem entrar depois da troca:** quatro dimensões na home (P16), ilustração do Manifesto (P19), depoimento da Alessandra (P12), vídeos (Gisele, Rafael, Fabíola editado) e ilustração dos hubs e da Executive Alignment.
4. Inventório da raiz atual **[verificar]**, para listar o que precisa sobreviver à troca:
   - `.well-known/` (renovação do SSL/AutoSSL) e `cgi-bin/`;
   - bloco de PHP do cPanel no `.htaccess` atual (linhas `# php -- BEGIN cPanel-generated handler`): o `enviar.php` precisa da mesma versão de PHP; **mesclar esse bloco ao `.htaccess` da v2**, sem apagar os 301;
   - **redirecionamentos HTTP→HTTPS e www→sem www.** Hoje os dois existem **[público]**, e o `public/.htaccess` não tem nenhum dos dois **[repo]**. Se vierem do `.htaccess` do WordPress, somem na troca e precisam entrar na v2 (modelo abaixo); se vierem do cPanel, nada a fazer;
   - regras de compressão e cache no `.htaccess` atual (WP Rocket): a v2 não tem as suas, e os arquivos de `_astro/` podem ter cache longo;
   - arquivos de verificação: `ads.txt` não existe e a home não tem meta de verificação do Google **[público]**; conferir se há arquivo `google*.html` na raiz. A `folha-referencia-inner.png` está na `/v2-teste/`, não na raiz, e não precisa ir para produção.
5. `.htaccess` da v2 testado em Apache 2.4 local em 08/11/2026, com o build da `main` (`f3cc2da`), contra as 45 URLs atuais dos sitemaps do WordPress: 44 corretas e `/locations.kml` em 404, como previsto em `docs/mapa-redirecionamentos.md`. Repetir no passo 3 com o `.htaccess` mesclado.
6. Páginas de erro: o `.htaccess` usa `ErrorDocument 404 /` e a v2 não tem página 404 própria **[repo]**. Decidir se vale criar uma `404.astro` antes da troca (evita páginas inexistentes devolverem a home).
7. Regerar os derivados no commit final, se o texto mudar: `tools/llms.mts` e `tools/compartilhamento.mts`.
8. Sitemap antigo: `/sitemap_index.xml` (Yoast) responde 200 hoje **[público]** e a v2 usa `/sitemap-index.xml` **[repo]**. Acrescentar um 301 de um para o outro, para quem já tem o endereço antigo.

Modelo para o item 4, só se o inventário mostrar que as regras vêm do WordPress (logo após `RewriteEngine On`):

```apache
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://innerplacement.com.br%{REQUEST_URI} [L,R=301]
```

### 3.1 Leituras no servidor (chave destravada pelo dono; nenhuma altera nada)

| Pergunta | Comando |
| --- | --- |
| A raiz do domínio é mesmo `~/innerplacement`? | `uapi DomainInfo domains_data` e `ls -ld ~/innerplacement ~/public_html` |
| O que há na raiz, além do WordPress? | `ls -la ~/innerplacement` |
| Há subdomínios ou outros sites dentro dela? | saída do `uapi` acima |
| O que o `.htaccess` atual faz? | `grep -nE '^# (BEGIN\|END\|php)\|Rewrite(Cond\|Rule)\|Header\|Expires\|Deflate' ~/innerplacement/.htaccess` |
| Tamanho das pastas e espaço para os backups | `du -sh ~/innerplacement` e `quota -s` |

## 4. Backups (pontos de rollback)

Feitos no dia, antes de qualquer mudança, e **guardados fora da pasta que será trocada**:

| Backup | Como | Guardar |
| --- | --- | --- |
| Completo da hospedagem | cPanel → Backup (arquivos + banco) | baixar para a máquina do dono |
| Arquivos do WordPress | `tar czf ~/backups/wp-raiz-<ts>.tgz -C ~ innerplacement` | servidor, pasta fora da raiz pública |
| Banco do WordPress | `wp db export` ou phpMyAdmin | servidor + cópia local; **por ≥ 30 dias** |
| Formulários já recebidos | tabela `wpbv_e_submissions` (leads do Elementor) e `~/inner-mensagens/` | cópia local; contém dados pessoais, **não** vai para o repositório |

A tabela de envios do Elementor guarda os contatos do formulário antigo: exportá-la antes de congelar o WordPress.

## 5. Passo a passo

1. **Congelar conteúdo e desligar a publicação automática.** Combinar com os sócios um horário sem edição no painel `/admin` nem no WordPress. `git pull` para trazer o que o painel gravou na `main`. **Desabilitar o workflow** "Publicar v2-teste" no GitHub (Actions): enquanto estiver desligado, edições do painel não vão ao ar.
2. **Build de produção** no commit final: `npm run build`. Conferir que `dist/` tem `.htaccess`, `robots.txt` sem `Disallow: /` geral, `sitemap-index.xml`, e que só `/obrigado/` tem `noindex`.
3. **Ensaiar os 301** com o `.htaccess` já mesclado: subir `dist/` no Apache local (`/usr/sbin/apache2`, com configuração própria numa pasta temporária, `AllowOverride All`) e rodar as URLs de `docs/mapa-redirecionamentos.md` com `curl`. O PHP do `enviar.php` só se confirma no servidor (seção 6).
4. **Enviar para `~/innerplacement-v2-novo`** (rsync do `dist/`, mais o que o inventário do passo 3.4 mandou preservar). Nada muda no ar ainda.
5. **Conferir a pasta nova por dentro**: arquivos presentes, permissões (`D755/F644`), `.htaccess` mesclado, `enviar.php` e `~/inner-formulario.php` (fora da raiz) intactos. Confirmar que **`destino_teste` não vale em produção** (o `enviar.php` só usa `destino_teste` na `/v2-teste/`).
6. **Troca**, no horário combinado, com o dono presente:
   `mv ~/innerplacement ~/innerplacement-wp-ANTIGO-<data> && mv ~/innerplacement-v2-novo ~/innerplacement`
7. **Reapontar a publicação automática** (`.github/workflows` e `tools/publicar-v2-teste.sh`): destino passa a ser a raiz, com filtros que **protegem** `.well-known/`, `cgi-bin/` e arquivos de verificação do `--delete`; remover a geração noindex. Só religar o workflow (desligado no passo 1) depois disso e de um `--dry-run` conferido.
8. **Limpar caches**: hoje não há sinal de Cloudflare na frente do site **[público]**, embora o plano de deploy do WordPress cite "Purge Everything"; purgar só se isso mudar. O cache do WP Rocket some com a pasta antiga.
9. **Retirar a `/v2-teste/`** (já não existe depois do `mv`, pois estava dentro da pasta antiga). Se quiser manter uma cópia de testes, mover para outro lugar com `noindex`.

## 6. Verificação logo após a troca

Automática (`curl`, sem efeito colateral):
- as URLs principais respondem 200, inclusive os hubs e as cinco páginas de programa; cada 301 do mapa responde 301 para o destino certo;
- `http://` e `www.` redirecionam para `https://innerplacement.com.br/`; o HTML e o CSS saem comprimidos;
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

1. 30 dias sem rollback, Search Console estável, leads antigos exportados.
2. Apagar a pasta antiga e o banco do WordPress no cPanel; revogar a chave antiga `~/.ssh/innerplacement` (sem senha, do repositório do WordPress) e desligar o clone Docker `ip_wp` em `~/projetos/innerplacement`.
3. Arquivar o repositório `innerplacement` (manutenção) no GitHub.

## 10. Riscos conhecidos

| Risco | Mitigação |
| --- | --- |
| `--delete` do rsync na raiz apagar `.well-known`/`cgi-bin` | filtros de proteção; ensaiar com `--dry-run` |
| PHP do `enviar.php` não rodar por falta do bloco do cPanel no `.htaccess` | mesclar o bloco (passo 3.4) e testar o envio no dia |
| 301 errados ou ausentes derrubarem posições | mapa em `docs/mapa-redirecionamentos.md`, teste com `curl` e vigília de 404 por 2 semanas |
| Soft 404 (`ErrorDocument 404 /`) | criar `404.astro` antes da troca, se o dono aprovar |
| Analytics contar duas vezes ou parar | mesmo contêiner GTM; conferir no tempo real |
| HTTP→HTTPS, www, compressão ou PHP pararem ao sair o `.htaccess` do WordPress | inventário do passo 3.4 e conferência da seção 6 |
| Publicação automática enviar cópia noindex para a raiz nova | workflow desligado no passo 1 |
| Dados pessoais dos formulários antigos perdidos | exportar `wpbv_e_submissions` e `~/inner-mensagens/` antes |
