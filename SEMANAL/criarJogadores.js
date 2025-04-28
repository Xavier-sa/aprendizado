// Função para gerar um nome de jogador aleatório
function gerarNickname() {
    const prefixos = ["Dark", "Shadow", "Dragon", "Ultra", "Mega", "Super", "Ghost", "Night", "Fire", "Ice", "Storm", "Thunder", "Crazy", "Silent", "Speed"];
    const sufixos = ["Warrior", "Ninja", "Knight", "Slayer", "Hunter", "Wizard", "Gamer", "Sniper", "Samurai", "Assassin", "Hero", "Master", "Rider", "Demon", "Lord"];
    
    const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
    const sufixo = sufixos[Math.floor(Math.random() * sufixos.length)];
    const numero = Math.floor(Math.random() * 9999); // Número aleatório para deixar o nome mais único
    
    return `${prefixo}${sufixo}${numero}`;
  }
  
  // Função para gerar jogadores
  function gerarJogadores(qtd) {
    const racas = ["Sayajin", "Humano", "Namekuseijin", "Android", "Majin"];
    
    const jogadores = [];
  
    for (let i = 1; i <= qtd; i++) {
      jogadores.push({
        id: i,
        nome: gerarNickname(),
        raca: racas[Math.floor(Math.random() * racas.length)],
        vida: Math.floor(Math.random() * 500) + 300,  // vida entre 300 e 800
        forca: Math.floor(Math.random() * 100) + 20,  // força entre 20 e 120
        ki: Math.floor(Math.random() * 100) + 10      // ki entre 10 e 110
      });
    }
  
    return jogadores;
  }
  
  // Criando os 100 jogadores
  const jogadores = gerarJogadores(100);
  
  console.log(jogadores);
  