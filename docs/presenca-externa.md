# Presença externa: Bing, hospedagem e cadastros

Roteiro das ações que dependem de contas fora do repositório (12/11/2026). Motivo: em 16 perguntas de busca
usada por IA, a Inner não apareceu nenhuma vez, e as respostas citam diretórios, avaliações e imprensa
(`innerplacement.com.br-audit/findings/ia-visibilidade-2026-11-12.md`).

## 1. Bing Webmaster Tools (dono, cerca de 10 minutos)

O índice do Bing alimenta o ChatGPT e o Copilot.

1. Entrar em https://www.bing.com/webmasters com a conta Microsoft da Inner.
2. Escolher **Importar do Google Search Console**: traz o site verificado e o sitemap sem mexer no DNS.
3. Conferir em **Sitemaps** se `https://innerplacement.com.br/sitemap-index.xml` está lá; se não, enviar.
4. Em **Inspeção de URL**, testar a home e `/para-sua-empresa/outplacement/`.

O IndexNow já é automático: a cada publicação, `tools/publicar-producao.sh` avisa o Bing das páginas que
mudaram (chave em `public/2235cbaab95c27f44fafdf9f58c50349.txt`). No painel, o histórico aparece em
**IndexNow**.

## 2. Chamado à hospedagem (dono)

Texto para colar no suporte:

> Domínio innerplacement.com.br, conta cPanel s100c354. Peço duas coisas:
>
> 1. **HTTP/2 (e Brotli, se disponível).** O servidor responde só em HTTP/1.1 (`curl --http2 -I https://innerplacement.com.br/` devolve `HTTP/1.1 200`).
> 2. **Exceção no ModSecurity para robôs legítimos, sem desligá-lo no domínio.** Os User-Agents `CCBot/2.0` (Common Crawl) e `Amazonbot` recebem 406, assim como o User-Agent curto `Mozilla/5.0`. Exemplo: `curl -A "CCBot/2.0" -I https://innerplacement.com.br/` devolve 406. O `robots.txt` do site libera esses robôs. A conta não tem acesso às regras do ModSecurity no cPanel.

Como conferir depois: `curl -sI --http2 https://innerplacement.com.br/ -o /dev/null -w '%{http_version}'` deve dar `2`,
e o `curl` com `CCBot/2.0` deve dar 200.

## 3. Cadastros (sócias ou dono)

Use **exatamente** os dados abaixo em todos os cadastros. Endereço e telefone escritos de jeito diferente em cada
lugar enfraquecem a identificação da empresa pelos buscadores e pelas IAs.

| Campo | Valor |
|---|---|
| Nome | Inner Placement |
| Site | https://innerplacement.com.br/ |
| Telefone e WhatsApp | +55 11 98431-1675 |
| E-mail | contato@innerplacement.com.br |
| Matriz | Av. Tabapuã, 500, cj. 32, Itaim Bibi, São Paulo - SP, 04533-001 |
| Unidade | R. Visconde do Rio Branco, 1358, cj. 703, Centro, Curitiba - PR, 80420-210 |
| LinkedIn | https://www.linkedin.com/company/inner-placement/ |

Descrições já aprovadas (não reescrever; texto novo só com aprovação das sócias):

- **Curta** (descrição da home): "A Inner Placement é uma consultoria que apoia executivos e empresas quando uma
  trajetória precisa avançar, ajustar-se ou fazer uma transição."
- **Longa**: a resposta de "O que faz a Inner Placement?" em `src/data/faq.ts` (id `o-que-faz`), literal.
- **Números autorizados** (só estes três): +15 anos; +1500 profissionais; 86% recolocados, em média, em 4,5 meses.

Ordem sugerida:

| Onde | Por quê | Observação |
|---|---|---|
| Perfil da Empresa no Google (SP e Curitiba) | Endereço confirmado pelo Google; entra no `hasMap` do schema | Item M14 do plano |
| oHub, categoria Outplacement e Recolocação | Fonte citada em 9 das 16 respostas de IA | Perfil da empresa, não anúncio pago, para começar |
| LinkedIn da empresa | Já existe: conferir site, endereço e descrição | |
| Reclame Aqui | Aparece nas perguntas "qual contratar" | Só criar se alguém vai responder o que chegar |

Depois de cada cadastro feito, avise para incluir o link no `sameAs` do schema (hoje montado a partir de `redes`, em `src/data/site.ts`, que também aparece no rodapé; oHub e Reclame Aqui entram só no schema).
