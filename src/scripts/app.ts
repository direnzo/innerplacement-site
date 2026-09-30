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

(window as any).Alpine = Alpine;
Alpine.start();
