"""Gera a versão de testes num arquivo HTML único, a partir do build do Astro (dist/).

As páginas viram seções alternadas por âncora (#transicao-e-recolocacao, #contato...),
o cabeçalho, o rodapé e o sprite entram uma vez só, e o Alpine vem do cdnjs.
Uso: python3 tools/versao-teste.py  ->  teste/index.html
"""
import json, re, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DIST = RAIZ / 'dist'
SAIDA = RAIZ / 'teste'
SAIDA.mkdir(exist_ok=True)

PAGINAS = [  # (token da âncora, pasta no dist, título da aba)
    ('inicio', '', 'Inner Placement'),
    ('para-sua-empresa', 'para-sua-empresa', 'Para sua empresa'),
    ('para-sua-empresa/next-level', 'para-sua-empresa/next-level', 'Next Level'),
    ('para-sua-empresa/executive-alignment', 'para-sua-empresa/executive-alignment', 'Executive Alignment'),
    ('para-sua-empresa/outplacement', 'para-sua-empresa/outplacement', 'Transition'),
    ('para-voce', 'para-voce', 'Para você'),
    ('para-voce/next-level', 'para-voce/next-level', 'Next Level'),
    ('para-voce/transicao-e-recolocacao', 'para-voce/transicao-e-recolocacao', 'Transition'),
    ('depoimentos', 'depoimentos', 'Depoimentos'),
    ('perguntas-frequentes', 'perguntas-frequentes', 'Perguntas frequentes'),
    ('manifesto', 'manifesto', 'Manifesto'),
    ('quem-somos', 'quem-somos', 'Quem somos'),
    ('contato', 'contato', 'Contato'),
    ('obrigado', 'obrigado', 'Recebemos a sua mensagem'),
]
KIT = json.loads(re.search(r'KitItem> = (\{.*\});', (RAIZ / 'src/data/kit.ts').read_text(), re.S).group(1))
PREFIXOS_KIT = tuple(KIT.keys())


def ler(pasta):
    return (DIST / pasta / 'index.html').read_text(encoding='utf-8')


def trecho(html, abre, fecha):
    i = html.index(abre)
    j = html.index(fecha, i) + len(fecha)
    return html[i:j]


def rotas(html):
    html = re.sub(r'href="/"', 'href="#inicio"', html)
    html = re.sub(r'href="/([a-z0-9-]+)/"', r'href="#\1"', html)
    html = html.replace('data-obrigado="/obrigado/"', 'data-obrigado="#obrigado"')
    html = html.replace('action="/enviar.php"', 'action="#obrigado"')
    return html


def isola_ids(html, token):
    """Prefixa os ids internos dos SVGs do kit para cada página não depender de defs de outra seção oculta."""
    ids = {i for i in re.findall(r'id="([^"]+)"', html) if i.startswith(PREFIXOS_KIT)}
    for i in sorted(ids, key=len, reverse=True):
        n = f'{token}--{i}'
        html = (html.replace(f'id="{i}"', f'id="{n}"').replace(f'url(#{i})', f'url(#{n})')
                    .replace(f'href="#{i}"', f'href="#{n}"'))
    return html


home = ler('')
css = '\n'.join(re.findall(r'<style>(.*?)</style>', home, re.S))
sprite = trecho(home, '<svg width="0" height="0"', '</svg>')
header = rotas(trecho(home, '<header', '</header>'))
footer = rotas(trecho(home, '<footer', '</footer>'))
zap = re.search(r'<a href="https://wa\.me/[^"]*" target="_blank" rel="noopener" aria-label="Chamar no WhatsApp".*?</a>', home, re.S).group(0)
cookies = rotas(trecho(home, '<aside', '</aside>'))

secoes = []
for token, pasta, titulo in PAGINAS:
    html = ler(pasta)
    main = re.search(r'<main id="conteudo"[^>]*>(.*?)</main>', html, re.S).group(1)
    main = isola_ids(rotas(main), token)
    oculto = '' if token == 'inicio' else ' hidden'
    secoes.append(f'<div class="pagina flex flex-col gap-6 pb-6 md:gap-8" data-pagina="{token}" data-titulo="{titulo}"{oculto}>{main}</div>')

