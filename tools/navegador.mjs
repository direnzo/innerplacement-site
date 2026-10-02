// Driver mínimo do Chromium (DevTools Protocol) para conferir animações, rolagem e hover em tempo real.
// O modo de captura simples do Chromium não rola a página nem roda requestAnimationFrame no tempo
// virtual; por isso este driver.
//
// Uso: node tools/navegador.mjs <url> <prefixo-das-fotos> <largura> <altura> '<passos JSON>'
// Passos (em ordem): {"rola": Y} · {"hover": "seletor"} (rola até o elemento e passa o mouse no centro)
//   · {"mouse": [x, y]} · {"js": "expressão"} (imprime o resultado) · {"espera": ms} · {"foto": "nome"}
// Variáveis: CHROME (caminho do Chromium; padrão: o do Playwright em ~/.cache/ms-playwright)
//   HOVER=1 → o navegador se declara com mouse (sem isso, o Chromium sem tela responde
//   "hover: none" e as regras de @media (hover: hover) não valem).
import { spawn } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';

const [url, pre, w, h, passosJson = '[]'] = process.argv.slice(2);
if (!url || !pre || !w || !h) { console.error('uso: node tools/navegador.mjs <url> <prefixo> <largura> <altura> \'[passos]\''); process.exit(2); }

const chrome = process.env.CHROME || (() => {
  const base = `${homedir()}/.cache/ms-playwright`;
  const dir = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().pop();
  return `${base}/${dir}/chrome-linux64/chrome`;
})();
const porta = 9400 + Math.floor(Math.random() * 400);
const args = ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${porta}`, `--window-size=${w},${h}`];
if (process.env.HOVER) args.push('--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4');
const proc = spawn(chrome, [...args, 'about:blank'], { stdio: 'ignore' });
const dorme = (ms) => new Promise((r) => setTimeout(r, ms));

let alvo;
for (let i = 0; i < 50 && !alvo; i++) {
  await dorme(200);
  try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find((t) => t.type === 'page'); } catch {}
}
if (!alvo) { console.error('Chromium não respondeu'); proc.kill(); process.exit(1); }
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const cmd = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

try {
  await cmd('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 600 });
  await cmd('Page.enable');
  await cmd('Page.navigate', { url });
  await dorme(2500);
  for (const s of JSON.parse(passosJson)) {
    if (s.rola !== undefined) await cmd('Runtime.evaluate', { expression: `window.scrollTo({top:${s.rola},behavior:'instant'})` });
    if (s.hover) {
      const r = await cmd('Runtime.evaluate', { returnByValue: true, expression:
        `(()=>{const e=document.querySelector(${JSON.stringify(s.hover)});e.scrollIntoView({block:'center',behavior:'instant'});const b=e.getBoundingClientRect();return [b.x+b.width/2,b.y+b.height/2]})()` });
      await dorme(900);
      const [x, y] = r.result.value;
      await cmd('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
    }
    if (s.mouse) await cmd('Input.dispatchMouseEvent', { type: 'mouseMoved', x: s.mouse[0], y: s.mouse[1] });
    if (s.js) { const r = await cmd('Runtime.evaluate', { expression: s.js, returnByValue: true }); console.log(JSON.stringify(r.result.value)); }
    await dorme(s.espera ?? 300);
    if (s.foto) { const r = await cmd('Page.captureScreenshot', { format: 'png' }); writeFileSync(`${pre}-${s.foto}.png`, Buffer.from(r.data, 'base64')); }
  }
} finally {
  ws.close(); proc.kill();
}
