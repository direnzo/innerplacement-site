// Primitivas de desenho compartilhadas pelas ilustrações do site (vocabulário do kit oficial).
// Cada gerador de bloco (hero.mts, caminhos.mts…) importa daqui, para todas as peças saírem da mesma família.
import { kit } from '../../src/data/kit.ts';

export const C = { coral: '#FF6558', tinta: '#231F20', areia: '#D3CEC4', areiaC: '#EFEBE4', ambar: '#F2B45C', branco: '#FFFFFF' };

// Figura Inner: cabeça em círculo sólido, corpo em arco de traço único, sem rosto.
// Proporções tiradas de `pessoa_up` do kit (corpo 66,7 de largura, cabeça r 18,4, altura total ~123).
export function figura(cx: number, base: number, s: number, cabeca: string, corpo: string, traco = 2.8) {
  const r = 33.33 * s, perna = 42.54 * s, rc = 18.38 * s, cy = base - 100.7 * s;
  return `<path d="M${cx - r},${base} v${-perna} a${r},${r} 0 0 1 ${2 * r},0 v${perna}" fill="none" stroke="${corpo}" stroke-width="${traco}" stroke-linejoin="bevel"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${rc}" fill="${cabeca}"/>`;
}
// Só a cabeça, para grupos pequenos (network).
export const cabeca = (cx: number, cy: number, r: number, cor: string) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${cor}"/>`;

// Peça do kit posicionada pelo centro.
export function peca(k: string, cx: number, cy: number, h: number, extra = '') {
  const e = kit[k]; const w = +(h * e.w / e.h).toFixed(1);
  return `<svg x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w}" height="${h}" viewBox="0 0 ${e.w} ${e.h}" ${extra}>${e.inner}</svg>`;
}
// Rosácea do kit.
export const ROSA = (cx: number, cy: number, h: number) => peca('rosacea_coral', cx, cy, h);

// Trilha pontilhada (forma e movimento, item 3 da folha de referência). Espessura e passo ajustáveis
// para peças pequenas; o padrão é o do hero.
export const trilha = (d: string, cor = C.coral, op = 1, esp = 3.5, passo = 11) =>
  `<path d="${d}" fill="none" stroke="${cor}" stroke-opacity="${op}" stroke-width="${esp}" stroke-linecap="round" stroke-dasharray="0.1 ${passo}"/>`;
export const marco = (x: number, y: number, cheio = false, r = 7) => cheio
  ? `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.coral}"/>`
  : `<circle cx="${x}" cy="${y}" r="${(r * 6.5 / 7).toFixed(2).replace(/\.?0+$/, '')}" fill="${C.branco}" stroke="${C.coral}" stroke-width="${(r * 2.6 / 7).toFixed(2).replace(/\.?0+$/, '')}"/>`;

// Par entrelaçado da peça `pessoas` do kit (o laço entre os corpos é o "junto" da marca):
// figura principal (cabeça areia, corpo tinta) e companhia (cabeça tinta, corpo tinta), ligadas pelo laço.
export function par(x: number, base: number, s: number, cabecaA = C.areia, cabecaB = C.ambar, traco = 2.8) {
  const y = base - 106.08 * s;
  return `<g transform="translate(${x - 48.33 * s},${y}) scale(${s})">`
    + `<path d="M48.33,106.08v-43.02c0-15.17,12.3-27.47,27.47-27.47s27.47,12.3,27.47,27.47v35.72c0,4.03-3.27,7.3-7.3,7.3s-7.3-3.27-7.3-7.3v-35.72c0-15.17,12.3-27.47,27.47-27.47h2.32c15.17,0,27.47,12.3,27.47,27.47v43.02" fill="none" stroke="${C.tinta}" stroke-width="${(traco / s).toFixed(2)}" stroke-linejoin="bevel"/>`
    + `<circle cx="75.62" cy="15.15" r="15.15" fill="${cabecaA}"/><circle cx="117.28" cy="15.15" r="15.15" fill="${cabecaB}"/></g>`;
}

