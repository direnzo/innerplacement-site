// Perguntas frequentes, texto literal do "FAQ revisado NOV26" aprovado pela Inner, com as decisões dos sócios de 09/11/2026.
// Fonte única: a home e as páginas de programa usam as perguntas daqui. Parágrafos separados por linha em branco.
import { rotas } from './site.ts';

export type Links = [termo: string, href: string][];
export type Pergunta = { id: string; q: string; a: string; links?: Links };
type Grupo = { titulo?: string; href?: string; perguntas: Pergunta[] };

// Produto citado na resposta vira link para a página dele, do público certo (Orientações do Q&A, item 5).
export const linksVoce: Links = [
  ['Transition Platinum', rotas.voceTransition], ['Transition Focus', rotas.voceTransition],
  ['Next Level', rotas.voceNextLevel], ['Executive Alignment', rotas.executiveAlignment],
];
export const linksEmpresa: Links = [
  ['Transition Platinum', rotas.empresaTransition], ['Transition Focus', rotas.empresaTransition],
  ['Next Level', rotas.empresaNextLevel], ['Executive Alignment', rotas.executiveAlignment],
  ['Outplacement', rotas.empresaTransition], ['outplacement', rotas.empresaTransition], ['Transition', rotas.empresaTransition],
];

const secoes: { id: string; titulo: string; links: Links; grupos: Grupo[] }[] = [
  { id: 'para-comecar', titulo: 'Para começar', links: linksVoce, grupos: [{ perguntas: [
    { id: 'agencia', q: 'A Inner Placement é uma agência de empregos?',
      a: 'Não. A Inner não tem vagas prontas nem faz recrutamento e seleção para empresas. Trabalhamos a carreira do profissional e, na transição, apoiamos a busca de oportunidades com estratégia, posicionamento, network e job hunting dirigido.' },
    { id: 'o-que-faz', q: 'O que faz a Inner Placement?',
      a: 'A Inner Placement é uma consultoria de desenvolvimento de carreira. Atuamos com executivos e empresas em três movimentos: avançar, quando é preciso estar pronto para mais; ajustar, quando algo relevante precisa mudar; e transitar, quando um ciclo termina e o próximo movimento precisa ser construído.\n\nO trabalho combina leitura de contexto, estratégia e acompanhamento individual.' },
    { id: 'programa-certo', q: 'Qual é o programa certo para a minha situação?',
      a: 'Depende do movimento.\n\nSe você quer crescer, ampliar impacto ou ajustar algum aspecto da sua atuação, o caminho é o Next Level. Se está encerrando um ciclo, ou se preparando para isso, o caminho é o Transition Platinum ou o Transition Focus, conforme a complexidade e o nível de acompanhamento necessário.\n\nPara empresas, há ainda o Executive Alignment, quando existe valor em preservar um executivo, mas algo relevante precisa mudar.' },
    { id: 'primeira-conversa', q: 'A primeira conversa é gratuita?',
      a: 'Sim, e sem compromisso. Nela entendemos seu momento, o que está em jogo e onde você precisa chegar. Ao final, dizemos com clareza se podemos ajudar e qual formato faz sentido.' },
    { id: 'quem-acompanha', q: 'Quem me acompanha durante o programa?',
      a: 'O acompanhamento é individual e realizado por profissionais seniores da Inner, com competências complementares. A composição e o suporte variam conforme a solução e as necessidades do processo.' },
  ]}]},
  { id: 'para-quem-quer-avancar', titulo: 'Para quem quer avançar', links: linksVoce, grupos: [{ titulo: 'Next Level', href: rotas.voceNextLevel, perguntas: [
    { id: 'nl-como-funciona', q: 'Como funciona o Next Level?',
      a: 'O Next Level combina desenvolvimento e estratégia de carreira. Partimos do impacto que você quer ter e identificamos o que precisa ser preservado, ampliado ou ajustado para chegar ao próximo nível de atuação.\n\nO processo é individual, confidencial e conectado às situações reais do seu dia a dia.' },
    { id: 'nl-por-conta-propria', q: 'Posso contratar o Next Level por conta própria, sem passar pela empresa?',
      a: 'Sim. O Next Level e os programas de Transition podem ser contratados diretamente pelo executivo ou pela empresa.\n\nQuando é você quem contrata, nada é compartilhado com sua empresa atual. O Executive Alignment, por sua natureza, é uma solução contratada pela organização e construída com o executivo.' },
    { id: 'nl-empresa-sabe', q: 'Se a empresa contratar o Next Level, ela fica sabendo do que conversamos?',
      a: 'Não. Empresa, executivo e Inner alinham o objetivo do trabalho, e a empresa acompanha a evolução em relação a ele.\n\nO conteúdo das conversas individuais permanece confidencial.' },
    { id: 'nl-duracao', q: 'Quanto tempo dura o Next Level?',
      a: 'A duração acompanha o objetivo definido e o ritmo necessário para que o executivo possa experimentar, observar e ajustar sua atuação entre os encontros.\n\nO processo não é organizado apenas por quantidade de sessões, mas pelo movimento que precisa ser construído.' },
  ]}]},
  { id: 'para-quem-esta-em-transicao', titulo: 'Para quem está em transição', links: linksVoce, grupos: [{ titulo: 'Transition', href: rotas.voceTransition, perguntas: [
    { id: 'sigilo', q: 'Como a Inner lida com o sigilo?',
      a: 'O sigilo é premissa do trabalho. Nada é publicado e nenhuma abordagem é feita em seu nome sem sua autorização.\n\nSe você ainda está empregado, o posicionamento, o LinkedIn e a estratégia de acesso ao mercado são conduzidos com o cuidado necessário para preservar seu movimento até que seja o momento certo de torná-lo público.' },
    { id: 'poucas-respostas', q: 'Por que estou recebendo poucas respostas às minhas candidaturas?',
      a: 'Não existe uma única causa. Posicionamento pouco claro, currículo ou LinkedIn desalinhados à oportunidade, canal inadequado de acesso e características específicas do mercado podem interferir.\n\nO primeiro passo é entender onde o processo está parando para corrigir a estratégia certa, e não simplesmente aumentar o número de candidaturas.' },
    { id: 'prazo', q: 'E se eu não me recolocar no prazo esperado?',
      a: 'O tempo de uma transição depende de senioridade, mercado, direcionamento e disponibilidade de oportunidades.\n\nQuando o processo se alonga, revisamos o que está acontecendo e ajustamos a estratégia. No programa em que o acompanhamento se estende até a recolocação, seguimos juntos durante esse movimento.' },
    { id: 'network', q: 'Eu já tenho um bom network. O que a Inner agrega?',
      a: 'Ter um network e saber ativá-lo com estratégia são coisas diferentes.\n\nOrganizamos com você quem acessar, com qual objetivo, em que momento e com qual abordagem. Network não é pedir emprego: é construir acesso, informação e conversas relevantes.' },
    { id: 'tempo-recolocacao', q: 'Quanto tempo leva uma recolocação?',
      a: 'Não existe um prazo igual para todos. Área, senioridade, momento do mercado, direcionamento e disponibilidade de oportunidades interferem no tempo.\n\nComo referência histórica, 86% dos nossos assessorados se recolocam, em média, em 4,5 meses. O acompanhamento trabalha aquilo sobre o que podemos atuar: clareza de direção, posicionamento, acesso ao mercado e preparo para cada oportunidade.' },
    { id: 'mercado-oculto', q: 'Como funcionam as oportunidades que não são divulgadas? Vocês acessam o chamado mercado oculto?',
      a: 'Nem toda oportunidade executiva é anunciada publicamente. Por isso, o trabalho não depende apenas de vagas abertas.\n\nCombinamos network, relações com headhunters, mapeamento de empresas e busca ativa de oportunidades. A Inner ajuda a construir esses caminhos; não promete acesso exclusivo ou direto a oportunidades não divulgadas.' },
    { id: 'platinum-focus', q: 'Qual é a diferença entre Transition Platinum e Transition Focus?',
      a: 'Os dois seguem o mesmo método.\n\nO Transition Platinum é indicado para transições de maior complexidade e oferece acompanhamento próximo e contínuo. O Transition Focus é para quem pode conduzir a própria transição com maior autonomia, contando com estrutura e suporte nos momentos decisivos.' },
  ]}]},
  { id: 'para-sua-empresa', titulo: 'Para sua empresa', links: linksEmpresa, grupos: [
    { titulo: 'Avançar | Next Level', href: rotas.empresaNextLevel, perguntas: [
      { id: 'e-nl-quando', q: 'Quando faz sentido contratar o Next Level para um executivo?',
        a: 'Quando o executivo precisa estar pronto para mais: uma promoção, sucessão, ampliação de escopo, maior exposição ou necessidade de ampliar influência e relevância.\n\nO trabalho prepara o profissional para responder a um novo nível de complexidade sem perder os ativos que sustentaram sua trajetória até ali.' },
      { id: 'e-treinamento', q: 'Como saber se o executivo precisa de Next Level, Executive Alignment ou de um treinamento?',
        a: 'Um treinamento faz sentido quando existe uma necessidade comum a um grupo.\n\nO Next Level é individual e prepara o executivo para ampliar complexidade, responsabilidade ou impacto.\n\nO Executive Alignment entra quando existe um gap relevante de comportamento, posicionamento, liderança ou relação que precisa mudar para preservar a atuação do executivo.' },
    ]},
    { titulo: 'Ajustar | Executive Alignment', href: rotas.executiveAlignment, perguntas: [
      { id: 'ea-o-que-e', q: 'O que é o Executive Alignment?',
        a: 'É uma solução individual para situações em que um executivo tem valor e capacidade de entrega, mas algum aspecto de comportamento, posicionamento, liderança ou relação começou a representar risco para sua trajetória ou para a organização.\n\nO objetivo é trabalhar o que precisa mudar sem descaracterizar os ativos que sustentam sua relevância.' },
      { id: 'ea-quando', q: 'Quando o Executive Alignment faz sentido?',
        a: 'Quando existe interesse real em preservar o executivo e espaço para desenvolvimento e mudança.\n\nPode envolver feedbacks críticos, dificuldades relacionais, impacto sobre o time, gaps identificados em avaliações 360 ou dificuldade de adaptação a um novo nível de senioridade.' },
      { id: 'ea-compliance', q: 'O Executive Alignment pode ser utilizado depois de uma situação de Compliance?',
        a: 'Sim, quando a organização já tratou a questão em suas instâncias próprias e entende que existe espaço para desenvolvimento e permanência do executivo.\n\nA Inner não conduz investigações, não determina se houve violação e não prescreve medidas disciplinares.' },
      { id: 'nl-ea-diferenca', q: 'Qual é a diferença entre Next Level e Executive Alignment?',
        a: 'O Next Level parte de uma necessidade de evolução: preparar o executivo para mais complexidade, responsabilidade ou impacto.\n\nO Executive Alignment parte de uma necessidade de ajuste: existe valor em preservar aquele profissional, mas algo relevante em sua atuação precisa mudar.' },
    ]},
    { titulo: 'Transitar | Outplacement', href: rotas.empresaTransition, perguntas: [
      { id: 'grupo', q: 'Como funciona o outplacement para um grupo?',
        a: 'A Inner estrutura o apoio conforme o perfil e o tamanho do grupo, combinando uma trilha estruturada com acompanhamento individual nos momentos decisivos.\n\nO objetivo é preservar a individualidade de cada transição, mesmo quando a empresa está conduzindo vários desligamentos.' },
      { id: 'e-platinum-focus', q: 'Quando utilizar Transition Platinum ou Transition Focus no outplacement?',
        a: 'O Transition Platinum é indicado para transições de maior complexidade, que exigem acompanhamento individual próximo e contínuo.\n\nO Transition Focus atende profissionais que podem conduzir o processo com maior autonomia, contando com estrutura e suporte nos pontos decisivos da transição.' },
      { id: 'empresa-acompanha', q: 'Quando a empresa contrata, o que ela acompanha?',
        a: 'A empresa acompanha o andamento e a evolução do processo, sem acesso ao conteúdo das conversas individuais, que permanece confidencial.\n\nNo Transition, acompanha a evolução da transição e os principais marcos do processo, até seu encerramento.\n\nNo Next Level e no Executive Alignment, o ponto de partida é um objetivo construído em conjunto entre executivo, empresa e Inner. Ao longo do processo, a empresa acompanha a evolução em relação a esse objetivo, preservando o espaço confidencial de trabalho com o executivo.' },
    ]},
  ]},
  { id: 'investimento-e-condicoes', titulo: 'Investimento e condições', links: linksVoce, grupos: [{ perguntas: [
    { id: 'investimento', q: 'Como funciona o investimento?',
      a: 'O investimento depende da solução e do nível de acompanhamento indicado e é apresentado em uma proposta específica após a primeira conversa.\n\nEssa conversa é gratuita e sem compromisso: entendemos a situação e indicamos o formato mais adequado.' },
  ]}]},
];

