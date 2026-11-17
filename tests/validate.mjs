import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { glossary, quiz, schedule, tracks } from "../app/content/fundamentos.js";

const html = readFileSync("index.html", "utf8");
const requiredIds = ["conteudo", "trilhas", "aula", "cronograma", "glossario", "laboratorio", "lesson-quiz"];
for (const id of requiredIds) assert.match(html, new RegExp(`id=["']${id}["']`), `Seção #${id} ausente`);
assert.match(html, /lang="pt-BR"/);
assert.match(html, /<meta name="viewport"/);
assert.match(html, /class="skip-link"/);
assert.equal(tracks.length, 7, "O catálogo deve ter sete níveis");
assert.equal(quiz.length, 5, "A primeira aula deve ter cinco perguntas");
assert.equal(schedule.length, 7, "O cronograma deve cobrir sete dias");
assert.ok(glossary.length >= 37, "O glossário inicial está incompleto");
for (const path of ["app/assets/css/style.css", "app/assets/js/main.js", "app/content/fundamentos.js", "arquivos/JAVASCRIPT.html", "arquivos/SQL.html", "arquivos/github-foundations.html"]) assert.ok(existsSync(path), `Referência ausente: ${path}`);
for (const item of quiz) { assert.equal(item.options.length, 4); assert.ok(item.answer >= 0 && item.answer < item.options.length); assert.ok(item.explanation.length > 20); }
console.log(`Validação concluída: ${tracks.length} trilhas, ${quiz.length} questões, ${glossary.length} termos.`);
