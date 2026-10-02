<?php
/**
 * Envio do formulário de contato (página /contato/).
 *
 * Replica o que o formulário do Elementor fazia no WordPress (post 1722, formulários 92750fb e b33c226):
 *   - e-mail para contato@innerplacement.com.br, remetente "InnerPlacement" <contato@innerplacement.com.br>,
 *     assunto 'Mensagem do Site "InnerPlacement"', com todos os campos;
 *   - registro de cada mensagem (lá ia para o banco do Elementor; aqui, um arquivo fora da pasta pública);
 *   - em seguida, a página de Agradecimento.
 * Os campos e a validação são os da documentação funcional aprovada (seção 9.1): Nome, E-mail, WhatsApp e
 * Sua mensagem; nome e mensagem obrigatórios; pelo menos um entre e-mail e WhatsApp.
 * A mais que o WordPress: "Responder para" com o e-mail de quem escreveu.
 *
 * Antispam sem serviço externo: campo isca (empresa_site), tempo mínimo de preenchimento (campo t, posto
 * pelo script da página) e limite de envios por endereço de IP.
 *
 * Configuração opcional, fora da pasta pública: <pasta acima da raiz do site>/inner-formulario.php,
 * devolvendo um array (ex.: ['destino_teste' => 'alguem@exemplo.com']). Na /v2-teste/, sem
 * 'destino_teste' configurado, o envio de e-mail fica desligado (a mensagem é só registrada), para
 * testes não caírem na caixa da Inner.
 *
 * Respostas: com Accept: application/json (o script da página), JSON {ok, destino | erro}; sem JavaScript,
 * redireciona para /obrigado/ ou de volta para /contato/?erro=… .
 */

declare(strict_types=1);

$base   = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/enviar.php')), '/'); // '' ou '/v2-teste'
$teste  = $base !== '';
$querJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
$fora   = dirname(rtrim($_SERVER['DOCUMENT_ROOT'] ?? __DIR__, '/'));   // pasta acima da raiz pública
$cfgArq = $fora . '/inner-formulario.php';
$cfg    = is_file($cfgArq) ? (array) (include $cfgArq) : [];

$padrao = [
  'destino'   => 'contato@innerplacement.com.br',
  'remetente' => 'contato@innerplacement.com.br',
  'nome'      => 'InnerPlacement',
  'assunto'   => 'Mensagem do Site "InnerPlacement"',
  'registro'  => $fora . '/inner-mensagens',
  'limite_hora' => 5,
  'tempo_minimo' => 3,
];
$cfg = $cfg + $padrao;

function responder(bool $ok, string $base, bool $querJson, string $erro = ''): never {
  if ($querJson) {
    http_response_code($ok ? 200 : 422);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($ok ? ['ok' => true, 'destino' => $base . '/obrigado/'] : ['ok' => false, 'erro' => $erro], JSON_UNESCAPED_UNICODE);
  } else {
    header('Location: ' . ($ok ? $base . '/obrigado/' : $base . '/contato/?erro=' . rawurlencode($erro ?: 'envio') . '#formulario'), true, 303);
  }
  exit;
}
const ERRO_ENVIO = 'Não foi possível enviar agora. Tente de novo em instantes ou chame a Inner no WhatsApp.';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  header('Location: ' . $base . '/contato/', true, 303);
  exit;
}

// Antispam: a isca preenchida ou um envio rápido demais são tratados como enviados (o robô não aprende nada).
$isca = trim((string) ($_POST['empresa_site'] ?? ''));
$t    = (int) ($_POST['t'] ?? 0);
if ($isca !== '' || ($t > 0 && (time() - intdiv($t, 1000)) < (int) $cfg['tempo_minimo'])) {
  responder(true, $base, $querJson);
}

// Campos (limites de tamanho e sem quebras de linha nos que vão para cabeçalhos).
$um = static fn(string $k, int $max): string => mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', (string) ($_POST[$k] ?? ''))), 0, $max);
$nome     = $um('nome', 120);
$email    = $um('email', 160);
$whatsapp = $um('whatsapp', 40);
$mensagem = mb_substr(trim(str_replace("\r\n", "\n", (string) ($_POST['mensagem'] ?? ''))), 0, 5000);

