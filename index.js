const express = require('express');
const path = require('path');
console.log('Caminho absoluto para services:', path.join(__dirname, 'services', 'CreateBagagePlan.js'));

// Agora, faça a importação do módulo
const CreateBagagePlan = require('./services/CreateBagagePlan');


const app = express();

// Crie uma instância da classe
const createBagagePlan = new CreateBagagePlan();

// Configura o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para interpretar dados de formulários (POST)
app.use(express.urlencoded({ extended: true }));

// Página inicial
app.get('/', (req, res) => {
  res.render('index', { nome: null });
});

app.post('/', (req, res) => {
  const nome = req.body.nome;
  res.render('index', { nome });
});

// Página sobre
app.get('/about', (req, res) => {
  res.render('about');
});

// GET: exibe o formulário de viagem com campos vazios
app.get('/travelDataPage', (req, res) => {
  res.render('travelDataPage', { nome: null, destiny: null, date: null, country: null, mensagem: null });
});

// POST: recebe os dados do formulário e renderiza com os valores
app.post('/travelDataPage', (req, res) => {
  const { nome, destiny, date, country } = req.body;

  // Cria a mensagem com base no país escolhido
  const mensagem = createBagagePlan.createBagage(country);  // Chamando o método da classe

  // Passa a variável "mensagem" para o template
  res.render('travelDataPage', { nome, destiny, date, country, mensagem });
});

// Inicia o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
