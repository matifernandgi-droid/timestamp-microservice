const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Ruta raíz: mensaje simple
app.get('/', (req, res) => {
  res.send('Timestamp Microservice API — usa /api/timestamp/:date_string?');
});

// Ruta sin parámetro: devuelve fecha actual
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

  // Si date_string es solo dígitos → lo interpretamos como timestamp en ms
  if (/^\d+$/.test(date_string)) {
    date = new Date(parseInt(date_string));
  } else {
    date = new Date(date_string);
  }

  // Verificamos si la fecha es válida
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Iniciamos servidor
app.listen(port, () => console.log(`Server listening on port ${port}`));