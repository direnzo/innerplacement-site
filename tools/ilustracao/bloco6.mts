// Gera as propostas do bloco 6: topos dos dois hubs e da Executive Alignment (P-12 a P-14), duas ideias por página.
// Uso: node --experimental-strip-types tools/ilustracao/bloco6.mts  →  docs/ilustracao/bloco-6/*.svg
// Cenas 420 × 300, à direita do título (componente TopoPagina). Mesmas regras do bloco 4 e os mesmos ganchos p-*,
// já animados em global.css ("Bloco 4 · movimento"). Sem trilha pontilhada: nenhuma destas cenas conta um percurso.
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, figura, ROSA, par, sombra, coralV, bolaG } from './base.mts';

const W = 420, H = 300, CHAO = 262;
const svg = (titulo: string, corpo: string[]) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><title>${titulo}</title>${corpo.join('')}</svg>\n`;
const chao = `<line x1="16" y1="${CHAO}" x2="404" y2="${CHAO}" stroke="${C.tinta}" stroke-opacity=".14" stroke-width="2" stroke-linecap="round"/>`;
const seta = (x1: number, y1: number, x2: number, y2: number, cor: string = C.tinta, esp = 3) => {
  const a = Math.atan2(y2 - y1, x2 - x1), k = 12, p = (s: number) => [x2 - k * Math.cos(a + s), y2 - k * Math.sin(a + s)].map((v) => v.toFixed(1)).join(',');
  return `<g class="p-seta" fill="none" stroke="${cor}" stroke-width="${esp}" stroke-linejoin="bevel" stroke-linecap="round"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><polyline points="${p(-.6)} ${x2},${y2} ${p(.6)}"/></g>`;
};
// Prédio branco com janelas em arco; sem porta, para a figura da frente não ficar sobre ela.
const predio = (x: number, y: number, w: number, h: number, cols = 3, rows = 3) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${C.branco}"/>`
  + Array.from({ length: cols * rows }, (_, i) => {
    const cx = x + w * (i % cols + 1) / (cols + 1), cy = y + 26 + Math.floor(i / cols) * 30;
    return `<path d="M${cx - 7},${cy + 12} v-6 a7,7 0 0 1 14,0 v6 z" fill="${C.areia}"/>`;
  }).join('');
const pilar = (x: number, topo: number, w: number, id: string) =>
  `<g class="p-pilar" filter="url(#${id}-s)"><rect x="${x}" y="${topo}" width="${w}" height="${CHAO - topo + 20}" rx="18" fill="url(#${id}-c)"/></g>`;
const defs = (id: string, extra = '') => `<defs>${sombra(`${id}-s`)}${coralV(`${id}-c`)}${bolaG(`${id}-b`)}${extra}</defs>`;
// Corte do que passa do chão (o pilar arredondado não mostra a base).
const recorte = (id: string) => `<clipPath id="${id}-r"><rect x="0" y="0" width="${W}" height="${CHAO}"/></clipPath>`;

const pecas: Record<string, string> = {};

// ── P-12 · Para sua empresa ──────────────────────────────────────────────────────────────
// A: a empresa ao fundo e os três momentos à frente: quem sobe, quem se ajusta, quem sai acompanhado.
pecas['P12a-empresa-tres-momentos'] = svg('Para sua empresa: os três momentos', [
  defs('p12a', recorte('p12a')),
  `<circle class="p-bola" cx="210" cy="140" r="136" fill="url(#p12a-b)"/>`,
  `<g class="p-predio" filter="url(#p12a-s)">${predio(112, 54, 170, 208, 4, 2)}</g>`,
  chao,
  `<g clip-path="url(#p12a-r)">${pilar(46, 178, 76, 'p12a')}</g>`,
  `<g class="p-quem p-sobe">${figura(84, 178, .56, C.areia, C.tinta, 3)}</g>`,
  seta(112, 128, 138, 100),
  `<g class="p-quem">${figura(204, CHAO, .66, C.ambar, C.tinta, 3.2)}</g>`,
  `<g class="p-seta" fill="none" stroke="${C.coral}" stroke-width="3" stroke-linecap="round"><path d="M178,150 a30,30 0 0 1 52,0"/><polyline points="221,146 230,150 233,140"/></g>`,
  `<g class="p-quem">${par(312, CHAO, .56, C.areia, C.coral, 3)}</g>`,
  seta(372, 226, 404, 226),
]);
// B: um quadro com as três situações, cada uma com o seu gesto, e a empresa no selo.
const linha = (y: number, icone: string, l1: number, l2: number, x = 0) =>
  `<g class="p-card" filter="url(#p12b-s)"><rect x="${70 + x}" y="${y}" width="286" height="66" rx="20" fill="${C.branco}"/><g transform="translate(${x},0)">${icone}</g>`
  + `<g fill="${C.areia}"><rect x="${152 + x}" y="${y + 21}" width="${l1}" height="9" rx="4.5"/><rect x="${152 + x}" y="${y + 38}" width="${l2}" height="9" rx="4.5"/></g></g>`;
