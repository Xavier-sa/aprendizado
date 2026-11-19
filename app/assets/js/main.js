import { glossary, lessonSections, quiz, schedule, tracks } from "../../content/fundamentos.js?v=2.0.1-content3";
import { hasGlossaryVisual, setupGlossaryVisuals } from "./glossary-popover.js?v=2.1.0-glossary1";

const STORAGE_KEY = "wx-academy-progress-v1";
const state = loadState();
const byId = (id) => document.getElementById(id);

function loadState() {
  const fallback = { lessonComplete: false, quizAttempts: 0, schedule: {}, theme: "light" };
  try { return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return fallback; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); updateProgress(); }
function element(tag, className, text) { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }

function renderTracks() {
  const grid = byId("track-grid");
  tracks.forEach((track, index) => {
    const card = element("article", "track-card"); card.style.setProperty("--accent", track.color);
    const meta = element("div", "track-number"); meta.append(element("span", "", `Nível ${index + 1}`), element("span", "", `${track.lessons} aulas`));
    card.append(meta, element("h3", "", track.title), element("p", "", track.description), element("small", "", index === 0 ? "Disponível agora" : "Planejado no roadmap")); grid.append(card);
  });
}

function renderLesson() {
  const nav = byId("lesson-nav"); const content = byId("lesson-content"); const body = element("div", "lesson-body");
  lessonSections.forEach((section) => {
    const link = element("a", "", section.label); link.href = `#${section.id}`; nav.append(link);
    const block = element("section"); block.id = section.id; block.innerHTML = section.html; body.append(block);
  });
  content.append(body); renderQuizQuestion(0);
  const button = byId("complete-lesson");
  if (state.lessonComplete) { button.textContent = "Aula concluída ✓"; button.classList.add("is-complete"); }
  button.addEventListener("click", () => { state.lessonComplete = !state.lessonComplete; button.textContent = state.lessonComplete ? "Aula concluída ✓" : "Marcar aula como concluída"; button.classList.toggle("is-complete", state.lessonComplete); saveState(); });
}

let quizIndex = 0; let quizScore = 0;
function renderQuizQuestion(index) {
  const form = byId("lesson-quiz"); const feedback = byId("quiz-feedback"); const item = quiz[index]; form.replaceChildren(); feedback.textContent = ""; feedback.className = "quiz-feedback"; byId("quiz-progress").textContent = `${index + 1} de ${quiz.length}`;
  const fieldset = element("fieldset"); const legend = element("legend", "", item.question); fieldset.append(legend);
  item.options.forEach((option, optionIndex) => { const label = element("label", "quiz-option"); const input = element("input"); input.type = "radio"; input.name = "answer"; input.value = String(optionIndex); label.append(input, element("span", "", option)); fieldset.append(label); });
  const submit = element("button", "button button-primary", index === quiz.length - 1 ? "Finalizar quiz" : "Responder e continuar"); submit.type = "submit"; fieldset.append(submit); form.append(fieldset);
  form.onsubmit = (event) => { event.preventDefault(); const selected = form.querySelector("input:checked"); if (!selected) { feedback.textContent = "Selecione uma alternativa antes de continuar."; feedback.classList.add("bad"); return; } const correct = Number(selected.value) === item.answer; if (correct) quizScore += 1; feedback.textContent = `${correct ? "Correto!" : "Ainda não."} ${item.explanation}`; feedback.classList.add(correct ? "good" : "bad"); form.querySelectorAll("input").forEach((input) => { input.disabled = true; }); submit.disabled = true; setTimeout(() => { if (index + 1 < quiz.length) { quizIndex += 1; renderQuizQuestion(quizIndex); } else { finishQuiz(); } }, 900); };
}
function finishQuiz() { const form = byId("lesson-quiz"); form.replaceChildren(); form.append(element("h4", "", `Resultado: ${quizScore} de ${quiz.length}`), element("p", "", quizScore >= 4 ? "Ótimo trabalho. Você já pode seguir para algoritmos." : "Revise os conceitos e tente novamente para consolidar a base.")); const retry = element("button", "button button-secondary", "Refazer quiz"); retry.type = "button"; retry.onclick = () => { quizIndex = 0; quizScore = 0; renderQuizQuestion(0); }; form.append(retry); state.quizAttempts += 1; saveState(); }

function renderSchedule() {
  const grid = byId("schedule-grid"); const values = [["not-started", "Não iniciado"], ["in-progress", "Em andamento"], ["complete", "Concluído"]];
  schedule.forEach(([day, subject, task, color], index) => { const card = element("article", "day-card"); card.id = `study-day-${index}`; card.style.setProperty("--day", color); card.append(element("h3", "", day), element("span", "", subject), element("p", "", task)); const label = element("label", "", "Status do estudo"); const select = element("select"); select.setAttribute("aria-label", `Status de ${day}`); values.forEach(([value, text]) => { const option = element("option", "", text); option.value = value; select.append(option); }); select.value = state.schedule[index] || "not-started"; select.onchange = () => { state.schedule[index] = select.value; saveState(); }; label.append(select); card.append(label); grid.append(card); });
  renderTodayStudy();
}

