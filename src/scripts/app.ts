import Alpine from 'alpinejs';

// Formulário de contato: validação mínima da documentação (nome e mensagem obrigatórios; e-mail ou WhatsApp).
// Envia para enviar.php (public/enviar.php) e, com a confirmação, vai para o Agradecimento. Sem JavaScript
// o envio comum também funciona (o servidor redireciona). Só a versão de testes num arquivo único
// (tools/versao-teste.py, window.INNER_TESTE = true) não envia: ela não tem servidor.
const ERRO_ENVIO = 'Não foi possível enviar agora. Tente de novo em instantes ou chame a Inner no WhatsApp.';
Alpine.data('contato', () => ({
  f: { nome: '', email: '', whatsapp: '', mensagem: '' },
  erros: {} as Record<string, string>,
  enviando: false,
  t: Date.now(), // tempo de abertura da página: o servidor recusa envios rápidos demais (robôs)
  init() {
    // Volta do envio sem JavaScript com erro: /contato/?erro=…
    const erro = new URLSearchParams(location.search).get('erro');
    if (erro) this.erros = { envio: erro === 'envio' ? ERRO_ENVIO : erro };
  },
  async enviar(e: SubmitEvent) {
    const erros: Record<string, string> = {};
    if (!this.f.nome.trim()) erros.nome = 'Escreva o seu nome.';
    if (!this.f.email.trim() && !this.f.whatsapp.trim()) erros.contato = 'Deixe um e-mail ou um WhatsApp para a Inner responder.';
    else if (this.f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.f.email.trim())) erros.contato = 'Confira o e-mail. Parece faltar alguma parte.';
    if (!this.f.mensagem.trim()) erros.mensagem = 'Conte, em poucas palavras, o que você deseja.';
    this.erros = erros;
    e.preventDefault();
    if (Object.keys(erros).length || this.enviando) return;
    const form = e.target as HTMLFormElement;
    const obrigado = form.dataset.obrigado || '/obrigado/';
    if ((window as any).INNER_TESTE === true) { location.href = obrigado; return; }
    this.enviando = true;
    try {
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const dados = await r.json().catch(() => ({}));
      if (r.ok && dados.ok) { location.href = dados.destino || obrigado; return; }
      this.erros = dados.erro ? { envio: dados.erro } : { envio: ERRO_ENVIO };
    } catch {
      this.erros = { envio: ERRO_ENVIO };
    }
    this.enviando = false;
  },
}));

// Formulário do e-book (/e-book/): só o e-mail é obrigatório (como no WordPress). Com o envio, mostra o botão de
// download na própria página (?ok=1 cobre o envio sem JavaScript).
Alpine.data('ebook', () => ({
  f: { nome: '', email: '', whatsapp: '' },
  erros: {} as Record<string, string>,
  enviando: false,
  liberado: false,
  t: Date.now(),
  init() {
    const q = new URLSearchParams(location.search);
    if (q.get('ok')) this.liberado = true;
    const erro = q.get('erro');
    if (erro) this.erros = { envio: erro === 'envio' ? ERRO_ENVIO : erro };
  },
  async enviar(e: SubmitEvent) {
    const erros: Record<string, string> = {};
    if (!this.f.email.trim()) erros.email = 'Escreva o seu e-mail para receber o e-book.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.f.email.trim())) erros.email = 'Confira o e-mail. Parece faltar alguma parte.';
    this.erros = erros;
    e.preventDefault();
    if (Object.keys(erros).length || this.enviando) return;
    if ((window as any).INNER_TESTE === true) { this.liberado = true; return; }
    this.enviando = true;
    try {
      const form = e.target as HTMLFormElement;
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const dados = await r.json().catch(() => ({}));
      if (r.ok && dados.ok) { this.liberado = true; this.enviando = false; return; }
      this.erros = dados.erro ? { envio: dados.erro } : { envio: ERRO_ENVIO };
    } catch {
      this.erros = { envio: ERRO_ENVIO };
    }
    this.enviando = false;
  },
}));

// Rolagem das ilustrações: cada elemento com [data-rolagem] recebe --rolagem, de 0 (topo da página)
// a 1,2 (depois de rolar pouco mais de uma tela). O CSS da peça decide o que se move.
// Só roda enquanto o elemento está visível e nunca com "reduzir movimento".
const rolaveis = document.querySelectorAll<HTMLElement>('[data-rolagem]');
if (rolaveis.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const visiveis = new Set<HTMLElement>();
  let pedido = 0;
  // data-rolagem vazio: progresso da página (0 no topo → 1,2). data-rolagem="elemento": progresso do
  // próprio elemento (0 entrando pela base da tela → 1 ao chegar ao terço de cima).
  const atualiza = () => {
    pedido = 0;
    const pagina = Math.min(scrollY / innerHeight, 1.2).toFixed(4);
    visiveis.forEach((el) => {
      const p = el.dataset.rolagem === 'elemento'
        ? Math.min(Math.max((innerHeight - el.getBoundingClientRect().top) / (innerHeight * 0.7), 0), 1).toFixed(4)
        : pagina;
      el.style.setProperty('--rolagem', p);
    });
  };
  const agenda = () => { if (!pedido && visiveis.size) pedido = requestAnimationFrame(atualiza); };
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? visiveis.add(e.target as HTMLElement) : visiveis.delete(e.target as HTMLElement)));
    agenda();
  });
  // Elementos de progresso próprio começam no início (0), para não saltarem ao entrar na tela.
  rolaveis.forEach((el) => { if (el.dataset.rolagem === 'elemento') el.style.setProperty('--rolagem', '0'); io.observe(el); });
  addEventListener('scroll', agenda, { passive: true });
  addEventListener('resize', agenda, { passive: true });
}

