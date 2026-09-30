# Site Inner Placement v2

Astro + Tailwind CSS 4 + Alpine.js. Conteúdo literal da documentação funcional, em `src/data/`.

## Comandos
- `npm install`
- `npm run dev` · servidor local
- `npm run build` · gera o site estático em `dist/` (subir o conteúdo de `dist/` para a hospedagem)
- `python3 tools/versao-teste.py` · gera `teste/index.html`, a versão de testes num arquivo só

## Onde mexer
- Texto do botão principal (pendência P1): `src/data/site.ts`, constante `CTA`
- Perguntas frequentes (fonte única da home e do FAQ): `src/data/faq.ts`
- Depoimentos: `src/data/depoimentos.ts`
- Logos de clientes e autorização de marca: `src/data/site.ts`, lista `logos`
- Tokens da marca: `src/styles/global.css`

## Antes de publicar em produção
- Formulário: definir o destino do envio (P13). Enquanto isso ele só leva ao Agradecimento.
- Vídeos de depoimento: faltam as URLs publicadas.
- Logos: só Mosaic, BCG e Santillana estão autorizados na documentação.
- Quem somos e Blog continuam apontando para o WordPress atual.
