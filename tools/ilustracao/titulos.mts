// Ícones junto aos títulos das seções (pedido do dono, 30/09: "algo parecido" com o H-09 em todos os
// títulos). Mesmo formato do H-09: objeto próprio, 140 × 104, gradiente e sombra sutis.
// Uso: node --experimental-strip-types tools/ilustracao/titulos.mts  →  docs/ilustracao/titulos/*.svg
// Ganchos: t-* (entrada, CSS "Títulos · movimento") e ros (rosácea girável no hover).
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, cabeca, figura, ROSA, par } from './base.mts';

const svg = (titulo: string, corpo: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 104" width="140" height="104"><title>${titulo}</title>${corpo}</svg>\n`;
const sombra = (id: string, dy = 4, desvio = 5, op = .14) =>
  `<filter id="${id}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${desvio}" flood-color="${C.tinta}" flood-opacity="${op}"/></filter>`;
const coralG = (id: string) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A7E"/><stop offset="1" stop-color="${C.coral}"/></linearGradient>`;
const check = (cx: number, cy: number, cls: string) =>
  `<g class="${cls}"><circle cx="${cx}" cy="${cy}" r="6" fill="${C.coral}"/><path d="M${cx - 2.6},${cy} l1.9,2 l3.4,-3.8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></g>`;

const pecas: Record<string, string> = {};

// Por que a Inner · "Carreira se decide com método — e se realiza com acompanhamento".
// O plano (cartão com checklist: método) e o par entrelaçado num selo coral (acompanhamento),
// centralizado e maior no selo (pedido do dono).
pecas['T-porque'] = svg('Método e acompanhamento', [
  `<defs>${sombra('tpq-s')}${coralG('tpq-g')}</defs>`,
  `<g class="t-cartao" filter="url(#tpq-s)"><rect x="16" y="10" width="78" height="84" rx="14" fill="${C.branco}"/>`
    + `<g fill="${C.areia}"><rect x="40" y="25" width="42" height="5" rx="2.5"/><rect x="40" y="47" width="34" height="5" rx="2.5"/><rect x="40" y="69" width="38" height="5" rx="2.5"/></g>`
    + `${check(30, 27.5, 't-check t-check-1')}${check(30, 49.5, 't-check t-check-2')}<circle cx="30" cy="71.5" r="6" fill="none" stroke="${C.areia}" stroke-width="1.8"/></g>`,
  `<g class="t-selo" filter="url(#tpq-s)"><circle cx="102" cy="68" r="28" fill="url(#tpq-g)"/><g class="t-par">${par(102 - 48.67 * .32, 68 + 53 * .32, .32, C.branco, C.ambar, 2).replace(new RegExp(C.tinta, 'g'), C.branco)}</g></g>`,
].join(''));

// Prova · "Quem já fez esse caminho conta como foi". Balão de depoimento com aspas coral e um selo
// de play (os depoimentos em vídeo).
const aspa = (x: number, y: number) => `<path d="M${x},${y + 10} a6,6 0 1 1 6,-6 q0,9 -8,13 l-1.5,-2 q4,-2.6 4.6,-5.4 a6,6 0 0 1 -1.1,.4 z" fill="${C.coral}"/>`;
pecas['T-prova'] = svg('Depoimentos', [
  `<defs>${sombra('tpv-s')}${coralG('tpv-g')}</defs>`,
  `<g class="t-cartao" filter="url(#tpv-s)"><path d="M28,12 H96 A20,20 0 0 1 116,32 V56 A20,20 0 0 1 96,76 H50 Q42,88 28,92 Q36,84 36,76 H28 A20,20 0 0 1 8,56 V32 A20,20 0 0 1 28,12 Z" fill="${C.branco}"/>`
    + `<g class="t-aspas">${aspa(34, 30)}${aspa(52, 30)}</g><g fill="${C.areia}"><rect x="74" y="34" width="28" height="5" rx="2.5"/><rect x="34" y="54" width="68" height="5" rx="2.5"/></g></g>`,
  `<g class="t-selo" filter="url(#tpv-s)"><circle cx="112" cy="76" r="20" fill="url(#tpv-g)"/><path class="t-play" d="M107,68 L120,76 L107,84 Z" fill="${C.branco}" stroke="${C.branco}" stroke-width="2" stroke-linejoin="round"/></g>`,
].join(''));

// Método · "Antes de mover, entender". Lupa sobre o mini diagrama das quatro dimensões.
const miniMetodo = (cx: number, cy: number, r: number) =>
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([dx, dy]) => `<circle cx="${cx + dx * r * .62}" cy="${cy + dy * r * .62}" r="${r}" fill="${C.coral}" fill-opacity=".1" stroke="${C.coral}" stroke-opacity=".55" stroke-width="1.4"/>`).join('')
  + `<circle cx="${cx}" cy="${cy}" r="${r * .45}" fill="${C.coral}"/>`;
