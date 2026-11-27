// Constantes globais. O texto do CTA fica num lugar só (pendência P1 da documentação).
export const CTA = 'Conversar com um especialista';
export const CTA_EMPRESA = 'Quero conversar sobre uma situação executiva'; // fechamento das páginas de empresa (doc. v2, 3.3)
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
// O primeiro é a matriz (São Paulo, confirmado pelo dono em 09/11/2026): o schema usa essa ordem.
export const enderecos = [
  { cidade: 'São Paulo', uf: 'SP', rua: 'Av. Tabapuã, 500, cj. 32', bairro: 'Itaim Bibi', cep: '04533-001' },
  { cidade: 'Curitiba', uf: 'PR', rua: 'R. Visconde do Rio Branco, 1358, cj. 703', bairro: 'Centro', cep: '80420-210' },
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
  paraEmpresa: '/para-sua-empresa/',
  empresaNextLevel: '/para-sua-empresa/next-level/',
  executiveAlignment: '/para-sua-empresa/executive-alignment/',
  empresaTransition: '/para-sua-empresa/outplacement/',
  paraVoce: '/para-voce/',
  voceNextLevel: '/para-voce/next-level/',
  voceTransition: '/para-voce/transicao-e-recolocacao/',
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

// Os dois públicos do menu e do rodapé (doc. v2, 3.1 e 3.4); o item pai leva ao hub.
export const publicos = [
  { grupo: 'Para sua empresa', href: rotas.paraEmpresa, itens: [
    { nome: 'Visão geral', href: rotas.paraEmpresa },
    { nome: 'Next Level', href: rotas.empresaNextLevel },
    { nome: 'Executive Alignment', href: rotas.executiveAlignment },
    { nome: 'Transition', href: rotas.empresaTransition },
  ]},
  { grupo: 'Para você', href: rotas.paraVoce, itens: [
    { nome: 'Visão geral', href: rotas.paraVoce },
    { nome: 'Next Level', href: rotas.voceNextLevel },
    { nome: 'Transition', href: rotas.voceTransition },
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
  { n: '1:1', t: 'acompanhamento personalizado' },
];

// Logos de clientes: a documentação v2 (8/11/2026) reduziu aos três abaixo.
export const logos = [
  { id: 'mosaic', nome: 'Mosaic', h: 50, autorizado: true },
  { id: 'bcg', nome: 'BCG', h: 44, autorizado: true },
  { id: 'santillana', nome: 'Santillana', h: 54, autorizado: true },
];
