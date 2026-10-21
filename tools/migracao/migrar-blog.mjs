// Migração única do blog do WordPress para a v2.
// Uso: (cd tools/migracao && npm install) && node tools/migracao/migrar-blog.mjs
// Para só um post novo: SLUGS=<slug> node tools/migracao/migrar-blog.mjs
// Lê os posts publicados pela API pública da produção (innerplacement.com.br/wp-json), converte o HTML em
// Markdown e grava src/content/blog/<slug>.md, com a capa em public/blog/imagens/<slug>.webp.
// Os endereços continuam os mesmos (/<slug>/), para não perder posição no Google nem links compartilhados.
// Aplica as substituições globais da documentação funcional (seção 11) que não dependem de contexto e
// lista as que dependem ("rede", "a gente") para revisão humana.
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import TurndownService from 'turndown';

const RAIZ = new URL('../../', import.meta.url).pathname;
const sharp = createRequire(RAIZ + 'tools/imagem/')('sharp');
const API = 'https://innerplacement.com.br/wp-json/wp/v2';

// Categorias: nomes antigos de programa trocados pela regra da documentação (seção 11 e 10.1).
const CATEGORIA = { 'Go Fast': 'Focus', 'Go Fast Corporate': 'Focus', 'Next Level Corporate': 'Next Level', 'Platinum Executivo': 'Platinum' };
// Substituições sem ambiguidade (seção 11). As demais só são listadas.
const TROCAS = [
  [/Next Level Corporate/g, 'Next Level'],
  [/Go ?Fast Corporate/gi, 'Focus'],
  [/Go ?Fast/gi, 'Focus'],
  [/Platinum Executivo/g, 'Platinum'],
  [/(\+|mais de )2\.?000( profissionais)?/gi, '+1500 profissionais atendidos na história dos sócios'],
  [/(\+|mais de )20 anos/gi, '+15 anos de experiência dos sócios'],
  [/em até 4,5 meses/gi, 'em média, em 4,5 meses'],
  [/,? ?em até 1 dia útil/gi, ''],
];
// Links internos: endereços antigos do WordPress → rotas da v2 (relativas, valem também na /v2-teste/).
const WHATSAPP = 'https://wa.me/5511984311675';
const ROTA = { '': '/', 'profissionais': '/desenvolvimento-de-carreira/', '#depoimentos': '/depoimentos/', 'whatsapp': WHATSAPP,
  'profissionais-transicao-de-carreira-outplacement': '/transicao-e-recolocacao/', 'profissionais-evolucao-de-carreira': '/desenvolvimento-de-carreira/',
  'empresas-desenvolvimento-de-executivos': '/desenvolvimento-de-executivos/', 'empresas': '/outplacement/', 'faq': '/perguntas-frequentes/' };
const linksInternos = (md) => md.replace(/\]\(https?:\/\/(?:www\.)?innerplacement\.com\.br\/?([^)\s]*)\)/g, (_, caminho) => {
  const chave = caminho.replace(/\/$/, '');
  return '](' + (ROTA[chave] ?? '/' + chave + (chave && !chave.startsWith('#') ? '/' : '')) + ')';
});
// Descrição genérica do site que o Yoast devolve quando o post não tem descrição própria.
const DESCRICAO_SITE = /^Conectamos pessoas aos seus propósitos/;
const REVISAR = [/\brede\b/gi, /\ba gente\b/gi, /\bPremium\b/g, /\bespecialista\b/gi];

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', emDelimiter: '*', strongDelimiter: '**' });
td.remove(['script', 'style', 'figure']);
const texto = (html) => html.replace(/<[^>]+>/g, '').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&#8220;|&#8221;/g, '"').replace(/&#8216;|&#8217;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#[0-9]+;/g, (e) => String.fromCodePoint(+e.slice(2, -1))).trim();
const yamlStr = (s) => JSON.stringify(s); // string YAML válida (aspas duplas, escapes JSON)

async function json(url) { const r = await fetch(url); if (!r.ok) throw new Error(`${r.status} ${url}`); return r.json(); }