const disco = (cx: number, cy: number, cor: string) => `<circle cx="${cx}" cy="${cy}" r="23" fill="${cor}"/>`;
pecas['P12b-empresa-quadro'] = svg('Para sua empresa: as três situações', [
  defs('p12b'),
  `<circle class="p-bola" cx="214" cy="150" r="140" fill="url(#p12b-b)"/>`,
  linha(34, disco(112, 67, C.coral) + `<path d="M112,79 V57 M102,66 L112,55 L122,66" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`, 150, 104, -14),
  linha(116, disco(112, 149, C.ambar) + `<path d="M98,140 H118 M106,158 H126" fill="none" stroke="${C.tinta}" stroke-width="3.4" stroke-linecap="round"/><path d="M120,134 L127,140 L120,146 M104,152 L97,158 L104,164" fill="none" stroke="${C.tinta}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`, 170, 120, 14),
  linha(198, disco(112, 231, C.tinta) + `<path d="M103,243 V226 a9,9 0 0 1 18,0 V243" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="bevel"/>`, 136, 96, -14),
  `<g class="p-selo" filter="url(#p12b-s)"><circle cx="360" cy="48" r="32" fill="${C.branco}"/>${ROSA(360, 48, 40)}</g>`,
]);

// ── P-13 · Para você ─────────────────────────────────────────────────────────────────────
// A: a pessoa entre os dois movimentos: o pilar (próximo nível) e o arco (a passagem).
pecas['P13a-voce-dois-movimentos'] = svg('Para você: avançar ou fazer uma transição', [
  defs('p13a', recorte('p13a')),
  `<circle class="p-bola" cx="210" cy="146" r="136" fill="url(#p13a-b)"/>`,
  chao,
  `<g clip-path="url(#p13a-r)">${pilar(34, 156, 88, 'p13a')}</g>`,
  seta(62, 118, 92, 84),
  `<g class="p-arco" filter="url(#p13a-s)"><path d="M290,${CHAO} V116 a54,54 0 0 1 108,0 V${CHAO} Z" fill="${C.tinta}"/><path d="M304,${CHAO} V122 a40,40 0 0 1 80,0 V${CHAO} Z" fill="url(#p13a-c)"/></g>`,
  `<g class="p-rosa">${ROSA(344, 142, 46, C.branco)}</g>`,
  `<g class="p-quem">${figura(208, CHAO, .92, C.ambar, C.tinta, 3.4)}</g>`,
]);
// B: a bússola: a direção se decide com leitura; a rosácea é o centro e a agulha aponta o próximo passo.
const marcas = Array.from({ length: 24 }, (_, i) => {
  const a = i * Math.PI / 12, g = i % 6 === 0, r1 = g ? 92 : 98, r2 = 106;
  const p = (r: number) => `${(232 + r * Math.cos(a)).toFixed(1)},${(142 + r * Math.sin(a)).toFixed(1)}`;
  return `<polyline points="${p(r1)} ${p(r2)}" stroke="${g ? C.tinta : C.areia}" stroke-width="${g ? 3 : 2.4}" stroke-linecap="round"/>`;
}).join('');
pecas['P13b-voce-bussola'] = svg('Para você: a direção da carreira', [
  defs('p13b'),
  `<circle class="p-bola" cx="232" cy="142" r="140" fill="url(#p13b-b)"/>`,
  chao,
  `<g class="p-card" filter="url(#p13b-s)"><circle cx="232" cy="142" r="120" fill="${C.branco}"/></g>`,
  `<g class="p-org" fill="none">${marcas}</g>`,
  `<g class="p-seta"><path d="M232,142 L300,62 L246,152 Z" fill="${C.coral}"/><path d="M232,142 L164,222 L218,132 Z" fill="${C.areia}"/></g>`,
  `<g class="p-rosa">${`<circle cx="232" cy="142" r="30" fill="${C.branco}"/>`}${ROSA(232, 142, 48)}</g>`,
  `<g class="p-quem">${figura(70, CHAO, .78, C.ambar, C.tinta, 3.2)}</g>`,
]);

