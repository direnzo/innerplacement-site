<?php
/**
 * Página mostrada quando o ?e= não corresponde a um evento válido,
 * ou quando o evento existe mas foi encerrado.
 *
 * Recebe $eventoErro ('invalido' | 'encerrado') do index.php.
 * Nunca cai no formulário: gravar resposta sem saber a que evento
 * ela pertence é pior do que não gravar.
 */
$encerrado = ($eventoErro ?? '') === 'encerrado';

$titulo = $encerrado ? 'Esta autoavaliação já foi encerrada.'
                     : 'Este link não é válido.';
$texto  = $encerrado
    ? 'O período de respostas deste evento terminou. Se você respondeu antes do encerramento, seu resultado já foi enviado para o seu e-mail.'
    : 'O endereço pode ter sido digitado com algum caractere a mais, ou o link pode estar incompleto. Confira com quem enviou o convite.';

http_response_code($encerrado ? 410 : 404);
?>
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#221F20">
<meta name="robots" content="noindex, nofollow">
<title>IQA · InnerPlacement</title>
<style>
  @font-face { font-family:'Delight'; src:url('/assets/fontes/Delight-Regular.woff2')   format('woff2'); font-weight:400; font-display:swap; }
  @font-face { font-family:'Delight'; src:url('/assets/fontes/Delight-ExtraBold.woff2') format('woff2'); font-weight:800; font-display:swap; }

  *      { box-sizing: border-box; }
  body   { margin:0; min-height:100dvh; display:flex; align-items:center;
           background:#EFEDE8; color:#221F20;
           font-family:'Delight', system-ui, sans-serif; }
  main   { width:100%; max-width:34rem; margin:0 auto; padding:2rem 1.25rem; }
  .bolas { display:flex; gap:.5rem; margin-bottom:2rem; }
  .bolas span { width:1.5rem; height:1.5rem; border-radius:999px; }
  h1     { font-weight:800; letter-spacing:-.035em; line-height:1.05;
           font-size:2.1rem; margin:0; }
  p      { font-size:1.02rem; line-height:1.6; margin:1.5rem 0 0; }
  a.voltar { display:inline-block; margin-top:2.5rem; padding:.9rem 1.75rem;
             border-radius:999px; background:#221F20; color:#fff;
             text-decoration:none; font-weight:600; }
  a.voltar:hover { background:#7E3E98; }
  img    { height:1.25rem; width:auto; margin-bottom:2.5rem; }
  @media (min-width: 640px) { h1 { font-size:2.8rem; } }
</style>
</head>
<body>
  <main>
    <img src="/assets/logo.svg" alt="InnerPlacement">
    <div class="bolas">
      <span style="background:#81DFD8"></span>
      <span style="background:#FFFF93"></span>
      <span style="background:#F07060"></span>
      <span style="background:#7E3E98"></span>
      <span style="background:#221F20"></span>
    </div>
    <h1><?= htmlspecialchars($titulo, ENT_QUOTES) ?></h1>
    <p><?= htmlspecialchars($texto, ENT_QUOTES) ?></p>
    <a class="voltar" href="https://www.innerplacement.com.br">Ir para a InnerPlacement</a>
  </main>
</body>
</html>
