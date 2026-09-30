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
    ('transicao-e-recolocacao', 'transicao-e-recolocacao', 'Transição e Recolocação'),
    ('desenvolvimento-de-carreira', 'desenvolvimento-de-carreira', 'Desenvolvimento de Carreira'),
    ('desenvolvimento-de-executivos', 'desenvolvimento-de-executivos', 'Desenvolvimento de Executivos'),
    ('outplacement', 'outplacement', 'Outplacement'),
    ('depoimentos', 'depoimentos', 'Depoimentos'),
    ('perguntas-frequentes', 'perguntas-frequentes', 'Perguntas frequentes'),
    ('manifesto', 'manifesto', 'Manifesto'),
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
    var p = Math.min(scrollY / innerHeight, 1.2).toFixed(4);
    visiveis.forEach(function (el) { el.style.setProperty('--rolagem', p); });
  }
  function agenda() { if (!pedido && visiveis.size) pedido = requestAnimationFrame(atualiza); }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target); });
    agenda();
  });
  rolaveis.forEach(function (el) { io.observe(el); });
  addEventListener('scroll', agenda, { passive: true });
  addEventListener('resize', agenda, { passive: true });
})();
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
{roteador}"""

(SAIDA / 'index.html').write_text(pagina, encoding='utf-8')
print('teste/index.html', len(pagina.encode()) // 1024, 'KB')
