<?php
/**
 * Cadastro de eventos.
 *
 * Para abrir o questionário para uma nova empresa ou palestra, copie um bloco
 * abaixo e troque os valores. O slug (a chave do array) é o que vai na URL:
 *
 *     https://iqa.innerplacement.com.br/?e=mosaic-uberaba
 *
 * Regras do slug: só letras minúsculas, números e hífen. Sem acento, sem espaço.
 * Nunca reaproveite um slug já usado para outro evento — ele é o que amarra as
 * respostas antigas no banco e a aba na planilha.
 *
 * 'aba' é o nome da aba na planilha do Google. Máximo 100 caracteres, e não pode
 * conter : \ / ? * [ ]. Se a aba não existir, ela é criada no primeiro envio.
 *
 * 'ativo' => false encerra o evento: o link passa a mostrar um aviso em vez do
 * formulário, sem quebrar nada do que já foi respondido.
 */

const IQA_EVENTO_PADRAO = 'mosaic-uberaba';

const IQA_EVENTOS = [

    'mosaic-uberaba' => [
        'nome'    => 'A Arquitetura Invisível da Liderança',
        'empresa' => 'Mosaic',
        'local'   => 'Uberaba',
        'aba'     => 'Mosaic Uberaba',
        'ativo'   => true,
    ],

    'demo' => [
        'nome'    => 'Demonstração',
        'empresa' => 'InnerPlacement',
        'local'   => 'Interno',
        'aba'     => 'Demo',
        'ativo'   => true,
    ],

];

/**
 * Resolve um slug vindo da URL.
 * @return array|null  O evento com a chave 'slug', ou null se não existir.
 */
function iqa_evento(?string $slug): ?array
{
    $slug = strtolower(trim((string) $slug));
    if ($slug === '' || !preg_match('/^[a-z0-9-]{1,64}$/', $slug)) {
        return null;
    }
    if (!isset(IQA_EVENTOS[$slug])) {
        return null;
    }
    return IQA_EVENTOS[$slug] + ['slug' => $slug];
}

/** O evento usado quando a URL não traz o parâmetro ?e=. */
function iqa_evento_padrao(): array
{
    return iqa_evento(IQA_EVENTO_PADRAO)
        ?? ['slug' => 'sem-evento', 'nome' => 'Autoavaliação IQA', 'empresa' => '',
            'local' => '', 'aba' => 'Sem evento', 'ativo' => true];
}

/** Rótulo legível, usado na tela, no e-mail e na coluna 'evento' do banco. */
function iqa_evento_rotulo(array $e): string
{
    $partes = array_filter([$e['empresa'] ?? '', $e['local'] ?? '']);
    $sufixo = implode(' ', $partes);
    return $sufixo === '' ? $e['nome'] : $e['nome'] . ' · ' . $sufixo;
}
