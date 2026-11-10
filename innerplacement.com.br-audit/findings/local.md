# SEO local — innerplacement.com.br (2026-11-09)

Somente leitura. Fontes: HTML bruto da home e de /contato/ (curl), robots.txt, sitemap. Não verificados: GBP (categoria, avaliações, posts, fotos), Yelp/BBB/diretórios, pacote local (sem DataForSEO nem API do Google).

## Resumo
- Tipo: híbrido leve (escritórios em SP e Curitiba, atendimento nacional/remoto). Vertical: consultoria/serviço profissional (não é restaurante, saúde nem jurídico).
- Score local indicativo: ~38/100 (GBP não verificável; avaliações 0 no site; schema básico). Peso real do SEO local para este público é BAIXO (ver seção final).
- NAP no site: consistente. Home e /contato/ trazem o mesmo telefone (+55 11 98431-1675, tel: e wa.me), e-mail e endereços no HTML visível, no JSON-LD e nos links do Maps.

| Fonte | Nome | Endereço | Telefone |
|---|---|---|---|
| HTML (rodapé/contato) | Inner Placement | Av. Tabapuã, 500, cj. 32, Itaim Bibi, São Paulo - SP; Curitiba: R. Visconde do Rio Branco, 1358, cj. 703 | +55 11 98431-1675 |
| JSON-LD ProfessionalService | Inner Placement | idem (array com 2 PostalAddress) | +55 11 98431-1675 |
| Links Maps (search?query=) | - | idem | - |
| GBP / diretórios | não verificado | não verificado | não verificado |

## Achados

### High
1. **Endereços em um único nó ProfessionalService como array de PostalAddress.** Modela duas sedes como uma entidade com dois endereços, em vez de duas unidades. Schema.org e o Google esperam um endereço por LocalBusiness; o array pode ser ignorado ou gerar ambiguidade.
   - Correção: manter a organização (`#organizacao`, tipo Organization/ProfessionalService) e criar dois nós `ProfessionalService` com `@id` próprios (`#sp`, `#curitiba`), cada um com `address`, `telephone` e `parentOrganization`/`branchOf` apontando à organização.
   - Como saber se falhou: Rich Results Test / validator.schema.org sem o endereço lido, ou o Search Console sem itens detectados.
2. **Existência e estado do GBP desconhecidos; o site não mostra nenhum sinal dele.** Não há embed de Maps, só links `maps/search/?query=` (que abrem uma busca por texto e não o perfil). Sem `hasMap` nem link para o perfil (g.page / maps cid) em `sameAs`.
   - Correção: confirmar se há perfil verificado para SP (e Curitiba, se houver atendimento presencial real; escritório compartilhado/virtual sem atendimento viola as diretrizes do Google). Categoria primária recomendada: "Consultor de carreira" ou "Serviço de consultoria de gestão" (validar a opção disponível em pt-BR). Depois, adicionar a URL do perfil em `sameAs` e `hasMap`, e trocar os links de mapa pela URL do perfil.
   - Como saber se falhou: buscar "Inner Placement" no Google e no Maps; sem painel de conhecimento com avaliações = perfil ausente ou não verificado.

### Medium
3. **Schema sem `geo`, `openingHoursSpecification`, `priceRange`, `hasMap`, `aggregateRating`.** Só `name`, `url`, `telephone`, `email`, `address`, `logo`, `image`, `sameAs`. `areaServed: "BR"` é texto genérico.
   - Correção: acrescentar `geo` (5 casas decimais, conferidas no Maps) e `openingHoursSpecification` por unidade, se houver atendimento com horário. `areaServed` como `Country` ou `AdministrativeArea` (`{"@type":"Country","name":"Brasil"}`). Só incluir `aggregateRating` se houver avaliações reais e visíveis na página (senão viola as políticas do Google).
   - Como saber se falhou: validador sem os campos; coordenadas fora do prédio.
