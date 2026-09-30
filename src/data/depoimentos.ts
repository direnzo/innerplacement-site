// Citações literais da documentação funcional, seção 7. O sinal […] marca corte na fala original.
export type Depoimento = {
  id: string;
  texto: string;
  nome: string;
  cargo?: string;
  programa?: string;
  video?: boolean; // há vídeo; a URL entra quando o arquivo publicado for confirmado
};

export const depoimentos: Record<string, Depoimento> = {
  gisele: { id: 'gisele', nome: 'Gisele Hinz', cargo: 'Superintendente de TI', programa: 'Platinum', video: true,
    texto: 'O trabalho da Débora e da Paula foi não me deixar perder a esperança em mim.' },
  gustavo: { id: 'gustavo', nome: 'Gustavo Bianchi', cargo: 'Gerente Nacional de Vendas, multinacional', programa: 'Platinum',
    texto: 'Foi um processo bastante diferente dos modelos tradicionais de outplacement que eu conhecia. A grande diferença está na abordagem multidisciplinar e integrada, que acompanha o profissional em todas as etapas da jornada.' },
  vinicius: { id: 'vinicius', nome: 'Vinícius Conde', cargo: 'Diretor de Prospecção e Inteligência, FTD Educação', video: true,
    texto: 'Eu não me imagino ter feito essa transição sem a Inner. […] Certamente demoraria um tempo muito maior e teria perdido algumas oportunidades. […] Não consigo ver investimento melhor nesse tempo do que nesse processo.' },
  rafael: { id: 'rafael', nome: 'Rafael Massardo', cargo: 'Diretor de Projetos de Capital, Mosaic', programa: 'Platinum', video: true,
    texto: 'Ficou muito nítido um processo muito bem estruturado e muito bem embasado, então isso dá muita confiança para quem está participando.' },
  bruno: { id: 'bruno', nome: 'Bruno de Paula Ribeiro', cargo: 'Consultor sênior, IBM', programa: 'Platinum',
    texto: 'O Platinum foi essencial para me reposicionar no mercado. Organizou minha trajetória, fortaleceu minha autoconfiança e me preparou para entrevistas com clareza e estratégia. Hoje estou recolocado na IBM.' },
  helen: { id: 'helen', nome: 'Helen Bizarro', cargo: 'Gestora em finanças', programa: 'Focus',
    texto: 'O Focus foi um divisor de águas na minha transição. Mesmo após meses sem sucesso, com o apoio e ajustes estratégicos no CV, conquistei uma vaga na IBM. Um programa acessível, eficaz e essencial para quem busca recolocação com confiança.' },
  // P9: publicar só o texto da Fabíola, sem vídeo, até a versão editada chegar.
  fabiola: { id: 'fabiola', nome: 'Fabíola Dotta', cargo: 'Gerente de RH', programa: 'Platinum',
    texto: 'Obviamente ali o momento do desligamento sempre é duro, nunca é fácil. E leva um tempo para você digerir tudo o que aconteceu. Mas sempre fui muito grata pela empresa que me deu essa oportunidade. […] Foi uma transição muito estruturada, importante para eu entender quem eu era e o que eu podia fazer.' },
  katia: { id: 'katia', nome: 'Katia Fernandes', cargo: 'Empreendedora', programa: 'Focus',
    texto: 'A empresa oferecer o programa Focus foi uma demonstração de cuidado com a gente. Eu vejo por um lado muito bom. Eles poderiam simplesmente ter desligado a gente e não fizeram isso.' },
  otavio: { id: 'otavio', nome: 'Otávio Carvalheira', cargo: 'Certified Board Member, President & VP of Operations', programa: 'Next Level',
    texto: 'O Next Level é um processo profundamente conectado ao contexto brasileiro, com impacto direto em comportamento, atitude e resultados — do tático ao estratégico. Um processo rico, com estrutura objetiva, que promove resultados práticos em pouco tempo.' },
  marcia: { id: 'marcia', nome: 'Márcia Reis', cargo: 'Empreendedora', programa: 'Next Level',
    texto: 'Quando uma pessoa te olha de fora, ela vê coisas a seu respeito que você mesma não enxerga. […] Aqui pude assumir um pouco mais de protagonismo, com consciência do que estava fazendo. Eu acho que essa foi a diferença principal.' },
  thiago: { id: 'thiago', nome: 'Thiago Celso', cargo: 'Superintendente de Operações, BHP', programa: 'Next Level', video: true,
    texto: 'Eu me conheço muito mais hoje do que me conhecia no momento que eu comecei o programa.' },
  christian: { id: 'christian', nome: 'Christian Arruda', programa: 'Next Level',
    texto: 'O programa chegou na hora certa. Com foco nos meus desafios e gaps, me preparou com clareza para assumir a nova posição de Diretor de Operações após 20 anos na empresa.' },
};

export const secoesDepoimentos = [
  { id: 'secao-transicao', titulo: 'Transição', ids: ['gisele', 'gustavo', 'vinicius', 'rafael', 'bruno', 'helen'] },
  { id: 'secao-outplacement', titulo: 'Outplacement', ids: ['fabiola', 'katia'] },
  { id: 'secao-crescimento', titulo: 'Crescimento', ids: ['otavio', 'marcia'] },
];

export const assinatura = (d: Depoimento) => [d.cargo, d.programa].filter(Boolean).join(' · ');
