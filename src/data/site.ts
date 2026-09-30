// Constantes globais. O texto do CTA fica num lugar só (pendência P1 da documentação).
export const CTA = 'Conversar com um especialista';
export const WHATSAPP_URL = 'https://wa.me/5511984311675';
export const WHATSAPP_TXT = '+55 11 98431-1675';
export const EMAIL = 'contato@innerplacement.com.br';
export const CIDADES = 'São Paulo · Curitiba';
export const SITE_ATUAL = 'https://innerplacement.com.br';

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
  quemSomos: `${SITE_ATUAL}/quem-somos/`,
  blog: `${SITE_ATUAL}/blog/`,
  privacidade: `${SITE_ATUAL}/politica-de-privacidade/`,
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
  { nome: 'Manifesto', href: rotas.manifesto },
  { nome: 'Quem somos', href: rotas.quemSomos },
  { nome: 'Blog', href: rotas.blog },
];

export const numeros = [
  { n: '+15', t: 'anos de experiência dos sócios' },
  { n: '+1500', t: 'profissionais atendidos na história dos sócios' },
  { n: '86%', t: 'recolocados, em média, em 4,5 meses' },
];

// Logos: a documentação autoriza hoje só Mosaic, BCG e Santillana. Os demais aguardam autorização de marca.
export const logos = [
  { id: 'bcg', nome: 'BCG', h: 44, autorizado: true },
  { id: 'mosaic', nome: 'Mosaic', h: 50, autorizado: true },
  { id: 'santillana', nome: 'Santillana', h: 54, autorizado: true },
  { id: 'certisign', nome: 'CertiSign', h: 38, autorizado: false },
  { id: 'symrise', nome: 'Symrise', h: 40, autorizado: false },
  { id: 'emais', nome: 'E+ Transição Energética', h: 44, autorizado: false },
  { id: 'borkar', nome: 'Borkar', h: 50, autorizado: false },
  { id: 'goodstorage', nome: 'GoodStorage', h: 28, autorizado: false },
  { id: 'phisalia', nome: 'Phisalia', h: 52, autorizado: false },
  { id: 'tb', nome: 'TB', h: 48, autorizado: false },
];
