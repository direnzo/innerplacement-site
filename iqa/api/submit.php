<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

require_once __DIR__ . '/../src/db.php';
require_once __DIR__ . '/../src/scoring.php';
require_once __DIR__ . '/../src/mailer.php';
require_once __DIR__ . '/../src/sheets.php';

function responder(int $status, array $corpo): never
{
    http_response_code($status);
    echo json_encode($corpo, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, ['erro' => 'Método não permitido.']);
}

$bruto = file_get_contents('php://input');
$dados = json_decode($bruto, true);
if (!is_array($dados)) {
    responder(400, ['erro' => 'Não consegui ler os dados enviados. Tente novamente.']);
}

// Honeypot: campo invisível no formulário. Se veio preenchido, é robô.
if (!empty($dados['website'])) {
    responder(200, ['ok' => true]);
}

// O evento vem do navegador, mas quem manda é o cadastro no servidor.
// Nunca gravamos rótulo vindo do cliente.
$evento = iqa_evento($dados['evento'] ?? null);
if ($evento === null) {
    responder(422, ['erro' => 'Este link de evento não é válido. Confira o endereço.']);
}
if (empty($evento['ativo'])) {
    responder(422, ['erro' => 'Este evento já foi encerrado.']);
}

$pessoa = [
    'nome'          => trim((string) ($dados['nome'] ?? '')),
    'email'         => trim((string) ($dados['email'] ?? '')),
    'cargo'         => trim((string) ($dados['cargo'] ?? '')),
    'empresa'       => trim((string) ($dados['empresa'] ?? '')),
    'consentimento' => !empty($dados['consentimento']),
];

if (mb_strlen($pessoa['nome']) < 2) {
    responder(422, ['erro' => 'Informe seu nome para receber o resultado.', 'campo' => 'nome']);
}
if (!filter_var($pessoa['email'], FILTER_VALIDATE_EMAIL)) {
    responder(422, ['erro' => 'Esse e-mail não parece válido. Confira antes de enviar.', 'campo' => 'email']);
}
if (!$pessoa['consentimento']) {
    responder(422, ['erro' => 'Precisamos do seu aceite para enviar o resultado por e-mail.', 'campo' => 'consentimento']);
}

$pessoa['evento_rotulo'] = iqa_evento_rotulo($evento);

$respostas = [];
foreach ((array) ($dados['respostas'] ?? []) as $id => $par) {
    $respostas[(int) $id] = [
        'eu'     => isset($par['eu']) ? (int) $par['eu'] : null,
        'equipe' => isset($par['equipe']) ? (int) $par['equipe'] : null,
    ];
}

try {
    $resultado = iqa_calcular($respostas);
} catch (InvalidArgumentException $e) {
    responder(422, ['erro' => 'Faltou responder algum item. ' . $e->getMessage()]);
}

$cfg = iqa_config();
$ip  = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '';

$limite = (int) ($cfg['app']['limite_ip'] ?? 0);
if ($limite > 0) {
    try {
        if (iqa_envios_recentes($ip) >= $limite) {
            responder(429, ['erro' => 'Muitos envios deste dispositivo na última hora. Tente mais tarde.']);
        }
    } catch (Throwable $e) {
        // A trava de IP nunca derruba o envio de ninguém.
    }
}

$id = 0;
try {
    $id = iqa_salvar($pessoa, $resultado, [
        'evento'      => $pessoa['evento_rotulo'],
        'evento_slug' => $evento['slug'],
        'ip'          => $ip,
        'user_agent'  => $_SERVER['HTTP_USER_AGENT'] ?? '',
    ]);
} catch (Throwable $e) {
    error_log('[IQA] falha ao gravar: ' . $e->getMessage());
    // O resultado na tela e o e-mail seguem mesmo se o banco falhar.
}

$envio = iqa_enviar_email($pessoa, $resultado, $cfg);
if ($id > 0) {
    try {
        iqa_marcar_email_enviado($id, $envio['ok'], $envio['erro']);
    } catch (Throwable $e) {
        error_log('[IQA] falha ao marcar e-mail: ' . $e->getMessage());
    }
}
if (!$envio['ok']) {
    error_log('[IQA] falha no e-mail para ' . $pessoa['email'] . ': ' . $envio['erro']);
}

// Espelho na planilha. Falha aqui nunca afeta a pessoa: fica pendente
// e o bin/sincronizar-sheets.php reenvia depois.
if ($id > 0 && iqa_sheets_ativo($cfg)) {
    $sheet = iqa_sheets_enviar($id, $pessoa, $resultado, $evento, $cfg);
    try {
        iqa_marcar_sheet($id, $sheet['ok'], $sheet['erro']);
    } catch (Throwable $e) {
        error_log('[IQA] falha ao marcar sheet: ' . $e->getMessage());
    }
    if (!$sheet['ok']) {
        error_log('[IQA] falha no Sheets para resposta ' . $id . ': ' . $sheet['erro']);
    }
}

responder(200, [
    'ok'            => true,
    'id'            => $id,
    'email_enviado' => $envio['ok'],
    'resultado'     => $resultado,
]);
