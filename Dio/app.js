console.log(`
                __________________________________________________________________________
                                                                                              
                \\*\\  /*/      /*\\    \\*\\    /*/    |*|    |*|====*/    |*|***|*|                                              
                 \\*\\/*/      / ^ \\    \\*\\  /*/     |*|    |*|__        |*|_*/*/          |*|     wellington222688@gmail.com        |*| 
                 /*/\\*\\     /* - *\\    \\*\\/*/      |*|    |*|--        |*| \\*\\         
                /*/  \\*\\   /*/   \\*\\    \\**/       |*|    |*|====*/    |*|  \\*\\        
                __________________________________________________________________________                                                               
                                
                

                Portfólio: 'https://xavierdev.pages.dev'
                            
                
`);


const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// rota jogos
app.get('/jogo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','jogo-velha', 'index.html'));
});

app.get('/jogo1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','jogo-memoria', 'index.html'));
});
app.get('/jogo2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','jogo-memoria-yugi', 'index.html'));
});

// simulador testando
app.get('/simulador', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','simulador', 'index.html'));
});

// API de exemplo
app.post('/mensagem', (req, res) => {
  const { nome, mensagem } = req.body;
  res.send(`Recebido de ${nome}: ${mensagem}`);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
