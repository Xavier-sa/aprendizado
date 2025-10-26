document.addEventListener("DOMContentLoaded", () => {
  renderCronograma(cronograma);

  document.getElementById("ano").textContent = new Date().getFullYear();

  const now = new Date();
  const day = now.getDay();
  if (day >= 1 && day <= 5) {
    alert(`⚡️ Bom dia, Xavier! Hoje é ${cronograma[day - 1].dia} - Hora de estudar ${cronograma[day - 1].tema}!`);
  }
});
