const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", (req, res) => {
  res.send("Timestamp Microservice API. Usa /api/:date?");
});

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  let parsedDate;

  if (!date) {
    parsedDate = new Date(Date.now());
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));