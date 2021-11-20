var router = require("express").Router();
const { client } = require("../../db");
var ObjectId = require("mongodb").ObjectId;

router.post("/add_following", (req, res) => {
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

    await collection.updateOne(
      { _id: userId },
      { $push: { following: followeeId } },
    );
    await collection.updateOne(
      { _id: followeeId },
      { $push: { followers: userId } },
    );
    // collection
    //   .find({ _id: followeeId }, { following: 1 })
    //   .toArray((err, res) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //     if (userId in res) {
    //       ///add to chat
    //     }
    //   });
    client.close();
  });
  res.status(200).send("Added to following");
});

router.post("/remove_following", (req, res) => {
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

    await collection.updateOne(
      { _id: userId },
      { $pull: { following: followeeId } },
    );
    await collection.updateOne(
      { _id: followeeId },
      { $pull: { followers: userId } },
    );
    client.close();
  });
  res.status(200).send("Removed from following");
});

module.exports = router;
