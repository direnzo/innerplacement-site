<?php
/**
 * Reenvia para a planilha as respostas que ficaram pendentes.
 *
 * Só roda por linha de comando — nunca pela web:
 *     php bin/sincronizar-sheets.php
 *
 * Sugestão de cron a cada 15 minutos:
 *     /opt/cpanel/ea-php82/root/usr/bin/php /home1/s100c354/iqa/bin/sincronizar-sheets.php >> /home1/s100c354/logs/iqa-sheets.log 2>&1
 *
 * É seguro rodar quantas vezes quiser: só pega linhas com sheet_enviado = 0,
 * e marca cada uma assim que ela chega na planilha.
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require_once __DIR__ . '/../src/db.php';
require_once __DIR__ . '/../src/sheets.php';

$cfg = iqa_config();

if (!iqa_sheets_ativo($cfg)) {
    fwrite(STDERR, date('c') . " Sheets desligado ou credencial ausente. Nada a fazer.\n");
    exit(1);
}

$pendentes = iqa_pendentes_sheet(200);
if (!$pendentes) {
    echo date('c'), " Nada pendente.\n";
    exit(0);
}

echo date('c'), ' ', count($pendentes), " pendente(s).\n";

$ok = 0;
$falhas = 0;

foreach ($pendentes as $linha) {
    $resultado = json_decode((string) $linha['resultado'], true);
    if (!is_array($resultado) || empty($resultado['dimensoes'])) {
        iqa_marcar_sheet((int) $linha['id'], false, 'Resultado gravado em formato inesperado.');
        $falhas++;
        continue;
    }

    $evento = iqa_evento($linha['evento_slug']) ?? iqa_evento_padrao();

    $pessoa = [
        'nome'    => (string) $linha['nome'],
        'email'   => (string) $linha['email'],
        'cargo'   => (string) ($linha['cargo'] ?? ''),
        'empresa' => (string) ($linha['empresa'] ?? ''),
    ];

    $quando = date('d/m/Y H:i', strtotime((string) $linha['criado_em']));
    $envio  = iqa_sheets_enviar((int) $linha['id'], $pessoa, $resultado, $evento, $cfg, $quando);

    iqa_marcar_sheet((int) $linha['id'], $envio['ok'], $envio['erro']);

    if ($envio['ok']) {
        $ok++;
    } else {
        $falhas++;
        fwrite(STDERR, date('c') . ' id=' . $linha['id'] . ' falhou: ' . $envio['erro'] . "\n");
        // Se o Google está fora do ar, insistir nas 200 só gera ruído.
        if ($falhas >= 5 && $ok === 0) {
            fwrite(STDERR, date('c') . " 5 falhas seguidas sem sucesso. Parando.\n");
            break;
        }
    }

    usleep(300000); // 0,3s entre chamadas, para não bater na cota do Sheets
}

echo date('c'), " enviadas: $ok | falhas: $falhas\n";
exit($falhas > 0 ? 1 : 0);
