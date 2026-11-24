# Painel `/admin` — login "Entrar com GitHub"

O painel (Sveltia CMS) grava direto no repositório privado `direnzo/innerplacement-site`. Para o botão
"Entrar com GitHub" funcionar, são necessárias três peças. Todas são do dono e as chaves nunca passam
pelo agente:

1. um **GitHub App**, que é o cadastro que autoriza o login;
2. um **Cloudflare Worker** `sveltia-cms-auth`, gratuito, que conclui o login e devolve o acesso ao painel;
3. o `base_url` em `public/admin/config.yml`, apontando para o Worker.

Referência: https://github.com/sveltia/sveltia-cms-auth

## 1. Publicar o Worker (Cloudflare)

1. Abrir https://deploy.workers.cloudflare.com/?url=https://github.com/sveltia/sveltia-cms-auth e entrar
   na conta Cloudflare que já administra o DNS do domínio.
2. Ao terminar, anotar o endereço do Worker: `https://sveltia-cms-auth.<subdominio>.workers.dev`.
   Ele também aparece no painel do Cloudflare, em Workers & Pages → `sveltia-cms-auth`.

## 2. Criar o GitHub App (conta `direnzo`)

1. Abrir o cadastro já preenchido:
   https://github.com/settings/apps/new?name=Sveltia+CMS+Auth+for+Inner&url=https://github.com/sveltia/sveltia-cms-auth&webhook_active=false&contents=write&pull_requests=write
2. Conferir os campos:
   - **Callback URL / Redirect URI:** `https://sveltia-cms-auth.<subdominio>.workers.dev/callback`
   - **Expire user authorization tokens:** marcado
   - **Webhook → Active:** desmarcado
   - **Permissões do repositório:** Contents = Read and write; Metadata = Read-only;
     Pull requests = Read and write; Workflows = No access
   - **Where can this GitHub App be installed:** Only on this account
3. Criar. Na página do app, copiar o **Client ID** e gerar um segredo em **Generate a new client secret**.
4. Clicar em **Install App** e instalar só no repositório `innerplacement-site`
   (opção "Only select repositories").

## 3. Configurar o Worker

No Cloudflare, abrir `sveltia-cms-auth` → Settings → Variables and Secrets e adicionar:

| Nome | Valor | Tipo |
|---|---|---|
| `GITHUB_CLIENT_ID` | o Client ID do app | texto |
| `GITHUB_CLIENT_SECRET` | o segredo gerado | **Secret** |
| `ALLOWED_DOMAINS` | `innerplacement.com.br, www.innerplacement.com.br` | texto |

`ALLOWED_DOMAINS` impede que outro site use este Worker para obter acesso.

## 4. Ligar no painel

Passar o endereço do Worker ao agente, que coloca `base_url` no `config.yml`. Depois do merge na `main`,
o site é publicado sozinho. Ao abrir https://innerplacement.com.br/admin/ deve aparecer "Entrar com GitHub".

## Dar acesso a uma pessoa (sócios, marketing)

O acesso ao painel é o acesso ao repositório. Quem não tem acesso ao repositório não entra.

1. A pessoa cria uma conta gratuita em https://github.com/signup. Pode usar "Continue with Google", e
   então o login dela no GitHub é a conta Google.
2. O dono abre o repositório no GitHub → Settings → Collaborators → **Add people**, informa o usuário
   ou o e-mail da pessoa e escolhe o papel **Write**.
3. A pessoa aceita o convite que chega por e-mail.
4. Daí em diante: abrir `/admin/` → **Entrar com GitHub** → no primeiro acesso, autorizar o app → editar.

Para tirar o acesso, basta remover a pessoa em Collaborators.

Atenção: com o papel Write, a pessoa também consegue mexer no código pelo próprio GitHub, e não só no
blog e nos depoimentos. Para restringir isso, seria preciso outra arquitetura. Por ora, dê o acesso só
a quem for de confiança.

## Problemas comuns

- **Não aparece o botão "Entrar com GitHub":** a versão publicada ainda não tem `base_url`, ou o
  navegador está mostrando a página antiga do cache.
- **O login fecha e não entra, ou dá erro de domínio:** revisar `ALLOWED_DOMAINS` e a Callback URL
  (precisa terminar em `/callback`).
- **A pessoa entra mas não consegue salvar:** ela não aceitou o convite, o papel não é Write, ou o app
  não foi instalado no repositório.
- **Salvar dá erro de branch protegida:** se a `main` tiver uma regra exigindo pull request, os commits
  do painel são recusados. Nesse caso, liberar a regra para os editores.
