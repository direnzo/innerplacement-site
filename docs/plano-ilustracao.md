# Plano de ilustração · site v2

Decisão do dono em 29/09/2026: seguir o caminho **híbrido** e trabalhar **por blocos**, seção por
seção. Este documento registra o porquê, a divisão de trabalho e o estado de cada bloco. O
`docs/guia-imagens.md` continua valendo para códigos (H-xx, P-xx, G-xx), mapa de espaços,
especificações técnicas e checklist. O que muda é **quem desenha o quê**.

## Por que mudar

Diagnóstico feito sobre as 8 peças aprovadas no ChatGPT e a P-03 pendente (export de 29/09 19:39):

- **Fora da marca.** As peças usam azul (fora da paleta), brilho e névoa de pôr do sol, colinas em
  degradê, skyline genérico e silhuetas de pictograma. A Figura Inner, a rosácea, os ovais e a
  trilha pontilhada, que são a assinatura da folha de referência, quase não aparecem. A P-02 se
  aproxima da "escada para o céu" que o guia proíbe.
- **Repetição.** A G-01 é quase igual à H-02/H-03, e a P-01 é quase igual à H-01.
- **Conceitos possivelmente trocados.** Os hashes batem com o registro da conversa, mas o arquivo
  registrado como H-01 mostra "duas figuras caminhando ao horizonte" (conceito da G-01), e o
  registrado como G-01 mostra a bifurcação (conceito da H-01). Hipótese, não confirmada.
- **Especificação técnica.** Várias peças saíram em 2048 × 768 (2,67:1, não 16:9). H-01, H-04 e
  G-01 vieram sem fundo transparente. Todas são PNGs de 1,2 a 1,9 MB (o limite é 60 a 120 KB).
- **Causa raiz.** O guia fixa a marca (paleta, figura) mas manda não anexar a folha de referência
  nas cenas, e os prompts de cena pedem ambientes fotográficos (mezanino, café, sala de diretoria)
  enquanto o mapa pede conceitos gráficos (arco, rosácea, trilha). Sem âncora, o gerador caiu no
  estilo genérico de IA; com 74 peças no plano, o desvio se multiplicou.

As 8 peças continuam em `imagens/` com status de aprovadas. Manter, ajustar ou substituir cada uma
é decisão do dono, peça a peça, conforme o bloco dela for revisado.

## Divisão de trabalho

| Tipo de peça | Como nasce | Onde fica a fonte |
| --- | --- | --- |
| Ilustrações de painel, ícones, cantos, padrões | SVG desenhado no código a partir do kit oficial: Figura Inner, par entrelaçado, rosácea, ovais, trilha pontilhada coral, só as seis cores | `tools/ilustracao/*.mts` gera os SVGs |
| Peças de atmosfera (capas de vídeo H-06 e G-02, texturas H-07 e H-08) | IA (ChatGPT, Gemini ou Firefly), com a folha de referência anexada e prompt fechado na paleta | `imagens/` + `.txt`, como no guia |
| Imagens de compartilhamento (G-03, G-05) | Montagem com o SVG da página + logo oficial | a definir no bloco 5 |

Vantagens do SVG: paleta exata, poucos KB (cabe no limite de 60 KB com folga), editável depois,
e todas as peças saem da mesma família porque usam as mesmas funções de desenho.

### Gradientes e sombras (decisão do dono, 30/09)

A partir do bloco 3, gradientes **e sombras** são permitidos, de forma **sutil e moderada**. Sombras
com `feDropShadow` de baixa opacidade (≈ .14–.35), sempre com IDs prefixados por peça. Continua fora:
brilho de luz forte, 3D e névoa.

### Degradês e transparências (decisão do dono, 29/09)

Podem entrar, **de forma equilibrada e sutil**, sempre dentro da paleta. Isso ajusta o item
"nenhuma sombra, brilho ou efeito 3D" do checklist do guia: degradês e transparências dos grafismos
oficiais são permitidos; sombra projetada, brilho de luz, 3D e névoa continuam fora.

