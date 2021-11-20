var router = require("express").Router();
const { client } = require("../../db");
var ObjectId = require("mongodb").ObjectId;

router.get("/getChats", (req, res) => {
  const body = req.body;
  var userId = new ObjectId(req.body.userId);
  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");
    collection
      .find({ _id: userId })
      .collection("chat")
      .find({})
      .toArray((err, data) => {
        console.log(data);
      });

    client.close();
  });
});

module.exports = router;
