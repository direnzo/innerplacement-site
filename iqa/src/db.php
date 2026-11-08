<?php
require_once __DIR__ . '/eventos.php';

function iqa_config(): array
{
    static $config = null;
    if ($config === null) {
        $caminho = __DIR__ . '/config.php';
        if (!is_file($caminho)) {
            throw new RuntimeException('src/config.php não existe. Copie src/config.example.php e preencha.');
        }
        $config = require $caminho;
    }
    return $config;
}

function iqa_db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $c = iqa_config()['db'];
        $dsn = "mysql:host={$c['host']};dbname={$c['nome']};charset={$c['charset']}";
        $pdo = new PDO($dsn, $c['user'], $c['senha'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}

/** Quantos envios este IP fez na última hora. */
function iqa_envios_recentes(string $ip): int
{
    $st = iqa_db()->prepare(
        'SELECT COUNT(*) FROM iqa_respostas WHERE ip = ? AND criado_em > (NOW() - INTERVAL 1 HOUR)'
    );
    $st->execute([$ip]);
    return (int) $st->fetchColumn();
}

function iqa_salvar(array $pessoa, array $resultado, array $meta): int
{
    $sql = 'INSERT INTO iqa_respostas
              (nome, email, cargo, empresa, evento, evento_slug, respostas, resultado,
               soma_eu, soma_equipe, gap, faixa_eu, faixa_equipe,
               consentimento, ip, user_agent)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    iqa_db()->prepare($sql)->execute([
        $pessoa['nome'],
        $pessoa['email'],
        $pessoa['cargo'] ?: null,
        $pessoa['empresa'] ?: null,
        $meta['evento'],
        $meta['evento_slug'],
        json_encode($resultado['notas'], JSON_UNESCAPED_UNICODE),
        json_encode($resultado, JSON_UNESCAPED_UNICODE),
        $resultado['soma_eu'],
        $resultado['soma_equipe'],
        $resultado['gap'],
        $resultado['faixa_eu'],
        $resultado['faixa_equipe'],
        $pessoa['consentimento'] ? 1 : 0,
        $meta['ip'],
        mb_substr($meta['user_agent'], 0, 250),
    ]);

    return (int) iqa_db()->lastInsertId();
}

function iqa_marcar_email_enviado(int $id, bool $ok, ?string $erro = null): void
{
    iqa_db()->prepare('UPDATE iqa_respostas SET email_enviado = ?, email_erro = ? WHERE id = ?')
        ->execute([$ok ? 1 : 0, $erro ? mb_substr($erro, 0, 250) : null, $id]);
}

function iqa_marcar_sheet(int $id, bool $ok, ?string $erro = null): void
{
    iqa_db()->prepare('UPDATE iqa_respostas SET sheet_enviado = ?, sheet_erro = ?, sheet_em = ? WHERE id = ?')
        ->execute([
            $ok ? 1 : 0,
            $erro ? mb_substr($erro, 0, 250) : null,
            $ok ? date('Y-m-d H:i:s') : null,
            $id,
        ]);
}

/**
 * Respostas que ainda não chegaram na planilha.
 * Usado pelo bin/sincronizar-sheets.php.
 */
function iqa_pendentes_sheet(int $limite = 200): array
{
    $st = iqa_db()->prepare(
        'SELECT id, nome, email, cargo, empresa, evento_slug, resultado, criado_em
           FROM iqa_respostas
          WHERE sheet_enviado = 0
       ORDER BY criado_em ASC
          LIMIT ' . max(1, min(1000, $limite))
    );
    $st->execute();
    return $st->fetchAll();
}
