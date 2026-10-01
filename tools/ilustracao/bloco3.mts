// Gera as propostas do bloco 3 (Perguntas, Manifesto, Fechamento).
// Uso: node --experimental-strip-types tools/ilustracao/bloco3.mts
// Saída: docs/ilustracao/bloco-3/*.svg
// A partir deste bloco (decisão do dono, 30/09): gradientes e sombras permitidos, de forma sutil e
// moderada. Sombras com feDropShadow de baixa opacidade; IDs sempre com o prefixo da peça.
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, figura, cabeca, ROSA } from './base.mts';

const svg = (w: number, h: number, titulo: string, corpo: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><title>${titulo}</title>${corpo}</svg>\n`;
const sombra = (id: string, dy = 4, desvio = 5, op = .14, cor = C.tinta) =>
  `<filter id="${id}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${desvio}" flood-color="${cor}" flood-opacity="${op}"/></filter>`;
const degradeOval = (id: string, u = '') => `<linearGradient id="${id}" x1=".15" y1=".9" x2=".85" y2=".1"${u}><stop offset="0" stop-color="#C9452F"/><stop offset=".55" stop-color="#F08A5D"/><stop offset="1" stop-color="#FCE7A6"/></linearGradient>`;
// Balão de conversa: retângulo bem arredondado com rabicho na base (esquerda ou direita).
const balao = (x: number, y: number, w: number, h: number, lado: 'e' | 'd', fill: string, extra = '') => {
  const r = h / 2, tx = lado === 'e' ? x + r * .7 : x + w - r * .7, dir = lado === 'e' ? -1 : 1;
  return `<path d="M${x + r},${y} H${x + w - r} A${r},${r} 0 0 1 ${x + w - r},${y + h} H${tx + dir * 2} `
    + `Q${tx + dir * 4},${y + h + 9} ${tx + dir * 12},${y + h + 11} Q${tx - dir * 2},${y + h + 6} ${tx - dir * 6},${y + h} `
    + `H${x + r} A${r},${r} 0 0 1 ${x + r},${y} Z" fill="${fill}"${extra}/>`;
};
const pontos = (cx: number, cy: number, cor: string, cls = 'b3-ponto') =>
  [-10, 0, 10].map((d, i) => `<circle class="${cls}" style="--i:${i}" cx="${cx + d}" cy="${cy}" r="3.2" fill="${cor}"/>`).join('');

const pecas: Record<string, string> = {};

// ── H-09 · Perguntas: "antes de conversar, o que costumam perguntar" ────────────────────────────
// Dois balões: a pergunta (branco, sombra suave) e a resposta chegando (coral em degradê, com os
// pontinhos de "digitando").
pecas['H09-baloes'] = svg(140, 104, 'Uma conversa começando', [
  `<defs>${sombra('h09-s')}<linearGradient id="h09-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A7E"/><stop offset="1" stop-color="${C.coral}"/></linearGradient></defs>`,
  `<g class="b3-balao b3-balao-1" filter="url(#h09-s)">${balao(8, 12, 92, 34, 'e', C.branco)}<g fill="${C.areia}"><rect x="24" y="23" width="44" height="5" rx="2.5"/><rect x="24" y="32" width="28" height="5" rx="2.5"/></g></g>`,
  `<g class="b3-balao b3-balao-2" filter="url(#h09-s)">${balao(44, 54, 84, 34, 'd', 'url(#h09-g)')}${pontos(86, 71, C.branco)}</g>`,
].join(''));

// ── H-10 · Manifesto: "lapidamos o que cada pessoa já construiu, para que fique visível" ───────
// A · Oval lapidado: o oval da marca coberto de facetas (a pedra bruta). Com a rolagem, as facetas
// somem (classe b3-faceta, opacidade ligada a --rolagem) e fica o oval liso, com brilho e a rosácea.
const facetas = () => {
  // triangulação simples sobre o oval (cx 120, cy 100, rx 58, ry 92, rotação 27°)
  const pts: [number, number][] = [[96, 14], [150, 22], [176, 74], [168, 136], [132, 186], [80, 182], [62, 126], [66, 62], [118, 70], [124, 128], [96, 100], [146, 98]];
  const tri = [[0, 1, 8], [1, 2, 8], [2, 11, 8], [2, 3, 11], [3, 9, 11], [3, 4, 9], [4, 5, 9], [5, 6, 10], [5, 10, 9], [6, 7, 10], [7, 0, 8], [7, 8, 10], [8, 11, 10], [10, 11, 9]];
  const tons = ['#B8402C', '#D9583F', '#E8774F', '#C9452F', '#F2A06C', '#DB6646', '#C04A33', '#E98A5C', '#F4B27C', '#D35A40', '#CF5038', '#E26E4C', '#F7C691', '#EC9461'];
  return tri.map((t, i) => `<path class="b3-faceta" style="--i:${i}" d="M${t.map((k) => pts[k].join(',')).join(' L')} Z" fill="${tons[i]}" stroke="#fff" stroke-opacity=".35" stroke-width=".8"/>`).join('');
};
pecas['H10a-oval-lapidado'] = svg(240, 200, 'O que já existe, lapidado', [
  `<defs>${sombra('h10a-s', 10, 12, .16)}${degradeOval('h10a-g')}<radialGradient id="h10a-brilho" cx=".35" cy=".25" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`
    + `<clipPath id="h10a-c"><ellipse cx="120" cy="100" rx="58" ry="92" transform="rotate(27 120 100)"/></clipPath></defs>`,
  `<g filter="url(#h10a-s)"><ellipse cx="120" cy="100" rx="58" ry="92" transform="rotate(27 120 100)" fill="url(#h10a-g)"/></g>`,
  `<g clip-path="url(#h10a-c)"><g class="b3-facetas">${facetas()}</g>`
    + `<ellipse class="b3-brilho" cx="104" cy="70" rx="34" ry="52" transform="rotate(27 104 70)" fill="url(#h10a-brilho)"/></g>`,
  `<g class="b3-rosa">${ROSA(124, 104, 54)}</g>`,
].join(''));

