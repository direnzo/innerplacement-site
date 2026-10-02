// Constantes globais. O texto do CTA fica num lugar só (pendência P1 da documentação).
export const CTA = 'Conversar com um especialista';
export const WHATSAPP_URL = 'https://wa.me/5511984311675';
export const WHATSAPP_TXT = '+55 11 98431-1675';
export const TELEFONE_LINK = 'tel:+5511984311675'; // mesmo número do WhatsApp, para quem prefere ligar
export const EMAIL = 'contato@innerplacement.com.br';
// Mesmo contêiner do Gerenciador de Tags do Google que o site atual usa (confirmado no código-fonte
// público de innerplacement.com.br em 02/10/2026), para manter o histórico do Analytics ao trocar de
// site. Ligado com o Consent Mode do Google: só mede com a permissão dada no aviso de cookies.
export const GTM_ID = 'GTM-ND356DQM';

// Endereços dos dois escritórios (iguais aos do schema.org em Base.astro — fonte única). mapsHref monta
// o link do Google Maps a partir deles, para o rodapé e qualquer outro lugar que precisar.
export const enderecos = [
  { cidade: 'São Paulo', uf: 'SP', rua: 'Av. Tabapuã, 500, cj. 32', bairro: 'Itaim Bibi' },
  { cidade: 'Curitiba', uf: 'PR', rua: 'R. Visconde do Rio Branco, 1358, cj. 703', bairro: 'Centro' },
] as const;
export const mapsHref = (e: (typeof enderecos)[number]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${e.rua}, ${e.bairro}, ${e.cidade} - ${e.uf}`)}`;

// Redes sociais oficiais (confirmadas no rodapé de innerplacement.com.br em 02/10/2026).
export const redes = [
  { nome: 'LinkedIn', href: 'https://www.linkedin.com/company/inner-placement/' },
  { nome: 'Instagram', href: 'https://www.instagram.com/innerplacement/' },
  { nome: 'Facebook', href: 'https://www.facebook.com/innerplacement/' },
  { nome: 'YouTube', href: 'https://www.youtube.com/@InnerPlacement' },
] as const;

export const rotas = {
  inicio: '/',
  carreira: '/desenvolvimento-de-carreira/',
  transicao: '/transicao-e-recolocacao/',
  executivos: '/desenvolvimento-de-executivos/',
  outplacement: '/outplacement/',
  depoimentos: '/depoimentos/',
  faq: '/perguntas-frequentes/',
  manifesto: '/manifesto/',
  contato: '/contato/',
  obrigado: '/obrigado/',
  quemSomos: '/quem-somos/',
  blog: '/blog/',
  // Migrada do WordPress para a v2 em 02/10/2026 (era um link externo para o site antigo).
  privacidade: '/politica-de-privacidade/',
} as const;

export const servicos = [
  { grupo: 'Para você', itens: [
    { nome: 'Desenvolvimento de Carreira', href: rotas.carreira },
    { nome: 'Transição e Recolocação', href: rotas.transicao },
  ]},
  { grupo: 'Para sua empresa', itens: [
    { nome: 'Desenvolvimento de Executivos', href: rotas.executivos },
    { nome: 'Outplacement', href: rotas.outplacement },
  ]},
];

export const menu = [
  { nome: 'Depoimentos', href: rotas.depoimentos },
  { nome: 'Perguntas frequentes', href: rotas.faq },
  { nome: 'Manifesto', href: rotas.manifesto },
  { nome: 'Quem somos', href: rotas.quemSomos },
  { nome: 'Blog', href: rotas.blog },
];

export const numeros = [
  { n: '+15', t: 'anos de experiência dos sócios' },
  { n: '+1500', t: 'profissionais atendidos na história dos sócios' },
  { n: '86%', t: 'recolocados, em média, em 4,5 meses' },
];

// Logos de clientes: todos autorizados (confirmação do dono em 01/10/2026; a documentação funcional citava
// só Mosaic, BCG e Santillana).
export const logos = [
  { id: 'bcg', nome: 'BCG', h: 44, autorizado: true },
  { id: 'mosaic', nome: 'Mosaic', h: 50, autorizado: true },
  { id: 'santillana', nome: 'Santillana', h: 54, autorizado: true },
  { id: 'certisign', nome: 'CertiSign', h: 38, autorizado: true },
  { id: 'symrise', nome: 'Symrise', h: 40, autorizado: true },
  { id: 'emais', nome: 'E+ Transição Energética', h: 44, autorizado: true },
  { id: 'borkar', nome: 'Borkar', h: 50, autorizado: true },
  { id: 'goodstorage', nome: 'GoodStorage', h: 28, autorizado: true },
  { id: 'phisalia', nome: 'Phisalia', h: 52, autorizado: true },
  { id: 'tb', nome: 'TB', h: 48, autorizado: true },
];
