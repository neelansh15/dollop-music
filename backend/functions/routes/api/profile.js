var router = require("express").Router();
const { client, firebaseApp, bucket } = require("../../db");
var ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
let upload = multer({ storage: multer.memoryStorage() });
const { signup, login } = require("./users");
var crypto = require("crypto");

router.post("/", upload.array("uploadedFile", 5), async (req, res) => {
  const body = req.body;
  /*
  body
    email
    username
    password
    tagline
    name
    about
    socials
    image
    bannerImg
  */
  body.password = crypto.createHash("md5").update(body.password).digest("hex");
  const obj = {
    _id: body.email,
    password: body.password,
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

  client.connect(async (err, data) => {
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
    await collection.insertOne(obj);
    client.close();
  });
  res.status(201).send("Success");
});

router.get("/:id", (req, res) => {
  const body = req.body;
  const params = req.params;
  const docId = params.id;
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

// to verify
router.post("/register", (req, res) => {
  const body = req.body;
  body.password = crypto.createHash("md5").update(body.password).digest("hex");
  const obj = {
    _id: body.email,
    password: body.password,
    name: "User",
    username: body.username,
    tagline: "No tags",
    about: "No about",
    instagram: "#",
    soundcloud: "#",
    twitter: "#",
    github: "#",
    image: "https://bit.ly/3HCahMK",
    bannerImage: "https://bit.ly/3x2aiVA",
    activeSession: "",
    followers: [],
    following: [],
    music: [],
  };
  client.connect(async (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");
    await collection.insertOne(obj);
    client.close();
  });
  res.status(201).send("Added user to db");
});

router.post("/login", (req, res) => {
  const body = req.body;
  const hash = crypto.createHash("md5").digest("hex");
  client.connect(async (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    const collection = client.db("Dollop").collection("users");
    await collection
      .find({ _id: body.email })
      .project({ password: 1 })
      .toArray((err, result) => {
        if (err) {
          console.log(err);
          client.close();
          res.status(400).send("err");
          return;
        }
        if (
          crypto.createHash("md5").update(body.password).digest("hex") ==
          result[0].password
        ) {
          console.log("pass");
          res.status(200).send(hash);
          collection.updateOne(
            { _id: body.email },
            { $set: { activeSession: hash } },
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(400).send("err while adding session");
                client.close();
                return;
              }

              client.close();
            },
          );
        } else {
          console.log(body.password, result[0].password);
          client.close();
          res.status(400).send("Invalid credentials");
        }
      });
  });
});

module.exports = router;
