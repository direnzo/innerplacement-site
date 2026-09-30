import Alpine from 'alpinejs';

// Formulário de contato: validação mínima da documentação (nome e mensagem obrigatórios; e-mail ou WhatsApp).
Alpine.data('contato', () => ({
  f: { nome: '', email: '', whatsapp: '', mensagem: '' },
  erros: {} as Record<string, string>,
  enviando: false,
  enviar(e: SubmitEvent) {
    const erros: Record<string, string> = {};
    if (!this.f.nome.trim()) erros.nome = 'Escreva o seu nome.';
    if (!this.f.email.trim() && !this.f.whatsapp.trim()) erros.contato = 'Deixe um e-mail ou um WhatsApp para a Inner responder.';
    else if (this.f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.f.email.trim())) erros.contato = 'Confira o e-mail. Parece faltar alguma parte.';
    if (!this.f.mensagem.trim()) erros.mensagem = 'Conte, em poucas palavras, o que você deseja.';
    this.erros = erros;
    if (Object.keys(erros).length) { e.preventDefault(); return; }
    // Versão de testes: o destino do envio (pendência P13) ainda não foi definido; o formulário só leva ao Agradecimento.
    if ((window as any).INNER_TESTE !== false) {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      location.href = form.dataset.obrigado || '/obrigado/';
      return;
    }
    this.enviando = true;
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

(window as any).Alpine = Alpine;
Alpine.start();
