# Painel `/admin`: acesso por token

O painel (Sveltia CMS) em https://innerplacement.com.br/admin/ grava direto no repositório privado
`direnzo/innerplacement-site`. Cada publicação vira um commit na `main`, e a publicação automática
atualiza o site.

O acesso é feito com o botão **"Entrar com token"**. O dono gera no GitHub um token (uma chave de acesso)
para cada pessoa que vai editar e entrega a ela. Quem edita não precisa ter conta no GitHub.

## Regras

- **Cada pessoa ou equipe recebe um token próprio.** Por exemplo: `painel-marketing-ana`, `painel-socios`.
  Assim dá para cortar o acesso de uma pessoa sem afetar as outras.
- **Quem tem um token consegue alterar qualquer arquivo do site**, não só o blog e os depoimentos. Por
  isso, entregue tokens só a quem for de confiança e envie por um canal privado.
- **Todos os commits saem no nome do dono.** O histórico não mostra quem editou. Se precisar saber,
  combine que cada pessoa escreva o próprio nome no texto da alteração ou avise no grupo.
- O token nunca vai para o repositório, para documentos compartilhados nem para conversas com o agente.

## Gerar um token (dono)

1. No GitHub, entrar com a conta `direnzo` e abrir https://github.com/settings/personal-access-tokens/new
   (o caminho é Settings → Developer settings → Personal access tokens → Fine-grained tokens →
   Generate new token).
2. Preencher:
   - **Token name:** `painel-<pessoa>`, por exemplo `painel-marketing-ana`.
   - **Expiration:** 6 a 12 meses. Anote a data para lembrar de renovar.
   - **Repository access:** *Only select repositories* → `direnzo/innerplacement-site`.
   - **Permissions → Repository permissions:** **Contents = Read and write**. Metadata = Read-only, que
     o GitHub marca sozinho. Todo o resto fica em *No access*. Deixar Workflows em No access impede que
     alguém mexa na publicação automática.
3. Clicar em **Generate token** e copiar o valor, que começa com `github_pat_`. O GitHub só mostra o token
   nessa hora.
4. Enviar o token à pessoa por um canal privado, junto com as instruções da seção "Como entrar".

## Como entrar (quem edita)

1. Abrir https://innerplacement.com.br/admin/
2. Clicar em **Entrar com token** (ou *Sign in with Token*).
3. Colar o token recebido e confirmar.
4. Pronto. O navegador mantém o acesso até você clicar em **Sair** no menu do painel. Em computador
   compartilhado, sempre saia ao terminar.
5. Cada publicação vai ao ar em poucos minutos.

Não repasse o token a ninguém. Se achar que ele vazou, avise o dono na hora.

## Cortar o acesso ou renovar (dono)

- **Revogar:** abrir https://github.com/settings/personal-access-tokens, escolher o token da pessoa e
  clicar em **Delete**. O acesso dela para na hora, e os outros tokens continuam funcionando.
- **Renovar:** perto do vencimento, abrir o token e clicar em **Regenerate token**, ou então gerar um
  novo. Depois, enviar o valor novo à pessoa, que entra de novo com ele.
- O GitHub avisa por e-mail quando um token está para vencer.

## Problemas comuns

- **"Token inválido" ou o painel não entra:** o token venceu, foi revogado ou foi colado incompleto,
  com espaço ou cortado.
- **Entra mas não consegue salvar:** o token foi criado sem Contents = Read and write ou sem o
  repositório `innerplacement-site`.
- **Salvar dá erro de branch protegida:** se a `main` tiver uma regra exigindo pull request, os commits
  do painel são recusados. Nesse caso, liberar a regra.
- **A mudança não apareceu no site:** aguarde alguns minutos e recarregue a página. Se não aparecer,
  confira a aba Actions do repositório.

## Alternativas, se o token deixar de servir

- **"Entrar com GitHub"**: cada pessoa tem conta própria no GitHub e o histórico mostra quem editou.
  Exige um GitHub App e um Cloudflare Worker (`sveltia-cms-auth`) e, depois, `base_url` no
  `public/admin/config.yml`. Passo a passo em https://github.com/sveltia/sveltia-cms-auth
- **Login com Google**: exige trocar o Sveltia pelo Decap CMS com o serviço DecapBridge, um terceiro que
  passa a guardar o acesso ao repositório.
