const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Habilitar CORS para que FreeCodeCamp pueda acceder a tu API
app.use(cors());

// Ruta de prueba para la raíz
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Usa /api/:date?");
});

// Ruta principal: /api/:date?
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  // Si no hay fecha, usar fecha actual
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    // Si es solo número, parsearlo como timestamp
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Validar fecha
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});