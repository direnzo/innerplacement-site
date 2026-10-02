// Gera as imagens de compartilhamento (G-03 da home e G-05 das páginas internas): 1200 × 630, JPG.
// Uso: node --experimental-strip-types tools/compartilhamento.mts  →  public/og/<página>.jpg
// Modelo único: à esquerda o logo oficial (do kit, nunca redesenhado), o título da página e o selo
// "Consultoria de carreira · até acontecer" (afastado do logo, como pede o guia); à direita a
// ilustração aprovada da página. Renderizado pelo Chromium, para o título sair em Hanken Grotesk.
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir, tmpdir } from 'node:os';
import { createRequire } from 'node:module';
import { kit } from '../src/data/kit.ts';

const RAIZ = new URL('../', import.meta.url).pathname;
const sharp = createRequire(RAIZ + 'tools/imagem/')('sharp');
const chromium = process.env.CHROME_SHELL || (() => {
  const base = `${homedir()}/.cache/ms-playwright`;
  const dir = readdirSync(base).filter((d) => /^chromium_headless_shell-\d+$/.test(d)).sort().pop();
  return `${base}/${dir}/chrome-headless-shell-linux64/chrome-headless-shell`;
})();

// página → [título (o mesmo do <Base titulo>), ilustração aprovada em imagens/]
const paginas: Record<string, [string, string]> = {
  inicio: ['Consultoria de desenvolvimento de carreira', 'inner-H01-hero-v4'],
  'transicao-e-recolocacao': ['Transição e Recolocação', 'inner-P01-topo-transicao-v2'],
  'desenvolvimento-de-carreira': ['Desenvolvimento de Carreira', 'inner-P02-topo-carreira-v2'],
  'desenvolvimento-de-executivos': ['Desenvolvimento de Executivos', 'inner-P03-topo-executivos-v1'],
  outplacement: ['Outplacement', 'inner-P04-topo-outplacement-v1'],
  depoimentos: ['Depoimentos', 'inner-P05-topo-depoimentos-v1'],
  'perguntas-frequentes': ['Perguntas frequentes', 'inner-P06-topo-faq-v1'],
  manifesto: ['Manifesto', 'inner-P07-manifesto-v1'],
  contato: ['Contato', 'inner-P08-contato-v1'],
};

const logo = `<svg viewBox="0 0 ${kit.logo.w} ${kit.logo.h}" height="76">${kit.logo.inner}</svg>`;
const rosa = (k: string) => `<svg viewBox="0 0 ${kit[k].w} ${kit[k].h}" width="18" height="18">${kit[k].inner}</svg>`;
const modelo = (titulo: string, ilustracao: string) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;600;700&display=swap">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { position: relative; background: #EFEBE4; font-family: "Hanken Grotesk", sans-serif; color: #231F20; }
  .bola { position: absolute; right: -120px; top: 15px; width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgb(255 255 255 / 0) 0%, rgb(255 255 255 / .45) 72%, rgb(255 101 88 / .1) 92%, rgb(255 101 88 / .28) 100%); }
  .faixa { position: absolute; left: 0; top: 0; bottom: 0; width: 14px; background: linear-gradient(#FF8A7E, #FF6558); }
  .txt { position: absolute; left: 86px; top: 64px; bottom: 64px; width: 520px; display: flex; flex-direction: column; }
  .txt > svg { align-self: flex-start; width: auto; }
  h1 { margin-top: auto; font-size: 58px; line-height: 1.08; font-weight: 300; letter-spacing: -.025em; text-wrap: balance; }
  .selo { margin-top: 26px; align-self: flex-start; display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px 8px 12px;
    border-radius: 999px; background: #FFE3DE; color: #C4483C; font-size: 17px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
  .url { margin-top: auto; padding-top: 28px; font-size: 21px; color: #6E6769; letter-spacing: .01em; }
  .ilus { position: absolute; right: 56px; top: 50%; translate: 0 -50%; width: 540px; height: 500px; display: flex; align-items: center; justify-content: center; }
  .ilus svg { width: 100%; height: 100%; }
</style></head><body>
  <div class="bola"></div><div class="faixa"></div>
  <div class="txt">${logo}<h1>${titulo}</h1><span class="selo">${rosa('rosacea_coral')}Consultoria de carreira · até acontecer</span><span class="url">innerplacement.com.br</span></div>
  <div class="ilus">${ilustracao}</div>
</body></html>`;

const tmp = mkdtempSync(`${tmpdir()}/inner-og-`);
const saida = RAIZ + 'public/og/';
mkdirSync(saida, { recursive: true });
try {
  for (const [nome, [titulo, peca]] of Object.entries(paginas)) {
    // A peça entra como está (sem data-entrada): sem animação, mostra o estado final completo.
    const ilus = readFileSync(`${RAIZ}imagens/${peca}.svg`, 'utf8').replace(/<title>.*?<\/title>/, '').replace(/ width="\d+" height="\d+"/, '');
    const html = `${tmp}/${nome}.html`, png = `${tmp}/${nome}.png`;
    writeFileSync(html, modelo(titulo, ilus));
    const r = spawnSync(chromium, ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630',
      '--virtual-time-budget=6000', `--screenshot=${png}`, `file://${html}`], { stdio: 'ignore' });
    if (r.status !== 0) throw new Error(`Chromium falhou em ${nome}`);
    const jpg = await sharp(png).resize(1200, 630).flatten({ background: '#EFEBE4' }).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
    writeFileSync(`${saida}${nome}.jpg`, jpg);
    console.log(`og/${nome}.jpg  ${(jpg.length / 1024).toFixed(0)} KB`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