// SLUGS=a,b limita a migração a esses posts (evita sobrescrever posts já editados pelo painel).
const SLUGS = process.env.SLUGS?.split(',');
const posts = (await json(`${API}/posts?per_page=100&status=publish&_embed=wp:featuredmedia,author,wp:term`)).filter((p) => !SLUGS || SLUGS.includes(p.slug));
mkdirSync(RAIZ + 'src/content/blog', { recursive: true });
mkdirSync(RAIZ + 'public/blog/imagens', { recursive: true });
const relatorio = [];

for (const p of posts) {
  const slug = p.slug;
  const titulo = texto(p.title.rendered);
  let corpo = td.turndown(p.content.rendered)
    .replace(/ {2,}\n/g, '\n')          // quebras manuais do editor (dois espaços no fim da linha)
    .replace(/[ \u00a0]{2,}/g, ' ')        // espaços duplos dentro do texto
    .replace(/\n{3,}/g, '\n\n').trim();
  corpo = linksInternos(corpo);
  for (const [de, para] of TROCAS) corpo = corpo.replace(de, para);
  const yoast = texto(p.yoast_head_json?.description || '');
  const descricao = texto(yoast && !DESCRICAO_SITE.test(yoast) ? yoast : p.excerpt.rendered).replace(/\s+/g, ' ').replace(/\s*\[(…|&hellip;)\]\s*$/, '…').slice(0, 300);
  const termos = (p._embedded?.['wp:term'] ?? []).flat().filter((t) => t.taxonomy === 'category').map((t) => texto(t.name));
  const categorias = [...new Set(termos.map((c) => CATEGORIA[c] ?? c))];
  const autor = p._embedded?.author?.[0]?.name || 'Inner Placement';
  const midia = p._embedded?.['wp:featuredmedia']?.[0];

  let imagem = '', alt = '';
  if (midia?.source_url) {
    const buf = Buffer.from(await (await fetch(midia.source_url)).arrayBuffer());
    const destino = `public/blog/imagens/${slug}.webp`;
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(RAIZ + destino);
    // Versão JPG 1200 × 630 para o compartilhamento (WhatsApp e LinkedIn preferem JPG).
    await sharp(buf).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 84, mozjpeg: true }).toFile(RAIZ + `public/blog/imagens/${slug}-og.jpg`);
    imagem = `/blog/imagens/${slug}.webp`;
    alt = texto(midia.alt_text || '') || titulo;
  }

  const pendentes = REVISAR.flatMap((re) => [...corpo.matchAll(re)].map((m) => corpo.slice(Math.max(0, m.index - 50), m.index + 60).replace(/\n/g, ' ')));
  relatorio.push({ slug, pendentes });

  const front = [
    '---',
    `titulo: ${yamlStr(titulo)}`,
    `descricao: ${yamlStr(descricao)}`,
    `data: ${p.date.slice(0, 10)}`,
    `atualizado: ${p.modified.slice(0, 10)}`,
    `autor: ${yamlStr(autor)}`,
    `categorias: [${categorias.map(yamlStr).join(', ')}]`,
    imagem ? `imagem: ${yamlStr(imagem)}` : null,
    imagem ? `imagem_alt: ${yamlStr(alt)}` : null,
    'rascunho: false',
    '---',
  ].filter(Boolean).join('\n');
  writeFileSync(RAIZ + `src/content/blog/${slug}.md`, `${front}\n\n${corpo}\n`);
  console.log(`${p.date.slice(0, 10)}  ${slug}  [${categorias.join(', ')}]  ${imagem ? 'capa ok' : 'sem capa'}`);
}

console.log(`\n${posts.length} posts migrados.`);
const comPendencia = relatorio.filter((r) => r.pendentes.length);
if (comPendencia.length) {
  console.log('\nTermos da seção 11 que dependem de contexto (revisar à mão):');
  for (const r of comPendencia) for (const t of r.pendentes) console.log(`  ${r.slug}: …${t}…`);
}
