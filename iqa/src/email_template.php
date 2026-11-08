<?php
require_once __DIR__ . '/questions.php';

/**
 * E-mail em tabelas com estilo inline: é o único formato que sobrevive
 * a Outlook, Gmail app e clientes corporativos. Barras são desenhadas com
 * células de largura percentual, não com imagens.
 */
function iqa_email_html(array $pessoa, array $r, array $cfg): string
{
    $e = fn($s) => htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');

    $ink   = '#101725';
    $slate = '#56637A';
    $paper = '#F0F2F5';
    $rule  = '#C8D0DC';
    $mark  = '#E8B400';

    $linhas = '';
    foreach ($r['dimensoes'] as $d) {
        $pEu = round($d['media_eu'] / 5 * 100);
        $pEq = round($d['media_equipe'] / 5 * 100);
        $linhas .= '
        <tr>
          <td style="padding:14px 0 4px;font:600 14px/1.3 Arial,Helvetica,sans-serif;color:' . $ink . ';border-top:1px solid ' . $rule . ';">' . $e($d['rotulo']) . '</td>
        </tr>
        <tr><td style="padding:0 0 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="52" style="font:400 11px/1.4 Arial,Helvetica,sans-serif;color:' . $slate . ';">Eu</td>
              <td>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $paper . ';">
                  <tr><td width="' . $pEu . '%" style="background:' . $ink . ';height:10px;line-height:10px;font-size:0;">&nbsp;</td><td>&nbsp;</td></tr>
                </table>
              </td>
              <td width="42" align="right" style="font:700 13px/1.4 Arial,Helvetica,sans-serif;color:' . $ink . ';">' . number_format($d['media_eu'], 1, ',', '') . '</td>
            </tr>
            <tr><td colspan="3" style="height:5px;line-height:5px;font-size:0;">&nbsp;</td></tr>
            <tr>
              <td width="52" style="font:400 11px/1.4 Arial,Helvetica,sans-serif;color:' . $slate . ';">Equipe</td>
              <td>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $paper . ';">
                  <tr><td width="' . $pEq . '%" style="background:' . $mark . ';height:10px;line-height:10px;font-size:0;">&nbsp;</td><td>&nbsp;</td></tr>
                </table>
              </td>
              <td width="42" align="right" style="font:700 13px/1.4 Arial,Helvetica,sans-serif;color:' . $slate . ';">' . number_format($d['media_equipe'], 1, ',', '') . '</td>
            </tr>
          </table>
        </td></tr>';
    }

    $itens = '';
    foreach (IQA_ITENS as $i) {
        $itens .= '<tr>
            <td style="padding:7px 10px 7px 0;font:400 12px/1.45 Arial,Helvetica,sans-serif;color:' . $slate . ';border-top:1px solid ' . $rule . ';">' . $e($i['texto']) . '</td>
            <td align="center" width="42" style="padding:7px 0;font:700 13px Arial,Helvetica,sans-serif;color:' . $ink . ';border-top:1px solid ' . $rule . ';">' . $r['notas']['eu'][$i['id']] . '</td>
            <td align="center" width="42" style="padding:7px 0;font:700 13px Arial,Helvetica,sans-serif;color:' . $slate . ';border-top:1px solid ' . $rule . ';">' . $r['notas']['equipe'][$i['id']] . '</td>
          </tr>';
    }

    return '<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Seu resultado IQA</title></head>
<body style="margin:0;padding:0;background:' . $paper . ';">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $paper . ';">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FFFFFF;">

    <tr><td style="padding:26px 26px 18px;border-bottom:2px solid ' . $ink . ';">
      <div style="font:700 10px/1 Arial,Helvetica,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:' . $slate . ';">InnerPlacement</div>
      <div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>
      <div style="font:700 25px/1.15 Arial,Helvetica,sans-serif;color:' . $ink . ';">Índice de Qualidade do Ambiente</div>
      <div style="height:6px;line-height:6px;font-size:0;">&nbsp;</div>
      <div style="font:400 13px/1.45 Arial,Helvetica,sans-serif;color:' . $slate . ';">' . $e($pessoa['evento_rotulo'] ?? IQA_EVENTO) . '</div>
    </td></tr>

    <tr><td style="padding:22px 26px 0;font:400 15px/1.55 Arial,Helvetica,sans-serif;color:' . $ink . ';">
      Olá, ' . $e($pessoa['nome']) . '. Este é o retrato do ambiente que você respondeu em ' . date('d/m/Y \à\s H:i') . '.
    </td></tr>

    <tr><td style="padding:20px 26px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="50%" valign="top" style="padding:16px;background:' . $paper . ';">
            <div style="font:700 10px/1 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:' . $slate . ';">Sua percepção</div>
            <div style="height:6px;line-height:6px;font-size:0;">&nbsp;</div>
            <div style="font:700 34px/1 Arial,Helvetica,sans-serif;color:' . $ink . ';">' . $r['soma_eu'] . '<span style="font-size:14px;font-weight:400;color:' . $slate . ';"> / 75</span></div>
            <div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>
            <div style="font:600 12px/1.4 Arial,Helvetica,sans-serif;color:' . $ink . ';">' . $e($r['faixa_eu']) . '</div>
          </td>
          <td width="8" style="font-size:0;">&nbsp;</td>
          <td width="50%" valign="top" style="padding:16px;background:' . $paper . ';">
            <div style="font:700 10px/1 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:' . $slate . ';">Percepção provável da equipe</div>
            <div style="height:6px;line-height:6px;font-size:0;">&nbsp;</div>
            <div style="font:700 34px/1 Arial,Helvetica,sans-serif;color:' . $ink . ';">' . $r['soma_equipe'] . '<span style="font-size:14px;font-weight:400;color:' . $slate . ';"> / 75</span></div>
            <div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>
            <div style="font:600 12px/1.4 Arial,Helvetica,sans-serif;color:' . $ink . ';">' . $e($r['faixa_equipe']) . '</div>
          </td>
        </tr>
      </table>
    </td></tr>

    <tr><td style="padding:14px 26px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:4px solid ' . $mark . ';">
        <tr><td style="padding:12px 14px;background:' . $paper . ';">
          <div style="font:700 13px/1.3 Arial,Helvetica,sans-serif;color:' . $ink . ';">Gap (Eu − Equipe): ' . ($r['gap'] > 0 ? '+' : '') . $r['gap'] . ' pontos</div>
          <div style="height:5px;line-height:5px;font-size:0;">&nbsp;</div>
          <div style="font:400 13px/1.5 Arial,Helvetica,sans-serif;color:' . $slate . ';">' . $e($r['leitura_gap']) . '</div>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:26px 26px 0;">
      <div style="font:700 10px/1 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:' . $slate . ';">Médias por dimensão</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' . $linhas . '</table>
    </td></tr>

    <tr><td style="padding:20px 26px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $rule . ';">
        <tr><td style="padding:14px 16px;">
          <div style="font:700 13px/1.4 Arial,Helvetica,sans-serif;color:' . $ink . ';">Por onde começar</div>
          <div style="height:6px;line-height:6px;font-size:0;">&nbsp;</div>
          <div style="font:400 13px/1.55 Arial,Helvetica,sans-serif;color:' . $slate . ';">
            Dimensão mais frágil na leitura da equipe: <strong style="color:' . $ink . ';">' . $e($r['ponto_frágil']) . '</strong>.<br>
            Maior distância entre as duas leituras: <strong style="color:' . $ink . ';">' . $e($r['maior_gap']) . '</strong>.<br><br>
            Um passo concreto: leve as três afirmações dessa dimensão para a sua próxima reunião de equipe e peça que respondam de verdade. A diferença entre o que você marcou e o que eles marcarem é a sua pauta.
          </div>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:26px 26px 0;">
      <div style="font:700 10px/1 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:' . $slate . ';">Suas respostas, item a item</div>
      <div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font:400 11px Arial,Helvetica,sans-serif;color:' . $slate . ';">&nbsp;</td>
          <td align="center" width="42" style="font:700 10px Arial,Helvetica,sans-serif;color:' . $slate . ';">EU</td>
          <td align="center" width="42" style="font:700 10px Arial,Helvetica,sans-serif;color:' . $slate . ';">EQUIPE</td>
        </tr>
        ' . $itens . '
      </table>
    </td></tr>

    <tr><td style="padding:24px 26px 26px;">
      <div style="border-top:1px solid ' . $rule . ';padding-top:14px;font:400 11px/1.5 Arial,Helvetica,sans-serif;color:' . $slate . ';">
        ' . $e(IQA_NOTA_METODOLOGICA) . '<br><br>
        Você recebeu este e-mail porque preencheu a autoavaliação IQA em <a href="' . $e($cfg['app']['url_base']) . '" style="color:' . $ink . ';">' . $e(parse_url($cfg['app']['url_base'], PHP_URL_HOST)) . '</a>.
        Suas respostas não são compartilhadas com sua empresa.
      </div>
    </td></tr>

  </table>
</td></tr>
</table>
</body></html>';
}

