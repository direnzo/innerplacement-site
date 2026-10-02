// Gera as propostas do bloco 5 (topos das demais páginas: P-05 a P-09).
// Uso: node --experimental-strip-types tools/ilustracao/bloco5.mts  →  docs/ilustracao/bloco-5/*.svg
// Depoimentos e FAQ usam o TopoPagina (cena 420 × 300 à direita); Manifesto, Contato e Agradecimento
// têm layout próprio e formatos próprios. Ganchos p-* (CSS "Bloco 4 · movimento" e "Bloco 5 · movimento").
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, figura, cabeca, ROSA, par, sombra, coralV, bolaG, checkCoral } from './base.mts';

const svg = (w: number, h: number, titulo: string, corpo: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><title>${titulo}</title>${corpo}</svg>\n`;
// Balão branco com rabicho (como no H-09), aqui em escala de cena.
const balao = (x: number, y: number, w: number, h: number, lado: 'e' | 'd', fill = C.branco) => {
  const r = Math.min(h / 2, 22), tx = lado === 'e' ? x + 26 : x + w - 26, d = lado === 'e' ? -1 : 1;
  return `<path d="M${x + r},${y} H${x + w - r} A${r},${r} 0 0 1 ${x + w},${y + r} V${y + h - r} A${r},${r} 0 0 1 ${x + w - r},${y + h} H${tx + d * 4} `
    + `Q${tx + d * 6},${y + h + 10} ${tx + d * 16},${y + h + 13} Q${tx - d * 2},${y + h + 8} ${tx - d * 8},${y + h} H${x + r} A${r},${r} 0 0 1 ${x},${y + h - r} V${y + r} A${r},${r} 0 0 1 ${x + r},${y} Z" fill="${fill}"/>`;
};
const aspa = (x: number, y: number, k = 1) => `<path d="M${x},${y + 10 * k} a${6 * k},${6 * k} 0 1 1 ${6 * k},${-6 * k} q0,${9 * k} ${-8 * k},${13 * k} l${-1.5 * k},${-2 * k} q${4 * k},${-2.6 * k} ${4.6 * k},${-5.4 * k} a${6 * k},${6 * k} 0 0 1 ${-1.1 * k},.4 z" fill="${C.coral}"/>`;
const pontos = (cx: number, cy: number, cor = C.branco) => [-12, 0, 12].map((d, i) => `<circle class="b3-ponto" style="--i:${i}" cx="${cx + d}" cy="${cy}" r="3.6" fill="${cor}"/>`).join('');
const linhas = (x: number, y: number, ws: number[], passo = 12) => `<g fill="${C.areia}">${ws.map((w, i) => `<rect x="${x}" y="${y + i * passo}" width="${w}" height="6" rx="3"/>`).join('')}</g>`;

const pecas: Record<string, string> = {};

// ── P-05 · Depoimentos: "o processo inteiro — inclusive a parte difícil" ───────────────────────
// O quadro do vídeo (com play) e balões de depoimento; num deles, um pequeno gráfico que desce e
// depois sobe: a parte difícil faz parte do processo.
pecas['P05-depoimentos'] = svg(420, 300, 'Depoimentos: o processo inteiro, contado por quem viveu', [
  `<defs>${sombra('p05-s')}${coralV('p05-c')}${bolaG('p05-b')}</defs>`,
  `<circle class="p-bola" cx="290" cy="150" r="134" fill="url(#p05-b)"/>`,
  `<g class="p-card" filter="url(#p05-s)"><rect x="158" y="52" width="226" height="164" rx="20" fill="${C.branco}"/>`
    + `<rect x="172" y="66" width="198" height="110" rx="14" fill="${C.areiaC}"/>`
    + `<g opacity=".85">${figura(318, 176, .56, C.areia, C.tinta, 2.6)}</g>`
    + `<circle cx="226" cy="121" r="23" fill="url(#p05-c)"/><path class="t-play" d="M219,111 L236,121 L219,131 Z" fill="#fff" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>`
    + linhas(172, 188, [120, 84]) + `</g>`,
  `<g class="p-balao p-balao-1" filter="url(#p05-s)">${balao(26, 36, 132, 62, 'd')}${aspa(46, 52)}${aspa(64, 52)}${linhas(86, 56, [52, 38])}</g>`,
  `<g class="p-balao p-balao-2" filter="url(#p05-s)">${balao(30, 176, 150, 84, 'e')}`
    + `<path class="p-linha" d="M50,224 C66,214 76,248 96,244 S126,206 160,198" pathLength="1" fill="none" stroke="${C.coral}" stroke-width="3.2" stroke-linecap="round"/><circle cx="160" cy="198" r="5" fill="${C.coral}"/>`
    + `${cabeca(50, 224, 4, C.tinta)}</g>`,
].join(''));

