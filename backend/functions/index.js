const functions = require("firebase-functions");
const express = require("express");

const app = express();
app.use(express.json());

const port = 8000;

// anything beginning with "/api" will go into this
app.use("/api", require("./routes/api"));
app.get("/", (req, res) => {
  res.send("HELLOO");
});

app.listen(port, () => {
  console.log("Listening on", port);
});

exports.api = functions.region("asia-east2").https.onRequest(app);
