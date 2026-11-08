# IQA — Autoavaliação · InnerPlacement

Aplicação PHP independente que reproduz a planilha *IQA — Índice de Qualidade do Ambiente*
como formulário web. A pessoa entra, informa nome e e-mail, responde 15 itens em duas escalas,
e recebe o resultado calculado por e-mail. Roda ao lado do WordPress, sem tocar nele.

---

## Onde hospedar

Duas opções no mesmo domínio. Ambas funcionam; a primeira é a mais limpa.

**Subdomínio — `iqa.innerplacement.com.br`** (recomendado)
Isolamento total: document root próprio, PHP próprio, nenhum plugin de WordPress
no caminho. Crie o subdomínio no painel, aponte para `/public_html/iqa` e suba os arquivos lá.

**Subpasta — `innerplacement.com.br/iqa/`**
Também funciona sem configuração extra. O `.htaccess` do WordPress só reescreve requisições
que **não** correspondem a arquivo ou diretório real (`RewriteCond %{REQUEST_FILENAME} !-f`
e `!-d`), então uma pasta física `/iqa/` é servida direto pelo Apache. O único cuidado é
plugin de cache: exclua `/iqa/*` no WP Rocket, senão ele pode servir HTML em cache no lugar
da resposta do `submit.php`.

---

## Instalação

```bash
# 1. Suba os arquivos para o document root da aplicação
# 2. Banco
mysql -u USUARIO -p NOME_DO_BANCO < sql/schema.sql

# 3. Configuração
cp src/config.example.php src/config.php
# edite src/config.php: credenciais do banco, SMTP e url_base

# 4. PHPMailer (opcional, mas muito recomendado)
composer install --no-dev --optimize-autoloader
```

Sem o `composer install`, o envio cai automaticamente para a função `mail()` do PHP.
Funciona, mas a entrega é pior: sem SMTP autenticado com SPF e DKIM do próprio domínio,
Gmail e Outlook mandam para spam ou descartam.

Requisitos: PHP 8.0+, MySQL 5.7+ ou MariaDB 10.2+ (pelo tipo `JSON`; em versões antigas
troque `JSON` por `LONGTEXT` no schema), extensões `pdo_mysql` e `openssl`.

---

## Estrutura

```
index.php              Aplicação inteira: wizard Alpine + Tailwind, uma página
api/submit.php         Recebe JSON, valida, calcula, grava e dispara o e-mail
api/export.php         CSV de todas as respostas, protegido por token
src/questions.php      Os 15 itens, dimensões, escala e faixas de leitura
src/scoring.php        Motor de cálculo — espelha as fórmulas da planilha
src/db.php             PDO e persistência
src/mailer.php         SMTP via PHPMailer, com fallback para mail()
src/email_template.php E-mail em tabelas com estilo inline
src/config.php         Credenciais (fora do Git, bloqueado pelo .htaccess)
sql/schema.sql         Tabela iqa_respostas
```

---

## O que foi mapeado da planilha

| Planilha | Aplicação |
|---|---|
| `=IFERROR(AVERAGE(C9:C11),"")` e as demais 9 | média por dimensão, `iqa_calcular()` |
| `=SUM(C9:C23)` / `=SUM(D9:D23)` | `soma_eu` e `soma_equipe` |
| `=IF(C35>=66,...)` aninhado | `iqa_faixa()`, com as faixas em `IQA_FAIXAS` |
| `=C35-D35` | `gap`, com leitura em texto em `iqa_leitura_gap()` |
| Células amarelas (entrada) | os únicos dados que o navegador envia |

O cálculo roda **no servidor**. O navegador manda apenas as 30 notas; tudo o que aparece
na tela de resultado e no e-mail vem da resposta do `submit.php`. Isso mantém uma única
fonte de verdade e impede que alguém forje um resultado pelo devtools.

Conferência: com as notas de exemplo da planilha, a aplicação devolve soma 66 e 53,
gap 13, e as mesmas médias por dimensão (4,33 / 4,33 / 4,67 / 5,00 / 3,67 e
3,33 / 3,67 / 3,33 / 3,67 / 3,67).

---

## Decisões de front-end

- **Um item por tela.** Trinta campos numa página só é abandono garantido no celular.
  O avanço é automático quando as duas notas do item são marcadas pela primeira vez,
  com 420 ms de espera; quem volta e corrige não é empurrado de novo.
- **Régua de progresso, não barra de porcentagem.** Quinze marcas, uma por item: cheia
  para respondido, amarela para o item atual. É a métrica que a pessoa entende.
- **Cheio contra hachurado.** Em desenho técnico, a hachura marca o que está em corte,
  o que não se vê de frente. Aqui o preenchido é a sua percepção e o hachurado é a
  percepção provável da equipe. O mesmo par aparece nas caixas de nota, no gráfico e no e-mail.
- **Amarelo é o que se toca.** Vem das células amarelas da planilha, que eram justamente
  as de preenchimento. Nada decorativo usa amarelo.
- **Rascunho em `sessionStorage`.** Quem fecha a aba sem querer não perde 15 respostas.
  Limpo assim que o envio dá certo.
- **Acessibilidade:** as escalas são `input[type=radio]` reais dentro de `fieldset`, então
  setas do teclado e leitores de tela funcionam sem JavaScript de apoio; foco visível;
  `prefers-reduced-motion` respeitado.

### Tailwind por CDN

`index.php` carrega `cdn.tailwindcss.com`, que compila as classes no navegador. Para uma
página de evento com poucas centenas de acessos, é a troca certa: zero build, zero
pipeline. Se o volume crescer ou o first paint incomodar, gere o CSS uma vez e troque o
script por um `<link>`:

```bash
npx tailwindcss -i input.css -o app.css --minify
```

---

## Operação

- **Cópia interna:** `mail.copia_interna` em `src/config.php` recebe BCC de cada resposta.
- **Exportar:** defina `app.token_export` e acesse `/api/export.php?token=SEU_TOKEN`.
  CSV com BOM e separador `;`, abre direto no Excel em português.
- **Falhas de e-mail:** ficam em `email_enviado = 0` e `email_erro` na tabela, e no
  `error_log` do PHP. O resultado continua aparecendo na tela mesmo se o envio falhar.
- **Anti-robô:** campo honeypot invisível e limite de envios por IP por hora
  (`app.limite_ip`, padrão 12). Para um evento presencial com Wi-Fi compartilhado,
  suba esse número ou zere para desligar.

## LGPD

O aceite é obrigatório e fica gravado em `consentimento`. Nome, e-mail, cargo, empresa,
IP e user agent são coletados. Vale apontar a política de privacidade do site principal
no texto do aceite e definir um prazo de expurgo (por exemplo, `DELETE FROM iqa_respostas
WHERE criado_em < NOW() - INTERVAL 12 MONTH` num cron).