// ── P-06 · Perguntas frequentes: "dúvidas organizadas por momento de carreira" ─────────────────
// Cartões de acordeão empilhados (o de cima aberto) e o balão coral de uma conversa começando.
const acord = (y: number, aberto: boolean, i: number) => {
  const h = aberto ? 112 : 46;
  return `<g class="p-acord" style="--i:${i}" filter="url(#p06-s)"><rect x="60" y="${y}" width="270" height="${h}" rx="${aberto ? 20 : 23}" fill="${C.branco}"/>`
    + `<rect x="82" y="${y + 20}" width="${[150, 120, 136][i]}" height="7" rx="3.5" fill="${C.tinta}" fill-opacity=".7"/>`
    + `<path d="M${300},${y + (aberto ? 26 : 20)} l7,${aberto ? -6 : 6} l7,${aberto ? 6 : -6}" fill="none" stroke="${aberto ? C.coral : C.tinta}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`
    + (aberto ? linhas(82, y + 46, [200, 184, 120]) : '') + `</g>`;
};
pecas['P06-faq'] = svg(420, 300, 'Perguntas frequentes: dúvidas organizadas por momento', [
  `<defs>${sombra('p06-s', 6, 8)}${coralV('p06-c')}${bolaG('p06-b')}</defs>`,
  `<circle class="p-bola" cx="230" cy="150" r="138" fill="url(#p06-b)"/>`,
  acord(150 + 36, false, 1), acord(150 + 96, false, 2), acord(52, true, 0),
  `<g class="p-balao p-balao-1" filter="url(#p06-s)">${balao(296, 18, 104, 56, 'e', 'url(#p06-c)')}${pontos(348, 46)}</g>`,
].join(''));

// ── P-07 · Manifesto: "caminhar junto até acontecer" ───────────────────────────────────────────
// Vertical, na coluna do título: a rosácea grande e o par entrelaçado caminhando até ela.
pecas['P07-manifesto'] = svg(320, 380, 'Manifesto: caminhar junto até acontecer', [
  `<defs>${bolaG('p07-b')}</defs>`,
  `<circle class="p-bola" cx="176" cy="150" r="140" fill="url(#p07-b)"/>`,
  `<g class="p-rosa">${ROSA(186, 132, 176)}</g>`,
  `<line x1="16" y1="350" x2="304" y2="350" stroke="${C.tinta}" stroke-opacity=".14" stroke-width="2" stroke-linecap="round"/>`,
  `<g class="p-quem">${par(30, 350, .9, C.areia, C.ambar, 3.4)}</g>`,
].join(''));

// ── P-08 · Contato: "conte o que você deseja; nenhum contato sem a sua autorização" ───────────
// O envelope aberto, a carta coral saindo com a rosácea e o cadeado discreto da privacidade.
pecas['P08-contato'] = svg(360, 250, 'Contato: a sua mensagem, com privacidade', [
  `<defs>${sombra('p08-s')}${coralV('p08-c')}${bolaG('p08-b')}</defs>`,
  `<circle class="p-bola" cx="180" cy="130" r="118" fill="url(#p08-b)"/>`,
  `<g filter="url(#p08-s)"><path d="M60,116 L180,52 L300,116 V210 a14,14 0 0 1 -14,14 H74 a14,14 0 0 1 -14,-14 Z" fill="${C.areiaC}"/></g>`,
  `<g class="p-carta"><rect x="92" y="40" width="176" height="140" rx="14" fill="url(#p08-c)"/>${ROSA(180, 96, 58, C.branco)}${`<g fill="#fff" fill-opacity=".55"><rect x="124" y="140" width="112" height="6" rx="3"/><rect x="140" y="152" width="80" height="6" rx="3"/></g>`}</g>`,
  `<g filter="url(#p08-s)"><path d="M60,120 L180,184 L300,120 V210 a14,14 0 0 1 -14,14 H74 a14,14 0 0 1 -14,-14 Z" fill="${C.branco}"/></g>`,
  `<g class="p-selo" filter="url(#p08-s)"><circle cx="298" cy="204" r="22" fill="${C.tinta}"/><path d="M291,201 v-4 a7,7 0 0 1 14,0 v4" fill="none" stroke="#fff" stroke-width="2.6"/><rect x="288" y="200" width="20" height="15" rx="4" fill="#fff"/><circle cx="298" cy="207" r="2.2" fill="${C.tinta}"/></g>`,
].join(''));

