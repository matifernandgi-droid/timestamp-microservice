const express = require("express");
const cors = require("cors");

const app = express();

// Habilitar CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Usa /api/:date?");
});

// Endpoint principal: parámetro opcional
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  let parsedDate;

  // Si no se pasa fecha, usar fecha actual
  if (!date) {
    parsedDate = new Date();
  }
  // Si es solo números (timestamp), parsearlo
  else if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date));
  }
  // Si es string, parsearlo normalmente
  else {
    parsedDate = new Date(date);
  }

  // Validar fecha
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Responder con JSON exacto que FCC espera
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Configurar puerto dinámico para hosting
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));