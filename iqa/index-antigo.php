<?php
declare(strict_types=1);
require_once __DIR__ . '/src/questions.php';

$cfgApp = ['site' => 'https://www.innerplacement.com.br'];
if (is_file(__DIR__ . '/src/config.php')) {
    $cfgApp = (require __DIR__ . '/src/config.php')['app'] + $cfgApp;
}

$itens = array_map(fn($i) => [
    'id'    => $i['id'],
    'dim'   => IQA_DIMENSOES[$i['dim']],
    'curto' => IQA_DIMENSOES_CURTAS[$i['dim']],
    'texto' => $i['texto'],
], IQA_ITENS);

$bootstrap = [
    'itens'   => $itens,
    'escala'  => IQA_ESCALA,
    'curtos'  => IQA_DIMENSOES_CURTAS,
    'evento'  => IQA_EVENTO,
];
?>
<!doctype html>
<html lang="pt-BR" class="scroll-smooth">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#101725">
<title>IQA — Índice de Qualidade do Ambiente · InnerPlacement</title>
<meta name="description" content="Autoavaliação de 15 itens sobre o ambiente que você, como líder, produz para a sua equipe. Leva cerca de cinco minutos e o resultado vai para o seu e-mail.">
<meta name="robots" content="noindex, follow">

<meta property="og:type" content="website">
<meta property="og:title" content="IQA — Índice de Qualidade do Ambiente">
<meta property="og:description" content="Quinze afirmações sobre o ambiente que sua liderança produz. Resultado no seu e-mail.">
<meta property="og:locale" content="pt_BR">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

<script src="https://cdn.tailwindcss.com?plugins=forms"></script>
<script>
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink:   '#101725',
        slate2:'#56637A',
        paper: '#F0F2F5',
        rule:  '#C8D0DC',
        mark:  '#F2C200',
        markd: '#8A6E00',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans:    ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
</script>

