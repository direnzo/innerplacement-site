# IQA (Índice de Qualidade do Ambiente)

Aplicação PHP de autoavaliação da Inner Placement, independente do site e do WordPress. A pessoa informa nome e
e-mail, responde 15 itens em duas escalas e recebe o resultado por e-mail. Detalhes da aplicação em `iqa/README.md`.

**No ar em <https://iqa.innerplacement.com.br/>.** O servidor é a versão oficial. A pasta `iqa/` deste repositório é
uma **cópia de segurança do código**: não é publicada pelo build do site nem pelo GitHub Actions, e editá-la aqui não
muda o que está no ar.

## Onde tudo fica

| Item | Local |
| --- | --- |
| Aplicação | `~/iqa` no servidor (conta cPanel `s100c354`, host SSH `inner-v2`), raiz própria do subdomínio |
| DNS do subdomínio | Cloudflare, sem proxy, apontando para o servidor |
| PHP | 8.2 |
| Banco de dados | MySQL próprio, separado do banco do WordPress; tabela `iqa_respostas` |
| Sincronização com o Google Sheets | cron a cada 15 minutos: `bin/sincronizar-sheets.php`, log em `~/logs/iqa-sheets.log` |
| Credenciais | só no servidor: `src/config.php` e `src/google-service-account.json` |

## O que está nesta cópia

Cópia feita em 08/11/2026.

| Parte | Onde está | No Git? |
| --- | --- | --- |
| Código, fontes, logos e `sql/schema.sql` | `iqa/` | sim |
| Dependências (`vendor/`) | regeneradas com `composer install --no-dev --optimize-autoloader` | não |
| `src/config.php` (banco, SMTP, token de exportação) | só no servidor; modelo em `iqa/src/config.example.php` | **nunca** |
| `src/google-service-account.json` (chave privada do Google) | só no servidor | **nunca** |
| Dump do banco (nome, e-mail, cargo, empresa, IP, respostas) | `~/backups-iqa/` no servidor e `~/backups/inner-iqa/` no WSL | **nunca** |

O dump tem dados pessoais (LGPD): não colocar neste repositório.

As credenciais não têm cópia fora do servidor. Se o servidor for perdido, será preciso gerar outra senha do banco e do
SMTP, um novo token de exportação e uma nova chave da conta de serviço no Google Cloud.

## Relação com a troca do WordPress

O IQA não é afetado: a troca renomeia apenas `~/innerplacement`, e a limpeza posterior apaga apenas a pasta e o banco
do WordPress. Nem o site atual nem a v2 têm link para o IQA.

## Atualizar a cópia

Com a chave `inner-v2` destravada (comando no topo de `tools/publicar-v2-teste.sh`), na raiz do repositório:

```bash
rsync -rlt --chmod=D755,F644 --exclude '/vendor/' --exclude '/.well-known/' \
  --exclude '/src/config.php' --exclude '/src/google-service-account.json' \
  -e "ssh -o BatchMode=yes" inner-v2:iqa/ iqa/
```

## Restaurar em outro lugar

1. Enviar o conteúdo de `iqa/` para a raiz do subdomínio e rodar `composer install --no-dev --optimize-autoloader`.
2. Criar o banco e importar o dump mais recente (ou `sql/schema.sql`, se for começar vazio).
3. Criar `src/config.php` a partir de `src/config.example.php` e recriar a credencial do Google.
4. Recriar o cron da sincronização e conferir o envio de um formulário de teste.
