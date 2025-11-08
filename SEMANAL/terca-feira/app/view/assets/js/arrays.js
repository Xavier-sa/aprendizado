// Um array com nomes
let nomes = ["Ana", "Carlos", "Wellington", "Rosa"];

// Acessando elementos e usando um loop
for (let i = 0; i < nomes.length; i++) {
  console.log("Olá, " + nomes[i]);
}



let numeros = [10, 20, 30, 40, 50];

function somarArray(arr) {
  let total = 0;
  for (let numero of arr) {
    total += numero;
  }
  return total;
}

console.log(somarArray(numeros)); // Deve retornar 150
