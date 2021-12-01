var router = require("express").Router();
const { client, firebaseApp, bucket } = require("../../db");
const multer = require("multer");
let upload = multer({ storage: multer.memoryStorage() });
var crypto = require("crypto");

router.get("/", (req, res) => {
  // body has email id as id
  try {
    const body = req.body;
    const docId = body.id;
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("users");
      collection
        .find({ _id: docId })
        .project({ password: 0, activeSession: 0 })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send("err");
            return;
          }
          res.status(200).send(result);
          client.close();
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/register", (req, res) => {
  // body has email pass and username
  try {
    const body = req.body;
    const hash = crypto.createHash("md5").digest("hex");
    body.password = crypto
      .createHash("md5")
      .update(body.password)
      .digest("hex");
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
      const token = crypto.randomBytes(20).toString("hex");
      collection.updateOne(
        { _id: body.email },
        { $set: { activeSession: token } },
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send("err while adding session");
            client.close();
            return;
          }
          res.status(200).send(token);
          client.close();
        },
      );
      client.close();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/login", (req, res) => {
  // body has email and pass
  try {
    const body = req.body;

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
            const token = crypto.randomBytes(20).toString("hex");
            collection.updateOne(
              { _id: body.email },
              { $set: { activeSession: token } },
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(400).send("err while adding session");
                  client.close();
                  return;
                }
                res.status(200).send(token);
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
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/logout", (req, res) => {
  // body has email
  try {
    const body = req.body;
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("users");
      collection.updateOne(
        { _id: body.email },
        { $set: { activeSession: "" } },
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send("err while getting session");
            client.close();
            return;
          }
          res.status(200).send("Logout success");
          client.close();
        },
      );
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/validate_token", (req, res) => {
  const body = req.body;
  // body has email and token
  try {
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("users");
      collection.find({ _id: body.email }).toArray((err, result) => {
        if (err) {
          console.log(err);
          client.close();
          res.status(400).send("err");
          return;
        }
        if (body.token == result[0].activeSession) {
          console.log("pass");
          res.status(200).send("Active");
        } else {
          console.log(body.password, result[0].password);
          res.status(400).send("Invalid session");
        }
        client.close();
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// TBD

router.post("/update", upload.array("uploadedFile", 5), async (req, res) => {
  // body has obj to be updated
  try {
    const body = req.body;
    const obj = body.obj;
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }

      if (req.file) {
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
      }

      const collection = client.db("Dollop").collection("users");
      await collection.updateOne({ _id: body.id }, { $set: { obj } });
      client.close();
    });
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
