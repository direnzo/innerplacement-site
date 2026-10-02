#!/usr/bin/env bash
# Publica a versão de teste em https://innerplacement.com.br/v2-teste/.
#
# Pré-requisitos (uma vez por sessão, no terminal do dono; a senha nunca passa por scripts):
#   S=~/.ssh/agente-inner-v2.sock; SSH_AUTH_SOCK=$S ssh-add -l >/dev/null 2>&1; [ $? -eq 2 ] && { rm -f $S; ssh-agent -a $S -t 4h >/dev/null; }; SSH_AUTH_SOCK=$S ssh-add -t 4h ~/.ssh/inner_v2
# O host `inner-v2` está em ~/.ssh/config (chave ~/.ssh/inner_v2, com senha, via esse agente).
#
# O que faz: build de produção → variante /v2-teste/ (tools/build-v2-teste.py) → backup da pasta
# atual no servidor (fora da raiz pública) → envio só para v2-teste/ → conferência das páginas.
# Nunca toca na raiz do domínio (o WordPress). Uso: tools/publicar-v2-teste.sh [--simular]
set -euo pipefail

HOST=inner-v2
DESTINO='innerplacement/v2-teste'           # relativo ao HOME do usuário cPanel; a raiz do site é ~/innerplacement
BACKUPS='backups-v2-teste'                  # no HOME, fora da raiz pública
URL='https://innerplacement.com.br/v2-teste'
# Arquivos que existem só no servidor e devem ficar (o rsync --delete não os apaga).
PRESERVAR=(folha-referencia-inner.png)

cd "$(dirname "$0")/.."
SSH=(ssh -o BatchMode=yes -o ConnectTimeout=15 "$HOST")

if ! "${SSH[@]}" true 2>/dev/null; then
  echo "Sem acesso ao $HOST. Destrave a chave no seu terminal (comando no topo deste script)." >&2
  exit 1
fi

echo '==> Build'
npm run build --silent >/dev/null
python3 tools/build-v2-teste.py

FILTROS=()
for f in "${PRESERVAR[@]}"; do FILTROS+=(--filter "P /$f"); done
RSYNC=(rsync -rlz --checksum --delete --chmod=D755,F644 "${FILTROS[@]}" -e "ssh -o BatchMode=yes" dist-v2-teste/ "$HOST:$DESTINO/")

if [[ "${1:-}" == '--simular' ]]; then
  echo '==> Simulação (nada é enviado)'
  "${RSYNC[@]}" --dry-run --itemize-changes
  exit 0
fi

CARIMBO=$(date +%Y%m%d-%H%M%S)
echo "==> Backup no servidor: ~/$BACKUPS/v2-teste-$CARIMBO.tgz"
"${SSH[@]}" "mkdir -p ~/$BACKUPS && chmod 700 ~/$BACKUPS && tar czf ~/$BACKUPS/v2-teste-$CARIMBO.tgz -C ~/$(dirname "$DESTINO") $(basename "$DESTINO") && ls -la ~/$BACKUPS/v2-teste-$CARIMBO.tgz"

echo '==> Envio'
"${RSYNC[@]}" --itemize-changes

echo '==> Conferência online'
falhas=0
for p in '' blog/ por-que-novos-lideres-fracassam/ contato/ depoimentos/ desenvolvimento-de-carreira/ desenvolvimento-de-executivos/ manifesto/ obrigado/ outplacement/ perguntas-frequentes/ quem-somos/ transicao-e-recolocacao/; do
  cod=$(curl -s -o /tmp/v2-teste-pagina.html -w '%{http_code}' "$URL/$p?v=$CARIMBO")
  robots=$(grep -c 'content="noindex, nofollow"' /tmp/v2-teste-pagina.html || true)
  echo "  $cod  noindex=$robots  /v2-teste/$p"
  [[ "$cod" == 200 && "$robots" == 1 ]] || falhas=$((falhas + 1))
done
js=$(grep -o '/v2-teste/_astro/[^"]*\.js' dist-v2-teste/index.html | head -1)
cod=$(curl -s -o /dev/null -w '%{http_code}' "https://innerplacement.com.br$js")
echo "  $cod  $js"; [[ "$cod" == 200 ]] || falhas=$((falhas + 1))
rm -f /tmp/v2-teste-pagina.html

if (( falhas )); then
  echo "ATENÇÃO: $falhas conferência(s) falharam. Para voltar: ssh $HOST \"rm -rf ~/$DESTINO && tar xzf ~/$BACKUPS/v2-teste-$CARIMBO.tgz -C ~/$(dirname "$DESTINO")\"" >&2
  exit 1
fi
echo "Publicado em $URL/  (backup: ~/$BACKUPS/v2-teste-$CARIMBO.tgz)"
