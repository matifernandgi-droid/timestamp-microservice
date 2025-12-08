const express = require("express");
const cors = require("cors");

const app = express();

// Habilitar CORS correctamente
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Usa /api/:date?");
});

// RUTA PARA /api (sin parámetro)
// Esto asegura que freeCodeCamp reciba la fecha actual correctamente
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// RUTA PARA /api/:date (con parámetro)
app.get("/api/:date", (req, res) => {
  let date = req.params.date;

  let parsedDate = !isNaN(date)
    ? new Date(parseInt(date))
    : new Date(date);

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Configurar puerto dinámico para Render
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));