<?php
declare(strict_types=1);
/**
 * Exporta as respostas em CSV.
 *
 *     /api/export.php?token=SEU_TOKEN                    -> tudo
 *     /api/export.php?token=SEU_TOKEN&evento=mosaic-uberaba -> só um evento
 *
 * Define 'token_export' em src/config.php. Vazio = endpoint desligado (404).
 *
 * As colunas de nota são exatamente as mesmas da planilha do Google, porque
 * reaproveitam iqa_sheets_cabecalho() e iqa_sheets_linha(). Assim o CSV e a
 * planilha nunca divergem: existe uma única definição de ordem de colunas.
 */
require_once __DIR__ . '/../src/db.php';
require_once __DIR__ . '/../src/questions.php';
require_once __DIR__ . '/../src/scoring.php';
require_once __DIR__ . '/../src/sheets.php';

$cfg   = iqa_config();
$token = (string) ($cfg['app']['token_export'] ?? '');

if ($token === '' || !hash_equals($token, (string) ($_GET['token'] ?? ''))) {
    http_response_code(404);
    exit('Não encontrado.');
}

// Filtro opcional por evento. Slug desconhecido devolve 404, não uma lista vazia:
// planilha em branco por causa de um erro de digitação é pior do que um erro claro.
$filtro = isset($_GET['evento']) ? iqa_evento((string) $_GET['evento']) : null;
if (isset($_GET['evento']) && $filtro === null) {
    http_response_code(404);
    exit('Evento desconhecido.');
}

$sufixo = $filtro ? '-' . $filtro['slug'] : '';
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="iqa-respostas' . $sufixo . '-' . date('Y-m-d') . '.csv"');

$saida = fopen('php://output', 'w');
fwrite($saida, "\xEF\xBB\xBF"); // BOM: o Excel em pt-BR precisa dele para os acentos

// Colunas próprias do CSV + as mesmas colunas da planilha
$cabecalho = array_merge(
    ['Evento', 'Slug do evento'],
    iqa_sheets_cabecalho(),
    ['E-mail enviado', 'Na planilha', 'Erro de e-mail', 'Erro da planilha']
);
fputcsv($saida, $cabecalho, ';');

if ($filtro) {
    $st = iqa_db()->prepare('SELECT * FROM iqa_respostas WHERE evento_slug = ? ORDER BY criado_em DESC');
    $st->execute([$filtro['slug']]);
} else {
    $st = iqa_db()->query('SELECT * FROM iqa_respostas ORDER BY criado_em DESC');
}

while ($linha = $st->fetch()) {
    $resultado = json_decode((string) $linha['resultado'], true);

    // Respostas antigas, gravadas antes de 'resultado' existir, são recalculadas
    // a partir das notas cruas em vez de sair como linha vazia.
    if (!is_array($resultado) || empty($resultado['dimensoes'])) {
        $notas = json_decode((string) $linha['respostas'], true) ?: ['eu' => [], 'equipe' => []];
        $pares = [];
        foreach (IQA_ITENS as $i) {
            $pares[$i['id']] = [
                'eu'     => $notas['eu'][$i['id']] ?? null,
                'equipe' => $notas['equipe'][$i['id']] ?? null,
            ];
        }
        try {
            $resultado = iqa_calcular($pares);
        } catch (Throwable $e) {
            continue;
        }
    }

    $pessoa = [
        'nome'    => (string) $linha['nome'],
        'email'   => (string) $linha['email'],
        'cargo'   => (string) ($linha['cargo'] ?? ''),
        'empresa' => (string) ($linha['empresa'] ?? ''),
    ];

    $registro = array_merge(
        [(string) ($linha['evento'] ?? ''), (string) ($linha['evento_slug'] ?? '')],
        iqa_sheets_linha(
            (int) $linha['id'],
            $pessoa,
            $resultado,
            date('d/m/Y H:i', strtotime((string) $linha['criado_em']))
        ),
        [
            $linha['email_enviado'] ? 'sim' : 'nao',
            $linha['sheet_enviado'] ? 'sim' : 'nao',
            (string) ($linha['email_erro'] ?? ''),
            (string) ($linha['sheet_erro'] ?? ''),
        ]
    );

    fputcsv($saida, $registro, ';');
}

fclose($saida);
