// const express = require("express");
// const app = express();
// const router = express.Router();

// app.use(express.json());

// router.use("/profile", require("./profile"));

// app.listen(port, () => {
//   console.log(`listening on ${port}...`);
// });

require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const port = 8000;

// anything beginning with "/api" will go into this
app.use("/api", require("./routes/api"));

app.listen(port, () => {
  console.log("Listening on", port);
});
