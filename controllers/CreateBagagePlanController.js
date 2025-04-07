const express = require('express');
const router = express.Router();
const CreateBagagePlan = require('../services/CreateBagagePlan');

router.get('/bagagem', (req, res) => {
  res.render('bagagem', { resultado: null, error: null });
});

router.post('/bagagem', async (req, res) => {
  const { city, days } = req.body;

  if (!city || !days) {
    return res.render('bagagem', { resultado: null, error: 'Preencha todos os campos' });
  }

  const bagageService = new CreateBagagePlan();
  const resultado = await bagageService.createBagage(city, parseInt(days));

  res.render('bagagem', { resultado, error: null });
});

module.exports = router;
