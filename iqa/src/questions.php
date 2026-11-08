<?php
/**
 * Conteúdo do instrumento IQA — extraído da planilha
 * "IQA - Autoavaliação - Arquitetura Invisível da Liderança - Uberaba".
 *
 * Alterar textos aqui é seguro. Alterar os `id` NÃO é: eles são a chave
 * gravada no banco e usada para reprocessar respostas antigas.
 */

const IQA_EVENTO = 'A Arquitetura Invisível da Liderança · Mosaic Uberaba';

const IQA_DIMENSOES = [
    'perguntar'    => 'Segurança para Perguntar',
    'discordar'    => 'Segurança para Discordar',
    'erros'        => 'Segurança para Admitir Erros',
    'ajuda'        => 'Segurança para Pedir Ajuda',
    'mas_noticias' => 'Segurança para Trazer Más Notícias',
];

/** Rótulos curtos, para o gráfico e telas estreitas. */
const IQA_DIMENSOES_CURTAS = [
    'perguntar'    => 'Perguntar',
    'discordar'    => 'Discordar',
    'erros'        => 'Admitir erros',
    'ajuda'        => 'Pedir ajuda',
    'mas_noticias' => 'Más notícias',
];

const IQA_ITENS = [
    ['id' => 1,  'dim' => 'perguntar',    'texto' => 'Minha equipe pode me perguntar algo sem parecer incompetente aos meus olhos.'],
    ['id' => 2,  'dim' => 'perguntar',    'texto' => 'Uma pergunta ou ideia trazida por alguém de fora do time é bem recebida, não descartada de cara.'],
    ['id' => 3,  'dim' => 'perguntar',    'texto' => 'As perguntas que a equipe me faz geram discussão real, não só uma resposta rápida para encerrar o assunto.'],

    ['id' => 4,  'dim' => 'discordar',    'texto' => 'Minha equipe pode expressar uma opinião divergente da minha.'],
    ['id' => 5,  'dim' => 'discordar',    'texto' => 'Quando surge um conflito ou tensão na equipe, ele é tratado — não varrido para debaixo do tapete.'],
    ['id' => 6,  'dim' => 'discordar',    'texto' => 'Discordar de mim, dentro da equipe, não é visto como falta de respeito.'],

    ['id' => 7,  'dim' => 'erros',        'texto' => 'Minha equipe pode relatar um erro para mim sem temer humilhação na hora, retaliação depois, ou ser tratada como culpada só por trazer a notícia.'],
    ['id' => 8,  'dim' => 'erros',        'texto' => 'Quando alguém erra, existe espaço para um pedido de desculpas genuíno, sem punição desproporcional.'],
    ['id' => 9,  'dim' => 'erros',        'texto' => 'Um erro admitido na equipe vira aprendizado, não motivo de descrédito permanente.'],

    ['id' => 10, 'dim' => 'ajuda',        'texto' => 'Minha equipe pode me pedir apoio antes que o problema aumente.'],
    ['id' => 11, 'dim' => 'ajuda',        'texto' => 'Existe confiança, na equipe, de que pedir ajuda não será usado contra a pessoa depois.'],
    ['id' => 12, 'dim' => 'ajuda',        'texto' => 'Pedir ajuda, na equipe, é visto como maturidade, não como fraqueza.'],

    ['id' => 13, 'dim' => 'mas_noticias', 'texto' => 'Minha equipe pode me comunicar um risco imediatamente.'],
    ['id' => 14, 'dim' => 'mas_noticias', 'texto' => 'As questões mais difíceis chegam até mim antes de virarem crise.'],
    ['id' => 15, 'dim' => 'mas_noticias', 'texto' => 'Quando alguém me traz uma notícia ruim, minha reação incentiva que isso volte a acontecer.'],
];

const IQA_ESCALA = [
    1 => 'Discordo totalmente',
    2 => 'Discordo',
    3 => 'Neutro',
    4 => 'Concordo',
    5 => 'Concordo totalmente',
];

/** Faixas de leitura (soma de 15 itens, 15–75). Ordem: do maior para o menor. */
const IQA_FAIXAS = [
    ['min' => 66, 'max' => 75, 'rotulo' => 'Ambiente altamente favorável à aprendizagem'],
    ['min' => 54, 'max' => 65, 'rotulo' => 'Bom ambiente — alguns pontos merecem atenção'],
    ['min' => 39, 'max' => 53, 'rotulo' => 'Ambiente vulnerável — custos invisíveis elevados'],
    ['min' => 15, 'max' => 38, 'rotulo' => 'Ambiente defensivo — alta probabilidade de silêncio organizacional'],
];

const IQA_NOTA_METODOLOGICA = 'Dimensões e faixas alinhadas ao IQA apresentado no Ato IV. Itens revisados para incluir 3 ângulos por dimensão (capacidade / prática real / percepção cultural), com apoio temático do questionário Team Evaluation (metodologia das 5 Disfunções, Lencioni).';
