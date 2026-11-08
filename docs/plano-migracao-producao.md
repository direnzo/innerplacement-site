# Plano de migração para produção e rollback

Rascunho de 21/10/2026, para execução **depois** do feedback final da equipe Inner. Nada deste plano foi executado.
Legenda: **[repo]** confirmado no repositório; **[verificar]** só dá para saber no servidor (leitura, com a chave destravada pelo dono).

## 1. Situação de partida

- Hospedagem cPanel (usuário `s100c354`). O WordPress ocupa a raiz do site, `~/innerplacement`, e a versão de teste vive em `~/innerplacement/v2-teste/` **[repo: `tools/publicar-v2-teste.sh`]**.
- O build de produção (`npm run build` → `dist/`) já sai com caminhos na raiz e `public/robots.txt`, `llms.txt`, `.htaccess` com os 301 e o GTM ligado. A variante `/v2-teste/` é derivada dele (`tools/build-v2-teste.py`) **[repo]**.
- O workflow `.github/workflows` publica a `/v2-teste/` a cada commit na `main`. **Depois da troca ele precisa ser reapontado ou desligado** (ver passo 7), senão continua enviando uma cópia noindex para dentro da raiz nova.
- O e-mail (MX) e o DNS **não mudam**: o domínio continua na mesma hospedagem, só o conteúdo da pasta muda.

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

1. Feedback da equipe aplicado, `main` estável, build de produção sem erro.
2. Dono preencheu **CNPJ e encarregado de dados (DPO)** na política de privacidade (`src/pages/politica-de-privacidade.astro`).
3. Decisões abertas fechadas: vídeos de depoimento pendentes (podem entrar depois do deploy), termo "rede", `/e-book/` com o PDF final.
4. Inventário da raiz atual **[verificar]** (`ls -la ~/innerplacement`), para listar o que precisa sobreviver à troca:
   - `.well-known/` (renovação do SSL/AutoSSL) e `cgi-bin/`;
   - bloco de PHP do cPanel no `.htaccess` atual (linhas `# php -- BEGIN cPanel-generated handler`): o `enviar.php` precisa da mesma versão de PHP; **mesclar esse bloco ao `.htaccess` da v2**, sem apagar os 301;
   - arquivos de verificação (Google Search Console, `ads.txt`, etc.) e `folha-referencia-inner.png`;
   - o que for da v2-teste (será retirada).
5. Conferir o `.htaccess` da v2 num Apache de verdade (ver seção 5, passo 3). Hoje as regras estão **sem teste**.
6. Páginas de erro: o `.htaccess` usa `ErrorDocument 404 /` e a v2 não tem página 404 própria **[repo]**. Decidir se vale criar uma `404.astro` antes da troca (evita páginas inexistentes devolverem a home).

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

1. **Congelar conteúdo.** Combinar com os sócios um horário sem edição no painel `/admin` nem no WordPress. `git pull` para trazer o que o painel gravou na `main`.
2. **Build de produção** no commit final: `npm run build`. Conferir que `dist/` tem `.htaccess`, `robots.txt` sem `Disallow: /` geral, `sitemap-index.xml`, e que só `/obrigado/` tem `noindex`.
3. **Ensaiar os 301 e o PHP** (opcional, recomendado): subir `dist/` num container Apache local descartável com `AllowOverride All` e rodar `curl -I` nas URLs de `docs/mapa-redirecionamentos.md`. Exige baixar a imagem `httpd` do Docker: **pedir autorização antes**.
4. **Enviar para `~/innerplacement-v2-novo`** (rsync do `dist/`, mais o que o inventário do passo 3.4 mandou preservar). Nada muda no ar ainda.
5. **Conferir a pasta nova por dentro**: arquivos presentes, permissões (`D755/F644`), `.htaccess` mesclado, `enviar.php` e `~/inner-formulario.php` (fora da raiz) intactos. Confirmar que **`destino_teste` não vale em produção** (o `enviar.php` só usa `destino_teste` na `/v2-teste/`).
6. **Troca**, no horário combinado, com o dono presente:
   `mv ~/innerplacement ~/innerplacement-wp-ANTIGO-<data> && mv ~/innerplacement-v2-novo ~/innerplacement`
7. **Reapontar a publicação automática** (`.github/workflows` e `tools/publicar-v2-teste.sh`): destino passa a ser a raiz, com filtros que **protegem** `.well-known/`, `cgi-bin/` e arquivos de verificação do `--delete`; remover a geração noindex. Até isso estar feito, **desabilitar o workflow**.
8. **Limpar caches**: Cloudflare, se o domínio passa por ele (o plano de deploy do WordPress cita "Purge Everything") **[verificar]**; o cache do WP Rocket some com a pasta antiga.
9. **Retirar a `/v2-teste/`** (já não existe depois do `mv`, pois estava dentro da pasta antiga). Se quiser manter uma cópia de testes, mover para outro lugar com `noindex`.

## 6. Verificação logo após a troca

Automática (`curl`, sem efeito colateral):
- as URLs principais respondem 200; cada 301 do mapa responde 301 para o destino certo;
- `robots.txt`, `sitemap-index.xml`, `llms.txt` abrem; apenas `/obrigado/` tem `noindex`;
- `/e-book/` e o PDF abrem; assets `_astro/*` respondem 200; HTTPS sem aviso de conteúdo misto.

Com o dono:
- enviar o formulário de contato **e** o do e-book (cai na caixa da Inner: avisar antes);
- aceitar/recusar o aviso de cookies e conferir, no Tag Assistant ou no Analytics em tempo real, que o GTM `GTM-ND356DQM` só mede com o consentimento;
- abrir no celular e no desktop; clicar nos botões de WhatsApp.

## 7. Search Console e Analytics (dia 0 a 14)

- Search Console: confirmar que a propriedade continua verificada (a verificação provavelmente é pelo próprio GTM, ver README); **enviar `sitemap-index.xml`**; inspecionar a home e 2–3 páginas; acompanhar "Páginas" e erros 404 por 2 semanas.
- Analytics: conferir que os dados continuam no mesmo contêiner (histórico preservado).
- Cada URL antiga com tráfego que ficou sem 301 vira 404: revisar o relatório de 404 e acrescentar regras.

## 8. Rollback

| Quando | Ação | Tempo |
| --- | --- | --- |
| Algo grave logo após a troca | `mv ~/innerplacement ~/innerplacement-v2-falhou && mv ~/innerplacement-wp-ANTIGO-<data> ~/innerplacement`; purgar Cloudflare | segundos |
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
| Dados pessoais dos formulários antigos perdidos | exportar `wpbv_e_submissions` e `~/inner-mensagens/` antes |