function iqa_email_texto(array $pessoa, array $r): string
{
    $l = [];
    $l[] = 'IQA — Índice de Qualidade do Ambiente';
    $l[] = $pessoa['evento_rotulo'] ?? IQA_EVENTO;
    $l[] = '';
    $l[] = 'Olá, ' . $pessoa['nome'] . '.';
    $l[] = '';
    $l[] = 'Sua percepção: ' . $r['soma_eu'] . '/75 — ' . $r['faixa_eu'];
    $l[] = 'Percepção provável da equipe: ' . $r['soma_equipe'] . '/75 — ' . $r['faixa_equipe'];
    $l[] = 'Gap (Eu − Equipe): ' . ($r['gap'] > 0 ? '+' : '') . $r['gap'];
    $l[] = $r['leitura_gap'];
    $l[] = '';
    $l[] = 'Médias por dimensão (Eu / Equipe):';
    foreach ($r['dimensoes'] as $d) {
        $l[] = '  - ' . $d['rotulo'] . ': '
            . number_format($d['media_eu'], 1, ',', '') . ' / '
            . number_format($d['media_equipe'], 1, ',', '');
    }
    $l[] = '';
    $l[] = 'Dimensão mais frágil na leitura da equipe: ' . $r['ponto_frágil'];
    $l[] = 'Maior distância entre as leituras: ' . $r['maior_gap'];
    return implode("\n", $l);
}
