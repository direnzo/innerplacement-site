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

## Blocos

| Bloco | Seções | Peças centrais | Estado |
| --- | --- | --- | --- |
| 1 | Home, primeira tela: Hero e Caminhos | H-01, H-02/H-03 | em andamento |
| 2 | Home, meio: Por que a Inner, Prova, Método | H-04, H-05, H-06, números | não iniciado |
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
(`node --experimental-strip-types tools/ilustracao/hero.mts`). Propostas para o painel do hero
(viewBox 496 × 280, o mesmo de `src/pages/index.astro`):

| Arquivo | Ideia |
| --- | --- |
| `docs/ilustracao/bloco-1/H01-a-dois-caminhos.svg` | Do mesmo ponto saem crescer (trilha coral, sobe) e transição (trilha tinta, avança); as duas chegam à rosácea; o par entrelaçado parte junto |
| `docs/ilustracao/bloco-1/H01-b-caminhar-junto.svg` | Uma trilha com os três marcos dos chips (posicionamento, network ativado, até acontecer), o par entrelaçado caminhando junto |
| `docs/ilustracao/bloco-1/H01-c-rede.svg` | Figura em destaque sobre círculo claro, a rede ativada em volta e a trilha até a rosácea |

Comparação no layout: https://claude.ai/artifact/JRSHwhqaZ7SeksikQWVBh3

Próximos passos do bloco: escolha do hero → mesma linguagem nos discos de Caminhos (H-02, H-03) →
encaixe no site → merge.
