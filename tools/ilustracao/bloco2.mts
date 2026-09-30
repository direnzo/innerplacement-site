// Gera as propostas do bloco 2 (Por que a Inner, Prova, Método).
// Uso: node --experimental-strip-types tools/ilustracao/bloco2.mts
// Saída: docs/ilustracao/bloco-2/*.svg
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, figura, cabeca, ROSA, trilha, marco, par } from './base.mts';

const svg = (w: number, h: number, titulo: string, corpo: string, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"${extra}><title>${titulo}</title>${corpo}</svg>\n`;
// Trilha revelada por máscara (mesma técnica do hero e dos discos). `p` dá IDs únicos por peça.
const T = (p: string, id: string, d: string, cor = C.coral, op = 1, esp = 2.6, passo = 7.5, W = 200, H = 200) =>
  `<mask id="${p}-m-${id}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="${W + 40}" height="${H + 40}">`
  + `<path class="b2-desenho" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-width="${esp * 4}" stroke-linecap="round"/></mask>`
  + `<g mask="url(#${p}-m-${id})">${trilha(d, cor, op, esp, passo).replace('<path ', '<path class="b2-fluxo" ')}</g>`;

const pecas: Record<string, string> = {};

// ── Por que a Inner ────────────────────────────────────────────────────────────────────────────
// H-04 · Para quem está em transição: "do primeiro encontro à recolocação". A pessoa parte, a trilha
// passa por três marcos (leitura, estratégia e network, entrevistas) e chega à rosácea.
pecas['H04-transicao'] = svg(168, 88, 'Do primeiro encontro à recolocação', [
  `<line x1="6" y1="80" x2="162" y2="80" stroke="${C.tinta}" stroke-opacity=".14" stroke-width="1.6" stroke-linecap="round"/>`,
  T('h04', 'rota', 'M40,62 C58,62 64,52 78,50 S104,44 116,36 S136,26 140,24', C.coral, 1, 2.4, 7, 168, 88),
  `<g class="b2-marcos">${marco(62, 58, false, 4.6)}${marco(92, 46, false, 4.6)}${marco(118, 35, true, 4.8)}</g>`,
  `<g class="b2-rosa">${ROSA(148, 20, 26)}</g>`,
  `<g class="b2-quem">${figura(22, 80, .36, C.areia, C.tinta, 2.2)}</g>`,
].join(''));

// H-05 · Para quem quer crescer: "o impacto que você quer ter, na carreira e na organização", num
// espaço confidencial. A pessoa no centro, com anéis de impacto que se expandem a partir dela,
// dentro de um arco (o espaço reservado, fora da hierarquia).
pecas['H05-crescimento'] = svg(168, 88, 'Impacto que se expande, num espaço reservado', [
  `<path d="M48,80 V44 a36,36 0 0 1 72,0 V80 Z" fill="${C.areia}" fill-opacity=".45"/>`,
  `<g class="b2-aneis" fill="none" stroke="${C.coral}" stroke-linecap="round">`
    + `<circle class="b2-anel b2-anel-1" cx="84" cy="45.5" r="12" stroke-width="1.6"/>`
    + `<circle class="b2-anel b2-anel-2" cx="84" cy="45.5" r="20" stroke-width="2.2" stroke-opacity=".55" stroke-dasharray="0.1 5"/>`
    + `<circle class="b2-anel b2-anel-3" cx="84" cy="45.5" r="28" stroke-width="2.2" stroke-opacity=".28" stroke-dasharray="0.1 6"/></g>`,
  `<line x1="6" y1="80" x2="162" y2="80" stroke="${C.tinta}" stroke-opacity=".14" stroke-width="1.6" stroke-linecap="round"/>`,
  `<g class="b2-quem">${figura(84, 80, .34, C.coral, C.tinta, 2.2)}</g>`,
].join(''));

// ── Prova: glifos dos números ──────────────────────────────────────────────────────────────────
// Substituem o fio acima de cada número. Faixa 120 × 28.
// H-21 · +15 anos: uma trilha longa, com muitos marcos.
pecas['H21-anos'] = svg(120, 28, 'Uma trajetória longa', [
  T('h21', 't', 'M4,20 C30,20 40,10 64,10 S100,16 116,8', C.tinta, .5, 2, 6, 120, 28),
  `<g class="b2-marcos">${[14, 30, 46, 62, 78, 94].map((x, i) => marco(x, [20, 18, 13, 10, 11, 13][i], false, 3)).join('')}${marco(114, 9, true, 3.4)}</g>`,
].join(''));
// H-22 · +1500 profissionais: um grupo denso de cabeças de figuras.
// Fundo da seção é areia: as cabeças claras usam branco, não areia.
const CORES22 = [C.branco, C.tinta, C.branco, C.ambar, C.branco, C.tinta, C.coral, C.branco, C.tinta, C.branco, C.ambar, C.branco, C.tinta, C.branco, C.branco, C.tinta];
pecas['H22-profissionais'] = svg(120, 28, 'Muitas pessoas atendidas', `<g class="b2-grupo">`
  + CORES22.map((cor, i) => cabeca(6 + i * 7.2, i % 2 ? 9.5 : 18.5, 4.4, cor)).join('') + `</g>`);
// H-23 · 86% em 4,5 meses: poucos marcos até a rosácea.
pecas['H23-recolocados'] = svg(120, 28, 'Poucos marcos até o objetivo', [
  T('h23', 't', 'M4,20 C28,20 44,14 60,12 S84,10 92,12', C.coral, 1, 2, 6, 120, 28),
  `<g class="b2-marcos">${marco(28, 18, false, 3)}${marco(58, 12, false, 3)}</g>`,
  `<g class="b2-rosa">${ROSA(106, 13, 22)}</g>`,
].join(''));

// ── Prova: capa de vídeo (H-06) ────────────────────────────────────────────────────────────────
// Sem figuras, com o centro livre para o play. Areia clara, bolas translúcidas do kit (bola.svg,
// bolas_sobrepostas.svg) e uma trilha que atravessa: o processo inteiro, contado por quem viveu.
// Recorte por slice: funciona de 2:1 a 16:9.
pecas['H06-capa'] = svg(520, 260, 'Capa do vídeo', [
  `<defs><radialGradient id="h06-bola"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".7" stop-color="#fff" stop-opacity=".45"/><stop offset=".92" stop-color="${C.coral}" stop-opacity=".14"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".3"/></radialGradient>`
    + `<linearGradient id="h06-oval" x1=".15" y1=".9" x2=".85" y2=".1"><stop offset="0" stop-color="#C9452F"/><stop offset=".55" stop-color="#F08A5D"/><stop offset="1" stop-color="#FCE7A6"/></linearGradient></defs>`,
  `<rect width="520" height="260" fill="${C.areiaC}"/>`,
  `<circle cx="396" cy="176" r="118" fill="url(#h06-bola)"/>`,
  `<circle cx="470" cy="96" r="84" fill="url(#h06-bola)"/>`,
  `<ellipse cx="452" cy="214" rx="46" ry="76" transform="rotate(28 452 214)" fill="url(#h06-oval)" opacity=".85"/>`,
  trilha('M-10,214 C90,214 150,170 230,160 S330,120 390,96 S460,58 530,40', C.coral, .55, 3, 12),
  `<g opacity=".9">${ROSA(62, 58, 40)}</g>`,
].join(''), ' preserveAspectRatio="xMidYMid slice"');

// ── Método: o diagrama oficial redesenhado ─────────────────────────────────────────────────────
// Mesma geometria do SVG oficial (metodologia.svg): quatro círculos de raio 84,8 com centros em
// (138,1 | 275,5) × (90,6 | 204,4), eixos em x = 206,8 e y = 147,6, objetivo coral no centro.
// Rótulos como texto real (fonte do site), não como curvas.
const MX = 206.8, MY = 147.6, R = 84.8;
const dims: [string, number, number, string[], number, number][] = [
  ['ambiente', 138.1, 90.6, ['AMBIENTE', 'E CULTURA'], -1, -1],
  ['contexto', 275.5, 90.6, ['CONTEXTO', 'INDIVIDUAL'], 1, -1],
  ['potencial', 138.1, 204.4, ['POTENCIAL', 'E RECURSOS'], -1, 1],
  ['cenario', 275.5, 204.4, ['CENÁRIO', 'FUTURO'], 1, 1],
];
pecas['M-metodo'] = svg(412.79, 295.26, 'Diagrama do método', [
  `<defs><radialGradient id="met-bola"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".76" stop-color="#fff" stop-opacity=".18"/><stop offset=".88" stop-color="${C.coral}" stop-opacity=".12"/><stop offset="1" stop-color="${C.coral}" stop-opacity=".38"/></radialGradient></defs>`,
  `<g class="met-eixos" stroke="${C.coral}" stroke-opacity=".45" stroke-width=".8"><line x1="${MX}" y1="0" x2="${MX}" y2="295.26"/><line x1="0" y1="${MY}" x2="412.79" y2="${MY}"/></g>`,
  ...dims.map(([id, cx, cy, [l1, l2], sx, sy]) => {
    const tx = cx - sx * 19, ty = cy + sy * 11 - 1;  // rótulos puxados para o centro, como no original
    return `<g class="met-bola met-${id}" style="--dx:${sx};--dy:${sy}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#met-bola)" stroke="${C.coral}" stroke-opacity=".28" stroke-width=".8"/>`
      + `<text x="${tx}" y="${ty - 2}" text-anchor="middle" font-size="9.6" letter-spacing=".1" fill="${C.tinta}"><tspan x="${tx}">${l1}</tspan><tspan x="${tx}" dy="10.5">${l2}</tspan></text></g>`;
  }),
  `<g class="met-objetivo"><circle cx="${MX}" cy="${MY}" r="41" fill="${C.coral}"/><text x="${MX}" y="${MY + 3.3}" text-anchor="middle" font-size="9.6" letter-spacing=".1" fill="${C.tinta}">OBJETIVO</text></g>`,
].join(''), ' font-family="Hanken Grotesk, sans-serif"');

const dir = new URL('../../docs/ilustracao/bloco-2/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [nome, conteudo] of Object.entries(pecas)) {
  writeFileSync(new URL(`${nome}.svg`, dir), conteudo);
  console.log(`${nome}.svg  ${(conteudo.length / 1024).toFixed(1)} KB`);
}