Os efeitos são recriados com degradês nativos em `tools/ilustracao/` (função `fx`), e não colados
dos arquivos originais: os SVGs do Illustrator usam máscaras e IDs genéricos (`#d`, `#e`…) que
colidem quando várias peças ficam na mesma página. Cada ID leva o prefixo da peça.

### Grafismos do site antigo aproveitáveis

Fontes: `imagens/apoio/` (kit do Drive, local) e `~/projetos/innerplacement/wp-content/uploads/2025/`.

| Grafismo | Arquivo de origem | Uso previsto |
| --- | --- | --- |
| Bola translúcida (centro claro, borda coral) | `bola.svg`, `bola_fundo.svg` | Destaque atrás da rosácea ou de um marco |
| Bolas sobrepostas | `bolas_sobrepostas.svg` | Duas leituras que se encontram (H-07, Método) |
| Oval em degradê coral → âmbar | `oval_gradiente.svg`, `botão_seta.svg` | Ponto de partida, acento de movimento |
| Oval transparente | `oval_transparente.svg` | Fundo leve de cartões |
| Arco em degradê (transparente → coral) | `fundo-foto.png`, `mask2.svg` (WordPress) | Lugar de partida, moldura |
| Barra em degradê | `barra_gradiente.svg`, `card_degrade.svg` | Faixas e cartões |
| Fio que esmaece | `menu.svg` | Chão, divisores |
| Chevrons | `setas_grafismo.svg`, `setas_laranja.png`, `setas_amarela.png` | Faixa de movimento, padrão G-06/G-07 |
| Ritmo de ovais | `bolas.svg`, `destravar.svg`, `bolas_tit.png` | Divisor, ritmo sob títulos |
| Cartões com figuras | `carreira_transição.svg`, `desenvolvimento.svg`, `reinserção.svg`, `sucessão.svg` | Referência de composição para P-01 a P-04 |

As fotos do WordPress (`Asset-*.png`, `para-empresas-1.png` etc.) são banco de imagens e ficam de
fora, como o guia pede.

## Blocos

| Bloco | Seções | Peças centrais | Estado |
| --- | --- | --- | --- |
| 1 | Home, primeira tela: Hero e Caminhos | H-01, H-02/H-03 | concluído (29/09), no site com movimento |
| 2 | Home, meio: Por que a Inner, Prova, Método | H-04, H-05, H-06, números | concluído (30/09), no site com movimento |
| 3 | Home, fim e global: Perguntas, Manifesto, Fechamento | H-09, H-10, G-01 | concluído (30/09), no site com movimento |
| 4 | Topos das páginas de serviço | P-01 a P-04 | concluído (01/10), no site com movimento |
| 5 | Demais páginas e compartilhamento | P-05 a P-09, G-03, G-05 | concluído (01/10) |
| 6 | Topos dos hubs e da Executive Alignment | P-12 a P-14 | concluído (08/11) |

As outras 50 peças do "plano completo" do guia (ícones de etapa, padrões) entram só onde um bloco
mostrar que fazem falta.

## Fluxo de cada bloco

1. Branch própria: `imagens/bloco-<n>-<assunto>`.
2. Propostas geradas por `tools/ilustracao/`, salvas em `docs/ilustracao/bloco-<n>/`.
3. Comparação no layout real (computador e celular) numa página publicada, ao lado do que está no
   site hoje e da peça de IA correspondente, se houver.
4. O dono escolhe ou pede ajuste. Só depois da escolha a peça vai para o site
   (`src/pages/…` ou componente) e para `imagens/` como `inner-<código>-<assunto>-v<n>.svg` + `.txt`.
5. Merge na `main` ao fechar o bloco.

## Bloco 1 · Hero e Caminhos

Branch `imagens/bloco-1-hero`. Gerador: `tools/ilustracao/hero.mts`
(`node --experimental-strip-types tools/ilustracao/hero.mts`). Painel do hero com viewBox
496 × 280, o mesmo de `src/pages/index.astro`.

- **Rodada 1:** três ideias, A (dois caminhos, uma chegada), B (caminhar junto) e C (rede). O dono
  escolheu a **A**. B e C estão no histórico do git (commit `fd3f4b3`).
