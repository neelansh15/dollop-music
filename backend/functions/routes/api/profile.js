var router = require("express").Router();
const { uri, firebaseApp, bucket } = require("../../db");
const { MongoClient } = require("mongodb");

const multer = require("multer");
let upload = multer({ storage: multer.memoryStorage() });
var crypto = require("crypto");

router.get("/", (req, res) => {
  console.log("GET ALL PROFILE called");
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect((err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("users");
      collection
        .find({})
        .project({ username: 1 })
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
  console.log("REGISTER PROFILE called");

  // body has email pass and username
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
      let response = await collection.findOne({
        $or: [{ _id: obj._id }, { username: obj.username }],
      });
      if (response != null) {
        if (response._id == obj._id) {
          res.status(400).send("Email taken");
          return;
        } else if (response.email == obj.email) {
          res.status(400).send("Username taken");
          return;
        }
      }
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
          res.status(201).send(token);
          client.close();
        },
      );
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/login", (req, res) => {
  console.log("LOGIN called");

  // body has email and pass
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
  console.log("LOGOUT called");

  // body has email
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
  console.log("VALIDATE TOKEN called");

  const body = req.body;
  // body has email and token
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
          res.status(200).send("Active");
        } else {
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
  console.log("UPDATE PROFILE called");
  console.log(req.body);
  console.log(req.files);
  // body has obj to be updated
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const body = req.body;
    const obj = {
      _id: body.id,
      username: body.username,
      tagline: body.tagline,
      about: body.about,
      instagram: body.instagram,
      soundcloud: body.soundcloud,
      twitter: body.twitter,
      github: body.github,
    };
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }

      var image = req.files[0];
      var mimetype = image.mimetype;
      mimetype = mimetype.split("/");
      var extension = mimetype[1];
      const file = bucket.file(
        `Images/${obj._id}/${obj.username}.${extension}`,
      );
      await file.save(image.buffer, { contentType: image.mimetype });
      file.makePublic();
      const imgLink = file.publicUrl();
      obj.image = imgLink;
      console.log(body.id);
      const collection = client.db("Dollop").collection("users");
      let data222 = await collection.updateOne(
        { _id: body.id },
        { $set: { obj } },
      );
      console.log(data222);
      res.status(200).send("Success");
      client.close();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// get email frm username

router.get("/email/:username", (req, res) => {
  console.log("GET EMAIL FROM USERNAME called");

  // params has username
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const body = req.body;
    const params = req.params;
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("users");
      collection.find({ username: params.username }).toArray((err, result) => {
        if (err) {
          console.log(err);
          client.close();
          res.status(400).send("err");
          return;
        }
        res.status(200).send(result[0]._id);
        client.close();
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/most_followed", (req, res) => {
  console.log("GET MOST FOLLOWED called");

  // params has username
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("users");
      collection
        .aggregate([
          {
            $project: {
              _id: 1,
              name: 1,
              username: 1,
              image: 1,
              follower_count: { $size: "$followers" },
            },
          },
          { $sort: { follower_count: -1 } },
        ])
        .limit(10)
        .toArray((err, result) => {
          if (err) {
            console.log(err);
            client.close();
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

router.get("/:id", (req, res) => {
  console.log("GET PROFILE BY ID called");

  // body has email id as id
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const body = req.params;
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
          result[0].followers = result[0].followers.length;
          result[0].following = result[0].following.length;
          res.status(200).send(result[0]);
          client.close();
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