export const secoesFaq = secoes.map((s) => ({
  ...s, grupos: s.grupos.map((g) => ({ ...g, perguntas: g.perguntas.map((p) => ({ ...p, links: s.links })) })),
}));

const todas = Object.fromEntries(secoesFaq.flatMap((s) => s.grupos.flatMap((g) => g.perguntas)).map((p) => [p.id, p]));
export const perguntas = (ids: string[], links?: Links) => ids.map((id) => ({ ...todas[id], ...(links && { links }) }));
export const faqHome = perguntas(['programa-certo', 'sigilo', 'nl-por-conta-propria', 'empresa-acompanha']);

// FAQPage (schema.org) com as mesmas perguntas que o <details> mostra; a resposta vai em texto puro, sem os links do HTML.
export const faqSchema = (itens: Pergunta[]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: itens.map((p) => ({ '@type': 'Question', name: p.q, acceptedAnswer: { '@type': 'Answer', text: p.a.replace(/\n\n/g, ' ') } })),
});

// HTML do parágrafo: a primeira menção de cada produto vira link, exceto para a própria página.
const escapa = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const paragrafos = (p: Pergunta, paginaAtual: string) => {
  const links = (p.links ?? []).filter(([, h]) => h !== paginaAtual);
  const usados = new Set<string>();
  const termos = links.length ? new RegExp(links.map(([t]) => t).join('|'), 'g') : null;
  return p.a.split('\n\n').map((par) => (termos ? escapa(par).replace(termos, (t) => {
    if (usados.has(t)) return t;
    usados.add(t);
    return `<a href="${links.find(([x]) => x === t)![1]}" class="underline underline-offset-2 hover:text-coral-d">${t}</a>`;
  }) : escapa(par)));
};
