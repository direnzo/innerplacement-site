"""Gera a variante de teste do site para a subpasta /v2-teste/, a partir do build de produção (dist/).

O que muda em relação a dist/:
- caminhos absolutos do site (href, src, action, data-obrigado) ganham o prefixo /v2-teste;
- todas as páginas recebem <meta name="robots" content="noindex, nofollow"> e perdem a canonical,
  para a versão de teste não competir com o site oficial nas buscas;
- og:url e og:image apontam para a /v2-teste/, para a prévia de compartilhamento do teste funcionar;
- o .htaccess de produção (301 das URLs do WordPress) fica de fora: ele só vale na raiz do domínio.

Uso: npm run build && python3 tools/build-v2-teste.py  ->  dist-v2-teste/ (e dist-v2-teste.zip)
O conteúdo de dist-v2-teste/ é o que vai para public_html/v2-teste/ na hospedagem.
"""
import pathlib, re, shutil

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DIST = RAIZ / 'dist'
SAIDA = RAIZ / 'dist-v2-teste'
PREFIXO = '/v2-teste'
FORA = {'.htaccess'}

if not (DIST / 'index.html').exists():
    raise SystemExit('dist/ não encontrado: rode npm run build antes.')

shutil.rmtree(SAIDA, ignore_errors=True)
shutil.copytree(DIST, SAIDA, ignore=lambda d, nomes: [n for n in nomes if n in FORA])

ROBOTS = '<meta name="robots" content="noindex, nofollow">'
ATRIBUTO = re.compile(r'\b(href|src|action|data-obrigado)="/(?!/)')

paginas = 0
for arq in SAIDA.rglob('*.html'):
    html = arq.read_text(encoding='utf-8')
    html = ATRIBUTO.sub(lambda m: f'{m.group(1)}="{PREFIXO}/', html)
    html = re.sub(r'<link rel="canonical"[^>]*>', '', html)
    # Prévia de compartilhamento do teste: og:url e og:image apontam para a própria /v2-teste/
    # (senão o WhatsApp/LinkedIn buscaria a página e a imagem no site oficial, ainda o WordPress).
    html = re.sub(r'(<meta property="og:(?:url|image)" content="https://innerplacement\.com\.br)/', r'\1' + PREFIXO + '/', html)
    html = re.sub(r'<meta name="robots"[^>]*>', '', html)
    html = html.replace('<head>', '<head>' + ROBOTS, 1)
    arq.write_text(html, encoding='utf-8')
    paginas += 1

# Conferências: nenhum caminho absoluto sem prefixo e noindex em todas as páginas.
for arq in SAIDA.rglob('*.html'):
    html = arq.read_text(encoding='utf-8')
    soltos = re.findall(r'\b(?:href|src|action|data-obrigado)="/(?!/|v2-teste/)[^"]*"', html)
    assert not soltos, f'{arq}: caminhos sem prefixo {soltos[:3]}'
    assert html.count(ROBOTS) == 1, f'{arq}: noindex ausente ou repetido'
assert not (SAIDA / '.htaccess').exists()

shutil.make_archive(str(SAIDA), 'zip', SAIDA)
print(f'dist-v2-teste/: {paginas} páginas com prefixo {PREFIXO}/ e noindex; dist-v2-teste.zip gerado')