// Validação da documentação (as mesmas mensagens da página).
if ($nome === '')                       responder(false, $base, $querJson, 'Escreva o seu nome.');
if ($email === '' && $whatsapp === '')  responder(false, $base, $querJson, 'Deixe um e-mail ou um WhatsApp para a Inner responder.');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) responder(false, $base, $querJson, 'Confira o e-mail. Parece faltar alguma parte.');
if ($mensagem === '')                   responder(false, $base, $querJson, 'Conte, em poucas palavras, o que você deseja.');

// Limite de envios por IP (por hora), guardado junto ao registro.
$dir = rtrim((string) $cfg['registro'], '/');
if (!is_dir($dir)) { @mkdir($dir, 0700, true); }
$ip  = $_SERVER['REMOTE_ADDR'] ?? '';
$chaveIp = hash('sha256', $ip . '|' . date('YmdH'));
$contArq = $dir . '/limite-' . date('YmdH') . '.json';
$cont = is_file($contArq) ? (json_decode((string) file_get_contents($contArq), true) ?: []) : [];
if (($cont[$chaveIp] ?? 0) >= (int) $cfg['limite_hora']) {
  responder(false, $base, $querJson, 'Recebemos várias mensagens seguidas daqui. Tente de novo mais tarde ou chame a Inner no WhatsApp.');
}
$cont[$chaveIp] = ($cont[$chaveIp] ?? 0) + 1;
@file_put_contents($contArq, json_encode($cont), LOCK_EX);
foreach (glob($dir . '/limite-*.json') ?: [] as $velho) {   // limpa contadores de horas anteriores
  if ($velho !== $contArq) { @unlink($velho); }
}

// Registro (equivalente ao "salvar no banco" do Elementor).
$agora = new DateTimeImmutable('now', new DateTimeZone('America/Sao_Paulo'));
$pagina = mb_substr((string) ($_SERVER['HTTP_REFERER'] ?? ''), 0, 300);
$registro = [
  'data' => $agora->format('c'), 'ambiente' => $teste ? 'teste' : 'producao',
  'nome' => $nome, 'email' => $email, 'whatsapp' => $whatsapp, 'mensagem' => $mensagem, 'pagina' => $pagina,
];
$gravou = @file_put_contents($dir . '/mensagens-' . $agora->format('Y-m') . '.jsonl', json_encode($registro, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX) !== false;

// E-mail. Na /v2-teste/, só com destino de teste configurado.
$destino = $teste ? (string) ($cfg['destino_teste'] ?? '') : (string) $cfg['destino'];
if ($destino === '') {
  // Teste sem destino configurado: a mensagem fica só no registro.
  if ($gravou) responder(true, $base, $querJson);
  responder(false, $base, $querJson, ERRO_ENVIO);
}

$linhas = [
  'Mensagem enviada pelo site' . ($teste ? ' (versão de teste /v2-teste/)' : '') . '.',
  '',
  'Nome: ' . $nome,
  'E-mail: ' . ($email !== '' ? $email : '—'),
  'WhatsApp: ' . ($whatsapp !== '' ? $whatsapp : '—'),
  '',
  'Mensagem:',
  $mensagem,
  '',
  '—',
  'Enviada em ' . $agora->format('d/m/Y \à\s H:i') . ($pagina !== '' ? ' pela página ' . $pagina : '') . '.',
];
$corpo = implode("\n", $linhas);

$remetente = (string) $cfg['remetente'];
$cabecalhos = [
  'From' => mb_encode_mimeheader((string) $cfg['nome'], 'UTF-8', 'Q') . ' <' . $remetente . '>',
  'MIME-Version' => '1.0',
  'Content-Type' => 'text/plain; charset=UTF-8',
  'Content-Transfer-Encoding' => '8bit',
];
if ($email !== '') {
  $cabecalhos['Reply-To'] = mb_encode_mimeheader($nome, 'UTF-8', 'Q') . ' <' . $email . '>';
}
$assunto = mb_encode_mimeheader((string) $cfg['assunto'] . ($teste ? ' [teste]' : ''), 'UTF-8', 'Q');
$enviou = mail($destino, $assunto, $corpo, $cabecalhos, '-f' . $remetente);

if ($enviou || $gravou) {
  // Se o e-mail falhou mas a mensagem ficou registrada, ela não se perde; o erro fica no log do servidor.
  if (!$enviou) { error_log('enviar.php: mail() falhou; mensagem registrada em ' . $dir); }
  responder(true, $base, $querJson);
}
responder(false, $base, $querJson, ERRO_ENVIO);
