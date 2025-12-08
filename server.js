const express = require("express");
const cors = require("cors");

const app = express();

// Habilitar CORS
app.use(cors({ optionSuccessStatus: 200 }));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Usa /api/:date?");
});

// Ruta API
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // Si no envían fecha, usar fecha actual
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Si el parámetro es solo números grandes, interpretarlo como timestamp
  if (/^\d+$/.test(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // Validar fecha
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Configurar puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});