- **Rodada 2:** a A em quatro intensidades de degradê e transparência (A0 plana, A1 sutil,
  A2 equilibrada, A3 rica). O dono ficou com a **A0 plana**. A1 a A3 estão no histórico (commit
  `76953eb`); os efeitos continuam disponíveis na função `fx` do gerador para outros blocos.
- **Rodada 3:** A0 com o nó de network da antiga B nos dois caminhos (marco cheio e três cabeças
  ligadas por traço fino), em `docs/ilustracao/bloco-1/`:

| Arquivo | O que tem |
| --- | --- |
| `H01-a0-rede.svg` | A0 com um nó de network em cada caminho (proposta atual) |
| `H01-a0-plana.svg` | A0 com marcos vazios, para comparação |

- **Aprovada:** a A0 com rede virou `imagens/inner-H01-hero-v4.svg` (+ `.txt`) e entrou no hero de
  `src/pages/index.astro`, importada como texto (`?raw`) e embutida inline.
- **Chips do hero:** no celular, "até acontecer" quebrava para uma segunda linha e perdia a relação
  com a ilustração. Agora os três ficam sempre numa linha, alinhados à esquerda, ao centro e à
  direita, com a fonte escalando pela largura do painel (container query): 13 px no computador,
  cerca de 11 px em 360–375 px e 9,5 px em 320 px. A regra fica só no hero; a classe `.chip`
  global (usada em Depoimentos e FAQ) não mudou.

- **Movimento (rodada 4):** entrada de ~2 s ao abrir a página (o par aparece, as trilhas se
  desenham por máscara, os nós surgem quando a trilha passa, a rosácea floresce) com os chips
  acendendo em sincronia; e movimento ligado à rolagem (os pontos correm para a rosácea, que gira até
  90°, e o par avança 14 px). CSS em `src/styles/global.css` ("Hero · movimento"), rolagem em
  `src/scripts/app.ts` (atributo `data-rolagem`, variável `--rolagem`), cópia do script em
  `tools/versao-teste.py`. O gerador marca as partes com classes `h01-*`. Sem animação ou com
  "reduzir movimento", a peça aparece completa e parada.

### Caminhos (H-02, H-03)

Gerador: `tools/ilustracao/caminhos.mts`. As primitivas comuns (figura, par, trilha, marco,
rosácea) passaram para `tools/ilustracao/base.mts`, usado pelos dois geradores; o hero sai idêntico.
Discos em viewBox 100 × 100, com chão invisível em y = 84 para as figuras ficarem inteiras no recorte
circular (88 px no computador, 56 px no celular). Cada disco desenha os dois links do cartão: um
caminho que sobe (crescer) e um que sai (transição).

| Arquivo | Ideia |
| --- | --- |
| `H02-a-dois-caminhos.svg` | Para você: uma pessoa; trilha coral sobe à rosácea, trilha tinta sai pela borda (aprovada) |
| `H03-b-grupo.svg` | Para sua empresa: uma pessoa sobe, o par sai acompanhado (aprovada; a versão com arco está no histórico, commit `3e1e3db`) |

Aprovadas como `imagens/inner-H02-para-voce-v1.svg` e `imagens/inner-H03-para-empresa-v1.svg`, embutidas
em `src/components/Caminhos.astro`. Movimento no site: CSS "Caminhos · movimento" em `global.css`,
script em `app.ts` (e cópia em `tools/versao-teste.py`). Os links têm `data-cam="sobe|sai"` e o
cartão, `data-cartao`. Keyframes comuns ao hero e aos discos: `il-*`.

Lição técnica: `transform-box: fill-box` só nas peças que giram ou crescem pelo centro. Aplicado a
todos os elementos, desloca os que são desenhados com o atributo `transform` (o par entrelaçado).

Movimento: entrada quando o disco aparece na tela (IntersectionObserver) e destaque da
trilha correspondente ao passar o mouse ou focar um link do cartão. Comparação:
https://claude.ai/artifact/6ZMBiH4u7yj1Ukjy3pZPno

Padrão para os próximos blocos: a mesma técnica (classes na peça, entrada curta, `data-rolagem`
para o movimento contínuo) serve para as outras ilustrações, sem biblioteca.

