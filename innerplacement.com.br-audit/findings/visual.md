# Análise visual – innerplacement.com.br

Páginas: home, /para-voce/transicao-e-recolocacao/, /para-sua-empresa/outplacement/, /contato/ e o post /por-que-novos-lideres-fracassam/.
Viewports: desktop 1366x768 e mobile 390x844 (touch). Chromium headless, primeira visita, sem consentimento.
Screenshots em `screenshots/`: `<pagina>-<desktop|mobile>-atf-cookie.png` (dobra) e `-full-cookie.png` (página inteira). Páginas: home, transicao, outplacement, contato, post.
Somente leitura: o formulário não foi enviado.

## Medições
- Overflow horizontal: nenhum. `scrollWidth` é igual à largura da viewport nas 10 combinações.
- Fonte-base: 16px. O texto corrido é legível em desktop e mobile.
- Há 4 a 13 elementos de texto com fonte abaixo de 14px por página. Provavelmente são rótulos, tags e rodapé; não foram avaliados um a um.

## Critical
Nenhum.

## High
1. **O aviso de cookies cobre conteúdo e CTAs importantes (mobile).**
   - Fica fixo no rodapé, com cerca de 215px de altura (y 611 a 828 de 844), ou seja, cerca de 25% da tela. Todas as páginas mobile testadas mostraram o aviso.
   - Na home, cobre os cards "Para sua empresa" e "Para você" e os CTAs "Preparar quem precisa crescer" e "Preservar quem precisa mudar", que ficam em y~781 e y~843.
   - No /contato/, cobre os campos do formulário (a partir de "WhatsApp") e o botão Enviar.
   - Sem ação, o usuário só vê cerca de 540px de conteúdo.
   - O botão flutuante do WhatsApp (56x56, y~772) fica totalmente escondido atrás do aviso.
   - Correção: compactar o aviso no mobile, com texto de uma ou duas linhas, botões lado a lado e altura menor que 120px. Ou mostrá-lo como faixa fina e deixar "Personalizar" num modal. Reservar `padding-bottom` no `body` enquanto o aviso estiver aberto, para ele não esconder conteúdo.
   - Alternativa: elevar o botão do WhatsApp acima do aviso (`bottom` = altura do aviso + margem).

## Medium
2. **O aviso sobrepõe o botão flutuante do WhatsApp (desktop).**
   - O aviso vai até x~1243 e o botão fica em x~1230-1334, então o rótulo é cortado ("WhatsApp" aparece sem o ícone). O z-index do aviso é maior que o do botão.
   - Em desktop o aviso também cobre cerca de 110px do rodapé da dobra (y 659 a 752). Na home, o texto e a imagem dos cards ficam parcialmente cobertos; em /contato/, o botão Enviar fica meio escondido.
   - Correção: limitar a largura do aviso (`max-width` de cerca de 760px, alinhado à esquerda) ou subir o botão do WhatsApp enquanto o aviso existir.
3. **Alvos de toque pequenos no mobile (abaixo de 44px; ideal 48px).**
   - Breadcrumbs "Início" e "Para você" / "Blog": 18px de altura (e 27 a 64px de largura).
   - Links do rodapé "São Paulo" (66x20) e "Curitiba" (53x20).
   - Ícones sociais LinkedIn, Instagram, Facebook e YouTube: 36x36.
   - Links de produto "Next Level", "Transition Platinum" e "Transition Focus": 20px de altura.
   - Links "Visão geral", "Next Level" e "Transition" no rodapé: 31px de altura.
   - Links no corpo do post, como "podemos ajudar": 22px de altura.
   - O logo do topo mede 112x34. As etiquetas "PARA SUA EMPRESA" e "PARA VOCÊ" (links) têm 30px de altura.
   - O botão "Abrir menu" (48x48), os botões do aviso (44px) e o botão do WhatsApp (56x56) estão adequados.
   - Correção: aumentar a área de clique com `min-height: 44px` (ideal 48px) ou `padding` vertical, mesmo que o texto continue pequeno.
4. **No desktop, os botões de abrir submenu medem 28x28.**
   - São as setas "Abrir o submenu Para sua empresa" e "Abrir o submenu Para você". Correção: aumentar para 44x44.

## Low
5. **Páginas /para-sua-empresa/outplacement/ e /para-voce/transicao-e-recolocacao/: o H1 é apenas "Transition".**
   - O contexto ("Transitar · Outplacement", "Transição e recolocação") está num eyebrow pequeno acima. O H1 isolado diz pouco ao usuário e ao SEO.
   - O subtítulo "Quando um ciclo termina, o próximo movimento precisa ser construído." é idêntico nas duas páginas: o mesmo subtítulo na versão para pessoas e na versão para empresa. Se o texto é literal da documentação, só relatar aos sócios.
   - Nenhum CTA de conversão no conteúdo acima da dobra (só o botão do cabeçalho "Conversar com um especialista" no desktop). No mobile, esse botão não aparece sem abrir o menu. Correção: botão "Conversar com um especialista" no hero dessas páginas.
6. **Cabeçalho mobile sem CTA.** Só há logo e hambúrguer; o CTA "Conversar com um especialista" fica dentro do menu. Em páginas sem CTA no hero, o único contato visível é o WhatsApp flutuante, que o aviso esconde (item 1).
7. **Links "Pular para o conteúdo" (1x1px) fora da tela.** Isso é esperado como skip link (visível ao receber foco). Não foi verificada a aparência do foco.

## Info
- Home desktop: H1 e parágrafo introdutório visíveis, bom contraste, CTA "Conversar com um especialista" visível no cabeçalho. Os cards de segmento começam em y~535 e ficam parcialmente cobertos pelo aviso.
- Home mobile: H1 visível sem rolagem. O CTA principal do cabeçalho está só no menu hambúrguer.
- Post: imagem de capa, título, tags e metadados legíveis. A dobra no desktop é ocupada pela capa e o aviso cobre o rodapé dela. Sem sobreposição de layout.
- /contato/: formulário e botão de WhatsApp acima da dobra no desktop. Os campos têm bom contraste e rótulos visíveis.
- Os elementos SVG decorativos que ultrapassam a viewport (x>1366 e x>390) não geram rolagem horizontal. Estão contidos por `overflow` no contêiner.
- O aviso de cookies é bem escrito e tem as três opções (Personalizar, Recusar, Aceitar todos) com o mesmo destaque de tamanho (44px de altura).
- Não foram testados: tablet, o menu hambúrguer aberto, o foco de teclado e a rolagem completa de cada página (as capturas `-full-cookie.png` existem, mas não foram analisadas em detalhe).
