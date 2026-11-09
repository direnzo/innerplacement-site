#!/usr/bin/env bash
# Publica o site na raiz de https://innerplacement.com.br/. Só vale depois da troca do WordPress:
# recusa rodar enquanto houver WordPress na pasta de destino (docs/plano-migracao-producao.md, passo 7).
#
# O que faz: build de produção → backup da pasta atual no servidor (fora da raiz pública) → envio →
# conferência das páginas. Mesmo acesso de tools/publicar-v2-teste.sh. Uso: tools/publicar-producao.sh [--simular]
set -euo pipefail

HOST=inner-v2
DESTINO='innerplacement'                    # relativo ao HOME do usuário cPanel
BACKUPS='backups-producao'                  # no HOME, fora da raiz pública
URL='https://innerplacement.com.br'
# Existem só no servidor e devem ficar (o rsync --delete não os apaga).
PRESERVAR=(.well-known/ .user.ini php.ini error_log)

cd "$(dirname "$0")/.."
SSH=(ssh -o BatchMode=yes -o ConnectTimeout=15 "$HOST")

if ! erro=$("${SSH[@]}" true 2>&1); then
  echo "Sem acesso ao $HOST: ${erro:-sem mensagem do ssh}" >&2
  echo "No seu terminal: destrave a chave (comando no topo de tools/publicar-v2-teste.sh)." >&2
  exit 1
fi
if "${SSH[@]}" "test -e ~/$DESTINO/wp-config.php"; then
  echo "PARADO: ~/$DESTINO ainda tem WordPress. A troca de pasta não foi feita." >&2
  exit 1
fi

echo '==> Build'
npm run build --silent >/dev/null

FILTROS=()
for f in "${PRESERVAR[@]}"; do FILTROS+=(--filter "P /$f"); done
RSYNC=(rsync -rlz --checksum --delete --chmod=D755,F644 "${FILTROS[@]}" -e "ssh -o BatchMode=yes" dist/ "$HOST:$DESTINO/")

if [[ "${1:-}" == '--simular' ]]; then
  echo '==> Simulação (nada é enviado)'
  "${RSYNC[@]}" --dry-run --itemize-changes
  exit 0
fi

CARIMBO=$(date +%Y%m%d-%H%M%S)
echo "==> Backup no servidor: ~/$BACKUPS/site-$CARIMBO.tgz (mantém os 10 mais recentes)"
"${SSH[@]}" "mkdir -p ~/$BACKUPS && chmod 700 ~/$BACKUPS && tar czf ~/$BACKUPS/site-$CARIMBO.tgz -C ~ $DESTINO && cd ~/$BACKUPS && ls -1t site-*.tgz | tail -n +11 | xargs -r rm -f"

echo '==> Envio'
"${RSYNC[@]}" --itemize-changes

echo '==> Conferência online'
falhas=0
for p in '' blog/ contato/ depoimentos/ manifesto/ para-sua-empresa/ para-sua-empresa/next-level/ para-sua-empresa/executive-alignment/ para-sua-empresa/outplacement/ para-voce/ para-voce/next-level/ para-voce/transicao-e-recolocacao/ perguntas-frequentes/ quem-somos/ e-book/; do
  cod=$(curl -s -o /tmp/site-pagina.html -w '%{http_code}' "$URL/$p?v=$CARIMBO")
  robots=$(grep -c 'name="robots" content="noindex' /tmp/site-pagina.html || true)
  echo "  $cod  noindex=$robots  /$p"
  [[ "$cod" == 200 && "$robots" == 0 ]] || falhas=$((falhas + 1))
done
rm -f /tmp/site-pagina.html

if (( falhas )); then
  echo "ATENÇÃO: $falhas conferência(s) falharam. Backup em ~/$BACKUPS/site-$CARIMBO.tgz" >&2
  exit 1
fi
echo "Publicado em $URL/  (backup: ~/$BACKUPS/site-$CARIMBO.tgz)"
