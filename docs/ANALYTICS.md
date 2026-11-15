# Analytics: contratos do site com o Gerenciador de Tags

Contêiner GTM `GTM-ND356DQM` (o mesmo do WordPress, para manter o histórico), propriedade GA4
`G-669R79ZWTE`. O GTM só carrega com o consentimento do aviso de cookies e depois da primeira interação.
Os eventos abaixo saem de `src/scripts/app.ts`. **Não renomear eventos nem parâmetros sem ajustar o GTM.**

## Eventos do dataLayer

| Evento | Quando | Parâmetros | No GA4 vira |
|---|---|---|---|
| `lead_submit` | O servidor confirma o envio de um formulário | `form_name`: `contato` ou `ebook` | `generate_lead` (evento principal) |
| `whatsapp_click` | Clique em link `wa.me/` (fora da página /whatsapp/) | `link_url`, `link_id`, `link_text`, `link_location` (`rodape`, `flutuante`, `conteudo`) | `contact_whatsapp` (evento principal) |

- O contato redireciona para `/obrigado/` depois do envio; o código espera o GTM processar o
  `lead_submit` (até 800 ms) antes de sair da página.
- O e-book não sai da página: o servidor responde e o botão de download aparece (`/e-book/?ok=1` no envio
  sem JavaScript). Por isso o lead do e-book não pode ser medido pela visita a `/obrigado/`.
- A visita a `/whatsapp/` continua sendo medida pela própria página no GTM.
- Na versão de testes (`window.INNER_TESTE = true`) nada é enviado.

## Tráfego interno

Abrir qualquer página com `?interno=1` grava o cookie `ip_interno` (1 ano) neste navegador;
`?interno=0` apaga. O GTM lê o cookie (variável `JS - traffic_type`) e a tag do Google envia
`traffic_type=internal`; o filtro de dados "Internal Traffic" do GA4 exclui essas visitas quando ativo.
A gravação fica no código, e não numa tag HTML do GTM, porque a CSP (`public/.htaccess`) não aceita
script embutido.

## Dimensões personalizadas no GA4

- Formulário de origem → parâmetro `form_name`
- Local do clique WhatsApp → parâmetro `link_location`
