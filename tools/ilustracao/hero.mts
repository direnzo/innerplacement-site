// Gera as variações do painel do hero (H-01) a partir do vocabulário do kit oficial.
// Uso: node --experimental-strip-types tools/ilustracao/hero.mts
// Saída: docs/ilustracao/bloco-1/H01-*.svg (viewBox 496 × 280, o mesmo painel de src/pages/index.astro).
import { writeFileSync, mkdirSync } from 'node:fs';
import { kit } from '../../src/data/kit.ts';

const C = { coral: '#FF6558', tinta: '#231F20', areia: '#D3CEC4', areiaC: '#EFEBE4', ambar: '#F2B45C', branco: '#FFFFFF' };
const W = 496, H = 280, BASE = 262;

// Figura Inner: cabeça em círculo sólido, corpo em arco de traço único, sem rosto.
// Proporções tiradas de `pessoa_up` do kit (corpo 66,7 de largura, cabeça r 18,4, altura total ~123).
function figura(cx: number, base: number, s: number, cabeca: string, corpo: string, traco = 2.8) {
  const r = 33.33 * s, perna = 42.54 * s, rc = 18.38 * s, cy = base - 100.7 * s;
  return `<path d="M${cx - r},${base} v${-perna} a${r},${r} 0 0 1 ${2 * r},0 v${perna}" fill="none" stroke="${corpo}" stroke-width="${traco}" stroke-linejoin="bevel"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${rc}" fill="${cabeca}"/>`;
}
// Só a cabeça, para grupos pequenos (network).
const cabeca = (cx: number, cy: number, r: number, cor: string) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${cor}"/>`;

// Peça do kit posicionada pelo centro.
function peca(k: string, cx: number, cy: number, h: number, extra = '') {
  const e = kit[k]; const w = +(h * e.w / e.h).toFixed(1);
  return `<svg x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w}" height="${h}" viewBox="0 0 ${e.w} ${e.h}" ${extra}>${e.inner}</svg>`;
}

// Trilha pontilhada coral (forma e movimento, item 3 da folha de referência).
const trilha = (d: string, cor = C.coral, op = 1) =>
  `<path d="${d}" fill="none" stroke="${cor}" stroke-opacity="${op}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="0.1 11"/>`;
const chao = `<line x1="24" y1="${BASE}" x2="472" y2="${BASE}" stroke="${C.tinta}" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/>`;
const marco = (x: number, y: number, cheio = false) => cheio
  ? `<circle cx="${x}" cy="${y}" r="7" fill="${C.coral}"/>`
  : `<circle cx="${x}" cy="${y}" r="6.5" fill="${C.branco}" stroke="${C.coral}" stroke-width="2.6"/>`;

