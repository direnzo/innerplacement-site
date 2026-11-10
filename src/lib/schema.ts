// Blocos JSON-LD usados por mais de uma página.
export type Migalha = [nome: string, href?: string];

// BreadcrumbList a partir da trilha da página ([nome, link], a última sem link), sempre começando em Início.
export const trilhaSchema = (migalhas: Migalha[], site: URL | undefined) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: ([['Início', '/'], ...migalhas] as Migalha[]).map(([name, href], i) => ({
    '@type': 'ListItem', position: i + 1, name, ...(href && { item: new URL(href, site).href }),
  })),
});
