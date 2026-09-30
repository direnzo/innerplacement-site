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

const variacoes: Record<string, [string, string]> = {
  // A · Dois caminhos, uma chegada: do mesmo ponto saem "crescer" (sobe, coral) e "transição"
  // (avança, tinta); o par entrelaçado parte junto; as duas trilhas terminam na rosácea.
  'H01-a-dois-caminhos': ['Dois caminhos, uma chegada', [
    chao,
    trilha('M178,200 C236,196 250,110 306,96 S352,90 368,92'),
    trilha('M178,200 C262,222 318,214 350,184 S386,140 392,128', C.tinta, .55),
    `<circle cx="178" cy="200" r="5.5" fill="${C.coral}"/>`,
    marco(306, 96), marco(350, 184),
    ROSA(412, 86, 84),
    par(40, BASE, .98),
  ].join('')],

  // B · Caminhar junto: o par numa só trilha, com os três marcos dos chips
  // (posicionamento, network ativado, até acontecer). O último marco é a rosácea.
  'H01-b-caminhar-junto': ['Caminhar junto até acontecer', [
    chao,
    trilha('M180,238 C246,238 262,176 304,156 S352,124 368,108'),
    marco(214, 236),
    `<g stroke="${C.tinta}" stroke-opacity=".35" stroke-width="1.6"><line x1="304" y1="156" x2="280" y2="122"/><line x1="304" y1="156" x2="324" y2="118"/><line x1="304" y1="156" x2="338" y2="180"/></g>`,
    cabeca(280, 118, 8, C.areia), cabeca(325, 113, 8, C.tinta), cabeca(342, 184, 8, C.ambar),
    marco(304, 156, true),
    ROSA(414, 72, 96),
    par(40, BASE, .98),
  ].join('')],

  // C · Posicionamento, rede e chegada: a figura em destaque sobre um círculo claro,
  // a rede que se ativa ao redor e a trilha que sai da rede até a rosácea. Mais gráfica, sem chão.
  'H01-c-rede': ['Posicionamento, rede e chegada', [
    `<circle cx="128" cy="170" r="94" fill="${C.branco}"/>`,
    `<g stroke="${C.tinta}" stroke-opacity=".3" stroke-width="1.6" stroke-dasharray="3 5">`
      + `<line x1="150" y1="118" x2="252" y2="150"/><line x1="160" y1="150" x2="262" y2="214"/><line x1="252" y1="150" x2="262" y2="214"/><line x1="262" y1="214" x2="330" y2="206"/><line x1="252" y1="150" x2="312" y2="136"/></g>`,
    cabeca(252, 150, 10, C.areia), cabeca(262, 214, 10, C.tinta), cabeca(330, 206, 8, C.areia),
    trilha('M312,136 C330,118 346,106 364,98'),
    marco(312, 136, true),
    ROSA(414, 76, 92),
    figura(128, 226, 1, C.areia, C.tinta),
    `<line x1="72" y1="226" x2="184" y2="226" stroke="${C.tinta}" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/>`,
  ].join('')],
};

const dir = new URL('../../docs/ilustracao/bloco-1/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, [titulo, corpo]] of Object.entries(variacoes)) {
  writeFileSync(new URL(`${nome}.svg`, dir), svg(titulo, corpo));
  console.log(`${nome}.svg`);
}