const svg = (titulo: string, corpo: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><title>${titulo}</title>${corpo}</svg>\n`;

// Par entrelaçado da peça `pessoas` do kit (o laço entre os corpos é o "junto" da marca):
// figura principal (cabeça areia, corpo tinta) e companhia (cabeça tinta, corpo tinta), ligadas pelo laço.
function par(x: number, base: number, s: number, cabecaA = C.areia, cabecaB = C.ambar) {
  const u = (v: number) => +(v * s).toFixed(2);
  const y = base - 106.08 * s;
  return `<g transform="translate(${x - 48.33 * s},${y}) scale(${s})">`
    + `<path d="M48.33,106.08v-43.02c0-15.17,12.3-27.47,27.47-27.47s27.47,12.3,27.47,27.47v35.72c0,4.03-3.27,7.3-7.3,7.3s-7.3-3.27-7.3-7.3v-35.72c0-15.17,12.3-27.47,27.47-27.47h2.32c15.17,0,27.47,12.3,27.47,27.47v43.02" fill="none" stroke="${C.tinta}" stroke-width="${(2.8 / s).toFixed(2)}" stroke-linejoin="bevel"/>`
    + `<circle cx="75.62" cy="15.15" r="15.15" fill="${cabecaA}"/><circle cx="117.28" cy="15.15" r="15.15" fill="${cabecaB}"/></g>`;
}
// Rosácea do kit com o raio externo aproximado (as trilhas param antes das pétalas).
const ROSA = (cx: number, cy: number, h: number) => peca('rosacea_coral', cx, cy, h);

// Efeitos do kit oficial recriados com degradês nativos. Os SVGs originais do Illustrator usam
// máscaras e IDs genéricos (#d, #e…) que colidem quando várias peças ficam na mesma página;
// aqui cada ID leva o prefixo da peça.
const fx = (p: string) => ({
  defs: `<defs>`
    // bola.svg / bolas_sobrepostas.svg: centro claro, borda coral translúcida
    + `<radialGradient id="${p}-bola"><stop offset="0" stop-color="${C.branco}" stop-opacity=".95"/><stop offset=".72" stop-color="${C.branco}" stop-opacity=".5"/><stop offset=".93" stop-color="${C.coral}" stop-opacity=".13"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".2"/></radialGradient>`
    // fundo-foto.png (WordPress): arco que vai de transparente, no alto, a coral, na base
    + `<linearGradient id="${p}-arco" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.coral}" stop-opacity="0"/><stop offset=".5" stop-color="${C.coral}" stop-opacity=".05"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".22"/></linearGradient>`
    // oval_gradiente.svg: coral queimado → coral claro → âmbar claro
    + `<linearGradient id="${p}-oval" x1=".15" y1=".9" x2=".85" y2=".1"><stop offset="0" stop-color="#C9452F"/><stop offset=".55" stop-color="#F08A5D"/><stop offset="1" stop-color="#FCE7A6"/></linearGradient>`
    // menu.svg / fio: linha que esmaece nas pontas
    + `<linearGradient id="${p}-fio" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.tinta}" stop-opacity="0"/><stop offset=".25" stop-color="${C.tinta}" stop-opacity=".22"/><stop offset=".8" stop-color="${C.tinta}" stop-opacity=".22"/><stop offset="1" stop-color="${C.tinta}" stop-opacity="0"/></linearGradient>`
    // setas_grafismo.svg / setas_amarela.png: chevrons em faixa
    + `<pattern id="${p}-setas" width="14" height="20" patternUnits="userSpaceOnUse"><path d="M4,4 L9,10 L4,16" fill="none" stroke="${C.coral}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></pattern>`
    + `<linearGradient id="${p}-setas-m" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`
    + `<mask id="${p}-setas-mask"><rect x="0" y="0" width="${W}" height="${H}" fill="url(#${p}-setas-m)"/></mask>`
    + `</defs>`,
  chao: `<rect x="24" y="${BASE - 1}" width="448" height="2" rx="1" fill="url(#${p}-fio)"/>`,
  bola: (cx: number, cy: number, r: number) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${p}-bola)"/>`,
  // Arco (a mesma forma do corpo da Figura Inner, em escala de cenário)
  arco: (x: number, w: number, topo: number) => `<path d="M${x},${BASE} V${topo + w / 2} a${w / 2},${w / 2} 0 0 1 ${w},0 V${BASE} Z" fill="url(#${p}-arco)"/>`,
  // Oval inclinado do kit (botão_seta), como ponto de partida
  oval: (cx: number, cy: number, ry: number, rot = 27) => `<ellipse cx="${cx}" cy="${cy}" rx="${(ry * .6).toFixed(1)}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="url(#${p}-oval)"/>`,
  setas: (x: number, y: number, w: number, h: number, op: number) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${p}-setas)" opacity="${op}" mask="url(#${p}-setas-mask)"/>`,
});
// bolas.svg / destravar.svg: ritmo de ovais que engrossam e afinam
function ritmo(x: number, y: number, w: number, h: number, n: number, cor: string, op: number) {
  let out = `<g fill="${cor}" opacity="${op}">`;
  for (let i = 0; i < n; i++) {
    const rx = (0.8 + 4.2 * Math.abs(Math.sin(i * 0.42 + 0.3))).toFixed(2);
    out += `<ellipse cx="${(x + (i + .5) * w / n).toFixed(1)}" cy="${y}" rx="${rx}" ry="${h / 2}"/>`;
  }
  return out + `</g>`;
}