pecas['T-metodo'] = svg('Entender antes de mover', [
  `<defs>${sombra('tmt-s')}<clipPath id="tmt-c"><circle cx="58" cy="46" r="32"/></clipPath><radialGradient id="tmt-vidro" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${C.areiaC}"/></radialGradient></defs>`,
  `<g class="t-fundo" opacity=".55">${miniMetodo(84, 62, 14)}</g>`,
  `<g class="t-lupa" filter="url(#tmt-s)"><line x1="81" y1="69" x2="104" y2="92" stroke="${C.tinta}" stroke-width="9" stroke-linecap="round"/>`
    + `<circle cx="58" cy="46" r="36" fill="${C.tinta}"/><circle cx="58" cy="46" r="32" fill="url(#tmt-vidro)"/>`
    + `<g clip-path="url(#tmt-c)"><g class="t-dentro">${miniMetodo(58, 46, 13)}</g></g>`
    + `<path d="M36,34 a26,26 0 0 1 14,-12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/></g>`,
].join(''));

// Clientes · "Alguns dos nossos clientes". Cartões de empresa sobrepostos (como os cartões dos
// logos), com marcas abstratas; o da frente leva a rosácea.
const marca = (x: number, y: number, tipo: number) => [
  `<circle cx="${x + 12}" cy="${y + 20}" r="7" fill="${C.areia}"/><rect x="${x + 23}" y="${y + 17}" width="22" height="6" rx="3" fill="${C.areia}"/>`,
  `<rect x="${x + 8}" y="${y + 14}" width="14" height="14" rx="4" fill="${C.areia}"/><rect x="${x + 26}" y="${y + 18}" width="20" height="6" rx="3" fill="${C.areia}"/>`,
][tipo];
pecas['T-clientes'] = svg('Empresas clientes', [
  `<defs>${sombra('tcl-s', 3, 4, .12)}</defs>`,
  `<g class="t-tile t-tile-1" filter="url(#tcl-s)"><rect x="10" y="16" width="56" height="40" rx="11" fill="${C.branco}"/>${marca(10, 16, 0)}</g>`,
  `<g class="t-tile t-tile-2" filter="url(#tcl-s)"><rect x="74" y="16" width="56" height="40" rx="11" fill="${C.branco}"/>${marca(74, 16, 1)}</g>`,
  `<g class="t-tile t-tile-3" filter="url(#tcl-s)"><rect x="40" y="48" width="60" height="44" rx="12" fill="${C.branco}"/>`
    + `${ROSA(58, 70, 22)}<rect x="74" y="66" width="18" height="6" rx="3" fill="${C.coral}" fill-opacity=".5"/></g>`,
].join(''));


// Seções de Depoimentos e do FAQ ficam sobre o fundo areia: ali o claro é branco, não areia.
// ── Páginas internas (rodada 2): programas, seções de Depoimentos e do FAQ ─────────────────────
// Temas que se repetem usam o mesmo ícone: Transição (Depoimentos e FAQ) e Crescimento (idem).
const seta = (x1: number, y1: number, x2: number, y2: number, cor = C.tinta, cls = 't-seta') => {
  const a = Math.atan2(y2 - y1, x2 - x1), k = 7.5, p1 = [x2 - k * Math.cos(a - .55), y2 - k * Math.sin(a - .55)], p2 = [x2 - k * Math.cos(a + .55), y2 - k * Math.sin(a + .55)];
  return `<g class="${cls}" fill="none" stroke="${cor}" stroke-width="2.4" stroke-linejoin="bevel" stroke-linecap="round"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><polyline points="${p1.map((v) => v.toFixed(1)).join(',')} ${x2},${y2} ${p2.map((v) => v.toFixed(1)).join(',')}"/></g>`;
};
const predio = (x: number, y: number, w: number, h: number, id: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.branco}"/>`
  + Array.from({ length: 6 }, (_, i) => { const cx = x + w * (i % 3 + 1) / 4, cy = y + 16 + Math.floor(i / 3) * 20; return `<path d="M${cx - 5},${cy + 8} v-4 a5,5 0 0 1 10,0 v4 z" fill="${C.areia}"/>`; }).join('')
  + `<path class="t-porta" d="M${x + w / 2 - 9},${y + h} v-14 a9,9 0 0 1 18,0 v14 z" fill="url(#${id})"/>`;

