const jornada = {
  vivo: true,

  aprender() {
    console.log("Aprendendo algo novo...");
  },

  construir() {
    console.log("Construindo projetos...");
  },

  evoluir() {
    console.log("Evoluindo um pouco mais...");
  }
};

function viver(jornada) {
  jornada.aprender();
  jornada.construir();
  jornada.evoluir();

  setTimeout(() => viver(jornada), 2000); // loop controlado
}

viver(jornada);