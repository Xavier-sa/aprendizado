import { glossary } from "./fundamentos.js?v=2.1.0-glossary2";

// Cada cena segue a ordem: origem, ação mostrada na seta e resultado.
// Para adicionar um termo, basta registrar esses três textos aqui.
const scenes = {
  REST: ["Cliente", "GET /aulas", "Recurso"], HTTP: ["Navegador", "requisição", "Servidor"],
  HTTPS: ["Navegador", "TLS protege", "Servidor"], URL: ["site.com", "/aulas/1", "Recurso"],
  URI: ["Identificador", "localiza", "Aula 1"], DNS: ["wasxtech.com", "traduz para", "Endereço IP"],
  TCP: ["Pacotes", "ordena e confirma", "Destino"], IP: ["Dispositivo", "endereça", "Servidor"],
  XML: ["<aula>", "estrutura", "<titulo>"], ORM: ["Objeto Aula", "mapeia", "Tabela aulas"],
  CRUD: ["Dados", "criar · ler", "editar · excluir"], SQL: ["SELECT *", "consulta", "Tabela aulas"],
  NoSQL: ["Documento", "armazena", "Coleção"], PDO: ["Código PHP", "prepared statement", "Banco"],
  POO: ["Objeto Aula", "dados + ações", "concluir()"], MVC: ["Controller", "coordena", "Model + View"],
  MVP: ["Presenter", "prepara dados", "View"], DOM: ["JavaScript", "altera", "Título HTML"],
  SPA: ["Clique", "atualiza trecho", "Mesma página"], SSR: ["Servidor", "renderiza HTML", "Navegador"],
  SSG: ["Build", "gera antes", "HTML estático"], CSR: ["JavaScript", "monta interface", "Navegador"],
  CI: ["Commit", "executa testes", "Resultado"], CD: ["Versão validada", "entrega", "Publicação"],
  CLI: ["Terminal", "git status", "Saída"], IDE: ["Editor", "código + debug", "Projeto"],
  SDK: ["Biblioteca", "ferramentas + docs", "Aplicativo"], SSH: ["Computador", "chave segura", "Servidor/Git"],
  TLS: ["Dados", "criptografa", "HTTPS"], CSRF: ["Site malicioso", "forja ação", "Conta logada"],
  XSS: ["Texto externo", "escapar", "Conteúdo seguro"], RBAC: ["Usuário", "papel define", "Permissão"],
  OWASP: ["Riscos comuns", "orienta", "App seguro"], Algoritmo: ["Entrada", "passos ordenados", "Resultado"],
  Variável: ["idade", "recebe", "18"], Tipo: ["Valor", "define operações", "Texto/Número"],
  Booleano: ["usuarioAtivo", "pode ser", "true / false"], Função: ["preço + qtd.", "calcularTotal", "total"],
  Abstração: ["calcularFrete()", "oculta regras", "valor final"], Estado: ["Aula pendente", "concluir", "Aula concluída"],
  Imutabilidade: ["Lista original", "cria nova", "Lista + item"], Recursão: ["Pasta", "visita subpastas", "Arquivos"],
  Complexidade: ["Mais dados", "mede custo", "Tempo/memória"], Concorrência: ["Carregar dados", "coordena", "Interface ativa"],
  Coesão: ["Módulo pagamento", "concentra", "Regras relacionadas"], Acoplamento: ["Módulo A", "interface reduz", "Dependência B"]
};

const detailed = {
  API: { illustration: "app/assets/illustrations/glossary/api.svg", alt: "Aplicativo envia uma requisição para um servidor, que devolve uma resposta." },
  JSON: { illustration: "app/assets/illustrations/glossary/json.svg", alt: "Objeto JSON formado por pares de chaves e valores." },
  JWT: { illustration: "app/assets/illustrations/glossary/jwt.svg", alt: "Token JWT dividido em cabeçalho, dados e assinatura." },
  CORS: { illustration: "app/assets/illustrations/glossary/cors.svg", alt: "Site consulta uma API de outra origem, que verifica suas regras antes de autorizar a resposta." }
};

// Une o texto do glossário ao desenho correspondente sem duplicar conteúdo.
export const glossaryVisuals = Object.fromEntries(glossary.map((term) => {
  const scene = scenes[term.acronym];
  const visual = detailed[term.acronym] || { scene, alt: `${scene[0]}: ${scene[1]}: ${scene[2]}.` };
  return [term.acronym, { ...visual, simple: term.description, example: term.example }];
}));
