// Gera public/llms.txt e public/llms-full.txt a partir do conteúdo real da v2
// (mesmo padrão que o WordPress tinha em /llms.txt e /llms-full.txt, mas com os
// endereços novos e o FAQ novo — os arquivos antigos estão desatualizados).
// Uso: node --experimental-strip-types tools/llms.mts
// Rodar de novo quando mudar título/descrição de página, FAQ, depoimentos ou posts.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { CTA, WHATSAPP_URL, EMAIL } from '../src/data/site.ts';
import { secoesFaq } from '../src/data/faq.ts';

const RAIZ = new URL('../', import.meta.url).pathname;
const SITE = 'https://innerplacement.com.br';
const ler = (p: string) => readFileSync(`${RAIZ}${p}`, 'utf8');

// Páginas no índice (as mesmas 11 do llms.txt antigo, com os endereços da v2).
// nome: texto do link; arq: página .astro de onde saem titulo e descricao.
const paginas = [
  { nome: 'Inner Placement', arq: 'src/pages/index.astro', rota: '/' },
  { nome: 'Transição e Recolocação', arq: 'src/pages/transicao-e-recolocacao.astro', rota: '/transicao-e-recolocacao/' },
  { nome: 'Desenvolvimento de Carreira', arq: 'src/pages/desenvolvimento-de-carreira.astro', rota: '/desenvolvimento-de-carreira/' },
  { nome: 'Desenvolvimento de Executivos', arq: 'src/pages/desenvolvimento-de-executivos.astro', rota: '/desenvolvimento-de-executivos/' },
  { nome: 'Outplacement', arq: 'src/pages/outplacement.astro', rota: '/outplacement/' },
  { nome: 'Quem somos', arq: 'src/pages/quem-somos.astro', rota: '/quem-somos/' },
  { nome: 'Manifesto', arq: 'src/pages/manifesto.astro', rota: '/manifesto/' },
  { nome: 'Depoimentos', arq: 'src/pages/depoimentos.astro', rota: '/depoimentos/' },
  { nome: 'Contato', arq: 'src/pages/contato.astro', rota: '/contato/' },
  { nome: 'Perguntas frequentes', arq: 'src/pages/perguntas-frequentes.astro', rota: '/perguntas-frequentes/' },
  { nome: 'Blog', arq: 'src/pages/blog/index.astro', rota: '/blog/' },
];

// titulo="..." e descricao="..." da tag <Base> de cada página. Quem somos usa
// descricao={abertura}: cai no caso especial abaixo (src/data/socios.ts).
const baseDe = (arq: string) => {
  const tag = ler(arq).match(/<Base\s[^>]*>/s)?.[0] ?? '';
  const titulo = tag.match(/titulo="([^"]+)"/)?.[1] ?? tag.match(/titulo=\{[^}]*\}/)?.[0] ?? '';
  let descricao = tag.match(/descricao="([^"]+)"/)?.[1] ?? '';
  if (!descricao && /descricao=\{abertura\}/.test(tag)) {
    descricao = ler('src/data/socios.ts').match(/export const abertura =\s*'([^']+)'/)?.[1] ?? '';
  }
  return { titulo, descricao };
};

// Posts publicados (um .md por post; o endereço é /<arquivo>/, como no WordPress).
const campo = (frente: string, nome: string) =>
  frente.match(new RegExp(`^${nome}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'm'))?.[1]
  ?? frente.match(new RegExp(`^${nome}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? '';
const posts = (() => {
  return readdirSync(`${RAIZ}src/content/blog`).filter((f) => f.endsWith('.md')).map((f) => {
    const frente = ler(`src/content/blog/${f}`).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    return { slug: f.replace(/\.md$/, ''), titulo: campo(frente, 'titulo'), descricao: campo(frente, 'descricao'), data: campo(frente, 'data'), rascunho: campo(frente, 'rascunho') };
  }).filter((p) => p.rascunho !== 'true').sort((a, b) => (a.data < b.data ? 1 : -1));
})();

const info = paginas.map((p) => ({ ...p, ...baseDe(p.arq) }));
const home = info[0];
const porRota = (rota: string) => info.find((p) => p.rota === rota)!;
const contato = `Contato: [${SITE}/contato/](${SITE}/contato/) · WhatsApp ${WHATSAPP_URL} · ${EMAIL} · ${CTA}: ${SITE}/contato/`;

// llms.txt: índice curto (mesmo formato do antigo).
const indice = [
  '# InnerPlacement',
  '',
  `> ${home.descricao}`,
  '',
  contato,
  '',
  '## Páginas',
  ...info.map((p) => `- [${p.nome}](${SITE}${p.rota}): ${p.descricao}`),
  '',
].join('\n');

// llms-full.txt: conteúdo completo (serviços + FAQ novo + blog da v2).
const servicos = ['/outplacement/', '/desenvolvimento-de-executivos/', '/transicao-e-recolocacao/', '/desenvolvimento-de-carreira/'];
const completo = [
  '# InnerPlacement — conteúdo completo para LLMs',
  '',
  `> ${home.descricao}`,
  '',
  contato,
  '',
  ...servicos.flatMap((r) => {
    const p = porRota(r);
    return [`## ${p.nome}`, `${SITE}${p.rota}`, '', p.descricao, ''];
  }),
  '## Perguntas frequentes',
  '',
  ...secoesFaq.flatMap((s) => [
    `### ${s.titulo}`,
    ...s.perguntas.flatMap((p) => [`**${p.q}**`, p.a, '']),
  ]),
  '## Blog',
  '',
  ...posts.flatMap((p) => [`- [${p.titulo}](${SITE}/${p.slug}/): ${p.descricao}`]),
  '',
].join('\n');

writeFileSync(`${RAIZ}public/llms.txt`, indice);
writeFileSync(`${RAIZ}public/llms-full.txt`, completo);
console.log(`public/llms.txt ${(Buffer.byteLength(indice) / 1024).toFixed(1)} KB · ${info.length} páginas`);
console.log(`public/llms-full.txt ${(Buffer.byteLength(completo) / 1024).toFixed(1)} KB · ${secoesFaq.reduce((n, s) => n + s.perguntas.length, 0)} perguntas · ${posts.length} posts`);
