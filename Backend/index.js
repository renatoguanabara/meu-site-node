const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const CreateBagagePlan = require('./services/CreateBagagePlan');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/travelDataPage', (req, res) => {
  res.render('travelDataPage', {
    resultado: null,
    mensagem: null,
    city: null,
    destiny: null,
    nome: null
  });
});

app.post('/travelDataPage', async (req, res) => {
  const { city, destiny, nome } = req.body;

  let resultado = null;
  let mensagem = null;

  if (city) {
    const service = new CreateBagagePlan();
    resultado = await service.createBagage(city, 5); // supondo 5 dias
    mensagem = `Recomendações baseadas no país: ${city}`;
  }

  res.render('travelDataPage', {
    resultado,
    mensagem,
    city: city || null,
    destiny: destiny || null,
    nome: nome || null
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