// Discos de Caminhos: entrada quando aparecem na tela (.cam-anim pausa no estado inicial, .visto roda)
// e destaque da trilha do link sob o mouse ou o foco (data-foco no cartão). CSS em global.css.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const discos = document.querySelectorAll<HTMLElement>('.cam-disco');
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); }
  }), { threshold: 0.6 });
  discos.forEach((d) => { d.classList.add('cam-anim'); io.observe(d); });
  document.querySelectorAll<HTMLElement>('[data-cam]').forEach((a) => {
    const cartao = a.closest<HTMLElement>('[data-cartao]');
    if (!cartao) return;
    const liga = () => { cartao.dataset.foco = a.dataset.cam; };
    const desliga = () => { delete cartao.dataset.foco; };
    a.addEventListener('mouseenter', liga); a.addEventListener('focus', liga);
    a.addEventListener('mouseleave', desliga); a.addEventListener('blur', desliga);
  });
}

// Entrada genérica: [data-entrada] ganha .il-anim (pausado no estado inicial) e .visto ao aparecer.
// Números [data-conta] contam de 0 ao valor final (prefixo e sufixo preservados, ex.: +1500, 86%).
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const conta = (el: HTMLElement) => {
    const m = (el.textContent ?? '').match(/^(\D*)(\d+)(\D*)$/);
    if (!m) return;
    const [, pre, num, suf] = m, fim = +num, t0 = performance.now();
    const passo = (t: number) => {
      const k = Math.min((t - t0) / 1100, 1), v = Math.round(fim * (1 - Math.pow(1 - k, 3)));
      el.textContent = pre + v + suf;
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target as HTMLElement;
    if (el.hasAttribute('data-conta')) conta(el); else el.classList.add('visto');
    io.unobserve(el);
  }), { threshold: 0.5 });
  document.querySelectorAll<HTMLElement>('[data-entrada]').forEach((el) => { el.classList.add('il-anim'); io.observe(el); });
  document.querySelectorAll<HTMLElement>('[data-conta]').forEach((el) => io.observe(el));
}