// ── P-09 · Agradecimento: "recebemos a sua mensagem" ───────────────────────────────────────────
// A carta entregue: o envelope fechado com o selo coral de confirmação e a rosácea florescendo.
pecas['P09-obrigado'] = svg(420, 300, 'Agradecimento: a mensagem chegou', [
  `<defs>${sombra('p09-s')}${coralV('p09-c')}${bolaG('p09-b')}</defs>`,
  `<circle class="p-bola" cx="240" cy="150" r="136" fill="url(#p09-b)"/>`,
  `<g class="p-rosa">${ROSA(312, 78, 96)}</g>`,
  `<g class="p-card" filter="url(#p09-s)"><rect x="92" y="112" width="236" height="150" rx="18" fill="${C.branco}"/>`
    + `<path d="M98,122 L210,196 L322,122" fill="none" stroke="${C.areia}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></g>`,
  `<g class="p-selo" filter="url(#p09-s)">${checkCoral(210, 196, 26)}</g>`,
].join(''));

// ── P-10 · Quem somos (fora do guia original; página mantida com o conteúdo do WordPress) ─────────
// Os três sócios como três figuras da marca entrelaçadas — o "par" da marca virando um trio, com os
// papéis complementares (F05) — sob a rosácea.
const TRIO_LACO = 'c0,4.03-3.27,7.3-7.3,7.3s-7.3-3.27-7.3-7.3';
const TRIO_ARCO = 'c0-15.17,12.3-27.47,27.47-27.47h2.32c15.17,0,27.47,12.3,27.47,27.47';
const trio = (x: number, base: number, s: number, cabecas: string[], traco = 3) =>
  `<g transform="translate(${x - 48.33 * s},${base - 106.08 * s}) scale(${s})">`
  + `<path d="M48.33,106.08v-43.02c0-15.17,12.3-27.47,27.47-27.47s27.47,12.3,27.47,27.47v35.72${TRIO_LACO}v-35.72${TRIO_ARCO}v35.72${TRIO_LACO}v-35.72${TRIO_ARCO}v43.02" fill="none" stroke="${C.tinta}" stroke-width="${(traco / s).toFixed(2)}" stroke-linejoin="bevel"/>`
  + [75.62, 117.3, 159.96].map((cx, i) => `<circle cx="${cx}" cy="15.15" r="15.15" fill="${cabecas[i]}"/>`).join('') + `</g>`;
pecas['P10-quem-somos'] = svg(420, 300, 'Quem somos: os três sócios', [
  `<defs>${bolaG('p10-b')}</defs>`,
  `<circle class="p-bola" cx="214" cy="150" r="138" fill="url(#p10-b)"/>`,
  `<g class="p-rosa">${ROSA(214, 80, 92)}</g>`,
  `<line x1="40" y1="262" x2="388" y2="262" stroke="${C.tinta}" stroke-opacity=".14" stroke-width="2" stroke-linecap="round"/>`,
  `<g class="p-quem">${trio(214 - 70.13 * .95, 262, .95, [C.areia, C.coral, C.ambar])}</g>`,
].join(''));

const dir = new URL('../../docs/ilustracao/bloco-5/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, conteudo] of Object.entries(pecas)) {
  writeFileSync(new URL(`${nome}.svg`, dir), conteudo);
  console.log(`${nome}.svg  ${(conteudo.length / 1024).toFixed(1)} KB`);
}
