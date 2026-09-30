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
| 2 | Home, meio: Por que a Inner, Prova, Método | H-04, H-05, H-06, números | rodada 1 em revisão |
| 3 | Home, fim e global: Perguntas, Manifesto, Fechamento | H-09, H-10, G-01 | não iniciado |
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
propostas já estão aplicadas na home dessa branch (importadas de `docs/`; vão para `imagens/` quando
aprovadas). Revisão com o HTML real: https://claude.ai/artifact/Tn4XLpFGHALBnh7ZvE2BmD

| Arquivo | Onde | Ideia |
| --- | --- | --- |
| `H04-transicao.svg` | Por que a Inner, coluna transição | A pessoa parte; a rota passa por três marcos e chega à rosácea (do primeiro encontro à recolocação) |
| `H05-crescimento.svg` | Por que a Inner, coluna crescer | Cabeça coral com anéis de impacto que se expandem, dentro de um arco (espaço reservado) |
| `H21-anos.svg`, `H22-profissionais.svg`, `H23-recolocados.svg` | Prova, acima dos números | Trajetória longa; muitas pessoas; poucos marcos até a rosácea |
| `H06-capa.svg` | Prova, capa do vídeo da Gisele | Bolas translúcidas, oval e trilha do kit, centro livre para o play; comparada com a H-06 do ChatGPT |
| `M-metodo.svg` | Método | Diagrama oficial redesenhado (mesma geometria, rótulos como texto) para animar |

Movimento: entrada genérica `data-entrada` (`.il-anim` → `.visto`), contagem `data-conta` nos números
e `data-rolagem="elemento"` no método (os círculos convergem com a rolagem). CSS "Bloco 2 ·
movimento" em `global.css`; script em `app.ts` (cópia em `tools/versao-teste.py`). Utilitário
comum para embutir SVG: `src/lib/svg.ts`.

