<?php
require_once __DIR__ . '/questions.php';

// Este servidor tem serialize_precision=17 no php.ini, entao round(4.333, 2)
// era serializado como 4.3300000000000000710542 no json_encode. Com -1, o PHP
// escreve a menor representacao que faz round-trip, ou seja 4.33.
ini_set('serialize_precision', '-1');

/**
 * Espelha as fórmulas da planilha:
 *   média por dimensão  = AVERAGE dos 3 itens da dimensão   (C27:D31)
 *   soma                = SUM dos 15 itens                  (C35:D35)
 *   leitura             = faixa da soma                     (C36:D36)
 *   gap                 = soma_eu - soma_equipe             (C37)
 *
 * O cálculo roda no servidor. O que o navegador manda são apenas as notas.
 */

/**
 * @param array $respostas  [ id_item => ['eu' => int, 'equipe' => int], ... ]
 * @return array Estrutura completa do resultado.
 * @throws InvalidArgumentException se faltar item ou a nota estiver fora de 1–5.
 */
function iqa_calcular(array $respostas): array
{
    $notas = ['eu' => [], 'equipe' => []];

    foreach (IQA_ITENS as $item) {
        $id = $item['id'];
        if (!isset($respostas[$id])) {
            throw new InvalidArgumentException("Falta a resposta do item {$id}.");
        }
        foreach (['eu', 'equipe'] as $serie) {
            $valor = $respostas[$id][$serie] ?? null;
            if (!is_int($valor) && !ctype_digit((string) $valor)) {
                throw new InvalidArgumentException("Nota inválida no item {$id} ({$serie}).");
            }
            $valor = (int) $valor;
            if ($valor < 1 || $valor > 5) {
                throw new InvalidArgumentException("Nota fora da escala no item {$id} ({$serie}).");
            }
            $notas[$serie][$id] = $valor;
        }
    }

    $dimensoes = [];
    foreach (IQA_DIMENSOES as $chave => $rotulo) {
        $ids = array_column(
            array_filter(IQA_ITENS, fn($i) => $i['dim'] === $chave),
            'id'
        );
        $mediaEu     = array_sum(array_intersect_key($notas['eu'], array_flip($ids))) / count($ids);
        $mediaEquipe = array_sum(array_intersect_key($notas['equipe'], array_flip($ids))) / count($ids);

        $dimensoes[] = [
            'chave'       => $chave,
            'rotulo'      => $rotulo,
            'media_eu'     => round($mediaEu, 2),
            'media_equipe' => round($mediaEquipe, 2),
            'gap'          => round($mediaEu - $mediaEquipe, 2),
        ];
    }

    $somaEu     = array_sum($notas['eu']);
    $somaEquipe = array_sum($notas['equipe']);

    // Dimensão mais frágil na percepção da equipe: onde a conversa começa.
    $porEquipe = $dimensoes;
    usort($porEquipe, fn($a, $b) => $a['media_equipe'] <=> $b['media_equipe']);

    $porGap = $dimensoes;
    usort($porGap, fn($a, $b) => $b['gap'] <=> $a['gap']);

    return [
        'dimensoes'      => $dimensoes,
        'soma_eu'        => $somaEu,
        'soma_equipe'    => $somaEquipe,
        'media_geral_eu'     => round($somaEu / count(IQA_ITENS), 2),
        'media_geral_equipe' => round($somaEquipe / count(IQA_ITENS), 2),
        'faixa_eu'       => iqa_faixa($somaEu),
        'faixa_equipe'   => iqa_faixa($somaEquipe),
        'gap'            => $somaEu - $somaEquipe,
        'leitura_gap'    => iqa_leitura_gap($somaEu - $somaEquipe),
        'ponto_frágil'   => $porEquipe[0]['rotulo'],
        'maior_gap'      => $porGap[0]['rotulo'],
        'notas'          => $notas,
    ];
}

function iqa_faixa(int $soma): string
{
    foreach (IQA_FAIXAS as $faixa) {
        if ($soma >= $faixa['min']) {
            return $faixa['rotulo'];
        }
    }
    return IQA_FAIXAS[count(IQA_FAIXAS) - 1]['rotulo'];
}

function iqa_leitura_gap(int $gap): string
{
    if ($gap >= 10) {
        return 'Gap grande e positivo: você enxerga o ambiente bem melhor do que, na sua própria avaliação, sua equipe enxergaria. É o formato clássico de ponto cego.';
    }
    if ($gap >= 4) {
        return 'Gap moderado: há distância entre a sua leitura e a leitura provável da equipe. Vale checar com elas antes de concluir.';
    }
    if ($gap >= -3) {
        return 'Leituras próximas: você e sua equipe provavelmente descrevem o mesmo ambiente.';
    }
    return 'Gap negativo: você avalia o próprio ambiente com mais rigor do que imagina que sua equipe avaliaria. Pode indicar autocrítica alta ou expectativa elevada.';
}
