<?php
/**
 * Copie para src/config.php e preencha. config.php fica fora do Git.
 * Nada aqui é lido pelo navegador — a pasta /src é bloqueada pelo .htaccess.
 */
return [
    'db' => [
        'host'  => 'localhost',
        'nome'  => 'innerpl_iqa',
        'user'  => 'innerpl_iqa',
        'senha' => '',
        'charset' => 'utf8mb4',
    ],

    // 'smtp' usa PHPMailer (recomendado). 'mail' usa a função mail() do PHP.
    'mail' => [
        'driver'      => 'smtp',
        'host'        => 'smtp.hostinger.com',   // ajuste ao seu provedor
        'porta'       => 465,
        'seguranca'   => 'ssl',                  // 'ssl' (465) ou 'tls' (587)
        'usuario'     => 'iqa@innerplacement.com.br',
        'senha'       => '',
        'de_email'    => 'iqa@innerplacement.com.br',
        'de_nome'     => 'InnerPlacement',
        'responder_para' => 'contato@innerplacement.com.br',
        // Recebe uma cópia oculta de cada resposta. Deixe null para não enviar.
        'copia_interna'  => 'contato@innerplacement.com.br',
    ],

    'app' => [
        // Usado nos links do e-mail. Sem barra no final.
        'url_base'   => 'https://iqa.innerplacement.com.br',
        'site'       => 'https://www.innerplacement.com.br',
        // Máximo de envios por IP por hora. 0 desliga a trava.
        'limite_ip'  => 12,
        // Token para abrir /api/export.php?token=...  (deixe vazio para desativar)
        'token_export' => '',
    ],
];
