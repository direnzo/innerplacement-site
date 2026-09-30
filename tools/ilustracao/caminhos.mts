// Gera as propostas dos discos de Caminhos (H-02 "Para você" e H-03 "Para sua empresa").
// Uso: node --experimental-strip-types tools/ilustracao/caminhos.mts
// Saída: docs/ilustracao/bloco-1/H02-*.svg e H03-*.svg (viewBox 100 × 100; o disco do componente
// Caminhos.astro recorta em círculo, 88 px no computador e 56 px no celular).
// Cada disco desenha os dois links do cartão: um caminho sobe (crescer), o outro sai (transição).
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, figura, ROSA, trilha, par } from './base.mts';

// Trilha revelada por máscara (a mesma técnica do hero): `p` é o prefixo da peça, para IDs únicos.
// Sem CSS, a trilha aparece inteira; `cam-fluxo` é o gancho para os pontos correrem no destaque.
const T = (p: string, id: string, d: string, cor = C.coral, op = 1) =>
  `<mask id="${p}-m-${id}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">`
  + `<path class="cam-desenho" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/></mask>`
  + `<g mask="url(#${p}-m-${id})">${trilha(d, cor, op, 2.4, 6.2).replace('<path ', '<path class="cam-fluxo" ')}</g>`;
const svg = (titulo: string, corpo: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><title>${titulo}</title>${corpo}</svg>\n`;

// Chão invisível em y = 84: ali o círculo ainda tem ~74 de largura, então as figuras ficam inteiras.
const CHAO = 84;

// Ganchos da animação (src/styles/global.css, "Caminhos · movimento"): `cam-sobe` (caminho de
// crescer: trilha coral + rosácea), `cam-sai` (caminho de saída: trilha tinta, e o par na H-03),
// `cam-rosa` (floresce), `cam-quem` (quem parte).
const variacoes: Record<string, [string, string]> = {
  // H-02 · Para você: o hero em miniatura. Uma pessoa; do mesmo ponto, a trilha coral sobe até a
  // rosácea ("Quero crescer onde estou") e a trilha tinta sai pela borda do disco ("Estou saindo").
  'H02-a-dois-caminhos': ['Para você: crescer onde está ou sair', [
    `<g class="cam-sobe">${T('h02', 'sobe', 'M47,57 C57,55 60,38 68,32')}<g class="cam-rosa">${ROSA(76, 27, 24)}</g></g>`,
    `<g class="cam-sai">${T('h02', 'sai', 'M47,57 C62,64 78,64 102,54', C.tinta, .55)}</g>`,
    `<circle class="cam-partida" cx="47" cy="57" r="2.8" fill="${C.coral}"/>`,
    `<g class="cam-quem">${figura(29, CHAO, .36, C.areia, C.tinta, 2.4)}</g>`,
  ].join('')],

  // H-03 · Para sua empresa (escolhida em 29/09, opção B; a versão com arco está no histórico): uma pessoa sobe pela trilha coral até a rosácea, e o par sai
  // acompanhado pela trilha tinta.
  'H03-b-grupo': ['Para sua empresa: um cresce, outro sai acompanhado', [
    `<g class="cam-sobe">${T('h03b', 'sobe', 'M34,52 C36,42 42,34 50,30')}<g class="cam-rosa">${ROSA(58, 26, 18)}</g></g>`,
    `<g class="cam-quem">${figura(28, CHAO, .3, C.ambar, C.tinta, 2.2)}</g>`,
    `<g class="cam-sai">${T('h03b', 'sai', 'M40,74 C48,74 53,72 58,70', C.tinta, .55)}<g class="cam-par">${par(63, CHAO, .24, C.areia, C.tinta, 2.2)}</g></g>`,
  ].join('')],
};

const dir = new URL('../../docs/ilustracao/bloco-1/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, [titulo, corpo]] of Object.entries(variacoes)) {
  writeFileSync(new URL(`${nome}.svg`, dir), svg(titulo, corpo));
  console.log(`${nome}.svg`);
}
