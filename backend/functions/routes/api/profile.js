var router = require("express").Router();
const { client, firebaseApp, bucket } = require("../../db");
var ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
let upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array("uploadedFile", 5), (req, res) => {
  const body = req.body;
  body.id = new ObjectId(body.id);
  const obj = {
    _id: body.id,
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
    followers: [],
    following: [],
    music: [],
  };

  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }

    var image = req.files[0];
    var bannerImage = req.files[0];

    var mimetype = image.mimetype;
    mimetype = mimetype.split("/");
    var extension = mimetype[1];
    console.log(image.buffer);
    const file = bucket.file(`Images/${obj._id}/${obj.name}.${extension}`);
    await file.save(image.buffer, { contentType: image.mimetype });
    file.makePublic();
    const imgLink = file.publicUrl();
    obj.image = imgLink;

    mimetype = bannerImage.mimetype;
    mimetype = mimetype.split("/");
    extension = mimetype[1];
    console.log(bannerImage.buffer);
    const bannerImageFile = bucket.file(
      `Images/${obj._id}/${obj.name}.${extension}`,
    );
    await bannerImageFile.save(bannerImage.buffer, {
      contentType: bannerImage.mimetype,
    });
    bannerImageFile.makePublic();
    const bannerImageLink = bannerImageFile.publicUrl();
    obj.bannerImage = bannerImageLink;
    const collection = client.db("Dollop").collection("users");
    var new_id;
    await collection.insertOne(obj);
    client.close();
  });
  res.status(200).send("Added user to db");
});
// TBD :( Below this

router.post("/change_details", (req, res) => {
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

router.get("/:id", (req, res) => {
  const body = req.body;
  const params = req.params;
  const docId = new ObjectId(params.id);
  client.connect(async (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");
    collection.find({ _id: docId }).toArray((err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      res.status(200).send(result);
      client.close();
    });
  });
});

module.exports = router;
