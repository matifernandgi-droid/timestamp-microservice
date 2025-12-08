const express = require("express");
const cors = require("cors");

const app = express();

// Habilitar CORS correctamente para FCC
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Usa /api/:date?");
});

// Endpoint principal
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  // Si no se pasa fecha o es string vacío, usar la fecha actual
  if (!date || date === "") {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Si el parámetro es un número (timestamp), parsearlo
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // Validar fecha
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Responder con JSON esperado por FCC
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Configurar puerto dinámico para Render o Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));