<style>
  [x-cloak] { display: none !important; }
  :root { color-scheme: light; }
  body { -webkit-tap-highlight-color: transparent; }

  /* Hachura: nas plantas, o traço hachurado é o que está em corte — o que não
     se vê de frente. Aqui marca a percepção provável da equipe. */
  .hachura {
    background-image: repeating-linear-gradient(
      45deg, #101725 0 1.5px, transparent 1.5px 7px
    );
  }
  .hachura-mark {
    background-image: repeating-linear-gradient(
      45deg, #8A6E00 0 1.5px, transparent 1.5px 7px
    );
  }

  .aparece { animation: aparece .32s cubic-bezier(.2,.7,.3,1) both; }
  @keyframes aparece { from { opacity: 0; transform: translateY(10px); } }

  @media (prefers-reduced-motion: reduce) {
    .aparece { animation: none; }
    * { transition-duration: .01ms !important; }
  }

  @media print {
    .sem-impressao { display: none !important; }
    body { background: #fff; }
  }
</style>
</head>

<body class="bg-paper text-ink font-sans antialiased">
<div
  x-data="iqa(<?= htmlspecialchars(json_encode($bootstrap, JSON_UNESCAPED_UNICODE), ENT_QUOTES) ?>)"
  x-cloak
  class="min-h-dvh flex flex-col"
>

  <!-- ═══ Régua de progresso: 15 marcas, uma por item ═══ -->
  <header
    x-show="tela === 'perguntas'"
    class="sticky top-0 z-20 bg-paper/95 backdrop-blur-sm border-b border-rule sem-impressao"
  >
    <div class="mx-auto w-full max-w-2xl px-5 pt-4 pb-3">
      <div class="flex items-baseline justify-between mb-2.5">
        <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-slate2" x-text="itemAtual.dim"></span>
        <span class="font-mono text-[10px] text-slate2">
          <span class="text-ink font-medium" x-text="String(passo).padStart(2,'0')"></span> / 15
        </span>
      </div>
      <div class="flex items-end gap-[3px] h-4" role="progressbar" :aria-valuenow="respondidos" aria-valuemin="0" aria-valuemax="15" aria-label="Progresso">
        <template x-for="n in 15" :key="n">
          <div
            class="flex-1 transition-all duration-200 rounded-[1px]"
            :class="n === passo ? 'bg-mark h-4'
                    : (completo(n) ? 'bg-ink h-3' : 'bg-rule h-1.5')"
          ></div>
        </template>
      </div>
    </div>
  </header>

  <main class="flex-1 mx-auto w-full max-w-2xl px-5">

    <!-- ═══════════════ TELA 1 · Selo de identificação ═══════════════ -->
    <section x-show="tela === 'inicio'" class="py-10 sm:py-16">

      <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">InnerPlacement</p>

      <h1 class="mt-4 font-display font-bold text-[2.1rem] leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        Índice de Qualidade<br>do Ambiente
      </h1>

      <p class="mt-5 text-[1.02rem] leading-relaxed text-slate2 max-w-prose">
        Quinze afirmações sobre o ambiente que <strong class="text-ink font-semibold">você produz para a sua equipe</strong>.
        Não é sobre como você é liderado. Em cada item você dá duas notas: a sua, e a que
        você acredita que sua equipe daria.
      </p>

      <div class="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-slate2 border-y border-rule py-3">
        <span>15 itens</span>
        <span>≈ 5 minutos</span>
        <span>Resultado no seu e-mail</span>
      </div>

      <!-- Selo de desenho: os campos são o carimbo da prancha -->
      <form class="mt-8 border border-ink bg-white" @submit.prevent="comecar()" novalidate>
        <div class="border-b border-rule px-4 py-2.5 bg-ink">
          <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">Preenchido por</p>
        </div>

        <div class="p-4 sm:p-5 space-y-4">
          <div>
            <label for="nome" class="block font-mono text-[10px] uppercase tracking-[0.14em] text-slate2 mb-1.5">Nome</label>
            <input id="nome" type="text" x-model.trim="nome" autocomplete="name" required
              class="w-full border-0 border-b-2 border-rule bg-transparent px-0 py-2 text-base focus:border-ink focus:ring-0 placeholder:text-rule"
              placeholder="Como você assina">
          </div>

          <div>
            <label for="email" class="block font-mono text-[10px] uppercase tracking-[0.14em] text-slate2 mb-1.5">E-mail</label>
            <input id="email" type="email" x-model.trim="email" autocomplete="email" inputmode="email" required
              class="w-full border-0 border-b-2 border-rule bg-transparent px-0 py-2 text-base focus:border-ink focus:ring-0 placeholder:text-rule"
              placeholder="Para onde mandamos o resultado">
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label for="cargo" class="block font-mono text-[10px] uppercase tracking-[0.14em] text-slate2 mb-1.5">Cargo <span class="normal-case tracking-normal">(opcional)</span></label>
              <input id="cargo" type="text" x-model.trim="cargo" autocomplete="organization-title"
                class="w-full border-0 border-b-2 border-rule bg-transparent px-0 py-2 text-base focus:border-ink focus:ring-0">
            </div>
            <div>
              <label for="empresa" class="block font-mono text-[10px] uppercase tracking-[0.14em] text-slate2 mb-1.5">Empresa <span class="normal-case tracking-normal">(opcional)</span></label>
              <input id="empresa" type="text" x-model.trim="empresa" autocomplete="organization"
                class="w-full border-0 border-b-2 border-rule bg-transparent px-0 py-2 text-base focus:border-ink focus:ring-0">
            </div>
          </div>

          <!-- Armadilha para robôs: invisível e fora da ordem de tabulação -->
          <div aria-hidden="true" class="absolute -left-[9999px]">
            <label>Website<input type="text" x-model="website" tabindex="-1" autocomplete="off"></label>
          </div>

          <label class="flex gap-3 pt-1 cursor-pointer">
            <input type="checkbox" x-model="consentimento"
              class="mt-0.5 h-5 w-5 shrink-0 rounded-none border-2 border-ink text-ink focus:ring-ink focus:ring-offset-0">
            <span class="text-[13px] leading-snug text-slate2">
              Autorizo o envio do meu resultado por e-mail e o armazenamento das minhas respostas
              pela InnerPlacement. Elas não são compartilhadas com a minha empresa.
            </span>
          </label>

          <p x-show="erro" x-text="erro" class="text-[13px] font-medium text-markd bg-mark/15 border-l-4 border-mark px-3 py-2"></p>

          <button type="submit"
            class="w-full bg-ink text-white font-display font-semibold tracking-tight text-[1.05rem] py-4 hover:bg-slate2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition-colors">
            Começar a autoavaliação
          </button>
        </div>
      </form>

      <p class="mt-6 font-mono text-[10px] leading-relaxed text-slate2" x-text="evento"></p>
    </section>

    <!-- ═══════════════ TELA 2 · Um item por vez ═══════════════ -->
    <section x-show="tela === 'perguntas'" class="py-7 sm:py-10">
      <template x-for="item in itens" :key="item.id">
        <div x-show="passo === item.id" class="aparece">

          <h2 class="font-display font-semibold text-[1.45rem] leading-[1.25] tracking-[-0.02em] sm:text-[1.75rem]"
              x-text="item.texto"></h2>

          <div class="mt-8 space-y-7">

            <!-- Nota própria -->
            <fieldset>
              <legend class="flex items-center gap-2 mb-3">
                <span class="w-3 h-3 bg-ink shrink-0"></span>
                <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink font-medium">Minha nota</span>
              </legend>
              <div class="grid grid-cols-5 gap-1.5">
                <template x-for="n in 5" :key="n">
                  <label class="block">
                    <input type="radio" class="peer sr-only"
                      :name="'eu-' + item.id" :value="n"
                      x-model.number="respostas[item.id].eu"
                      @change="registrou(item.id)">
                    <span class="flex h-14 items-center justify-center border-2 border-rule bg-white font-display font-semibold text-lg text-slate2 cursor-pointer transition-colors
                                 hover:border-slate2
                                 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white
                                 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink"
                          x-text="n"></span>
                  </label>
                </template>
              </div>
            </fieldset>

            <!-- Nota atribuída à equipe -->
            <fieldset>
              <legend class="flex items-center gap-2 mb-3">
                <span class="w-3 h-3 border border-ink hachura shrink-0"></span>
                <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink font-medium">Nota que minha equipe daria</span>
              </legend>
              <div class="grid grid-cols-5 gap-1.5">
                <template x-for="n in 5" :key="n">
                  <label class="block">
                    <input type="radio" class="peer sr-only"
                      :name="'equipe-' + item.id" :value="n"
                      x-model.number="respostas[item.id].equipe"
                      @change="registrou(item.id)">
                    <span class="flex h-14 items-center justify-center border-2 border-rule bg-white font-display font-semibold text-lg text-slate2 cursor-pointer transition-colors
                                 hover:border-slate2
                                 peer-checked:border-markd peer-checked:bg-mark peer-checked:text-ink
                                 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink"
                          x-text="n"></span>
                  </label>
                </template>
              </div>
            </fieldset>

            <div class="flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-slate2 border-t border-rule pt-2">
              <span>1 · Discordo totalmente</span>
              <span>5 · Concordo totalmente</span>
            </div>
          </div>

          <div class="mt-9 flex items-center gap-3 sem-impressao">
            <button type="button" @click="voltar()" x-show="passo > 1"
              class="px-5 py-3.5 border-2 border-ink font-display font-semibold text-ink hover:bg-ink hover:text-white transition-colors">
              Voltar
            </button>
            <button type="button" @click="avancar()"
              :disabled="!completo(item.id)"
              class="flex-1 py-3.5 bg-ink text-white font-display font-semibold text-[1.05rem] transition-colors hover:bg-slate2 disabled:bg-rule disabled:text-slate2 disabled:cursor-not-allowed">
              <span x-text="passo === 15 ? 'Ver meu resultado' : 'Próximo'"></span>
            </button>
          </div>
        </div>
      </template>
    </section>

    <!-- ═══════════════ TELA 3 · Revisão e envio ═══════════════ -->
    <section x-show="tela === 'revisao'" class="py-10">
      <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">Última etapa</p>
      <h2 class="mt-3 font-display font-bold text-3xl leading-tight tracking-[-0.02em]">
        Tudo respondido.
      </h2>
      <p class="mt-4 text-slate2 leading-relaxed">
        Vamos calcular as médias por dimensão, a soma dos 15 itens e a distância entre as duas
        leituras. O resultado aparece aqui e vai para
        <strong class="text-ink font-semibold break-all" x-text="email"></strong>.
      </p>

      <p x-show="erro" x-text="erro" class="mt-5 text-[13px] font-medium text-markd bg-mark/15 border-l-4 border-mark px-3 py-2"></p>

      <div class="mt-8 space-y-3">
        <button type="button" @click="enviar()" :disabled="enviando"
          class="w-full bg-ink text-white font-display font-semibold text-[1.05rem] py-4 hover:bg-slate2 disabled:bg-rule disabled:text-slate2 transition-colors">
          <span x-show="!enviando">Calcular e enviar para meu e-mail</span>
          <span x-show="enviando">Calculando…</span>
        </button>
        <button type="button" @click="tela = 'perguntas'; passo = 15" :disabled="enviando"
          class="w-full py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slate2 hover:text-ink">
          Revisar respostas
        </button>
      </div>
    </section>

    <!-- ═══════════════ TELA 4 · Resultado ═══════════════ -->
    <section x-show="tela === 'resultado'" class="py-10" x-cloak>
      <template x-if="resultado">
        <div class="aparece">

          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">Seu resultado</p>
          <h2 class="mt-3 font-display font-bold text-[2rem] leading-[1.08] tracking-[-0.03em] sm:text-4xl">
            O ambiente que você<br>desenha hoje
          </h2>

          <p x-show="emailEnviado" class="mt-5 text-[13px] leading-relaxed text-slate2 border-l-4 border-ink pl-3">
            Uma cópia completa foi enviada para <strong class="text-ink" x-text="email"></strong>.
            Se não aparecer em alguns minutos, confira o spam.
          </p>
          <p x-show="!emailEnviado" class="mt-5 text-[13px] leading-relaxed text-markd bg-mark/15 border-l-4 border-mark px-3 py-2">
            Não conseguimos enviar o e-mail agora. Seu resultado está registrado e aparece abaixo.
            Use o botão de imprimir para guardar uma cópia.
          </p>

          <!-- Dois totais, lado a lado -->
          <div class="mt-8 grid grid-cols-2 gap-2">
            <div class="bg-white border-2 border-ink p-4">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 bg-ink shrink-0"></span>
                <p class="font-mono text-[9px] uppercase tracking-[0.12em] text-slate2">Sua percepção</p>
              </div>
              <p class="mt-2 font-display font-bold text-4xl tracking-[-0.03em] tabular-nums">
                <span x-text="resultado.soma_eu"></span><span class="text-base font-medium text-slate2">/75</span>
              </p>
              <p class="mt-2 text-[12px] leading-snug font-medium" x-text="resultado.faixa_eu"></p>
            </div>
            <div class="bg-white border-2 border-ink p-4">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 border border-ink hachura shrink-0"></span>
                <p class="font-mono text-[9px] uppercase tracking-[0.12em] text-slate2">Provável, na equipe</p>
              </div>
              <p class="mt-2 font-display font-bold text-4xl tracking-[-0.03em] tabular-nums">
                <span x-text="resultado.soma_equipe"></span><span class="text-base font-medium text-slate2">/75</span>
              </p>
              <p class="mt-2 text-[12px] leading-snug font-medium" x-text="resultado.faixa_equipe"></p>
            </div>
          </div>

          <!-- O gap -->
          <div class="mt-2 bg-white border-l-4 border-mark border-y-2 border-r-2 border-y-ink border-r-ink p-4">
            <p class="font-display font-semibold text-lg">
              Gap: <span class="tabular-nums" x-text="(resultado.gap > 0 ? '+' : '') + resultado.gap"></span> pontos
            </p>
            <p class="mt-1.5 text-[13px] leading-relaxed text-slate2" x-text="resultado.leitura_gap"></p>
          </div>

          <!-- Corte por dimensão: cheio = você, hachurado = equipe -->
          <div class="mt-10">
            <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-slate2">Corte por dimensão</p>
            <div class="mt-4 border-t-2 border-ink pt-1">
              <div class="flex items-end justify-between gap-1.5 h-44">
                <template x-for="d in resultado.dimensoes" :key="d.chave">
                  <div class="flex-1 flex items-end justify-center gap-[3px] h-full">
                    <div class="w-1/2 bg-ink transition-all duration-500" :style="`height:${d.media_eu / 5 * 100}%`"></div>
                    <div class="w-1/2 border-x border-t border-ink hachura transition-all duration-500" :style="`height:${d.media_equipe / 5 * 100}%`"></div>
                  </div>
                </template>
              </div>
              <div class="border-t-2 border-ink flex justify-between gap-1.5">
                <template x-for="d in resultado.dimensoes" :key="d.chave">
                  <div class="flex-1 pt-2 text-center">
                    <p class="font-mono text-[9px] leading-tight text-slate2" x-text="curtos[d.chave]"></p>
                    <p class="mt-1 font-display font-semibold text-[11px] tabular-nums">
                      <span x-text="fmt(d.media_eu)"></span><span class="text-rule">/</span><span class="text-slate2" x-text="fmt(d.media_equipe)"></span>
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Onde começar -->
          <div class="mt-10 border-2 border-ink bg-white p-5">
            <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-slate2">Por onde começar</p>
            <p class="mt-3 text-[15px] leading-relaxed">
              A dimensão mais frágil na leitura da sua equipe é
              <strong class="font-semibold" x-text="resultado['ponto_frágil']"></strong>.
              A maior distância entre as duas leituras está em
              <strong class="font-semibold" x-text="resultado.maior_gap"></strong>.
            </p>
            <p class="mt-3 text-[14px] leading-relaxed text-slate2">
              Leve as três afirmações dessa dimensão para a sua próxima reunião e peça que a
              equipe responda de verdade. A diferença entre o que você marcou e o que eles
              marcarem é a sua pauta.
            </p>
          </div>

          <!-- Respostas item a item -->
          <div class="mt-8" x-data="{ aberto: false }">
            <button type="button" @click="aberto = !aberto"
              class="w-full flex items-center justify-between border-y border-rule py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slate2 hover:text-ink sem-impressao">
              <span>Ver respostas item a item</span>
              <span x-text="aberto ? '−' : '+'" class="text-lg leading-none"></span>
            </button>
            <div x-show="aberto" class="divide-y divide-rule">
              <template x-for="item in itens" :key="'r' + item.id">
                <div class="flex gap-3 py-3">
                  <p class="flex-1 text-[13px] leading-snug text-slate2" x-text="item.texto"></p>
                  <div class="flex gap-1.5 shrink-0">
                    <span class="w-8 h-8 flex items-center justify-center bg-ink text-white font-display font-semibold text-[13px]" x-text="respostas[item.id].eu"></span>
                    <span class="w-8 h-8 flex items-center justify-center border border-ink bg-mark font-display font-semibold text-[13px]" x-text="respostas[item.id].equipe"></span>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="mt-10 flex flex-col gap-2 sem-impressao">
            <button type="button" @click="window.print()"
              class="w-full py-3.5 border-2 border-ink font-display font-semibold hover:bg-ink hover:text-white transition-colors">
              Imprimir ou salvar em PDF
            </button>
            <a href="<?= htmlspecialchars($cfgApp['site'], ENT_QUOTES) ?>"
               class="w-full py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-slate2 hover:text-ink">
              Voltar para innerplacement.com.br
            </a>
          </div>
        </div>
      </template>
    </section>

  </main>

  <footer class="mx-auto w-full max-w-2xl px-5 py-8 sem-impressao">
    <p class="border-t border-rule pt-4 font-mono text-[10px] leading-relaxed text-slate2">
      <?= htmlspecialchars(IQA_NOTA_METODOLOGICA, ENT_QUOTES) ?>
    </p>
  </footer>
</div>

<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js"></script>
<script>
function iqa(dados) {
  return {
    itens: dados.itens,
    curtos: dados.curtos,
    evento: dados.evento,

    tela: 'inicio',        // inicio · perguntas · revisao · resultado
    passo: 1,
    nome: '', email: '', cargo: '', empresa: '',
    consentimento: false,
    website: '',           // honeypot

    respostas: {},
    erro: '',
    enviando: false,
    resultado: null,
    emailEnviado: false,
    _visto: null,

    init() {
      this.itens.forEach(i => { this.respostas[i.id] = { eu: null, equipe: null }; });
      // Rascunho local: quem fecha a aba sem querer não perde 15 respostas.
      try {
        const salvo = JSON.parse(sessionStorage.getItem('iqa') || 'null');
        if (salvo && salvo.respostas) Object.assign(this, salvo);
      } catch (e) {}
      this.$watch('respostas', () => this.salvarRascunho());
    },

    salvarRascunho() {
      try {
        sessionStorage.setItem('iqa', JSON.stringify({
          nome: this.nome, email: this.email, cargo: this.cargo,
          empresa: this.empresa, consentimento: this.consentimento,
          respostas: this.respostas,
        }));
      } catch (e) {}
    },

    get itemAtual() {
      return this.itens.find(i => i.id === this.passo) || this.itens[0];
    },
    get respondidos() {
      return this.itens.filter(i => this.completo(i.id)).length;
    },
    completo(id) {
      const r = this.respostas[id];
      return !!(r && r.eu && r.equipe);
    },
    fmt(n) {
      return Number(n).toFixed(1).replace('.', ',');
    },

    comecar() {
      this.erro = '';
      if (this.nome.length < 2)                    return this.erro = 'Informe seu nome.';
      if (!/^\S+@\S+\.\S{2,}$/.test(this.email))   return this.erro = 'Esse e-mail não parece válido.';
      if (!this.consentimento)                     return this.erro = 'Marque o aceite para receber o resultado.';
      this.salvarRascunho();
      this.tela = 'perguntas';
      this.passo = (this.itens.find(i => !this.completo(i.id)) || this.itens[14]).id;
      this.aoTopo();
    },

    // Avança sozinho quando o item acabou de ser completado pela primeira vez.
    registrou(id) {
      if (id !== this.passo || !this.completo(id) || this.passo === 15) return;
      const jaVisto = this._visto === id;
      this._visto = id;
      if (jaVisto) return;
      const rapido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => { if (this.passo === id) this.avancar(); }, rapido ? 0 : 420);
    },

    avancar() {
      if (!this.completo(this.passo)) return;
      if (this.passo === 15) {
        const falta = this.itens.find(i => !this.completo(i.id));
        if (falta) { this.passo = falta.id; this.aoTopo(); return; }
        this.tela = 'revisao';
      } else {
        this.passo++;
      }
      this.aoTopo();
    },

    voltar() {
      if (this.passo > 1) { this.passo--; this.aoTopo(); }
    },

    aoTopo() {
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    },

    async enviar() {
      this.erro = '';
      this.enviando = true;
      try {
        const r = await fetch('api/submit.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: this.nome, email: this.email, cargo: this.cargo, empresa: this.empresa,
            consentimento: this.consentimento, website: this.website,
            respostas: this.respostas,
          }),
        });
        const dados = await r.json();
        if (!r.ok) { this.erro = dados.erro || 'Algo falhou no envio. Tente de novo.'; return; }

        this.resultado = dados.resultado;
        this.emailEnviado = !!dados.email_enviado;
        this.tela = 'resultado';
        try { sessionStorage.removeItem('iqa'); } catch (e) {}
        this.aoTopo();
      } catch (e) {
        this.erro = 'Sem conexão com o servidor. Verifique a internet e tente de novo.';
      } finally {
        this.enviando = false;
      }
    },
  };
}
</script>
</body>
</html>