Comparação no layout: https://claude.ai/artifact/JRSHwhqaZ7SeksikQWVBh3

Próximos passos do bloco: escolha da intensidade → mesma linguagem nos discos de Caminhos (H-02, H-03) →
encaixe no site → merge.

## Bloco 2 · Por que a Inner, Prova e Método

Branch `imagens/bloco-2`. Gerador: `tools/ilustracao/bloco2.mts` → `docs/ilustracao/bloco-2/`. As
propostas estão aplicadas na home dessa branch (importadas de `docs/`; vão para `imagens/` quando
aprovadas). Revisão com o HTML real: https://claude.ai/artifact/Tn4XLpFGHALBnh7ZvE2BmD

### Feedback do dono na rodada 1 (30/09) — vale para os próximos blocos

- **Trilha pontilhada subindo até a rosácea já está repetitiva.** Usar só onde conta um percurso
  (hero, discos); buscar outros motivos nas demais peças.
- **Nada que lembre halo ou imagem religiosa** (anéis em volta da cabeça).
- **Ícones de números com objeto próprio**, não variações de bolinhas e traços: calendário para
  anos, multidão para pessoas, gráfico para porcentagem.
- **Mais elementos no fundo**, preenchendo as bordas das seções, de forma sutil.
- Aprovados na rodada 1: a capa de vídeo em SVG (**desde que fique por cima da miniatura real do
  vídeo**) e a animação do método (com ajustes: maior, sem corte, rótulos centralizados).

### Rodada 2

| Arquivo | Onde | Ideia |
| --- | --- | --- |
| `H04a-duas-leituras.svg` (na home) / `H04b-passagem.svg` | Por que a Inner, transição | Profissional e mercado em círculos que se sobrepõem / o par passa de um arco menor para um maior |
| `H05b-pilulas.svg` (na home) / `H05a-organograma.svg` | Por que a Inner, crescer | Pílulas que crescem, com a seta da marca / a pessoa se destaca no organograma |
| `N-anos.svg`, `N-pessoas.svg`, `N-porcento.svg` | Prova, números (centralizados) | Calendário de 15 casas; multidão em três fileiras; rosca de 86% |
| `H06-capa.svg` / `H06-sobre.svg` | Prova, vídeo | Capa inteira (sem miniatura) / moldura sobre a miniatura (`DepoVideo` aceita `thumb`) |
| `F-bola.svg`, `F-arcos.svg`, `F-setas.svg`, `F-oval.svg` | Fundos das seções | Formas da marca nas bordas, com leve deslocamento na rolagem (`.fundo-par`) |
| `M-metodo.svg` | Método | Diagrama redesenhado; maior, `overflow: visible`, rótulos no centro da área livre |

### Rodada 3 (30/09)

O dono escolheu **H-04b (passagem)** e **H-05a (organograma)**, maiores e com o selo e o título ao
lado da ilustração (no celular, ilustração menor e selo podendo quebrar linha). Aprovou os ícones
dos números e as formas de fundo. Rótulos do método passam a ficar no centro exato de cada círculo.

Clientes: selo "Clientes" (texto novo, **aprovado pelo dono em 30/09**), entrada em sequência e hover
(cartão sobe, fica branco com contorno coral; o logo não muda de cor, por ser marca de terceiro).

Movimento: entrada genérica `data-entrada` (`.il-anim` → `.visto`), contagem `data-conta`,
`data-rolagem="elemento"` (método e fundos). CSS "Bloco 2 · movimento" em `global.css`; script em
`app.ts` (cópia em `tools/versao-teste.py`). Utilitário para embutir SVG: `src/lib/svg.ts`.

### Fechamento (30/09)

Aprovadas e copiadas para `imagens/` (com `.txt`): `inner-H04-passagem-v1`, `inner-H05-organograma-v1`,
`inner-H06-capa-video-v2`, `inner-H06-moldura-video-v1`, `inner-H21-calendario-v1`,
`inner-H22-multidao-v1`, `inner-H23-rosca-v1`, `inner-M01-metodo-v1` e as formas de fundo
`inner-F01-bola-v1` a `inner-F04-oval-v1` (família F, nova: fundos das seções). A home importa
de `imagens/`.

