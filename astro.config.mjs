import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://innerplacement.com.br',
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
  // sitemap.xml (o WordPress tinha, pelo Yoast; a v2 não tinha nenhum). /obrigado/ fica de fora: é
  // noindex (a página de confirmação do formulário, sem conteúdo para indexar).
  integrations: [sitemap({ filter: (url) => !url.endsWith('/obrigado/') })],
});
