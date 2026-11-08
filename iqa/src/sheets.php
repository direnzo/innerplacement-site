<?php
require_once __DIR__ . '/questions.php';
require_once __DIR__ . '/eventos.php';

/**
 * Espelha cada resposta numa planilha do Google, uma aba por evento.
 *
 * O MySQL continua sendo a fonte de verdade. Se o Google falhar, a resposta
 * segue gravada e a linha fica marcada com sheet_enviado = 0, para o
 * bin/sincronizar-sheets.php reenviar depois. Nada aqui pode derrubar o envio.
 */

function iqa_sheets_ativo(array $cfg): bool
{
    $s = $cfg['sheets'] ?? [];
    return !empty($s['ativo'])
        && !empty($s['planilha_id'])
        && !empty($s['credencial'])
        && is_file($s['credencial']);
}

/** Cabecalho da aba. A ordem define a ordem das colunas em iqa_sheets_linha(). */
function iqa_sheets_cabecalho(): array
{
    $c = ['ID', 'Data', 'Nome', 'E-mail', 'Cargo', 'Empresa',
          'Soma eu', 'Soma equipe', 'Gap', 'Leitura eu', 'Leitura equipe'];
    foreach (IQA_DIMENSOES as $rotulo) {
        $c[] = $rotulo . ' (eu)';
        $c[] = $rotulo . ' (equipe)';
    }
    foreach (IQA_ITENS as $i) {
        $c[] = 'Item ' . $i['id'] . ' eu';
        $c[] = 'Item ' . $i['id'] . ' equipe';
    }
    return $c;
}

function iqa_sheets_linha(int $id, array $pessoa, array $r, string $quando): array
{
    $l = [
        $id, $quando, $pessoa['nome'], $pessoa['email'],
        $pessoa['cargo'] ?: '', $pessoa['empresa'] ?: '',
        $r['soma_eu'], $r['soma_equipe'], $r['gap'],
        $r['faixa_eu'], $r['faixa_equipe'],
    ];
    foreach ($r['dimensoes'] as $d) {
        $l[] = $d['media_eu'];
        $l[] = $d['media_equipe'];
    }
    foreach (IQA_ITENS as $i) {
        $l[] = $r['notas']['eu'][$i['id']] ?? '';
        $l[] = $r['notas']['equipe'][$i['id']] ?? '';
    }
    return $l;
}

function iqa_sheets_servico(array $cfg): Google\Service\Sheets
{
    static $svc = null;
    if ($svc === null) {
        $autoload = dirname(__DIR__) . '/vendor/autoload.php';
        if (!is_file($autoload)) {
            throw new RuntimeException('vendor/autoload.php ausente. Rode composer install.');
        }
        require_once $autoload;

        $cliente = new Google\Client();
        $cliente->setAuthConfig($cfg['sheets']['credencial']);
        $cliente->setScopes([Google\Service\Sheets::SPREADSHEETS]);
        $cliente->setHttpClient(new GuzzleHttp\Client([
            'timeout'         => (float) ($cfg['sheets']['timeout'] ?? 12),
            'connect_timeout' => 5,
        ]));
        $svc = new Google\Service\Sheets($cliente);
    }
    return $svc;
}

/** Cria a aba com o cabecalho, se ela ainda nao existir. */
function iqa_sheets_garantir_aba(Google\Service\Sheets $svc, string $planilha, string $aba): void
{
    static $conhecidas = [];
    if (isset($conhecidas[$aba])) {
        return;
    }

    $doc = $svc->spreadsheets->get($planilha);
    foreach ($doc->getSheets() as $s) {
        if ($s->getProperties()->getTitle() === $aba) {
            $conhecidas[$aba] = true;
            return;
        }
    }

    $svc->spreadsheets->batchUpdate($planilha, new Google\Service\Sheets\BatchUpdateSpreadsheetRequest([
        'requests' => [['addSheet' => ['properties' => ['title' => $aba]]]],
    ]));

    $svc->spreadsheets_values->append(
        $planilha,
        $aba . '!A1',
        new Google\Service\Sheets\ValueRange(['values' => [iqa_sheets_cabecalho()]]),
        ['valueInputOption' => 'RAW', 'insertDataOption' => 'INSERT_ROWS']
    );

    $conhecidas[$aba] = true;
}

/**
 * @return array{ok:bool, erro:?string}
 */
function iqa_sheets_enviar(int $id, array $pessoa, array $resultado, array $evento, array $cfg, ?string $quando = null): array
{
    if (!iqa_sheets_ativo($cfg)) {
        return ['ok' => false, 'erro' => 'Sheets desligado na configuracao.'];
    }

    try {
        $svc      = iqa_sheets_servico($cfg);
        $planilha = $cfg['sheets']['planilha_id'];
        $aba      = $evento['aba'] ?: 'Sem evento';

        iqa_sheets_garantir_aba($svc, $planilha, $aba);

        $svc->spreadsheets_values->append(
            $planilha,
            $aba . '!A1',
            new Google\Service\Sheets\ValueRange([
                'values' => [iqa_sheets_linha($id, $pessoa, $resultado, $quando ?: date('d/m/Y H:i'))],
            ]),
            ['valueInputOption' => 'USER_ENTERED', 'insertDataOption' => 'INSERT_ROWS']
        );

        return ['ok' => true, 'erro' => null];
    } catch (Throwable $e) {
        return ['ok' => false, 'erro' => get_class($e) . ': ' . $e->getMessage()];
    }
}
