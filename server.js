const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/api/timestamp', (req, res) => {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get('/api/timestamp/:date_string', (req, res) => {
  const { date_string } = req.params;
  let date;

  // Si date_string es solo dígitos → lo tratamos como timestamp en ms
  if (/^\d+$/.test(date_string)) {
    date = new Date(parseInt(date_string));
  } else {
    date = new Date(date_string);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));