// Vídeos de depoimento: o cartão [data-yt] (DepoVideo) vira o player do YouTube só quando a pessoa clica.
document.querySelectorAll<HTMLButtonElement>('[data-yt]').forEach((b) => b.addEventListener('click', () => {
  const caixa = document.createElement('div');
  caixa.className = b.className.replace('cursor-pointer', '');
  const f = document.createElement('iframe');
  f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0`;
  f.title = b.dataset.titulo || 'Vídeo';
  f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  f.allowFullscreen = true;
  f.className = 'absolute inset-0 size-full';
  caixa.append(f);
  b.replaceWith(caixa);
  f.focus();
}));

// Destaque e carrossel de depoimentos da home: sorteia um destaque por visita, tira o selecionado do
// carrossel e embaralha os demais. A lista oficial vem de src/data/depoimentos.ts.
const destaques = document.querySelector<HTMLElement>('[data-depo-destaques]');
const itensDestaque = destaques ? [...destaques.querySelectorAll<HTMLElement>('[data-destaque-item]')] : [];
if (itensDestaque.length) {
  const selecionado = itensDestaque[Math.floor(Math.random() * itensDestaque.length)];
  const id = selecionado.dataset.destaqueItem;
  itensDestaque.forEach((item) => item.classList.toggle('hidden', item !== selecionado));
  document.querySelectorAll<HTMLElement>('[data-carrossel] [data-depo-id]').forEach((card) => {
    card.classList.toggle('hidden', card.dataset.depoId === id);
  });
}
document.querySelectorAll<HTMLElement>('[data-carrossel]').forEach((trilho) => {
  // data-sem-embaralhar (carrossel de logos): mantém a ordem oficial.
  if (trilho.hasAttribute('data-sem-embaralhar')) return;
  const cartoes = [...trilho.children];
  for (let i = cartoes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartoes[i], cartoes[j]] = [cartoes[j], cartoes[i]];
  }
  trilho.append(...cartoes);
});
document.querySelectorAll<HTMLElement>('[data-carrossel-caixa]').forEach((caixa) => {
  const trilho = caixa.querySelector<HTMLElement>('[data-carrossel]');
  const anterior = caixa.querySelector<HTMLButtonElement>('[data-carrossel-anterior]');
  const proximo = caixa.querySelector<HTMLButtonElement>('[data-carrossel-proximo]');
  if (!trilho || !anterior || !proximo) return;
  const primeiroVisivel = () => [...trilho.children].find((el) => !el.classList.contains('hidden')) as HTMLElement | undefined;
  const folga = () => parseFloat(getComputedStyle(trilho).columnGap) || 0;
  const passo = () => (primeiroVisivel()?.getBoundingClientRect().width ?? 320) + folga();
  anterior.addEventListener('click', () => trilho.scrollBy({ left: -passo(), behavior: 'smooth' }));
  proximo.addEventListener('click', () => trilho.scrollBy({ left: passo(), behavior: 'smooth' }));
  const atualiza = () => {
    anterior.disabled = trilho.scrollLeft < 4;
    proximo.disabled = trilho.scrollLeft > trilho.scrollWidth - trilho.clientWidth - 4;
  };
  trilho.addEventListener('scroll', atualiza, { passive: true });
  addEventListener('resize', atualiza);
  atualiza();
  // Avanço automático (data-auto, carrossel de logos): anda um cartão a cada 3,5 s e volta ao
  // começo no fim. Nunca com "reduzir movimento"; pausa com o mouse em cima, com o foco dentro
  // ou ao tocar, e com a aba escondida.
  if (trilho.hasAttribute('data-auto') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let pausa = false, timer = 0;
    const avanca = () => {
      if (pausa || document.hidden) return;
      const max = trilho.scrollWidth - trilho.clientWidth - 4;
      if (trilho.scrollLeft >= max) trilho.scrollTo({ left: 0, behavior: 'smooth' });
      else trilho.scrollBy({ left: passo(), behavior: 'smooth' });
    };
    const liga = () => { if (!timer) timer = window.setInterval(avanca, 3500); };
    const desliga = () => { clearInterval(timer); timer = 0; };
    caixa.addEventListener('pointerenter', () => { pausa = true; });
    caixa.addEventListener('pointerleave', () => { pausa = false; });
    caixa.addEventListener('focusin', () => { pausa = true; });
    caixa.addEventListener('focusout', () => { pausa = false; });
    caixa.addEventListener('touchstart', () => { pausa = true; }, { passive: true });
    caixa.addEventListener('touchend', () => { pausa = false; }, { passive: true });
    document.addEventListener('visibilitychange', () => { if (document.hidden) desliga(); else liga(); });
    liga();
  }
});

// Conversão de WhatsApp (docs/ANALYTICS-whatsapp.md). Os botões levam direto ao wa.me; sem este evento,
// as tags "Clique Botão Whats" do Gerenciador de Tags só disparavam na página /whatsapp/. Contrato (não renomear):
// { event: 'whatsapp_click', link_url, link_id, link_text, link_location } com link_location em
// rodape | flutuante | conteudo. Na própria /whatsapp/ não envia: lá a conversão já sai pela visita à página.
if (!location.pathname.startsWith('/whatsapp')) {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
    if (!a) return;
    const local = a.closest('[data-wa-local]')?.getAttribute('data-wa-local') ?? (a.closest('footer') ? 'rodape' : 'conteudo');
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'whatsapp_click',
      link_url: a.href,
      link_id: a.id || `wa-${local}`,
      link_text: (a.textContent || a.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 100),
      link_location: local,
    });
  }, true);
}

// Metricool (estatísticas de visitas, painel de redes sociais da Inner). Mede visitas, então só carrega para
// quem aceitou "Estatísticas" no aviso de cookies, e, como o GTM, só depois da primeira interação ou 6 s após
// o carregamento, para não pesar na abertura da página. O domínio está na CSP (public/.htaccess).
const METRICOOL_HASH = '25df424498ad94c9dc7ec00c3d5f832a';
const aceitouEstatisticas = () => {
  try { return !!JSON.parse(localStorage.getItem('cookies-inner') || 'null')?.estatisticas; } catch { return false; }
};
let metricoolPedido = false;
const carregarMetricool = () => {
  if (metricoolPedido || !aceitouEstatisticas()) return;
  metricoolPedido = true;
  const s = document.createElement('script');
  s.src = 'https://tracker.metricool.com/resources/be.js';
  s.async = true;
  s.onload = () => (window as unknown as { beTracker?: { t: (o: { hash: string }) => void } }).beTracker?.t({ hash: METRICOOL_HASH });
  document.head.appendChild(s);
};
const quandoOcioso = (fn: () => void) => {
  const ev = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
  let feito = false;
  const uma = () => { if (feito) return; feito = true; ev.forEach((e) => removeEventListener(e, uma)); fn(); };
  ev.forEach((e) => addEventListener(e, uma, { passive: true }));
  if (document.readyState === 'complete') setTimeout(uma, 6000); else addEventListener('load', () => setTimeout(uma, 6000));
};
quandoOcioso(carregarMetricool);
// Quem aceita "Estatísticas" no aviso já interagiu com a página: carrega na hora.
addEventListener('cookies-escolha', carregarMetricool);

// Reabre o aviso de cookies (CookieConsent.astro) pelo link do rodapé, para quem quiser rever a escolha.
document.getElementById('abrir-cookies')?.addEventListener('click', () => dispatchEvent(new Event('cookies-reabrir')));

(window as any).Alpine = Alpine;
Alpine.start();
