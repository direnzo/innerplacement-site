// Gera as propostas do bloco 4: os topos das quatro páginas de serviço (P-01 a P-04).
// Uso: node --experimental-strip-types tools/ilustracao/bloco4.mts  →  docs/ilustracao/bloco-4/*.svg
// Cenas 420 × 300, à direita do título (componente TopoPagina). Regras do dono: objetos próprios,
// trilha pontilhada só onde conta um percurso, gradientes e sombras moderados, entrada e hover.
// Ganchos: p-* (CSS "Bloco 4 · movimento") e ros (rosácea girável).
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, figura, cabeca, ROSA, par } from './base.mts';

const W = 420, H = 300, CHAO = 262;
const svg = (titulo: string, corpo: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><title>${titulo}</title>${corpo}</svg>\n`;
const sombra = (id: string, dy = 8, desvio = 10, op = .14) =>
  `<filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${desvio}" flood-color="${C.tinta}" flood-opacity="${op}"/></filter>`;
const coralV = (id: string) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF8A7E"/><stop offset="1" stop-color="${C.coral}"/></linearGradient>`;
const bolaG = (id: string) => `<radialGradient id="${id}"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".72" stop-color="#fff" stop-opacity=".35"/><stop offset=".92" stop-color="${C.coral}" stop-opacity=".12"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".3"/></radialGradient>`;
const chao = `<line x1="16" y1="${CHAO}" x2="404" y2="${CHAO}" stroke="${C.tinta}" stroke-opacity=".14" stroke-width="2" stroke-linecap="round"/>`;
const check = (cx: number, cy: number) =>
  `<circle cx="${cx}" cy="${cy}" r="7" fill="${C.coral}"/><path d="M${cx - 3},${cy} l2.2,2.3 l4,-4.4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
const seta = (x1: number, y1: number, x2: number, y2: number, esp = 3) => {
  const a = Math.atan2(y2 - y1, x2 - x1), k = 12, p = (s: number) => [x2 - k * Math.cos(a + s), y2 - k * Math.sin(a + s)].map((v) => v.toFixed(1)).join(',');
  return `<g class="p-seta" fill="none" stroke="${C.tinta}" stroke-width="${esp}" stroke-linejoin="bevel" stroke-linecap="round"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><polyline points="${p(-.55)} ${x2},${y2} ${p(.55)}"/></g>`;
};
// Prédio branco com janelas em arco e porta coral.
const predio = (x: number, y: number, w: number, h: number, porta: string, cols = 3, rows = 3) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${C.branco}"/>`
  + Array.from({ length: cols * rows }, (_, i) => { const cx = x + w * (i % cols + 1) / (cols + 1), cy = y + 28 + Math.floor(i / cols) * 30; return `<path d="M${cx - 7},${cy + 12} v-6 a7,7 0 0 1 14,0 v6 z" fill="${C.areia}"/>`; }).join('')
  + `<path d="M${x + w / 2 - 16},${y + h} v-26 a16,16 0 0 1 32,0 v26 z" fill="${porta}"/>`;

const pecas: Record<string, string> = {};

// ── P-01 · Transição e Recolocação ─────────────────────────────────────────────────────────────
// "Decisão fundamentada e execução precisa." O arco-portal coral é a nova posição; o par entrelaçado
// (a pessoa e a Inner) caminha até ele; o cartão de plano com checklist é a decisão fundamentada.
pecas['P01-transicao'] = svg('Transição: decisão fundamentada e execução precisa', [
  `<defs>${sombra('p01-s')}${coralV('p01-arco')}${bolaG('p01-bola')}<radialGradient id="p01-luz" cx=".5" cy=".75" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`,
  `<circle class="p-bola" cx="300" cy="150" r="136" fill="url(#p01-bola)"/>`,
  chao,
  `<g class="p-arco" filter="url(#p01-s)"><path d="M246,${CHAO} V104 a64,64 0 0 1 128,0 V${CHAO} Z" fill="url(#p01-arco)"/><path d="M262,${CHAO} V112 a48,48 0 0 1 96,0 V${CHAO} Z" fill="url(#p01-luz)"/></g>`,
  `<g class="p-rosa">${ROSA(310, 128, 50, C.branco)}</g>`,
  `<g class="p-quem">${par(128, CHAO, .62, C.areia, C.ambar, 3)}</g>`,
  `<g class="p-card" filter="url(#p01-s)"><g transform="rotate(-5 84 104)"><rect x="28" y="52" width="112" height="104" rx="18" fill="${C.branco}"/>`
    + `${check(52, 80)}${check(52, 106)}<circle cx="52" cy="132" r="7" fill="none" stroke="${C.areia}" stroke-width="2"/>`
    + `<g fill="${C.areia}"><rect x="68" y="76" width="54" height="7" rx="3.5"/><rect x="68" y="102" width="44" height="7" rx="3.5"/><rect x="68" y="128" width="50" height="7" rx="3.5"/></g></g></g>`,
].join(''));

// ── P-02 · Desenvolvimento de Carreira ─────────────────────────────────────────────────────────
// "Assumir mais, ganhar relevância no que já faz." A organização em cabeças; a pessoa se destaca
// sobre um pilar coral de cantos arredondados (pisa no topo plano) e a seta da marca aponta o próximo nível.
const multidao = () => {
  const cor = (i: number) => [C.areia, C.tinta, C.areia, C.ambar, C.areia, C.areia, C.tinta, C.areia][i % 8];
  let o = '';
  for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) o += cabeca(40 + i * 30 + (r % 2) * 15, 196 + r * 24, 8.5 - r * .4, cor(i + r * 3));
  return `<g class="p-org" opacity=".9">${o}</g>`;
};
pecas['P02-carreira'] = svg('Carreira: ganhar relevância no que já faz', [
  `<defs>${sombra('p02-s')}${coralV('p02-pilar')}${bolaG('p02-bola')}</defs>`,
  `<circle class="p-bola" cx="290" cy="140" r="128" fill="url(#p02-bola)"/>`,
  chao,
  multidao(),
  `<g class="p-pilar" filter="url(#p02-s)"><rect x="250" y="150" width="84" height="${CHAO - 150 + 20}" rx="22" fill="url(#p02-pilar)"/></g>`,
  `<g class="p-quem p-sobe">${figura(292, 150, .74, C.areia, C.tinta, 3.2)}</g>`,
  seta(322, 98, 356, 64),
].join(''));

