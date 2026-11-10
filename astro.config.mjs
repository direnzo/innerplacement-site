import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// lastmod do sitemap: só os posts têm data real (a mesma do dateModified do schema); as páginas ficam sem.
const POSTS = 'src/content/blog';
const lastmod = Object.fromEntries(readdirSync(POSTS).filter((f) => f.endsWith('.md')).map((f) => {
  const topo = readFileSync(`${POSTS}/${f}`, 'utf8').split('---')[1] ?? '';
  const data = (topo.match(/^atualizado:\s*["']?([\d-]+)/m) ?? topo.match(/^data:\s*["']?([\d-]+)/m))?.[1];
  return [`/${f.replace(/\.md$/, '')}/`, data];
}));

// Miniaturas dos cartões do blog, geradas no build para valer também nas capas enviadas pelo painel /admin
// (public/blog/imagens/ não passa pelo astro:assets). Larguras usadas em miniaturas(), src/lib/blog.ts.
const miniaturas = () => ({
  name: 'miniaturas-blog',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const { default: sharp } = await import('sharp');
      const pasta = fileURLToPath(new URL('blog/imagens/', dir));
      for (const f of readdirSync(pasta).filter((n) => n.endsWith('.webp'))) {
        for (const w of [640, 960]) {
          await sharp(pasta + f).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(pasta + f.replace(/\.webp$/, `-${w}.webp`));
        }
      }
    },
  },
});

export default defineConfig({
  site: 'https://innerplacement.com.br',
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/enviar.php': {
          target: process.env.INNER_PHP_ENDPOINT || 'http://127.0.0.1:18767',
          changeOrigin: true,
        },
      },
    },
  },
  // sitemap.xml (o WordPress tinha, pelo Yoast; a v2 não tinha nenhum). /obrigado/ fica de fora: é
  // noindex (a página de confirmação do formulário, sem conteúdo para indexar).
  integrations: [
    sitemap({
      filter: (url) => !/\/(obrigado|whatsapp)\/$/.test(url),
      serialize: (item) => ({ ...item, ...(lastmod[new URL(item.url).pathname] && { lastmod: lastmod[new URL(item.url).pathname] }) }),
    }),
    miniaturas(),
  ],
});