// ── P-14 · Executive Alignment ───────────────────────────────────────────────────────────
// A: três executivos na mesma linha; o do meio vem do lugar desalinhado (a sombra dele fica) para o seu lugar.
const fantasma = (cx: number, base: number, s: number) =>
  `<g class="p-org" transform="rotate(-11 ${cx} ${base})">${figura(cx, base, s, C.areia, C.areia, 3.2)}</g>`;
const cadeado = (cx: number, cy: number) =>
  `<g class="p-selo" filter="url(#p14a-s)"><circle cx="${cx}" cy="${cy}" r="30" fill="${C.branco}"/><path d="M${cx - 8},${cy - 3} v-6 a8,8 0 0 1 16,0 v6" fill="none" stroke="${C.tinta}" stroke-width="3"/><rect x="${cx - 13}" y="${cy - 3}" width="26" height="20" rx="6" fill="${C.coral}"/></g>`;
pecas['P14a-alignment-realinhar'] = svg('Executive Alignment: preservar quem precisa mudar', [
  defs('p14a'),
  `<circle class="p-bola" cx="210" cy="150" r="136" fill="url(#p14a-b)"/>`,
  chao,
  `<line class="p-org" x1="30" y1="94" x2="392" y2="94" stroke="${C.coral}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="8 8"/>`,
  `<g class="p-quem">${figura(70, CHAO, 1.3, C.areia, C.tinta, 3.4)}</g>`,
  fantasma(186, CHAO, 1.08),
  `<g class="p-quem">${figura(226, CHAO, 1.3, C.coral, C.tinta, 3.8)}</g>`,
  `<g class="p-quem">${figura(352, CHAO, 1.3, C.areia, C.tinta, 3.4)}</g>`,
  cadeado(374, 46),
]);
// B: o nível de bolha: empresa e Inner nas pontas, o executivo no centro e a bolha chegando ao meio.
pecas['P14b-alignment-nivel'] = svg('Executive Alignment: objetivo alinhado entre empresa, executivo e Inner', [
  defs('p14b', `<linearGradient id="p14b-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.areiaC}"/><stop offset="1" stop-color="${C.areia}"/></linearGradient>`),
  `<circle class="p-bola" cx="210" cy="150" r="136" fill="url(#p14b-b)"/>`,
  chao,
  `<g class="p-predio" filter="url(#p14b-s)">${predio(26, 150, 84, 112, 2, 3)}</g>`,
  `<g class="p-selo" filter="url(#p14b-s)"><circle cx="360" cy="212" r="46" fill="${C.branco}"/>${ROSA(360, 212, 60)}</g>`,
  `<g class="p-card" filter="url(#p14b-s)"><rect x="124" y="162" width="172" height="56" rx="18" fill="url(#p14b-v)"/><rect x="132" y="170" width="156" height="40" rx="12" fill="${C.branco}"/></g>`,
  `<g class="p-org"><rect x="168" y="178" width="84" height="24" rx="12" fill="${C.ambar}" fill-opacity=".28"/><line x1="192" y1="172" x2="192" y2="208" stroke="${C.tinta}" stroke-width="2.4"/><line x1="228" y1="172" x2="228" y2="208" stroke="${C.tinta}" stroke-width="2.4"/></g>`,
  `<ellipse class="p-rosa" cx="210" cy="190" rx="15" ry="10" fill="${C.ambar}"/>`,
  `<rect x="150" y="218" width="22" height="44" rx="6" fill="${C.branco}"/><rect x="248" y="218" width="22" height="44" rx="6" fill="${C.branco}"/>`,
  `<g class="p-quem">${figura(210, 162, 1.02, C.coral, C.tinta, 3.6)}</g>`,
]);

const saida = new URL('../../docs/ilustracao/bloco-6/', import.meta.url).pathname;
mkdirSync(saida, { recursive: true });
for (const [nome, conteudo] of Object.entries(pecas)) {
  writeFileSync(`${saida}${nome}.svg`, conteudo);
  console.log(`${nome}.svg  ${(Buffer.byteLength(conteudo) / 1024).toFixed(1)} KB`);
}
