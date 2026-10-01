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
| 4 | Topos das páginas de serviço | P-01 a P-04 | não iniciado |
| 5 | Demais páginas e compartilhamento | P-05 a P-09, G-03, G-05 | não iniciado |

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

