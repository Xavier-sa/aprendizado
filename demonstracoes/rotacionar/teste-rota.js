// ==========================================
// 1. MOCK (BANCO DE DADOS)
// ==========================================
const pontosDisponiveis = [
  { id: 1, nome: 'Cachoeira do Córrego', categoria: 'Natureza', tempo_estimado: '3h' },
  { id: 2, nome: 'Museu do Pantanal', categoria: 'Cultural', tempo_estimado: '2h' },
  { id: 3, nome: 'Restaurante Sabor Local', categoria: 'Gastronomia', tempo_estimado: '1.5h' },
  { id: 4, nome: 'Trilha do Mirante', categoria: 'Natureza', tempo_estimado: '4h' },
  { id: 5, nome: 'Praça Central', categoria: 'Cultural', tempo_estimado: '1h' },
  { id: 6, nome: 'Passeio de Barco', categoria: 'Aventura', tempo_estimado: '2.5h' },
  { id: 7, nome: 'Feira de Artesanato', categoria: 'Cultural', tempo_estimado: '2h' },
  { id: 8, nome: 'Parque das Araras', categoria: 'Natureza', tempo_estimado: '3h' },
  { id: 9, nome: 'Pizzaria Noturna', categoria: 'Gastronomia', tempo_estimado: '2h' },
  { id: 10, nome: 'Mergulho Fluvial', categoria: 'Aventura', tempo_estimado: '4h' }
];

// ==========================================
// 2. HELPERS
// ==========================================
function parseTempo(tempo) {
  return parseFloat(tempo.replace('h', ''));
}

// Score de prioridade (simula "IA")
function calcularScore(local, interesses) {
  let score = 0;

  if (interesses.includes(local.categoria)) score += 10;

  // bônus leve para experiências mais longas (mais "importantes")
  score += parseTempo(local.tempo_estimado);

  return score;
}

// ==========================================
// 3. MOTOR INTELIGENTE
// ==========================================
function gerarRoteiroInteligente(dadosViajante) {
  const { dias, interesses, ritmo } = dadosViajante;

  // Tempo por dia
  let horasPorDia = 8;
  if (ritmo === 'Lento') horasPorDia = 5;
  if (ritmo === 'Intenso') horasPorDia = 10;

  // Ordena por score (afinidade + relevância)
  const listaOrdenada = [...pontosDisponiveis].sort((a, b) => {
    return calcularScore(b, interesses) - calcularScore(a, interesses);
  });

  const usados = new Set();
  const roteiro = [];

  for (let dia = 1; dia <= dias; dia++) {
    let tempoRestante = horasPorDia;
    const atividades = [];

    for (let local of listaOrdenada) {
      const duracao = parseTempo(local.tempo_estimado);

      const jaUsado = usados.has(local.id);
      const cabeNoDia = duracao <= tempoRestante;

      if (!jaUsado && cabeNoDia) {
        atividades.push({
          ...local,
          horario_sugerido: gerarHorario(atividades.length)
        });

        usados.add(local.id);
        tempoRestante -= duracao;
      }
    }

    roteiro.push({
      dia,
      resumo: {
        horas_planejadas: horasPorDia,
        horas_utilizadas: horasPorDia - tempoRestante
      },
      atividades
    });
  }

  return roteiro;
}

// ==========================================
// 4. SIMULA HORÁRIOS (EXPERIÊNCIA)
// ==========================================
function gerarHorario(index) {
  const horarios = ['08:00', '10:00', '13:00', '15:00', '18:00'];
  return horarios[index] || 'Horário livre';
}

// ==========================================
// 5. TESTES
// ==========================================

console.log("=========================================");
console.log("🚀 ROTEIRO 1: AVENTURA + GASTRONOMIA (INTENSO)");
console.log("=========================================");

const roteiro1 = gerarRoteiroInteligente({
  dias: 2,
  interesses: ['Aventura', 'Gastronomia'],
  ritmo: 'Intenso'
});

console.log(JSON.stringify(roteiro1, null, 2));


console.log("\n=========================================");
console.log("🍃 ROTEIRO 2: CULTURAL + NATUREZA (LENTO)");
console.log("=========================================");

const roteiro2 = gerarRoteiroInteligente({
  dias: 3,
  interesses: ['Cultural', 'Natureza'],
  ritmo: 'Lento'
});

console.log(JSON.stringify(roteiro2, null, 2));