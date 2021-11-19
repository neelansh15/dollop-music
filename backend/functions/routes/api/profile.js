var router = require("express").Router();
const client = require("../../db");

router.post("/addDetails", (req, res) => {
  const body = req.body;
  console.log(req.body);
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

router.post("/changeDetails", (req, res) => {
  /*
  body has object with details and document id
  */
  const body = req.body;
  console.log(req.body);

  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    const collection = client.db("Dollop").collection("users");
    collection.updateOne(
      { documentId: req.body.documentId },
      { $set: obj },
      function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      },
    );
    client.close();
  });
  res.status(200).send("Changed user details");
});

module.exports = router;
