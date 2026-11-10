// Coleções de conteúdo editadas pelo painel (/admin, public/admin/config.yml).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog: um arquivo Markdown por post em src/content/blog/<slug>.md. O slug (nome do arquivo) é o endereço
// do post na raiz do site (/<slug>/), igual ao do WordPress.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string(),
    data: z.coerce.date(),
    atualizado: z.coerce.date().optional(),
    autor: z.string().default('Inner Placement'),
    categorias: z.array(z.string()).default([]),
    tema: z.string().optional(),
    imagem: z.string().optional(),
    imagem_alt: z.string().optional(),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { blog };
