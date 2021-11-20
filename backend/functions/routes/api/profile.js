var router = require("express").Router();
const client = require("../../db");

router.post("/addDetails", (req, res) => {
  const body = req.body;
  const obj = {
    name: body.name ? body.name : "Adam",
    username: body.username ? body.username : "Adam123",
    tagline: body.tagline ? body.tagline : "No tags",
    about: body.about ? body.about : "No about",
    instagram: body.instagram ? body.instagram : "#",
    soundcloud: body.soundcloud ? body.soundcloud : "#",
    twitter: body.twitter ? body.twitter : "#",
    github: body.github ? body.github : "#",
    image: body.image ? body.image : "https://bit.ly/3HCahMK",
    bannerImage: body.bannerImage ? body.bannerImage : "https://bit.ly/3x2aiVA",
  };

  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");
    await collection.insertOne(obj);
    client.close();
  });
  res.status(200).send("Added user to db");
});

// TBD :( Below this

router.post("/changeDetails", (req, res) => {
  /*
  body has object with details and document id
  */
  const body = req.body;
  const obj = req.body.obj;
  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");
    collection.updateOne(
      { documentId: req.body.documentId },
      { $set: obj },
      function (err, res) {
        if (err) {
          console.log(err);
          res.status(400).send("err");
          return;
        }
        console.log("1 document updated");
        client.close();
      },
    );
  });
  res.status(200).send("Changed user details");
});

router.get("/getUserDetails", (req, res) => {
  const body = req.body;
  const docId = body.userId;
  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");
    collection.findOne({ documentId: docId }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      res.send(result);
      client.close();
    });
  });
});

module.exports = router;
