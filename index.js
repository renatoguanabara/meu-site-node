const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public")); // Serve arquivos estáticos
app.use(express.json()); // Permite receber JSON no corpo da requisição

// Rota para processar o nome enviado
app.post("/mostrar-nome", (req, res) => {
    const { nome } = req.body;
    res.json({ mensagem: `Seu nome é: ${nome}` });
});

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
