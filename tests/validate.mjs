import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { glossary, lessonSections, quiz, schedule, tracks } from "../app/content/fundamentos.js";
import { glossaryVisuals } from "../app/content/glossary-visuals.js";

const html = readFileSync("index.html", "utf8");
const requiredIds = ["conteudo", "trilhas", "aula", "cronograma", "glossario", "laboratorio", "lesson-quiz"];
for (const id of requiredIds) assert.match(html, new RegExp(`id=["']${id}["']`), `Seção #${id} ausente`);
assert.match(html, /lang="pt-BR"/);
assert.match(html, /<meta name="viewport"/);
assert.match(html, /class="skip-link"/);
assert.match(html, /rel="stylesheet" href="app\/assets\/css\/style\.css\?v=2\.1\.0-glossary1"/, "CSS principal deve invalidar caches de versões anteriores");
assert.match(html, /type="module" src="app\/assets\/js\/main\.js\?v=2\.1\.0-glossary1"/, "JavaScript principal deve invalidar caches de versões anteriores");
assert.match(html, /id="today-study"[^>]+aria-live="polite"/, "Recomendação do estudo atual deve ser anunciada por tecnologias assistivas");
assert.match(html, /rel="icon" href="app\/assets\/icons\/favicon\.svg"/);
assert.ok(existsSync("app/assets/icons/favicon.svg"), "Favicon WX ausente");
assert.equal(tracks.length, 7, "O catálogo deve ter sete níveis");
assert.equal(lessonSections.length, 7, "A primeira aula deve combinar fundamentos e visão avançada");
assert.equal(quiz.length, 5, "A primeira aula deve ter cinco perguntas");
assert.equal(schedule.length, 7, "O cronograma deve cobrir sete dias");
assert.ok(glossary.length >= 50, "O glossário inicial está incompleto");
assert.deepEqual(Object.keys(glossaryVisuals).sort(), ["API", "CORS", "JSON", "JWT"], "Registro visual inicial deve conter quatro termos");
for (const path of ["app/assets/css/style.css", "app/assets/js/main.js", "app/content/fundamentos.js", "arquivos/JAVASCRIPT.html", "arquivos/SQL.html", "arquivos/github-foundations.html"]) assert.ok(existsSync(path), `Referência ausente: ${path}`);
const mainJs = readFileSync("app/assets/js/main.js", "utf8");
assert.match(mainJs, /glossary-popover\.js\?v=2\.1\.0-glossary1/, "Componente visual deve invalidar caches de versões anteriores");
assert.match(mainJs, /new Date\(\)\.getDay\(\)/, "Cronograma deve identificar o dia atual");
assert.match(mainJs, /aria-current", "date"/, "Cartão do dia atual deve ser identificado semanticamente");
assert.match(mainJs, /aria-label", "Lembrete do estudo de hoje"/, "Lembrete destacado deve possuir nome acessível");
assert.match(mainJs, /Fechar lembrete de estudo/, "Lembrete destacado deve permitir fechamento explícito");
for (const [term, visual] of Object.entries(glossaryVisuals)) {
  assert.ok(existsSync(visual.illustration), `Ilustração de ${term} ausente`);
  assert.ok(visual.alt.length > 20 && visual.simple.length > 40 && visual.example.length > 30, `Conteúdo visual de ${term} está incompleto`);
}
assert.match(readFileSync(".htaccess", "utf8"), /AddType application\/javascript \.js/, "Hospedagem deve servir módulos .js com MIME JavaScript");
for (const item of quiz) { assert.equal(item.options.length, 4); assert.ok(item.answer >= 0 && item.answer < item.options.length); assert.ok(item.explanation.length > 20); }
const galleryPath = "docs/evolucao.html";
const gallery = readFileSync(galleryPath, "utf8");
const imageLinks = [...gallery.matchAll(/<img\s+src="([^"]+)"/g)].map((match) => resolve(dirname(galleryPath), match[1]));
assert.equal(imageLinks.length, 6, "A galeria deve exibir três capturas por versão");
for (const image of imageLinks) assert.ok(existsSync(image), `Imagem documental ausente: ${image}`);
assert.equal(JSON.parse(readFileSync("package.json", "utf8")).version, "2.0.1", "Versão do projeto inconsistente");
console.log(`Validação concluída: ${tracks.length} trilhas, ${quiz.length} questões, ${glossary.length} termos.`);