## Bloco 3 · Perguntas, Manifesto e Fechamento

Branch `imagens/bloco-3`. Gerador: `tools/ilustracao/bloco3.mts` → `docs/ilustracao/bloco-3/`.
Aplicadas na home da branch: H-09, H-10 A e G-01 A. Revisão com o HTML real (e as opções B vivas):
https://claude.ai/artifact/7gSD6DVxuFBeRRyijJTVRe

| Arquivo | Onde | Ideia |
| --- | --- | --- |
| `H09-baloes.svg` | Perguntas, ao lado do título (acima, no computador) | Dois balões: a pergunta (branco) e a resposta chegando (coral, pontinhos "digitando") |
| `H10a-oval-lapidado.svg` (na home) / `H10b-pedra-revela.svg` | Manifesto | A pedra facetada vira o oval liso com a rolagem ("lapidamos") / a pedra se abre e revela a rosácea |
| `G01a-conversa.svg` (na home) / `G01b-encontro.svg` | Fechamento, todas as páginas | Duas figuras frente a frente com os balões / duas bolas que se encontram e fazem nascer a rosácea |

Movimento: balões e encontro por `data-entrada`; manifesto por `data-rolagem="elemento"`; os
pontinhos do balão coral "digitam" em ciclo. CSS "Bloco 3 · movimento" em `global.css`.

### Fechamento do bloco 3 (30/09)

Escolhas do dono: manifesto **A** (com a rosácea em **branco**, porque em coral sobre o oval coral
ela não destacava) e fechamento **A**. Aprovadas em `imagens/`: `inner-H09-baloes-v1`,
`inner-H10-oval-lapidado-v1`, `inner-G01-conversa-v2`. `ROSA()` em `base.mts` ganhou o parâmetro
`cor` (os blocos 1 e 2 saem idênticos).

**Próxima frente pedida pelo dono:** um ícone junto a cada título de seção, no formato do H-09
(objeto próprio, ao lado do título, entrada animada), revisando todos os títulos do site.

## Ícones de título e hover (30/09)

Branch `imagens/titulos-e-hover`. Pedidos do dono: um ícone junto a cada título (formato do H-09),
um pequeno gesto de hover em toda ilustração animada e o trecho em negrito dos títulos em coral no
hover. Revisão (home inteira): https://claude.ai/artifact/6duhBb51AQ78Nf6k3Gc6aJ

- Gerador `tools/ilustracao/titulos.mts` → `docs/ilustracao/titulos/`: `T-porque` (plano com checklist
  e o par num selo), `T-prova` (balão de depoimento com aspas e play), `T-metodo` (lupa sobre as quatro
  dimensões), `T-clientes` (cartões de empresa). Componente `src/components/ComIcone.astro`.
- Hover (CSS "Títulos · movimento", só com `@media (hover: hover)`): gesto geral (escala e leve
  inclinação) e gestos próprios. A rosácea agora vem num grupo `.ros` (em `base.mts`), girável sem
  conflitar com a entrada; as peças aprovadas foram ressincronizadas com
  `tools/ilustracao/sincronizar.py`, que copia de `docs/` para `imagens/` guiado pelo `.txt`.
- Teste: o Chromium sem tela se declara sem mouse; para testar hover, iniciar com
  `--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4`.
- Rodada 1 (home: T-porque, T-prova, T-metodo, T-clientes) e os hovers: **aprovados pelo dono**.
- Rodada 2: 9 ícones para os 11 títulos internos (Transição e Crescimento se repetem em Depoimentos e
  FAQ): `T-platinum`, `T-focus`, `T-nextlevel` (no componente `Programa`, pelo nome), `T-transicao`,
  `T-outplacement`, `T-crescimento` (Depoimentos), `T-comecar`, `T-empresas`, `T-investimento` (FAQ).
  Nas seções sobre fundo areia, o claro dos ícones é branco. Galeria: https://claude.ai/artifact/839R5uwB3J52obixydfz1N
