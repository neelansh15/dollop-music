var router = require("express").Router();
const client = require("../../db");
var ObjectId = require("mongodb").ObjectId;

router.post("/addFollowing", (req, res) => {
  const body = req.body;
  var userId = new ObjectId(req.body.userId);

  var followeeId = new ObjectId(req.body.followeeId);
  console.log(userId, followeeId);

  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");

    collection.find({ _id: userId }).toArray((err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
    });
    await collection.updateOne(
      { _id: userId },
      { $push: { following: followeeId } },
    );
    await collection.updateOne(
      { _id: followeeId },
      { $push: { followers: userId } },
    );
    client.close();
  });
  res.status(200).send("Added follower");
});

module.exports = router;
