// Página Quem somos. A documentação funcional (seção 2) diz "Quem somos: sem alteração nesta rodada; só as
// substituições globais da seção 11 se algum termo aparecer" — nenhum aparece. Os textos são literais da
// página do WordPress (innerplacement.com.br/quem-somos/, conferida em 01/10/2026). Única correção: a aspa
// de fechamento solta no fim da frase de abertura, sem a de abertura.
// Fotos em src/assets/equipe/ (não public/equipe/): import comum, para o <Image> (astro:assets) otimizar
// — gerar WebP/AVIF no tamanho certo — em vez de servir o arquivo original direto, sem processar.
import fotoCesar from '../assets/equipe/cesar-cordeiro.webp';
import fotoDebora from '../assets/equipe/debora-ereno.webp';
import fotoPaula from '../assets/equipe/paula-oliveira.webp';

export const abertura =
  'Nosso time é formado por profissionais altamente experientes em desenvolvimento executivo e gestão de carreira, combinando expertise em liderança, negócios e transformação profissional.';

export type Socio = { id: string; nome: string; foto: ImageMetadata; linkedin: string; citacao: string; perfil: string[]; formacao: string };

export const socios: Socio[] = [
  {
    id: 'cesar-cordeiro', nome: 'César Cordeiro', foto: fotoCesar,
    linkedin: 'https://www.linkedin.com/in/cesarcordeiro/',
    citacao: 'Todo profissional carrega mais do que imagina. Meu papel é ajudar a descobrir isso — e a comunicar da forma que o mercado precisa ouvir.',
    perfil: [
      'César tem o dom raro de fazer as pessoas se sentirem compreendidas — e, a partir daí, desafiadas a ir além. Sua inteligência emocional e empatia natural criam um espaço onde o profissional consegue enxergar com clareza o que estava nublado pela pressão do momento.',
      'Com macro visão e pensamento rápido, ele não apenas escuta — ele identifica padrões, conecta pontos e devolve ao cliente uma perspectiva que eleva. Acredita que cada transição individual é parte de algo maior: uma contribuição real para o mundo do trabalho.',
    ],
    formacao: 'Economista. Pós-graduado em Administração pela Universitá Bocconi (Itália). Especializado em RH pela Harvard Extension School. Master in Science of Management pela Arthur D. Little (Boston). Master Coach pelo CAC e HR Agile Practitioner.',
  },
  {
    id: 'debora-ereno', nome: 'Débora Ereno', foto: fotoDebora,
    linkedin: 'https://www.linkedin.com/in/debora-ereno-da-silva/',
    citacao: 'Quando alguém chega até mim num momento de transição, o que mais precisa não é de uma lista de passos. Precisa de alguém que acredite que vai dar certo — e saiba mostrar como.',
    perfil: [
      'Débora pensa rápido, decide com clareza e transforma ideias em movimento real. Sua energia prática e estratégica é o que faz com que um plano de transição saia do papel e aconteça — com agilidade, sem perder profundidade.',
      'Versátil e perspicaz, ela transita com naturalidade entre o universo das empresas e o universo das pessoas. Fala a língua do RH, do gestor e do profissional em transição com a mesma facilidade — o que lhe dá uma visão 360° que poucos consultores conseguem oferecer. Sua generosidade genuína está presente em cada processo que conduz.',
    ],
    formacao: 'Administradora. MBA em Gestão de Negócios. Master Coach certificada internacionalmente pelo CAC e Executive Coach & Trainer pela Net Profit Brasil.',
  },
  {
    id: 'paula-oliveira', nome: 'Paula Oliveira', foto: fotoPaula,
    linkedin: 'https://www.linkedin.com/in/paula-alessandra-oliveira/',
    citacao: 'Toda transição, por mais desafiadora que pareça no início, carrega em si a semente de algo muito maior. Meu trabalho é ajudar a encontrar essa semente — e a plantá-la no lugar certo.',
    perfil: [
      'Paula enxerga o que outros não veem. Sua mente estratégica e detalhista processa situações complexas e as devolve de forma clara, acessível, quase inevitável. É essa capacidade de estruturar o que parece caos interno em algo compreensível e acionável que define seu trabalho.',
      'Articulada e perceptiva, com habilidade natural de enxergar os dois lados de qualquer situação, ela cria nas sessões um espaço raro: onde razão e estratégia coexistem, onde o profissional consegue finalmente nomear o que sente — e transformar isso em direção concreta.',
    ],
    formacao: 'Psicóloga pela PUC/SP. MBA em RH pela FIA/USP. Certificada internacionalmente pela ferramenta FACET5 (Londres) e em Coaching Executivo pelo LORE Institute (EUA), ICI e Newfield Consulting.',
  },
];
