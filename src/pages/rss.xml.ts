// RSS do blog, em /rss.xml. Os endereços de feed do WordPress redirecionam para cá (public/.htaccess).
import type { APIRoute } from 'astro';
import { publicados } from '../lib/blog';

const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await publicados();
  const itens = posts.map((p) => {
    const url = new URL(`/${p.id}/`, site).href;
    return `<item><title>${xml(p.data.titulo)}</title><link>${url}</link><guid>${url}</guid><pubDate>${p.data.data.toUTCString()}</pubDate><description>${xml(p.data.descricao)}</description></item>`;
  }).join('');
  const blog = new URL('/blog/', site).href;
  const corpo = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Blog · Inner Placement</title><link>${blog}</link><atom:link href="${new URL('/rss.xml', site).href}" rel="self" type="application/rss+xml"/><description>Explore conteúdos exclusivos sobre transição de carreira, desenvolvimento profissional e estratégias para crescimento no mercado de trabalho, com insights e dicas para sua jornada.</description><language>pt-BR</language>${itens}</channel></rss>`;
  return new Response(corpo, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
