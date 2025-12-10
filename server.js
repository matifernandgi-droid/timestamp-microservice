const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Timestamp Microservice API — usa /api/timestamp/:date_string?');
});

// Ruta con parámetro opcional
app.get('/api/timestamp/:date_string?', (req, res) => {
  let { date_string } = req.params;
  let date;

  // Si no viene date_string → fecha actual
  if (!date_string) {
    date = new Date();
  } else {
    // Si es solo dígitos → timestamp en ms
    if (/^\d+$/.test(date_string)) {
      date = new Date(Number(date_string));
    } else {
      date = new Date(date_string);
    }
  }

  // Validación de fecha
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Iniciar servidor
app.listen(port, () => console.log(`Server listening on port ${port}`));