// ── P-03 · Desenvolvimento de Executivos ───────────────────────────────────────────────────────
// "Contratado pela empresa, construído com o executivo": a empresa (prédio), o executivo num patamar
// coral e a Inner (rosácea num selo), ligados por um arco — o objetivo alinhado a três.
pecas['P03-executivos'] = svg('Executivos: objetivo alinhado entre empresa, executivo e Inner', [
  `<defs>${sombra('p03-s')}${coralV('p03-pl')}${bolaG('p03-bola')}<linearGradient id="p03-arco" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.tinta}" stop-opacity=".25"/><stop offset=".5" stop-color="${C.coral}"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".5"/></linearGradient></defs>`,
  `<circle class="p-bola" cx="210" cy="150" r="140" fill="url(#p03-bola)"/>`,
  chao,
  `<path class="p-elo" d="M92,96 Q210,-6 344,92" fill="none" stroke="url(#p03-arco)" stroke-width="3" stroke-linecap="round"/>`,
  `<g class="p-elo-nos"><circle cx="92" cy="96" r="6" fill="${C.tinta}"/><circle cx="214" cy="46" r="6" fill="${C.coral}"/><circle cx="344" cy="92" r="6" fill="${C.coral}"/></g>`,
  `<g class="p-predio" filter="url(#p03-s)">${predio(36, 104, 112, CHAO - 104, 'url(#p03-pl)', 3, 3)}</g>`,
  `<g class="p-pilar" filter="url(#p03-s)"><rect x="168" y="214" width="92" height="30" rx="15" fill="url(#p03-pl)"/></g>`,
  `<g class="p-quem">${figura(214, 214, .7, C.areia, C.tinta, 3.2)}</g>`,
  `<g class="p-selo" filter="url(#p03-s)"><circle cx="344" cy="150" r="52" fill="${C.branco}"/>${ROSA(344, 150, 64)}</g>`,
].join(''));

// ── P-04 · Outplacement ────────────────────────────────────────────────────────────────────────
// "A forma como a empresa conduz a saída é parte da sua cultura." O prédio com a porta aberta e a luz
// coral que sai por ela; o par sai acompanhado, rumo a um horizonte translúcido.
pecas['P04-outplacement'] = svg('Outplacement: a saída conduzida com cuidado', [
  `<defs>${sombra('p04-s')}${coralV('p04-porta')}${bolaG('p04-bola')}`
    + `<linearGradient id="p04-luz" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.coral}" stop-opacity=".5"/><stop offset="1" stop-color="${C.coral}" stop-opacity="0"/></linearGradient>`
    + `<linearGradient id="p04-oval" x1=".15" y1=".9" x2=".85" y2=".1"><stop offset="0" stop-color="#C9452F"/><stop offset=".55" stop-color="#F08A5D"/><stop offset="1" stop-color="#FCE7A6"/></linearGradient></defs>`,
  `<circle class="p-bola" cx="344" cy="168" r="96" fill="url(#p04-bola)"/>`,
  `<ellipse class="p-oval" cx="372" cy="226" rx="30" ry="50" transform="rotate(30 372 226)" fill="url(#p04-oval)" opacity=".85"/>`,
  `<path class="p-luz" d="M90,${CHAO} L122,${CHAO} L340,${H} L104,${H} Z" fill="url(#p04-luz)"/>`,  // a luz nasce da porta (x 90–122)
  chao,
  `<g class="p-predio" filter="url(#p04-s)">${predio(28, 64, 156, CHAO - 64, 'url(#p04-porta)', 4, 4)}</g>`,
  `<g class="p-quem">${par(214, CHAO, .62, C.areia, C.ambar, 3)}</g>`,
].join(''));

const dir = new URL('../../docs/ilustracao/bloco-4/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, conteudo] of Object.entries(pecas)) {
  writeFileSync(new URL(`${nome}.svg`, dir), conteudo);
  console.log(`${nome}.svg  ${(conteudo.length / 1024).toFixed(1)} KB`);
}
