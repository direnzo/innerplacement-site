// Utilitários do blog (src/content/blog, editado pelo painel /admin).
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Posts publicados (sem rascunho), do mais novo para o mais antigo.
export const publicados = async (): Promise<Post[]> =>
  (await getCollection('blog', (p) => !p.data.rascunho)).sort((a, b) => b.data.data.getTime() - a.data.data.getTime());

export const dataBR = (d: Date) => d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// Tempo de leitura (~200 palavras por minuto).
export const minutos = (corpo = '') => Math.max(1, Math.round(corpo.split(/\s+/).filter(Boolean).length / 200));
