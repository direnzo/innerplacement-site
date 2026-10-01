"""Copia para imagens/ as peças aprovadas, a partir das propostas geradas em docs/ilustracao/.

Cada peça aprovada tem um .txt com a linha "GERADOR: ... cópia de docs/ilustracao/<bloco>/<peça>.svg".
Depois de mudar um gerador, rode os geradores e este script, para as cópias aprovadas acompanharem.
Uso: python3 tools/ilustracao/sincronizar.py [--conferir]   (--conferir só lista o que mudaria)
"""
import pathlib, re, shutil, sys

RAIZ = pathlib.Path(__file__).resolve().parents[2]
conferir = '--conferir' in sys.argv
mudou = 0
for txt in sorted((RAIZ / 'imagens').glob('inner-*.txt')):
    m = re.search(r'cópia de (docs/ilustracao/\S+\.svg)', txt.read_text(encoding='utf-8'))
    if not m:
        continue
    origem, destino = RAIZ / m.group(1), txt.with_suffix('.svg')
    if not origem.exists():
        print(f'FALTA a origem de {destino.name}: {m.group(1)}'); continue
    if destino.exists() and destino.read_bytes() == origem.read_bytes():
        continue
    mudou += 1
    print(('mudaria ' if conferir else 'atualizado ') + destino.name)
    if not conferir:
        shutil.copyfile(origem, destino)
print(f'{mudou} peça(s) {"a atualizar" if conferir else "atualizada(s)"}')

# Conferência: elemento com atributo transform e classe que recebe transform-box: fill-box no CSS.
# A combinação desloca o elemento (já tirou o par do disco H-03 e o arco da rosca do lugar) e só
# aparece em telas com mouse, onde as regras de hover valem. Não deve haver nenhum caso.
css = (RAIZ / 'src/styles/global.css').read_text(encoding='utf-8')
fill = set()
for seletor in re.findall(r'([^{}]+)\{[^{}]*transform-box:\s*fill-box', css):
    fill.update(re.findall(r'\.([a-z0-9-]+)', seletor))
fill -= {'il-anim', 'hero-anim', 'cam-disco', 'visto'}
conflitos = 0
for svg in sorted((RAIZ / 'imagens').glob('inner-*.svg')):
    for m in re.finditer(r'<\w+([^>]*\bclass="([^"]+)"[^>]*)>', svg.read_text(encoding='utf-8')):
        if set(m.group(2).split()) & fill and 'transform=' in m.group(1):
            conflitos += 1
            print(f'CONFLITO transform + fill-box: {svg.name}, classe {set(m.group(2).split()) & fill}')
if conflitos:
    sys.exit(1)