function renderTodayStudy() {
  const jsDay = new Date().getDay();
  const scheduleIndex = jsDay === 0 ? 6 : jsDay - 1;
  const [day, subject, task] = schedule[scheduleIndex];
  const card = byId(`study-day-${scheduleIndex}`);
  card.classList.add("is-today");
  card.setAttribute("aria-current", "date");
  const notice = byId("today-study");
  notice.replaceChildren();
  const copy = element("div");
  copy.append(element("span", "today-label", "Estudo de hoje"), element("strong", "", `${day}: ${subject}`), element("p", "", task));
  const link = element("a", "button button-primary", "Ver plano de hoje");
  link.href = `#${card.id}`;
  notice.append(copy, link);
  notice.hidden = false;
  renderStudyReminder(day, subject, task, card.id);
}

function renderStudyReminder(day, subject, task, cardId) {
  const reminder = element("aside", "study-reminder");
  reminder.id = "study-reminder";
  reminder.setAttribute("role", "region");
  reminder.setAttribute("aria-label", "Lembrete do estudo de hoje");
  reminder.setAttribute("aria-live", "polite");
  const icon = element("span", "study-reminder-icon", "Hoje");
  const copy = element("div", "study-reminder-copy");
  copy.append(element("strong", "", `${day}: ${subject}`), element("p", "", task));
  const actions = element("div", "study-reminder-actions");
  const open = element("a", "button study-reminder-open", "Abrir plano");
  open.href = `#${cardId}`;
  open.addEventListener("click", () => reminder.remove());
  const close = element("button", "study-reminder-close", "Fechar lembrete");
  close.type = "button";
  close.setAttribute("aria-label", "Fechar lembrete de estudo");
  close.addEventListener("click", () => reminder.remove());
  actions.append(open, close);
  reminder.append(icon, copy, actions);
  document.body.append(reminder);
}

function renderGlossary(query = "") {
  const grid = byId("glossary-grid"); const normalized = query.trim().toLocaleLowerCase("pt-BR"); const filtered = glossary.filter((term) => Object.values(term).some((value) => value.toLocaleLowerCase("pt-BR").includes(normalized))); grid.replaceChildren();
  filtered.forEach((term) => { const card = element("article", "term-card"); const heading = element("h3"); heading.append(element("strong", "", term.acronym), element("span", "", term.name)); if (hasGlossaryVisual(term.acronym)) { const visual = element("button", "term-visual-trigger", "Ver visual"); visual.type = "button"; visual.dataset.visualTerm = term.acronym; visual.setAttribute("aria-label", `Ver explicação visual de ${term.acronym}`); visual.setAttribute("aria-haspopup", "dialog"); visual.setAttribute("aria-controls", "glossary-visual-popover"); visual.setAttribute("aria-expanded", "false"); heading.append(visual); card.classList.add("has-visual"); } card.append(heading, element("p", "", term.description), element("small", "", `Exemplo: ${term.example}`)); grid.append(card); });
  setupGlossaryVisuals(grid);
  byId("glossary-result-count").textContent = `${filtered.length} ${filtered.length === 1 ? "termo encontrado" : "termos encontrados"}`;
}

function updateProgress() { const scheduleComplete = Object.values(state.schedule).filter((value) => value === "complete").length; const done = (state.lessonComplete ? 1 : 0) + scheduleComplete; const total = schedule.length + 1; const percent = Math.round((done / total) * 100); byId("overall-percent").textContent = `${percent}%`; byId("overall-bar").style.width = `${percent}%`; byId("completed-count").textContent = String(state.lessonComplete ? 1 : 0); byId("quiz-count").textContent = String(state.quizAttempts); }
function setupNavigation() { const toggle = document.querySelector(".menu-toggle"); const menu = byId("menu-principal"); toggle.addEventListener("click", () => { const open = menu.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); }); menu.addEventListener("click", () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }); }
function setupTheme() { const button = byId("theme-toggle"); const apply = () => { const dark = state.theme === "dark"; document.body.classList.toggle("dark", dark); button.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro"); }; apply(); button.addEventListener("click", () => { state.theme = state.theme === "dark" ? "light" : "dark"; apply(); saveState(); }); }

renderTracks(); renderLesson(); renderSchedule(); renderGlossary(); setupNavigation(); setupTheme(); updateProgress();
byId("glossary-search").addEventListener("input", (event) => renderGlossary(event.target.value));
byId("ano").textContent = String(new Date().getFullYear());
