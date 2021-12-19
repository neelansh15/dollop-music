const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  }),
);
app.use(express.json());
app.use(bodyParser);

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
