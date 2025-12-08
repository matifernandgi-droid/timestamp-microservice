const express = require("express");
const cors = require("cors");

const app = express();

// Habilitar CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Usa /api/:date?");
});

// Endpoint principal
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  let parsedDate;

  if (!date) {
    // Usar Date.now() directamente para minimizar la diferencia de tiempo
    parsedDate = new Date(Date.now());
  } else if (/^\d+$/.test(date)) {
    parsedDate = new Date(Number(date));
  } else {
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

// Puerto dinámico para hosting
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));