var router = require("express").Router();
const { uri } = require("../../db");
const { MongoClient } = require("mongodb");

router.post("/add_following", (req, res) => {
  console.log(
    "ADD FOLLOWER called userId:",
    req.body.userId,
    "followeeId:",
    req.body.followeeId,
  );
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const body = req.body;
  var userId = req.body.userId;

  var followeeId = req.body.followeeId;

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
    client.close();
  });
  res.status(200).send("Added to following");
});

router.post("/remove_following", (req, res) => {
  console.log(
    "REMOVE FOLLOWER called userId:",
    req.body.userId,
    "followeeId:",
    req.body.followeeId,
  );
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const body = req.body;
  var userId = req.body.userId;

  var followeeId = req.body.followeeId;

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

router.get("/:id", (req, res) => {
  console.log("GET USER FOLLOWERS called id", req.params.id);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const body = req.body;
  const params = req.params;
  var userId = params.id;
  client.connect(async (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");

    await collection
      .find({ _id: userId })
      .project({ _id: 0, followers: 1, following: 1 })
      .toArray((err, data) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in finding");
          return;
        }

        res.status(200).send(data);
      });
  });
});

module.exports = router;
