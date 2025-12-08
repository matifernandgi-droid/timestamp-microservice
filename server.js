const express = require("express");
const cors = require("cors");

const app = express();
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
    // Truco para tests 7 y 8: devolver la fecha actual lo más rápido posible
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    parsedDate = new Date(Number(date));
  } else {
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Puerto dinámico para Render
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));