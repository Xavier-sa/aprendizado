export const glossaryVisuals = {
  API: {
    illustration: "app/assets/illustrations/glossary/api.svg",
    alt: "Aplicativo envia uma requisição para um servidor, que devolve uma resposta.",
    simple: "Uma API funciona como um acordo de comunicação: o aplicativo pede algo em um formato conhecido e o servidor responde.",
    example: "Um aplicativo de clima solicita a previsão de uma cidade e recebe temperatura e condições do tempo."
  },
  JSON: {
    illustration: "app/assets/illustrations/glossary/json.svg",
    alt: "Objeto JSON formado por pares de chaves e valores.",
    simple: "JSON organiza informações em pares: uma chave identifica o dado e um valor guarda seu conteúdo.",
    example: "A chave nome pode guardar WX, enquanto ativo guarda verdadeiro."
  },
  JWT: {
    illustration: "app/assets/illustrations/glossary/jwt.svg",
    alt: "Token JWT dividido em cabeçalho, dados e assinatura.",
    simple: "Um JWT reúne cabeçalho, declarações e assinatura. A assinatura permite verificar se o conteúdo foi alterado.",
    example: "Depois do login, uma API pode verificar a assinatura e ler a identificação do usuário no payload."
  },
  CORS: {
    illustration: "app/assets/illustrations/glossary/cors.svg",
    alt: "Site consulta uma API de outra origem, que verifica suas regras antes de autorizar a resposta.",
    simple: "CORS permite que a API declare quais origens podem ler suas respostas no navegador.",
    example: "A API autoriza academy.exemplo, mas o navegador bloqueia a leitura quando a origem não está permitida."
  }
};
