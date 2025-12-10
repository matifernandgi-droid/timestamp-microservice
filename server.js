// server.js
const express = require("express");
const app = express();
const cors = require("cors");

// habilitar CORS (requerido por freeCodeCamp)
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

// ruta principal (no necesaria para los tests, pero se deja)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// ----------------------------------------------------
//     TIMESTAMP MICROSERVICE
// ----------------------------------------------------
app.get("/api/:date?", (req, res) => {
  const dateStr = req.params.date;

  // Si no se pasa ningún parámetro -> devolver fecha actual
  if (!dateStr) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Detectar si es número (timestamp)
  let date;

  // Si dateStr es un número puro (ej: "1451001600000")
  if (/^\d+$/.test(dateStr)) {
    date = new Date(Number(dateStr));
  } else {
    date = new Date(dateStr);
  }

  // Validación
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta válida
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// ----------------------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto " + port);
});