- Rodada 3 (30/09): o par do `T-porque` maior e centralizado no selo. **Logotipo dos programas**
  (pedido do dono: trazer de volta, modernizado, o efeito dos logos antigos com o texto sobre a
  rosácea): o nome em texto real sobre a rosácea, com `mix-blend-mode: multiply` (classe
  `.prog-logo` em `global.css`). Variação por público, como no site antigo: `Programa para="pessoa"`
  (Transição, Carreira: texto tinta, rosácea coral) e `para="empresa"` (Outplacement, Executivos:
  texto coral, rosácea tinta translúcida). **Sem os sufixos "Corporate"/"Executivo"**: a documentação
  funcional tirou "Next Level Corporate" e "Go Fast" dos nomes. Referência: os logos antigos em
  `~/projetos/innerplacement/wp-content/uploads/2025/0{4,5}/` (`*_logo.png`, `emp-*.png`, `dep_*.png`).
- **Fechamento (30/09):** os 13 ícones aprovados em `imagens/inner-T-<assunto>-v1.svg` (+ `.txt`); as
  páginas importam de `imagens/`. Logotipo dos programas e hovers aprovados.

## Bloco 4 · Topos das páginas de serviço

Branch `imagens/bloco-4`. Gerador: `tools/ilustracao/bloco4.mts` → `docs/ilustracao/bloco-4/`. Cenas
420 × 300 à direita do título; o componente `TopoPagina` recebe `ilustracao` (no celular a cena some,
como no guia). Revisão: https://claude.ai/artifact/K725qBf6gcdaqEkw9t8sZx

| Arquivo | Página | Cena |
| --- | --- | --- |
| `P01-transicao.svg` | Transição e Recolocação | Arco-portal coral com a rosácea branca (nova posição), o par caminhando até ele, cartão de plano com checklist |
| `P02-carreira.svg` | Desenvolvimento de Carreira | A organização em cabeças; a pessoa sobre um pilar coral, com a seta da marca |
| `P03-executivos.svg` | Desenvolvimento de Executivos | Empresa (prédio), executivo num patamar coral e Inner (rosácea), ligados por um arco: objetivo alinhado a três |
| `P04-outplacement.svg` | Outplacement | Prédio com a porta aberta e a luz coral saindo; o par sai acompanhado rumo ao horizonte |

Movimento: entrada por `data-entrada`; hover com gestos (CSS "Bloco 4 · movimento").

## Ferramenta de verificação no navegador

`tools/navegador.mjs` (Chromium via DevTools Protocol): rola, passa o mouse, mede e fotografa em tempo
real. Para testar hover, `HOVER=1` (o Chromium sem tela se declara sem mouse). Ex.:
`HOVER=1 node tools/navegador.mjs http://localhost:4399/ /tmp/foto 1280 800 '[{"hover":".topo-ilus","foto":"a"}]'`.

Fechamento do bloco 4 (01/10): aprovadas na rodada 1, sem ajustes; a cena continua oculta no celular.
Em `imagens/`: `inner-P01-topo-transicao-v2`, `inner-P02-topo-carreira-v2`, `inner-P03-topo-executivos-v1`,
`inner-P04-topo-outplacement-v1`.

## Bloco 5 · Topos das demais páginas (P-05 a P-09)

Branch `imagens/bloco-5-topos`. Gerador: `tools/ilustracao/bloco5.mts` → `docs/ilustracao/bloco-5/`
(usa os auxiliares `sombra`, `coralV`, `bolaG` e `checkCoral`, acrescentados a `base.mts`).
Revisão: https://claude.ai/artifact/FCC8h1mebs8HDjhceGQRDB

| Arquivo | Página | Onde | Cena |
| --- | --- | --- | --- |
| `P05-depoimentos.svg` | Depoimentos | Topo comum | Vídeo com play e balões; num deles, gráfico que desce e sobe (a parte difícil) |
| `P06-faq.svg` | Perguntas frequentes | Topo comum | Acordeões empilhados e balão coral de conversa |
| `P07-manifesto.svg` | Manifesto | Coluna do título, fixa (sticky) no computador | Rosácea grande e o par caminhando até ela |
| `P08-contato.svg` | Contato | Abaixo dos contatos, no computador | Envelope aberto, carta com a rosácea, cadeado da privacidade |
| `P09-obrigado.svg` | Agradecimento | À direita da mensagem | Envelope com selo de confirmação e a rosácea |

