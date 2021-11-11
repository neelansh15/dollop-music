var router = require("express").Router();
const client = require("../../db");

router.post("/details", (req, res) => {
  const body = req.body;
  const obj = {
    name: body.name,
    about: body.about,
  };

  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    const collection = client.db("Dollop").collection("users");
    await collection.insertOne(obj);
    client.close();
  });
});

module.exports = router;
