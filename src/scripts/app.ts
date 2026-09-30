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
  const atualiza = () => {
    pedido = 0;
    const p = Math.min(scrollY / innerHeight, 1.2).toFixed(4);
    visiveis.forEach((el) => el.style.setProperty('--rolagem', p));
  };
  const agenda = () => { if (!pedido && visiveis.size) pedido = requestAnimationFrame(atualiza); };
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? visiveis.add(e.target as HTMLElement) : visiveis.delete(e.target as HTMLElement)));
    agenda();
  });
  rolaveis.forEach((el) => io.observe(el));
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

(window as any).Alpine = Alpine;
Alpine.start();