// A · Dois caminhos, uma chegada (escolhida em 29/09). Do mesmo ponto saem "crescer" (trilha coral,
// sobe) e "transição" (trilha tinta, avança); o par entrelaçado parte junto; as duas chegam à rosácea.
// Três intensidades de degradê e transparência, para calibrar.
function dois(p: string, nivel: 0 | 1 | 2 | 3) {
  const f = fx(p);
  const partida = nivel >= 2 ? f.oval(178, 200, 13) : `<circle cx="178" cy="200" r="5.5" fill="${C.coral}"/>`;
  return [
    nivel >= 1 ? f.defs : '',
    nivel >= 2 ? f.arco(22, 168, 70) : '',
    nivel >= 3 ? f.setas(226, 226, 140, 40, .3) : '',
    nivel >= 1 ? f.bola(412, 86, 72) : '',
    nivel >= 1 ? f.chao : chao,
    nivel >= 3 ? ritmo(376, 250, 92, 10, 9, C.tinta, .28) : '',
    trilha('M178,200 C236,196 250,110 306,96 S352,90 368,92'),
    trilha('M178,200 C262,222 318,214 350,184 S386,140 392,128', C.tinta, .55),
    partida,
    marco(306, 96), marco(350, 184),
    ROSA(412, 86, 84),
    par(40, BASE, .98),
  ].join('');
}

// Nó de network (vindo da opção B): marco cheio com cabeças de figuras ligadas por traço fino.
function rede(x: number, y: number, cabecas: [number, number, string][]) {
  return `<g stroke="${C.tinta}" stroke-opacity=".35" stroke-width="1.6">`
    + cabecas.map(([cx, cy]) => `<line x1="${x}" y1="${y}" x2="${cx}" y2="${cy}"/>`).join('') + `</g>`
    + cabecas.map(([cx, cy, cor]) => cabeca(cx, cy, 8, cor)).join('')
    + marco(x, y, true);
}

// A0 com rede (escolhida em 29/09): a composição plana da A, com um nó de network em cada caminho
// no lugar dos marcos vazios. Crescer também passa por ativar a rede, não só a transição.
// Classes `h01-*` são os ganchos da animação do hero (src/styles/global.css, "Hero · movimento").
// Sem CSS, ou com "reduzir movimento", a peça aparece completa e parada.
const TRILHA_A = 'M178,200 C236,196 250,110 306,96 S352,90 368,92';
const TRILHA_B = 'M178,200 C262,222 318,214 350,184 S386,140 392,128';
// Trilha pontilhada revelada por uma máscara de traço contínuo (pathLength=1): a animação leva o
// stroke-dashoffset da máscara de 1 a 0 e a trilha "se desenha"; os pontos em si continuam livres
// para correr com a rolagem (stroke-dashoffset da trilha).
const trilhaViva = (id: string, d: string, cor: string, op: number) =>
  `<mask id="h01-m-${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">`
  + `<path class="h01-desenho h01-desenho-${id}" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/></mask>`
  + `<g mask="url(#h01-m-${id})"><path class="h01-fluxo" d="${d}" fill="none" stroke="${cor}" stroke-opacity="${op}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="0.1 11"/></g>`;
const planaRede = [
  chao,
  trilhaViva('a', TRILHA_A, C.coral, 1),
  trilhaViva('b', TRILHA_B, C.tinta, .55),
  `<circle class="h01-partida" cx="178" cy="200" r="5.5" fill="${C.coral}"/>`,
  `<g class="h01-no h01-no-a">${rede(306, 96, [[282, 62, C.areia], [322, 58, C.tinta], [338, 126, C.ambar]])}</g>`,
  `<g class="h01-no h01-no-b">${rede(350, 184, [[326, 224, C.tinta], [370, 228, C.areia], [398, 202, C.ambar]])}</g>`,
  `<g class="h01-rosa"><g class="h01-rosa-giro">${ROSA(412, 86, 84)}</g></g>`,
  `<g class="h01-par">${par(40, BASE, .98)}</g>`,
].join('');

const variacoes: Record<string, [string, string]> = {
  'H01-a0-rede': ['Dois caminhos, uma chegada, com a rede nos dois', planaRede],
  'H01-a0-plana': ['Dois caminhos, uma chegada · plana', dois('h01a0', 0)],
};

const dir = new URL('../../docs/ilustracao/bloco-1/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, [titulo, corpo]] of Object.entries(variacoes)) {
  writeFileSync(new URL(`${nome}.svg`, dir), svg(titulo, corpo));
  console.log(`${nome}.svg`);
}
