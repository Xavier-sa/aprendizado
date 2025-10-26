// js/render.js
function renderCronograma(cronograma) {
  const container = document.getElementById("cronograma");

  cronograma.forEach((dia, diaIndex) => {
    const div = document.createElement("div");
    div.className = "dia";

    div.innerHTML = `
      <h2>${dia.dia}</h2>
      <div class="tema">${dia.tema}</div>
      <ul>${dia.tarefas.map(t => `<li>${t}</li>`).join('')}</ul>
      <button class="quiz-btn">Testar Conhecimento (Quiz)</button>
      <div class="quiz-container" id="quiz-${diaIndex}"></div>
    `;

    container.appendChild(div);

    const quizBtn = div.querySelector(".quiz-btn");
    const quizContainer = div.querySelector(`#quiz-${diaIndex}`);
    let currentQuizIndex = 0;

    quizBtn.addEventListener("click", () => {
      quizContainer.style.display = quizContainer.style.display === "block" ? "none" : "block";
      quizBtn.textContent = quizContainer.style.display === "block" ? "Ocultar Quiz" : "Testar Conhecimento (Quiz)";
      renderQuiz(dia, diaIndex, quizContainer, currentQuizIndex);
    });
  });
}