// B · Pedra que revela: a forma lisa (oval em areia clara, com sombra) se abre em duas metades e
// mostra, por dentro, a rosácea sobre o degradê da marca. Com a rolagem, as metades se afastam.
pecas['H10b-pedra-revela'] = svg(240, 200, 'A forma que revela o que há dentro', [
  `<defs>${sombra('h10b-s', 8, 10, .16)}${degradeOval('h10b-g')}<linearGradient id="h10b-casca" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${C.areia}"/></linearGradient>`
    + `<clipPath id="h10b-esq"><rect x="0" y="0" width="120" height="200"/></clipPath><clipPath id="h10b-dir"><rect x="120" y="0" width="120" height="200"/></clipPath></defs>`,
  `<ellipse cx="120" cy="100" rx="50" ry="78" fill="url(#h10b-g)"/>`,
  `<g class="b3-rosa">${ROSA(120, 100, 64)}</g>`,
  `<g class="b3-metade b3-metade-esq" filter="url(#h10b-s)" style="--lado:-1"><ellipse cx="120" cy="100" rx="56" ry="86" fill="url(#h10b-casca)" clip-path="url(#h10b-esq)"/></g>`,
  `<g class="b3-metade b3-metade-dir" filter="url(#h10b-s)" style="--lado:1"><ellipse cx="120" cy="100" rx="56" ry="86" fill="url(#h10b-casca)" clip-path="url(#h10b-dir)"/></g>`,
].join(''));

// ── G-01 · Fechamento: "todo movimento de carreira começa com uma conversa" (sobre fundo tinta) ──
// A · Conversa: duas figuras da marca frente a frente, em traço claro; entre elas, os balões da
// conversa aparecem em sequência. Um halo coral suave por trás (degradê radial, não em volta de
// cabeça).
pecas['G01a-conversa'] = svg(360, 220, 'Uma conversa', [
  `<defs>${sombra('g01a-s', 6, 8, .35, '#000')}<radialGradient id="g01a-luz" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="${C.coral}" stop-opacity=".32"/><stop offset="1" stop-color="${C.coral}" stop-opacity="0"/></radialGradient>`
    + `<linearGradient id="g01a-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A7E"/><stop offset="1" stop-color="${C.coral}"/></linearGradient></defs>`,
  `<ellipse class="b3-luz" cx="180" cy="130" rx="170" ry="100" fill="url(#g01a-luz)"/>`,
  `<line x1="40" y1="206" x2="320" y2="206" stroke="#fff" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/>`,
  `<g class="b3-quem b3-quem-e">${figura(86, 206, .78, C.areia, '#FFFFFF', 3)}</g>`,
  `<g class="b3-quem b3-quem-d">${figura(274, 206, .78, C.ambar, '#FFFFFF', 3)}</g>`,
  `<g class="b3-balao b3-balao-1" filter="url(#g01a-s)">${balao(126, 40, 78, 30, 'e', C.branco)}${pontos(165, 55, C.areia, 'b3-ponto-fixo')}</g>`,
  `<g class="b3-balao b3-balao-2" filter="url(#g01a-s)">${balao(158, 84, 78, 30, 'd', 'url(#g01a-b)')}${pontos(197, 99, C.branco)}</g>`,
].join(''));

// B · Encontro: duas bolas translúcidas (as duas pessoas da conversa) se aproximam; no encontro, a
// lente fica coral e a rosácea nasce. Com a rolagem, as bolas se aproximam.
pecas['G01b-encontro'] = svg(360, 220, 'O encontro que começa o movimento', [
  `<defs><radialGradient id="g01b-bola"><stop offset="0" stop-color="#fff" stop-opacity=".05"/><stop offset=".7" stop-color="#fff" stop-opacity=".1"/><stop offset=".92" stop-color="${C.coral}" stop-opacity=".25"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".6"/></radialGradient>`
    + `<radialGradient id="g01b-lente" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C.coral}" stop-opacity=".75"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".3"/></radialGradient>`
    + `<clipPath id="g01b-c"><circle class="b3-bola-e" cx="140" cy="110" r="88"/></clipPath></defs>`,
  `<circle class="b3-bola-e" cx="140" cy="110" r="88" fill="url(#g01b-bola)"/>`,
  `<circle class="b3-bola-d" cx="220" cy="110" r="88" fill="url(#g01b-bola)"/>`,
  `<g clip-path="url(#g01b-c)"><circle class="b3-bola-d" cx="220" cy="110" r="88" fill="url(#g01b-lente)"/></g>`,
  `<g class="b3-rosa">${ROSA(180, 110, 70)}</g>`,
  `<g opacity=".9">${cabeca(96, 110, 14, C.areia)}${cabeca(264, 110, 14, C.ambar)}</g>`,
].join(''));

const dir = new URL('../../docs/ilustracao/bloco-3/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, conteudo] of Object.entries(pecas)) {
  writeFileSync(new URL(`${nome}.svg`, dir), conteudo);
  console.log(`${nome}.svg  ${(conteudo.length / 1024).toFixed(1)} KB`);
}
