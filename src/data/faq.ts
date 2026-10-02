// Perguntas frequentes, texto literal da documentação funcional (seção 8).
// Fonte única: a home usa F03, F10, F07 e F05 daqui.
export type Pergunta = { id: string; q: string; a: string };

export const secoesFaq: { id: string; titulo: string; perguntas: Pergunta[] }[] = [
  { id: 'para-comecar', titulo: 'Para começar', perguntas: [
    { id: 'F01', q: 'A InnerPlacement é uma agência de empregos?',
      a: 'Não. A Inner não tem vagas prontas nem faz recrutamento e seleção para empresas: trabalha a carreira do profissional e apoia o processo de busca de oportunidade com estratégia, posicionamento, narrativa, network ativado e job hunting dirigido.' },
    { id: 'F02', q: 'O que faz a InnerPlacement?',
      a: 'Somos uma consultoria de desenvolvimento e transição de carreira. Acompanhamos executivos em dois movimentos, crescer onde estão ou se recolocar após uma saída, e apoiamos empresas que precisam cuidar de quem sai e de quem precisa crescer. O trabalho parte da trajetória, do contexto e dos objetivos de cada pessoa e da organização, e combina método, posicionamento e execução. O resultado é um movimento profissional bem decidido, e realizado.' },
    { id: 'F03', q: 'Qual programa é para mim: o de transição ou o Next Level?',
      a: 'Depende do seu momento. Se você encerrou um ciclo, ou está prestes a encerrar, e busca o próximo passo, o caminho é a transição. Se quer crescer, assumir mais, ganhar relevância no que já faz, o caminho é o Next Level. O método é o mesmo; o que muda é o destino do movimento. O formato certo para o seu caso se define na primeira conversa.' },
    { id: 'F04', q: 'A primeira conversa é gratuita?',
      a: 'Sim, e sem compromisso. Nela entendemos o seu momento e para onde você quer ir, e ao final dizemos com franqueza se temos como ajudar e qual formato faz sentido.' },
    { id: 'F05', q: 'Quem me acompanha durante o programa?',
      a: 'Os sócios da Inner, com papéis complementares e multidisciplinares, estratégia, implementação e a dimensão pessoal do movimento, e uma equipe que apoia a execução conforme o programa. O acompanhamento é individual, do primeiro encontro ao último, em qualquer um dos programas.' },
  ]},
  { id: 'para-quem-quer-crescer', titulo: 'Para quem quer crescer', perguntas: [
    { id: 'F06', q: 'O Next Level é coaching?',
      a: 'Não. O que diferencia o Next Level do coaching tradicional é a atuação multidisciplinar: em vez de um coach, você trabalha com uma equipe que combina estratégia de carreira, leitura de contexto e desenvolvimento pessoal. O ponto de partida é a sua carreira, não a pauta da sessão, partimos de onde você quer chegar, definimos uma estratégia de desenvolvimento e acompanhamos a execução no seu dia a dia, ajustando o que precisa mudar até o próximo nível chegar. Método, não sessões soltas.' },
    { id: 'F07', q: 'Posso contratar por conta própria, sem passar pela empresa?',
      a: 'Sim. Todos os programas da Inner podem ser contratados pela própria pessoa ou pela empresa. Quando é você quem contrata, nada é compartilhado com a sua empresa atual. Quando a empresa contrata, ela acompanha a sua evolução, não o conteúdo das conversas, que é seu.' },
    { id: 'F08', q: 'Se a empresa contratar, ela fica sabendo do que conversamos?',
      a: 'Não. O conteúdo das conversas é seu. A empresa acompanha a sua evolução ao longo do programa, não o processo. Essa separação é combinada com todos no início, e é o que torna o espaço confidencial de verdade.' },
    { id: 'F09', q: 'Quanto tempo dura o Next Level?',
      a: 'Depende do impacto que você quer ter e do ritmo do seu dia a dia, o programa se ajusta a ele. O que não varia é a lógica: encontros individuais e multidisciplinares, espaçados o suficiente para que algo aconteça entre um e outro, e acompanhamento até o resultado.' },
  ]},
  { id: 'para-quem-esta-em-transicao', titulo: 'Para quem está em transição', perguntas: [
    { id: 'F10', q: 'Como a Inner lida com o sigilo?',
      a: 'O sigilo é premissa de qualquer programa. Nada sobre você é publicado, e nenhuma abordagem é feita em seu nome sem a sua autorização. Se você está empregado, o próprio LinkedIn é tratado com cuidado: há como construir posicionamento e visibilidade sem sinalizar ao mercado, e ao seu empregador, que você está em movimento. Se a empresa contratou o programa, ela acompanha a sua evolução, não o conteúdo das conversas: esse é seu.' },
    { id: 'F11', q: 'Por que eu tenho recebido tão poucas respostas às minhas candidaturas?',
      a: 'Duas causas principais explicam a maior parte dos casos. A primeira é posicionamento: um perfil que não deixa claro o que você resolve é lido como genérico, e genérico não se destaca. A segunda é o filtro automático, currículo e LinkedIn que não conversam com as palavras-chave do anúncio não chegam a ser lidos por uma pessoa. Importante checar a especificidade do seu caso, para entender as outras possíveis razões.' },
    { id: 'F12', q: 'E se eu não me recolocar no prazo esperado?',
      a: 'O acompanhamento continua, é isso que “até acontecer” significa. Quando o prazo se alonga, os motivos costumam ser três: uma mudança de rota decidida no caminho, como empreender ou trocar de área; um mercado restrito para aquele perfil, em que o ciclo é naturalmente mais longo; ou o próprio ritmo do processo, que é um trabalho a quatro mãos. Em qualquer um deles, revisamos a estratégia com você e seguimos juntos.' },
    { id: 'F13', q: 'Eu já faço networking e tenho rede. O que vocês agregam?',
      a: 'Ter network e saber ativá-lo com estratégia são coisas diferentes. Definimos com você com quem falar, como abordar cada contato e o que buscar em cada conversa. O objetivo não é pedir emprego: é construir conexões relevantes, deixar o seu posicionamento claro e transformar a rede em acesso, a informação, a oportunidades e a caminhos que você ainda não enxergou. Sem abordagem genérica, sem conversa interesseira.' },
    { id: 'F14', q: 'Quanto tempo leva uma recolocação?',
      a: 'Varia com a área, o mercado, o momento profissional e o grau de preparo para a busca. Como referência, 86% dos nossos assessorados se recolocam, em média, em 4,5 meses. O que o acompanhamento muda é a direção do processo: posicionamento claro, network ativado com estratégia e preparo para cada conversa e cada oportunidade.' },
    { id: 'F15', q: 'Como funcionam as vagas que não são divulgadas? Vocês acessam o mercado oculto?',
      a: 'Nem toda oportunidade é anunciada, e há razões para isso. Muitas vezes a empresa está substituindo alguém que ainda não sabe que vai sair, e o processo precisa ser discreto. Outras vezes ela prefere a indicação de alguém de confiança a um anúncio que traz centenas de currículos. E, quanto mais sênior a oportunidade, maior a chance de ela ser entregue a um headhunter, que busca pelo seu network e por ferramentas de hunting. Por isso, o trabalho não depende só de anúncios: identificamos onde o seu perfil faz sentido, ativamos o network com estratégia e preparamos cada abordagem, a headhunters, lideranças e pessoas do seu setor, para que você esteja no radar de quem decide antes de a oportunidade virar anúncio. A Inner apoia a construção desse caminho; não promete acesso direto a oportunidades nem uma rede exclusiva.' },
  ]},
  { id: 'para-empresas', titulo: 'Para empresas', perguntas: [
    { id: 'F16', q: 'Como funciona o outplacement para um grupo?',
      a: 'A Inner estrutura o apoio conforme os níveis e o tamanho do grupo, combinando acompanhamento individual e trilhas práticas, para que o processo seja respeitoso com quem sai e com quem fica. O diferencial está em não tratar o grupo como massa: cada pessoa tem o seu direcionamento, a sua estratégia e os seus encontros individuais, com uma equipe multidisciplinar; e a empresa acompanha a evolução de cada participante e recebe, ao final, um relatório com a decisão de carreira de cada um.' },
    { id: 'F17', q: 'Quando a empresa contrata, o que ela acompanha?',
      a: 'A evolução de cada participante, não o conteúdo das conversas, que é da pessoa. No outplacement, a empresa acompanha o andamento e recebe, ao final, um relatório com a decisão de carreira de cada um. No Next Level, o objetivo é alinhado a três, executivo, empresa e Inner, e a empresa acompanha a evolução em relação a ele. Essa separação é o que torna o espaço confidencial de verdade, e é o que faz o desenvolvimento acontecer.' },
    { id: 'F18', q: 'Quando faz sentido contratar o Next Level para um executivo?',
      a: 'Nos movimentos em que o custo de errar é alto: um executivo assumindo uma responsabilidade maior, um sucessor em preparação, uma liderança recém-chegada que precisa se posicionar. São transições em que o profissional se consolida, ou se perde em silêncio, e a empresa só percebe tarde.' },
    { id: 'F19', q: 'Como saber se um executivo precisa do Next Level e não de um treinamento?',
      a: 'O Next Level é indicado quando a empresa não busca apenas desenvolver um tema, mas apoiar um executivo em um desafio específico e estratégico. Faz sentido, por exemplo, quando há uma promoção, sucessão, risco de perda de um talento, mudança de escopo ou um ponto de atuação que limita o próximo passo. O processo parte de um objetivo comum da organização, mas trabalha os ajustes individuais necessários para que cada pessoa chegue lá. Diferente de um treinamento padrão, o Next Level não entrega só conteúdo: combina acompanhamento, reflexão e prática para desenvolver habilidade e atitude no contexto real de cada executivo.' },
  ]},
  { id: 'investimento-e-condicoes', titulo: 'Investimento e condições', perguntas: [
    { id: 'F20', q: 'Como funciona o investimento?',
      a: 'O valor depende do programa e é apresentado em uma proposta personalizada para cada necessidade, após a primeira conversa. A primeira conversa é gratuita e sem compromisso: entendemos seu momento e indicamos o formato mais adequado.' },
  ]},
];

const todas = Object.fromEntries(secoesFaq.flatMap((s) => s.perguntas).map((p) => [p.id, p]));
export const faqHome = ['F03', 'F10', 'F07', 'F05'].map((id) => todas[id]);