// Platinum · acompanhamento próximo e exclusivo: o par num cartão, com a fita coral do programa.
pecas['T-platinum'] = svg('Acompanhamento dedicado', [
  `<defs>${sombra('tpl-s')}${coralG('tpl-g')}</defs>`,
  `<g class="t-cartao" filter="url(#tpl-s)"><rect x="18" y="12" width="92" height="80" rx="16" fill="${C.branco}"/>`
    + `<line x1="32" y1="80" x2="96" y2="80" stroke="${C.areia}" stroke-width="2" stroke-linecap="round"/><g class="t-par">${par(44, 80, .34, C.areia, C.ambar, 2)}</g></g>`,
  `<g class="t-fita" filter="url(#tpl-s)"><path d="M90,6 h18 v34 l-9,-7 l-9,7 z" fill="url(#tpl-g)"/></g>`,
].join(''));

// Focus · trilha estruturada, com autonomia e apoio nos momentos decisivos: pílulas de progresso
// (as etapas) e um balão coral no ponto de apoio.
pecas['T-focus'] = svg('Trilha estruturada com apoio', [
  `<defs>${sombra('tfo-s')}${coralG('tfo-g')}</defs>`,
  `<g class="t-cartao" filter="url(#tfo-s)"><rect x="10" y="12" width="94" height="80" rx="16" fill="${C.branco}"/>`
    + [30, 50, 70].map((y, i) => `<rect x="24" y="${y - 5}" width="64" height="10" rx="5" fill="${C.areiaC}"/><rect class="t-prog" style="--i:${i}" x="24" y="${y - 5}" width="${[64, 42, 18][i]}" height="10" rx="5" fill="${i === 2 ? C.areia : C.coral}" fill-opacity="${[1, .75, 1][i]}"/>`).join('') + `</g>`,
  `<g class="t-selo" filter="url(#tfo-s)"><path d="M96,34 h22 a12,12 0 0 1 0,24 h-14 l-8,7 l1,-8 a12,12 0 0 1 -1,-23 z" fill="url(#tfo-g)"/>`
    + [101, 109, 117].map((x) => `<circle cx="${x}" cy="46" r="2.2" fill="#fff"/>`).join('') + `</g>`,
].join(''));

// Next Level · o próximo nível: dois patamares em pílula; a pessoa no de baixo e a seta da marca
// apontando o patamar coral.
pecas['T-nextlevel'] = svg('O próximo nível', [
  `<defs>${sombra('tnl-s')}${coralG('tnl-g')}</defs>`,
  `<g class="t-cartao" filter="url(#tnl-s)"><rect x="10" y="74" width="66" height="16" rx="8" fill="${C.branco}"/></g>`,
  `<g class="t-selo" filter="url(#tnl-s)"><rect x="64" y="40" width="66" height="16" rx="8" fill="url(#tnl-g)"/></g>`,
  `<g class="t-quem">${figura(36, 74, .3, C.ambar, C.tinta, 2.2)}</g>`,
  seta(54, 46, 72, 28),
].join(''));

// Transição · um ciclo que se encerra (arco pequeno) e a passagem para o arco coral maior.
pecas['T-transicao'] = svg('Passagem para a nova posição', [
  `<defs>${sombra('ttr-s')}<linearGradient id="ttr-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.coral}" stop-opacity=".12"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".4"/></linearGradient></defs>`,
  `<g class="t-cartao" filter="url(#ttr-s)"><path d="M14,92 V62 a16,16 0 0 1 32,0 V92 Z" fill="${C.branco}"/></g>`,
  `<g class="t-selo" filter="url(#ttr-s)"><path d="M70,92 V40 a28,28 0 0 1 56,0 V92 Z" fill="${C.branco}"/><path d="M70,92 V40 a28,28 0 0 1 56,0 V92 Z" fill="url(#ttr-g)"/><path d="M70,92 V40 a28,28 0 0 1 56,0 V92" fill="none" stroke="${C.coral}" stroke-width="2.4"/></g>`,
  seta(40, 52, 82, 52),
].join(''));

// Outplacement · a empresa (prédio com porta coral) e o par que sai acompanhado.
pecas['T-outplacement'] = svg('Saída acompanhada', [
  `<defs>${sombra('tou-s')}${coralG('tou-g')}</defs>`,
  `<g class="t-cartao" filter="url(#tou-s)">${predio(12, 14, 62, 80, 'tou-g')}</g>`,
  `<g class="t-quem">${par(86, 92, .3, C.branco, C.ambar, 2)}</g>`,
].join(''));

