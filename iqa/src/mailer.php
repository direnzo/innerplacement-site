<?php
require_once __DIR__ . '/email_template.php';

/**
 * Envia o resultado. Usa PHPMailer quando disponível (composer require phpmailer/phpmailer),
 * senão cai para mail(). Em hospedagem compartilhada, SMTP autenticado entrega muito
 * melhor do que mail(): sem SPF/DKIM do próprio domínio, o Gmail costuma barrar.
 *
 * @return array{ok:bool, erro:?string}
 */
function iqa_enviar_email(array $pessoa, array $resultado, array $cfg): array
{
    $html    = iqa_email_html($pessoa, $resultado, $cfg);
    $texto   = iqa_email_texto($pessoa, $resultado);
    $assunto = 'Seu IQA: ' . $resultado['soma_eu'] . '/75 — ' . $resultado['faixa_eu'];

    $autoload = dirname(__DIR__) . '/vendor/autoload.php';
    if (is_file($autoload)) {
        require_once $autoload;
    }

    if ($cfg['mail']['driver'] === 'smtp' && class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
        return iqa_enviar_smtp($pessoa, $assunto, $html, $texto, $cfg);
    }

    return iqa_enviar_mail($pessoa, $assunto, $html, $cfg);
}

function iqa_enviar_smtp(array $pessoa, string $assunto, string $html, string $texto, array $cfg): array
{
    $m = new \PHPMailer\PHPMailer\PHPMailer(true);
    try {
        $c = $cfg['mail'];
        $m->isSMTP();
        $m->Host       = $c['host'];
        $m->SMTPAuth   = true;
        $m->Username   = $c['usuario'];
        $m->Password   = $c['senha'];
        $m->SMTPSecure = $c['seguranca'] === 'tls'
            ? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS
            : \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $m->Port    = (int) $c['porta'];
        $m->CharSet = 'UTF-8';

        $m->setFrom($c['de_email'], $c['de_nome']);
        $m->addAddress($pessoa['email'], $pessoa['nome']);
        if (!empty($c['responder_para'])) {
            $m->addReplyTo($c['responder_para'], $c['de_nome']);
        }
        if (!empty($c['copia_interna'])) {
            $m->addBCC($c['copia_interna']);
        }

        $m->isHTML(true);
        $m->Subject = $assunto;
        $m->Body    = $html;
        $m->AltBody = $texto;
        $m->send();

        return ['ok' => true, 'erro' => null];
    } catch (Throwable $e) {
        return ['ok' => false, 'erro' => $e->getMessage()];
    }
}

function iqa_enviar_mail(array $pessoa, string $assunto, string $html, array $cfg): array
{
    $c = $cfg['mail'];
    $de = sprintf('%s <%s>', $c['de_nome'], $c['de_email']);

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $de,
        'Reply-To: ' . ($c['responder_para'] ?: $c['de_email']),
    ];
    if (!empty($c['copia_interna'])) {
        $headers[] = 'Bcc: ' . $c['copia_interna'];
    }

    $ok = @mail(
        $pessoa['email'],
        '=?UTF-8?B?' . base64_encode($assunto) . '?=',
        $html,
        implode("\r\n", $headers),
        '-f' . $c['de_email']
    );

    return ['ok' => $ok, 'erro' => $ok ? null : 'mail() retornou false'];
}
