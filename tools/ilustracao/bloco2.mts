// Gera as propostas do bloco 2 (Por que a Inner, Prova, Método).
// Uso: node --experimental-strip-types tools/ilustracao/bloco2.mts
// Saída: docs/ilustracao/bloco-2/*.svg
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, figura, cabeca, ROSA, trilha, marco, par } from './base.mts';

const svg = (w: number, h: number, titulo: string, corpo: string, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"${extra}><title>${titulo}</title>${corpo}</svg>\n`;
// Trilha revelada por máscara (mesma técnica do hero e dos discos). `p` dá IDs únicos por peça.
const T = (p: string, id: string, d: string, cor = C.coral, op = 1, esp = 2.6, passo = 7.5, W = 200, H = 200) =>
  `<mask id="${p}-m-${id}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="${W + 40}" height="${H + 40}">`
  + `<path class="b2-desenho" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-width="${esp * 4}" stroke-linecap="round"/></mask>`
  + `<g mask="url(#${p}-m-${id})">${trilha(d, cor, op, esp, passo).replace('<path ', '<path class="b2-fluxo" ')}</g>`;

const pecas: Record<string, string> = {};

// ── Por que a Inner ────────────────────────────────────────────────────────────────────────────
// Rodada 2: sem a trilha pontilhada até a rosácea (o dono achou o motivo repetitivo) e sem halo
// (a H-05 da rodada 1 lembrava imagem religiosa). Duas opções por coluna.
const CHAO_PI = 80;
const chaoPI = `<line x1="6" y1="${CHAO_PI}" x2="162" y2="${CHAO_PI}" stroke="${C.tinta}" stroke-opacity=".14" stroke-width="1.6" stroke-linecap="round"/>`;
const bolaDefs = (p: string) => `<defs><radialGradient id="${p}-bola"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".72" stop-color="#fff" stop-opacity=".5"/><stop offset=".92" stop-color="${C.coral}" stop-opacity=".16"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".45"/></radialGradient></defs>`;

// H-04a · Duas leituras: "estratégia de mercado e leitura cuidadosa do profissional, no mesmo
// processo". Dois círculos do kit (bolas sobrepostas): o profissional, à esquerda, e o mercado, à
// direita, com a rede. A lente do encontro fica coral.
pecas['H04a-duas-leituras'] = svg(168, 88, 'Duas leituras no mesmo processo', [
  bolaDefs('h04a'),
  `<clipPath id="h04a-c"><circle cx="66" cy="44" r="34"/></clipPath>`,
  `<g class="b2-bola b2-bola-esq"><circle cx="66" cy="44" r="34" fill="url(#h04a-bola)"/></g>`,
  `<g class="b2-bola b2-bola-dir"><circle cx="104" cy="44" r="34" fill="url(#h04a-bola)"/></g>`,
  `<g class="b2-lente"><circle cx="104" cy="44" r="34" fill="${C.coral}" fill-opacity=".22" clip-path="url(#h04a-c)"/></g>`,
  `<g class="b2-rede" stroke="${C.tinta}" stroke-opacity=".35" stroke-width="1.3"><line x1="112" y1="40" x2="126" y2="28"/><line x1="112" y1="40" x2="128" y2="52"/><line x1="112" y1="40" x2="116" y2="62"/></g>`,
  `<g class="b2-rede">${cabeca(126, 28, 5, C.tinta)}${cabeca(128, 52, 5, C.ambar)}${cabeca(116, 62, 5, C.areia)}${cabeca(112, 40, 3.6, C.coral)}</g>`,
  `<g class="b2-quem">${figura(60, 72, .3, C.areia, C.tinta, 2.2)}</g>`,
].join(''));

// H-04b · Passagem: o par sai de um arco menor (o ciclo que se encerra) em direção a um arco maior
// (a nova posição). Transição acompanhada, sem trilha.
pecas['H04b-passagem'] = svg(168, 88, 'Passagem acompanhada', [
  chaoPI,
  `<g class="b2-arco-velho"><path d="M12,${CHAO_PI} V52 a18,18 0 0 1 36,0 V${CHAO_PI}" fill="${C.areia}" fill-opacity=".5"/></g>`,
  `<g class="b2-arco-novo"><path d="M110,${CHAO_PI} V38 a26,26 0 0 1 52,0 V${CHAO_PI} Z" fill="${C.coral}" fill-opacity=".18"/><path d="M110,${CHAO_PI} V38 a26,26 0 0 1 52,0 V${CHAO_PI}" fill="none" stroke="${C.coral}" stroke-width="2"/></g>`,
  `<g class="b2-quem">${par(62, CHAO_PI, .34, C.areia, C.ambar, 2.2)}</g>`,
].join(''));

// H-05a · Organograma: "impacto na organização". A estrutura da empresa em cabeças ligadas; a
// pessoa se destaca, maior e com cabeça coral, e a seta oficial da marca (pessoa_up) aponta o
// próximo nível.
pecas['H05a-organograma'] = svg(168, 88, 'Crescer dentro da organização', [
  `<g class="b2-org" stroke="${C.tinta}" stroke-opacity=".25" stroke-width="1.4" fill="none" stroke-linecap="round">`
    + `<path d="M84,14 V24 M36,24 H132 M36,24 V34 M84,24 V34 M132,24 V34"/><path d="M36,46 V54 M16,54 H56 M16,54 V60 M56,54 V60"/><path d="M132,46 V54 M112,54 H152 M112,54 V60 M152,54 V60"/></g>`,
  `<g class="b2-org">${cabeca(84, 10, 5, C.tinta)}${cabeca(36, 40, 5, C.areia)}${cabeca(132, 40, 5, C.areia)}${cabeca(16, 66, 4.4, C.areia)}${cabeca(56, 66, 4.4, C.tinta)}${cabeca(112, 66, 4.4, C.areia)}${cabeca(152, 66, 4.4, C.tinta)}</g>`,
  `<g class="b2-quem">${figura(84, 84, .3, C.coral, C.tinta, 2.2)}</g>`,
  `<g class="b2-seta" fill="none" stroke="${C.tinta}" stroke-width="2.2" stroke-linejoin="bevel"><line x1="94" y1="50" x2="108" y2="36"/><polyline points="100.5,36.5 108,36 107.5,43.5"/></g>`,
].join(''));

// H-05b · Pílulas: barras em pílula (forma do kit) que crescem, como um gráfico de carreira; a
// última é coral. A pessoa ao lado, com a seta oficial da marca.
pecas['H05b-pilulas'] = svg(168, 88, 'Crescimento profissional', [
  chaoPI,
  `<g class="b2-barras">`
    + `<rect class="b2-barra" x="74" y="54" width="16" height="26" rx="8" fill="${C.areia}"/>`
    + `<rect class="b2-barra" x="98" y="40" width="16" height="40" rx="8" fill="${C.areia}"/>`
    + `<rect class="b2-barra" x="122" y="22" width="16" height="58" rx="8" fill="${C.coral}"/></g>`,
  `<g class="b2-quem">${figura(40, CHAO_PI, .36, C.areia, C.tinta, 2.2)}</g>`,
  `<g class="b2-seta" fill="none" stroke="${C.tinta}" stroke-width="2.2" stroke-linejoin="bevel"><line x1="52" y1="38" x2="66" y2="24"/><polyline points="58.5,24.5 66,24 65.5,31.5"/></g>`,
].join(''));

// ── Prova: ícones dos números ──────────────────────────────────────────────────────────────────
// Rodada 2: cada número com um objeto próprio (o dono pediu menos bolinhas e traços). 96 × 64.
// +15 anos: um calendário com 15 casas, uma por ano; a última em coral.
pecas['N-anos'] = svg(96, 64, 'Quinze anos', [
  `<rect x="22" y="8" width="52" height="52" rx="10" fill="${C.branco}"/>`,
  `<path d="M22,18 a10,10 0 0 1 10,-10 h32 a10,10 0 0 1 10,10 v4 h-52 z" fill="${C.coral}"/>`,
  `<g stroke="${C.tinta}" stroke-width="2.4" stroke-linecap="round"><line x1="36" y1="4" x2="36" y2="12"/><line x1="60" y1="4" x2="60" y2="12"/></g>`,
  `<g class="b2-casas">${Array.from({ length: 15 }, (_, i) => { const x = 31 + (i % 5) * 8.5, y = 31 + Math.floor(i / 5) * 9; return i === 14 ? `<circle style="--i:${i}" cx="${x}" cy="${y}" r="3.2" fill="${C.coral}"/>` : `<circle style="--i:${i}" cx="${x}" cy="${y}" r="2.6" fill="${C.tinta}" fill-opacity=".75"/>`; }).join('')}</g>`,
].join(''));
// +1500: uma multidão em profundidade: ao fundo só cabeças, no meio cabeça e ombros, na frente as
// figuras inteiras. Fileiras desencontradas para não empilhar corpos sobre cabeças.
const multidao = () => {
  const cor = (i: number) => [C.branco, C.tinta, C.ambar, C.branco, C.coral, C.tinta, C.branco, C.ambar][i % 8];
  let o = `<g class="b2-fileira">`;
  for (let i = 0; i < 11; i++) o += cabeca(10 + i * 7.6, 12, 2.8, cor(i + 3));
  o += `</g><g class="b2-fileira">`;
  for (let i = 0; i < 7; i++) o += figura(14 + i * 11.4, 44, .15, cor(i + 1), C.tinta, 1.4);
  o += `</g><g class="b2-fileira">`;
  for (let i = 0; i < 5; i++) o += figura(12 + i * 18, 66, .22, cor(i), C.tinta, 1.8);
  return o + `</g>`;
};
pecas['N-pessoas'] = svg(96, 64, 'Muitas pessoas', multidao());
// 86%: gráfico de rosca que enche até 86%.
pecas['N-porcento'] = svg(96, 64, 'Oitenta e seis por cento', [
  `<circle cx="48" cy="32" r="24" fill="none" stroke="${C.branco}" stroke-width="9"/>`,
  `<circle class="b2-rosca" cx="48" cy="32" r="24" fill="none" stroke="${C.coral}" stroke-width="9" stroke-dasharray="${(2 * Math.PI * 24 * .86).toFixed(2)} ${(2 * Math.PI * 24).toFixed(2)}" transform="rotate(-90 48 32)" style="--volta:${(2 * Math.PI * 24).toFixed(2)}"/>`,
].join(''));

// ── Prova: capa de vídeo (H-06) ────────────────────────────────────────────────────────────────
// Sem figuras, com o centro livre para o play. Areia clara, bolas translúcidas do kit (bola.svg,
// bolas_sobrepostas.svg) e uma trilha que atravessa: o processo inteiro, contado por quem viveu.
// Recorte por slice: funciona de 2:1 a 16:9.
pecas['H06-capa'] = svg(520, 260, 'Capa do vídeo', [
  `<defs><radialGradient id="h06-bola"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".7" stop-color="#fff" stop-opacity=".45"/><stop offset=".92" stop-color="${C.coral}" stop-opacity=".14"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".3"/></radialGradient>`
    + `<linearGradient id="h06-oval" x1=".15" y1=".9" x2=".85" y2=".1"><stop offset="0" stop-color="#C9452F"/><stop offset=".55" stop-color="#F08A5D"/><stop offset="1" stop-color="#FCE7A6"/></linearGradient></defs>`,
  `<rect width="520" height="260" fill="${C.areiaC}"/>`,
  `<circle cx="396" cy="176" r="118" fill="url(#h06-bola)"/>`,
  `<circle cx="470" cy="96" r="84" fill="url(#h06-bola)"/>`,
  `<ellipse cx="452" cy="214" rx="46" ry="76" transform="rotate(28 452 214)" fill="url(#h06-oval)" opacity=".85"/>`,
  trilha('M-10,214 C90,214 150,170 230,160 S330,120 390,96 S460,58 530,40', C.coral, .55, 3, 12),
  `<g opacity=".9">${ROSA(62, 58, 40)}</g>`,
].join(''), ' preserveAspectRatio="xMidYMid slice"');

// H-06 sobre a miniatura do vídeo (aprovado na rodada 2: "desde que fique por cima do thumb"): sem
// fundo, formas só nas bordas, centro e rosto livres. A miniatura vem por baixo, no componente.
pecas['H06-sobre'] = svg(520, 260, 'Moldura do vídeo', [
  `<defs><radialGradient id="h06s-bola"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".7" stop-color="#fff" stop-opacity=".2"/><stop offset=".92" stop-color="${C.coral}" stop-opacity=".2"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".45"/></radialGradient>`
    + `<linearGradient id="h06s-oval" x1=".15" y1=".9" x2=".85" y2=".1"><stop offset="0" stop-color="#C9452F"/><stop offset=".55" stop-color="#F08A5D"/><stop offset="1" stop-color="#FCE7A6"/></linearGradient></defs>`,
  `<circle cx="540" cy="200" r="120" fill="url(#h06s-bola)"/>`,
  `<ellipse cx="496" cy="250" rx="40" ry="66" transform="rotate(28 496 250)" fill="url(#h06s-oval)" opacity=".9"/>`,
  trilha('M-10,246 C120,246 220,236 330,232', C.branco, .8, 3, 12),
  `<g opacity=".95">${ROSA(38, 36, 34)}</g>`,
].join(''), ' preserveAspectRatio="xMidYMid slice"');

// ── Fundos: formas da marca nas bordas das seções (rodada 2: "sinto falta de elementos no fundo") ─
pecas['F-bola'] = svg(400, 400, 'Bola translúcida', `<defs><radialGradient id="fb-g"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".7" stop-color="#fff" stop-opacity=".25"/><stop offset=".9" stop-color="${C.coral}" stop-opacity=".1"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".28"/></radialGradient></defs><circle cx="200" cy="200" r="198" fill="url(#fb-g)"/>`);
pecas['F-arcos'] = svg(400, 400, 'Arcos', `<g fill="none" stroke="${C.coral}" stroke-linecap="round">` + [180, 140, 100].map((r, i) => `<path d="M${200 - r},400 V${400 - r * 1.1} a${r},${r} 0 0 1 ${2 * r},0 V400" stroke-width="${1.6}" stroke-opacity="${[.22, .3, .4][i]}"/>`).join('') + `</g>`);
pecas['F-setas'] = svg(240, 120, 'Chevrons', `<defs><pattern id="fs-p" width="16" height="20" patternUnits="userSpaceOnUse"><path d="M5,4 L11,10 L5,16" fill="none" stroke="${C.coral}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></pattern></defs><rect width="240" height="120" fill="url(#fs-p)"/>`);
pecas['F-oval'] = svg(200, 280, 'Oval', `<defs><linearGradient id="fo-g" x1=".15" y1=".9" x2=".85" y2=".1"><stop offset="0" stop-color="#C9452F"/><stop offset=".55" stop-color="#F08A5D"/><stop offset="1" stop-color="#FCE7A6"/></linearGradient></defs><ellipse cx="100" cy="140" rx="70" ry="120" transform="rotate(27 100 140)" fill="url(#fo-g)"/>`);

// ── Método: o diagrama oficial redesenhado ─────────────────────────────────────────────────────
// Mesma geometria do SVG oficial (metodologia.svg): quatro círculos de raio 84,8 com centros em
// (138,1 | 275,5) × (90,6 | 204,4), eixos em x = 206,8 e y = 147,6, objetivo coral no centro.
// Rótulos como texto real (fonte do site), não como curvas.
const MX = 206.8, MY = 147.6, R = 84.8;
const dims: [string, number, number, string[], number, number][] = [
  ['ambiente', 138.1, 90.6, ['AMBIENTE', 'E CULTURA'], -1, -1],
  ['contexto', 275.5, 90.6, ['CONTEXTO', 'INDIVIDUAL'], 1, -1],
  ['potencial', 138.1, 204.4, ['POTENCIAL', 'E RECURSOS'], -1, 1],
  ['cenario', 275.5, 204.4, ['CENÁRIO', 'FUTURO'], 1, 1],
];
pecas['M-metodo'] = svg(412.79, 295.26, 'Diagrama do método', [
  `<defs><radialGradient id="met-bola"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".76" stop-color="#fff" stop-opacity=".18"/><stop offset=".88" stop-color="${C.coral}" stop-opacity=".12"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".38"/></radialGradient></defs>`,
  `<g class="met-eixos" stroke="${C.coral}" stroke-opacity=".45" stroke-width=".8"><line x1="${MX}" y1="0" x2="${MX}" y2="295.26"/><line x1="0" y1="${MY}" x2="412.79" y2="${MY}"/></g>`,
  ...dims.map(([id, cx, cy, [l1, l2], sx, sy]) => {
    const tx = cx, ty = cy;  // rótulo centralizado no círculo: as duas linhas ficam em volta do centro
    return `<g class="met-bola met-${id}" style="--dx:${sx};--dy:${sy}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#met-bola)" stroke="${C.coral}" stroke-opacity=".28" stroke-width=".8"/>`
      + `<text x="${tx}" y="${ty - 2}" text-anchor="middle" font-size="9.6" letter-spacing=".1" fill="${C.tinta}"><tspan x="${tx}">${l1}</tspan><tspan x="${tx}" dy="10.5">${l2}</tspan></text></g>`;
  }),
  `<g class="met-objetivo"><circle cx="${MX}" cy="${MY}" r="41" fill="${C.coral}"/><text x="${MX}" y="${MY + 3.3}" text-anchor="middle" font-size="9.6" letter-spacing=".1" fill="${C.tinta}">OBJETIVO</text></g>`,
].join(''), ' font-family="Hanken Grotesk, sans-serif"');

const dir = new URL('../../docs/ilustracao/bloco-2/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, conteudo] of Object.entries(pecas)) {
  writeFileSync(new URL(`${nome}.svg`, dir), conteudo);
  console.log(`${nome}.svg  ${(conteudo.length / 1024).toFixed(1)} KB`);
}