// Crescimento · pílulas que crescem (a forma do kit), a última coral, e a seta da marca.
pecas['T-crescimento'] = svg('Crescimento', [
  `<defs>${sombra('tcr-s', 3, 4)}${coralG('tcr-g')}</defs>`,
  `<g filter="url(#tcr-s)">`
    + `<rect class="t-barra" x="30" y="58" width="22" height="36" rx="11" fill="${C.branco}"/>`
    + `<rect class="t-barra" x="60" y="40" width="22" height="54" rx="11" fill="${C.branco}"/>`
    + `<rect class="t-barra" x="90" y="16" width="22" height="78" rx="11" fill="url(#tcr-g)"/></g>`,
  seta(18, 44, 40, 22),
].join(''));

// Para começar · a primeira conversa, sem compromisso: a xícara com vapor e um balão.
pecas['T-comecar'] = svg('A primeira conversa', [
  `<defs>${sombra('tco-s')}${coralG('tco-g')}</defs>`,
  `<g class="t-vapor" fill="none" stroke="${C.branco}" stroke-width="3" stroke-linecap="round"><path d="M38,30 q-6,-7 0,-14 q6,-7 0,-14"/><path d="M54,30 q-6,-7 0,-14 q6,-7 0,-14"/></g>`,
  `<g class="t-cartao" filter="url(#tco-s)"><path d="M78,52 h6 a11,11 0 0 1 0,22 h-6" fill="none" stroke="${C.branco}" stroke-width="6"/>`
    + `<path d="M22,38 h58 v32 a22,22 0 0 1 -22,22 h-14 a22,22 0 0 1 -22,-22 z" fill="${C.branco}"/><rect x="22" y="48" width="58" height="8" fill="url(#tco-g)"/></g>`,
  `<g class="t-selo" filter="url(#tco-s)">${'<path d="M92,12 h28 a12,12 0 0 1 0,24 h-14 l-8,7 l1,-8 h-7 a12,12 0 0 1 0,-23 z" fill="url(#tco-g)"/>'}`
    + [101, 109, 117].map((x) => `<circle cx="${x}" cy="24" r="2.2" fill="#fff"/>`).join('') + `</g>`,
].join(''));

// Para empresas · o prédio da empresa, com a rosácea na fachada.
pecas['T-empresas'] = svg('Empresas', [
  `<defs>${sombra('tem-s')}${coralG('tem-g')}</defs>`,
  `<g class="t-cartao" filter="url(#tem-s)">${predio(34, 14, 72, 80, 'tem-g')}</g>`,
  `<g class="t-selo" filter="url(#tem-s)"><circle cx="106" cy="22" r="15" fill="${C.branco}"/>${ROSA(106, 22, 22)}</g>`,
].join(''));

// Investimento e condições · moedas em degradê coral e um calendário (as condições).
const moeda = (cx: number, cy: number, i: number) =>
  `<g class="t-moeda" style="--i:${i}"><ellipse cx="${cx}" cy="${cy + 3}" rx="22" ry="8" fill="#C9452F"/><ellipse cx="${cx}" cy="${cy}" rx="22" ry="8" fill="url(#tin-g)"/></g>`;
pecas['T-investimento'] = svg('Investimento e condições', [
  `<defs>${sombra('tin-s')}<linearGradient id="tin-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FCE7A6"/><stop offset=".45" stop-color="#F08A5D"/><stop offset="1" stop-color="${C.coral}"/></linearGradient></defs>`,
  `<g class="t-cartao" filter="url(#tin-s)"><rect x="66" y="16" width="56" height="58" rx="12" fill="${C.branco}"/><path d="M66,28 a12,12 0 0 1 12,-12 h32 a12,12 0 0 1 12,12 v4 h-56 z" fill="${C.coral}"/>`
    + `<g stroke="${C.tinta}" stroke-width="2.4" stroke-linecap="round"><line x1="80" y1="11" x2="80" y2="19"/><line x1="108" y1="11" x2="108" y2="19"/></g>`
    + Array.from({ length: 6 }, (_, i) => `<circle cx="${80 + (i % 3) * 14}" cy="${44 + Math.floor(i / 3) * 14}" r="2.6" fill="${i === 5 ? C.coral : C.areia}"/>`).join('') + `</g>`,
  `<g filter="url(#tin-s)">${moeda(42, 84, 0)}${moeda(42, 72, 1)}${moeda(42, 60, 2)}</g>`,
].join(''));

const dir = new URL('../../docs/ilustracao/titulos/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, conteudo] of Object.entries(pecas)) {
  writeFileSync(new URL(`${nome}.svg`, dir), conteudo);
  console.log(`${nome}.svg  ${(conteudo.length / 1024).toFixed(1)} KB`);
}
