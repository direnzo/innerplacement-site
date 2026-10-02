// Depoimentos: os dados ficam em depoimentos.json, editado pelo painel (/admin). Citações literais da
// documentação funcional, seção 7; o sinal […] marca corte na fala original.
// formato "video": o vídeo é o principal e o texto é a transcrição do trecho (doc. 7.1); sem o link do
// vídeo ainda, o cartão mostra a capa sem play. secao: onde aparece na página Depoimentos ('' = fora dela).
import dados from './depoimentos.json';

export type Depoimento = {
  id: string;
  texto: string;
  nome: string;
  cargo?: string;
  programa?: string;
  video?: boolean;      // formato vídeo
  videoUrl?: string;    // link do YouTube (youtu.be/… ou youtube.com/watch?v=…)
};
type Item = { id: string; nome: string; cargo: string; programa: string; secao: string; ordem: number; formato: string; video: string; texto: string };
const itens = (dados as { depoimentos: Item[] }).depoimentos;

export const depoimentos: Record<string, Depoimento> = Object.fromEntries(itens.map((d) => [d.id, {
  id: d.id, nome: d.nome, texto: d.texto,
  ...(d.cargo && { cargo: d.cargo }), ...(d.programa && { programa: d.programa }),
  ...(d.formato === 'video' && { video: true }), ...(d.video && { videoUrl: d.video }),
}]));

const SECOES = [
  { id: 'secao-transicao', titulo: 'Transição', chave: 'transicao' },
  { id: 'secao-outplacement', titulo: 'Outplacement', chave: 'outplacement' },
  { id: 'secao-crescimento', titulo: 'Crescimento', chave: 'crescimento' },
];
export const secoesDepoimentos = SECOES.map((s) => ({
  id: s.id, titulo: s.titulo,
  ids: itens.filter((d) => d.secao === s.chave).sort((a, b) => a.ordem - b.ordem).map((d) => d.id),
}));

// Para a home: todo depoimento oficial com seção (os mesmos das 3 seções acima, sem os de página própria,
// como Thiago e Christian). Pega a lista de quem está em depoimentos.json agora — nada de nomes fixos no
// código; a ordem de exibição é embaralhada no navegador (src/scripts/app.ts), então muda a cada visita.
export const depoimentosHome = itens.filter((d) => d.secao).map((d) => d.id);

export const assinatura = (d: Depoimento) => [d.cargo, d.programa].filter(Boolean).join(' · ');

// ID do vídeo do YouTube a partir do link (youtu.be/ID, watch?v=ID, embed/ID, shorts/ID).
export const idYoutube = (url?: string) => url?.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/)?.[1];
