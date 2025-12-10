const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Timestamp Microservice API — usa /api/timestamp/:date_string?');
});

// Ruta sin parámetro: fecha actual
app.get('/api/timestamp', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Ruta con parámetro
app.get('/api/timestamp/:date_string', (req, res) => {
  const { date_string } = req.params;
  let date;

  // Si es un número válido (timestamp) y tiene 13 dígitos → milisegundos
  if (/^\d+$/.test(date_string)) {
    date = new Date(Number(date_string));
  } else {
    date = new Date(date_string);
  }

  // Verificación de fecha válida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Iniciamos servidor
app.listen(port, () => console.log(`Server listening on port ${port}`));