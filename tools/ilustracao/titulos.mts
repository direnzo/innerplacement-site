// Ícones junto aos títulos das seções (pedido do dono, 30/09: "algo parecido" com o H-09 em todos os
// títulos). Mesmo formato do H-09: objeto próprio, 140 × 104, gradiente e sombra sutis.
// Uso: node --experimental-strip-types tools/ilustracao/titulos.mts  →  docs/ilustracao/titulos/*.svg
// Ganchos: t-* (entrada, CSS "Títulos · movimento") e ros (rosácea girável no hover).
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, cabeca, ROSA, par } from './base.mts';

const svg = (titulo: string, corpo: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 104" width="140" height="104"><title>${titulo}</title>${corpo}</svg>\n`;
const sombra = (id: string, dy = 4, desvio = 5, op = .14) =>
  `<filter id="${id}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${desvio}" flood-color="${C.tinta}" flood-opacity="${op}"/></filter>`;
const coralG = (id: string) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A7E"/><stop offset="1" stop-color="${C.coral}"/></linearGradient>`;
const check = (cx: number, cy: number, cls: string) =>
  `<g class="${cls}"><circle cx="${cx}" cy="${cy}" r="6" fill="${C.coral}"/><path d="M${cx - 2.6},${cy} l1.9,2 l3.4,-3.8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></g>`;

const pecas: Record<string, string> = {};

// Por que a Inner · "Carreira se decide com método — e se realiza com acompanhamento".
// O plano (cartão com checklist: método) e o par entrelaçado num selo coral (acompanhamento).
pecas['T-porque'] = svg('Método e acompanhamento', [
  `<defs>${sombra('tpq-s')}${coralG('tpq-g')}</defs>`,
  `<g class="t-cartao" filter="url(#tpq-s)"><rect x="16" y="10" width="78" height="84" rx="14" fill="${C.branco}"/>`
    + `<g fill="${C.areia}"><rect x="40" y="25" width="42" height="5" rx="2.5"/><rect x="40" y="47" width="34" height="5" rx="2.5"/><rect x="40" y="69" width="38" height="5" rx="2.5"/></g>`
    + `${check(30, 27.5, 't-check t-check-1')}${check(30, 49.5, 't-check t-check-2')}<circle cx="30" cy="71.5" r="6" fill="none" stroke="${C.areia}" stroke-width="1.8"/></g>`,
  `<g class="t-selo" filter="url(#tpq-s)"><circle cx="102" cy="68" r="28" fill="url(#tpq-g)"/><g class="t-par">${par(87.5, 82, .2, C.branco, C.ambar, 1.8).replace(new RegExp(C.tinta, 'g'), C.branco)}</g></g>`,
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

const dir = new URL('../../docs/ilustracao/titulos/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, conteudo] of Object.entries(pecas)) {
  writeFileSync(new URL(`${nome}.svg`, dir), conteudo);
  console.log(`${nome}.svg  ${(conteudo.length / 1024).toFixed(1)} KB`);
}