roteador = """
<script>
window.INNER_TESTE = true;
document.addEventListener('alpine:init', function () {
  Alpine.data('contato', function () { return {
    f: { nome: '', email: '', whatsapp: '', mensagem: '' }, erros: {}, enviando: false,
    enviar: function (e) {
      var f = this.f, erros = {};
      if (!f.nome.trim()) erros.nome = 'Escreva o seu nome.';
      if (!f.email.trim() && !f.whatsapp.trim()) erros.contato = 'Deixe um e-mail ou um WhatsApp para a Inner responder.';
      else if (f.email.trim() && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(f.email.trim())) erros.contato = 'Confira o e-mail. Parece faltar alguma parte.';
      if (!f.mensagem.trim()) erros.mensagem = 'Conte, em poucas palavras, o que você deseja.';
      this.erros = erros; e.preventDefault();
      if (Object.keys(erros).length) return;
      location.hash = 'obrigado';
    }
  }; });
});
(function () {
  var paginas = Array.prototype.slice.call(document.querySelectorAll('[data-pagina]'));
  var tokens = paginas.map(function (p) { return p.dataset.pagina; });
  function ir() {
    var h = decodeURIComponent(location.hash.replace('#', '')) || 'inicio';
    var alvo = null, destino = tokens.indexOf(h) >= 0 ? h : null;
    if (!destino) {
      alvo = document.getElementById(h);
      var dono = alvo && alvo.closest('[data-pagina]');
      destino = dono ? dono.dataset.pagina : (h === 'conteudo' ? null : 'inicio');
    }
    if (!destino) return;
    paginas.forEach(function (p) { p.hidden = p.dataset.pagina !== destino; });
    var pg = paginas[tokens.indexOf(destino)];
    document.title = destino === 'inicio' ? 'Inner Placement · versão de testes' : pg.dataset.titulo + ' · Inner Placement';
    if (alvo) alvo.scrollIntoView({ behavior: 'instant' }); else window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.addEventListener('hashchange', ir);
  ir();
})();
// Rolagem das ilustrações: cópia de src/scripts/app.ts (manter as duas iguais).
(function () {
  var rolaveis = document.querySelectorAll('[data-rolagem]');
  if (!rolaveis.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var visiveis = new Set(), pedido = 0;
  function atualiza() {
    pedido = 0;
    var pagina = Math.min(scrollY / innerHeight, 1.2).toFixed(4);
    visiveis.forEach(function (el) {
      var p = el.dataset.rolagem === 'elemento'
        ? Math.min(Math.max((innerHeight - el.getBoundingClientRect().top) / (innerHeight * 0.7), 0), 1).toFixed(4)
        : pagina;
      el.style.setProperty('--rolagem', p);
    });
  }
  function agenda() { if (!pedido && visiveis.size) pedido = requestAnimationFrame(atualiza); }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target); });
    agenda();
  });
  rolaveis.forEach(function (el) { if (el.dataset.rolagem === 'elemento') el.style.setProperty('--rolagem', '0'); io.observe(el); });
  addEventListener('scroll', agenda, { passive: true });
  addEventListener('resize', agenda, { passive: true });
})();
// Entrada genérica e contagem dos números: cópia de src/scripts/app.ts (manter as duas iguais).
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function conta(el) {
    var m = (el.textContent || '').match(/^(\\D*)(\\d+)(\\D*)$/);
    if (!m) return;
    var pre = m[1], fim = +m[2], suf = m[3], t0 = performance.now();
    function passo(t) {
      var k = Math.min((t - t0) / 1100, 1), v = Math.round(fim * (1 - Math.pow(1 - k, 3)));
      el.textContent = pre + v + suf;
      if (k < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      if (e.target.hasAttribute('data-conta')) conta(e.target); else e.target.classList.add('visto');
      io.unobserve(e.target);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-entrada]').forEach(function (el) { el.classList.add('il-anim'); io.observe(el); });
  document.querySelectorAll('[data-conta]').forEach(function (el) { io.observe(el); });
})();
// Vídeos de depoimento: cópia de src/scripts/app.ts (manter as duas iguais).
document.querySelectorAll('[data-yt]').forEach(function (b) { b.addEventListener('click', function () {
  var caixa = document.createElement('div'); caixa.className = b.className.replace('cursor-pointer', '');
  var f = document.createElement('iframe');
  f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.yt + '?autoplay=1&rel=0';
  f.title = b.dataset.titulo || 'Vídeo';
  f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  f.allowFullscreen = true; f.className = 'absolute inset-0 size-full';
  caixa.appendChild(f); b.parentNode.replaceChild(caixa, b); f.focus();
}); });
// Discos de Caminhos: cópia de src/scripts/app.ts (manter as duas iguais).
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var discos = document.querySelectorAll('.cam-disco');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } });
  }, { threshold: .6 });
  discos.forEach(function (d) { d.classList.add('cam-anim'); io.observe(d); });
  document.querySelectorAll('[data-cam]').forEach(function (a) {
    var card = a.closest('[data-cartao]');
    if (!card) return;
    var liga = function () { card.dataset.foco = a.dataset.cam; };
    var desliga = function () { delete card.dataset.foco; };
    a.addEventListener('mouseenter', liga); a.addEventListener('focus', liga);
    a.addEventListener('mouseleave', desliga); a.addEventListener('blur', desliga);
  });
})();
// Destaque e carrossel de depoimentos da home: cópia de src/scripts/app.ts (manter as duas iguais).
var destaques = document.querySelector('[data-depo-destaques]');
var itensDestaque = destaques ? Array.prototype.slice.call(destaques.querySelectorAll('[data-destaque-item]')) : [];
if (itensDestaque.length) {
  var selecionado = itensDestaque[Math.floor(Math.random() * itensDestaque.length)];
  var idDestaque = selecionado.dataset.destaqueItem;
  itensDestaque.forEach(function (item) { item.classList.toggle('hidden', item !== selecionado); });
  document.querySelectorAll('[data-carrossel] [data-depo-id]').forEach(function (card) {
    card.classList.toggle('hidden', card.dataset.depoId === idDestaque);
  });
}
document.querySelectorAll('[data-carrossel]').forEach(function (trilho) {
  var cartoes = Array.prototype.slice.call(trilho.children);
  for (var i = cartoes.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = cartoes[i]; cartoes[i] = cartoes[j]; cartoes[j] = tmp;
  }
  cartoes.forEach(function (c) { trilho.appendChild(c); });
});
document.querySelectorAll('[data-carrossel-caixa]').forEach(function (caixa) {
  var trilho = caixa.querySelector('[data-carrossel]');
  var anterior = caixa.querySelector('[data-carrossel-anterior]');
  var proximo = caixa.querySelector('[data-carrossel-proximo]');
  if (!trilho || !anterior || !proximo) return;
  function primeiroVisivel() { return Array.prototype.slice.call(trilho.children).find(function (el) { return !el.classList.contains('hidden'); }); }
  function passo() { var primeiro = primeiroVisivel(); return (primeiro && primeiro.getBoundingClientRect().width) || 320; }
  anterior.addEventListener('click', function () { trilho.scrollBy({ left: -(passo() + 24), behavior: 'smooth' }); });
  proximo.addEventListener('click', function () { trilho.scrollBy({ left: passo() + 24, behavior: 'smooth' }); });
  function atualiza() {
    anterior.disabled = trilho.scrollLeft < 4;
    proximo.disabled = trilho.scrollLeft > trilho.scrollWidth - trilho.clientWidth - 4;
  }
  trilho.addEventListener('scroll', atualiza, { passive: true });
  addEventListener('resize', atualiza);
  atualiza();
});
// Reabre o aviso de cookies: cópia de src/scripts/app.ts (manter as duas iguais).
document.getElementById('abrir-cookies') && document.getElementById('abrir-cookies').addEventListener('click', function () { dispatchEvent(new Event('cookies-reabrir')); });
</script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.14.9/cdn.min.js"></script>
"""

aviso = ('<div class="wrap" style="padding-top:12px"><p style="border-radius:999px;background:#231F20;color:rgba(255,255,255,.86);padding:8px 16px;text-align:center;font-size:12.5px;line-height:1.4">'
         'Versão de testes para aprovação. O formulário não envia mensagens; os vídeos entram quando os arquivos forem confirmados.</p></div>')

pagina = f"""<meta charset="utf-8">
<title>Site Inner v2</title>
<meta name="description" content="Versão de testes do novo site da Inner Placement para aprovação da diretoria.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;600;700&display=swap">
<style>{css}
html, body {{ background: #D3CEC4; color: #231F20; font-family: "Hanken Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; font-size: 16px; }}
header.sticky {{ top: env(safe-area-inset-top, 0px); }}
[hidden] {{ display: none !important; }}
</style>
{sprite}
<a href="#conteudo" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-5 focus:py-3">Pular para o conteúdo</a>
{header}
{aviso}
<main id="conteudo" style="padding-top:16px">{''.join(secoes)}</main>
{footer}
{zap}
{cookies}
{roteador}"""

(SAIDA / 'index.html').write_text(pagina, encoding='utf-8')
print('teste/index.html', len(pagina.encode()) // 1024, 'KB')
