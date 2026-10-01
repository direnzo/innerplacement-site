// SVGs gerados por tools/ilustracao/ entram no HTML inline, sem o <svg> externo nem o <title>:
// o componente decide viewBox, classes e acessibilidade.
export const miolo = (svg: string) => svg.replace(/<title>.*?<\/title>/, '').replace(/^<svg[^>]*>|<\/svg>\s*$/g, '');
