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
# IndexNow (Bing, Yandex e outros; o Bing alimenta o ChatGPT e o Copilot): a chave é pública por definição
# e fica em public/<chave>.txt. Avisa só as páginas do sitemap cujo HTML mudou nesta publicação.
INDEXNOW_CHAVE='2235cbaab95c27f44fafdf9f58c50349'
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
"${RSYNC[@]}" --itemize-changes | tee /tmp/site-envio.txt

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

# Linhas ">f..." do rsync são arquivos enviados; index.html vira a URL da pasta, e só entram URLs do sitemap.
mudadas=$(grep -oE '^>f[^ ]* (.*/)?index\.html$' /tmp/site-envio.txt | awk '{print $2}' | sed -E 's#index\.html$##' \
  | while read -r p; do u="$URL/$p"; grep -q "<loc>$u</loc>" dist/sitemap-0.xml && echo "$u"; done || true)
rm -f /tmp/site-envio.txt
if [[ -n "$mudadas" ]]; then
  echo "==> IndexNow: $(wc -l <<<"$mudadas") página(s)"
  json=$(python3 -c 'import json,sys; print(json.dumps({"host":"innerplacement.com.br","key":sys.argv[1],"keyLocation":sys.argv[2],"urlList":sys.stdin.read().split()}))' \
    "$INDEXNOW_CHAVE" "$URL/$INDEXNOW_CHAVE.txt" <<<"$mudadas")
  cod=$(curl -s -o /dev/null -w '%{http_code}' -X POST -H 'Content-Type: application/json; charset=utf-8' --data "$json" https://api.indexnow.org/indexnow || true)
  echo "  resposta $cod (200 ou 202 = recebido)"   # falha aqui não desfaz a publicação
fi