4. **/contato/ não tem conteúdo local.** Texto visível: título "Vamos conversar", formulário, WhatsApp, e-mail; os endereços aparecem só no rodapé ("São Paulo · Curitiba" + link). Sem horário, instruções de chegada, indicação de atendimento presencial vs. remoto, nem embed de mapa. A meta description ("Vamos conversar. Conte o que você deseja. A Inner responde.") não traz cidade nem serviço.
   - Correção: bloco com endereço completo por cidade, horário, "atendimento presencial com hora marcada / online", estacionamento/metrô, e meta description com "consultoria de carreira para executivos em São Paulo e Curitiba". O texto do site é literal da documentação dos sócios: o texto novo exige aprovação deles.
   - Como saber se falhou: a consulta "consultoria de carreira executivos São Paulo" não traz /contato/ nem a home; CTR baixo no Search Console.
5. **Telefone é WhatsApp celular (+55 11 98431-1675), tratado como o telefone do negócio.** Aceitável, mas o NAP em diretórios e GBP precisa usar exatamente o mesmo número e formato para evitar duplicidade.
   - Correção: padronizar em todas as fontes (LinkedIn, Instagram, Facebook, YouTube, GBP).
   - Como saber se falhou: auditoria de citações mostra variações do número/endereço (ex.: "Cj 32" vs "conjunto 32", Tabapuã sem til).
6. **Citações e avaliações: não verificadas.** Não há `aggregateRating` nem widget de avaliações no site (confirmado: zero ocorrências). Depoimentos existem em página própria, mas sem marcação `Review`.
   - Correção: pedir avaliações a clientes que consintam (B2C), no GBP; para B2B, priorizar LinkedIn e depoimentos nominais autorizados. Verificar Yelp/BBB é de baixa relevância; priorizar Google, LinkedIn, Apontador/Guiabolso-like locais e associações (ex.: ICF, ABRH, Linkedin Company).
   - Como saber se falhou: ausência do perfil nas buscas por nome; nota/volume abaixo dos concorrentes.

### Low
7. **Duas unidades sem páginas próprias.** Não há /sao-paulo/ nem /curitiba/. Para 2 cidades e público executivo, páginas locais só valem se tiverem conteúdo único (equipe local, endereço, atendimento); caso contrário, viram doorway. Não recomendo criá-las agora.
8. `robots.txt` bloqueia só AdsBot, sitemap em /sitemap-index.xml (200). Sem problema para o local. Canonical correto nas duas páginas.

### Info
- Pontos fortes: NAP idêntico entre HTML, schema e links; `tel:` e `wa.me` clicáveis; `sameAs` com 4 perfis sociais; `inLanguage: pt-BR`; tipo `ProfessionalService` é aceitável (alternativa mais precisa não existe para consultoria de carreira).
- Dados de proximidade (principal fator local, ~55% da variância segundo estudo citado) não são controláveis.
- Não verificável sem pagos: posicionamento no pacote local, categorias e atributos do GBP, velocidade e taxa de resposta de avaliações, citações em diretórios, backlinks locais.

## Quanto o SEO local importa para este público
Pouco para aquisição. Executivos em transição e RHs de empresas contratantes de outplacement/alinhamento buscam por indicação, LinkedIn e marca, não por "perto de mim". O ganho real do local aqui é: (a) credibilidade e verificação de existência (painel de marca com endereço, avaliações), (b) captura de busca de marca, (c) consultas como "consultoria de carreira executivos São Paulo". Esforço proporcional: um GBP verificado e correto, schema por unidade, uma seção local no /contato/, e NAP padronizado. Não investir em campanhas de citações, páginas por bairro ou volume de avaliações. Prioridade de SEO deve ficar em conteúdo especializado, E-E-A-T (bios dos sócios, casos) e presença no LinkedIn.

## Top ações
1. (High) Confirmar/criar/ajustar o GBP e vincular ao site. 2. (High) Separar as unidades no schema. 3. (Medium) Completar schema (geo, horário, areaServed). 4. (Medium) Seção local e meta description em /contato/. 5. (Medium) Padronizar NAP em perfis externos. 6. (Medium) Plano leve de avaliações no GBP. 7. (Low) Não criar páginas por cidade por ora.