`TopoPagina` com ilustração: altura mínima de 380 px (a cena cabe inteira) e reserva à direita também
no computador (antes ia a zero a partir de 1024 px e as etiquetas do FAQ passavam por baixo da cena).

Fechamento dos topos do bloco 5 (01/10): aprovados na rodada 1, sem ajustes. Em `imagens/`:
`inner-P05-topo-depoimentos-v1`, `inner-P06-topo-faq-v1`, `inner-P07-manifesto-v1`, `inner-P08-contato-v1`,
`inner-P09-obrigado-v1`.

## Bloco 5 · Imagens de compartilhamento (G-03, G-05)

Branch `imagens/compartilhamento`. Gerador: `tools/compartilhamento.mts` → `public/og/<página>.jpg`
(1200 × 630, JPG, 32–40 KB). Modelo único, renderizado pelo Chromium (fonte Hanken Grotesk): logo
oficial do kit, título exato da página (o mesmo do `<Base titulo>`), selo "Consultoria de carreira · até
acontecer" afastado do logo, endereço e a ilustração aprovada da página. Ao mudar uma ilustração ou um
título, rode o gerador de novo. Revisão: https://claude.ai/artifact/EPRZ6sngWe4DoJcLHDfGKo

**Aprovadas pelo dono em 01/10.** Com isso, os cinco blocos do plano de ilustração estão concluídos.

- `Base.astro`: `og:image` (+ largura, altura, alt), `og:site_name` e `twitter:card`. O Agradecimento
  usa a imagem da home.
- `tools/build-v2-teste.py`: `og:url` e `og:image` apontam para a `/v2-teste/` na versão de teste.

## Quem somos e formas de fundo em todas as páginas (01/10)

- Página Quem somos aprovada: conteúdo literal do WordPress, topo P-10 (trio de sócios), fotos com o arco
  em degradê coral do site antigo (sem o contêiner areia, para funcionar sobre qualquer fundo), frase de
  cada sócio numa moldura com a rosácea cortada no canto, botão do LinkedIn em pílula coral.
- **Formas de fundo em todas as páginas** (pedido do dono): `Base.astro` põe as quatro formas (F-01 a F-04)
  nas bordas de toda página, via `src/components/FormaFundo.astro`; a home usa `fundo={false}` porque tem as
  suas, posicionadas à mão. O `<main>` recorta as formas (`overflow: clip`).
- `.bloco` passou a usar `overflow: clip` (antes `hidden`): `hidden` desligava o `position: sticky` da
  ilustração do Manifesto.

## Bloco 6 · Topos dos hubs e da Executive Alignment (P-12 a P-14)

Branch `imagens/bloco-6-publicos`. Gerador: `tools/ilustracao/bloco6.mts` → `docs/ilustracao/bloco-6/`, duas ideias por
página, com os ganchos `p-*` do bloco 4. Revisão: https://claude.ai/artifact/EVVsmED7Syx8mhhVtCnWR8

| Arquivo | Página | Ideia |
| --- | --- | --- |
| `P12a-empresa-tres-momentos.svg` / `P12b-empresa-quadro.svg` | Para sua empresa | A empresa e os três momentos à frente / três cartões de situação |
| `P13a-voce-dois-movimentos.svg` / `P13b-voce-bussola.svg` | Para você | A pessoa entre o pilar e o arco / bússola com a rosácea |
| `P14a-alignment-realinhar.svg` / `P14b-alignment-nivel.svg` | Executive Alignment | O executivo volta à linha do grupo / nível de bolha entre empresa e Inner |

Fechamento (08/11): o dono escolheu **P12a** (Para sua empresa), **P13b** (Para você) e **P14b** (Executive Alignment), sem ajustes. Em `imagens/`: `inner-P12-topo-empresa-v1`, `inner-P13-topo-voce-v1`, `inner-P14-topo-executive-alignment-v1`.
