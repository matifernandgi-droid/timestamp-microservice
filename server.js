const express = require("express");
const cors = require("cors");

const app = express();

// Habilitar CORS correctamente
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Usa /api/:date?");
});

// Endpoint principal
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  // Si no se pasa parámetro, usar fecha actual
  let parsedDate = date
    ? !isNaN(date)
      ? new Date(parseInt(date))
      : new Date(date)
    : new Date();

  // Validar fecha
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Responder con JSON esperado por freeCodeCamp
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Configurar puerto dinámico para Render, Heroku, etc.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));