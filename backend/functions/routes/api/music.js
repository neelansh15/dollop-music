var router = require("express").Router();
const { uri, firebaseApp, bucket } = require("../../db");
const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
let upload = multer({ storage: multer.memoryStorage() });

/*
Routes:
  get using id
  get all 
  upload 
  update
  most clapped
  clap a music
*/

// check for token in post/upload music

router.get("/name", (req, res) => {
  console.log("GET MUSIC NAMES called");
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
      const collection = client.db("Dollop").collection("music");
      collection
        .find({})
        .project({ name: 1 })
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

router.get("/most_clapped", (req, res) => {
  console.log("GET MOST CLAPPED MUSIC called");
  // body has nothing

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
      const collection = client.db("Dollop").collection("music");
      await collection
        .find({})
        .sort({ claps: -1 })
        .limit(10)
        .toArray((err, data) => {
          if (err) {
            res.status(400).send("Error in finding");
            return;
          }
          res.status(200).send(data);
        });
      client.close();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.get("/recent", (req, res) => {
  console.log("GET RECENT MUSIC called");
  // body has nothing
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
      const collection = client.db("Dollop").collection("music");
      await collection
        .find({})
        .sort({ date: -1 })
        .limit(5)
        .toArray((err, data) => {
          if (err) {
            res.status(400).send("Error in finding recent music");
            return;
          }
          res.status(200).send(data);
        });
      client.close();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/clap", (req, res) => {
  console.log("ADD CLAP called");

  // body has music id
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const body = req.body;
    const music_id = new ObjectId(body.id);
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("music");
      await collection.updateOne({ _id: music_id }, { $inc: { claps: 1 } });
      res.status(200).send("Added clap");
      client.close();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/", upload.array("uploadedFile", 5), (req, res) => {
  console.log("UPLOAD MUSIC called");
  // body has all the fields needed for music
  // userId, name, image, music file as uploadedFile
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const body = req.body;
    var image, music;
    for (i in req.files) {
      if (req.files[i].mimetype.split("/")[0] === "image") {
        image = req.files[i];
      } else if (
        req.files[i].mimetype.split("/")[0] === "audio" ||
        req.files[i].mimetype.split("/")[0] === "video"
      ) {
        music = req.files[i];
      }
    }
    const obj = {
      userId: body.userId ? body.userId : -1,
      albumId: body.albumId ? body.albumId : -1,
      name: body.name ? body.name : "Music",
      genre: body.genre ? body.genre : "None",
      image: body.image ? body.image : "https://bit.ly/2Z7Plfp",
      date: body.date ? body.date : Date.now(),
      music: body.music,
      artists: body.artists,
      claps: 0,
      meta: {
        image: {
          name: "",
          mimetype: "",
        },
        music: {
          name: "",
          mimetype: "",
        },
      },
    };
    if (obj.userId == -1) {
      res.status(400).send("No userId provided");
      return;
    }
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("users");
      let response = await collection.findOne({ _id: body.userId });
      if (response == null) {
        res.status(400).send("Invalid user id");
        return;
      } else {
        if (response.activeSession != body.token) {
          res.status(400).send("Invalid session");
          return;
        }
      }
      console.log("IMAGE UPLOADING...");
      var mimetype = image.mimetype;
      mimetype = mimetype.split("/");
      obj.meta.image = {
        name: image.originalname,
        mimetype: image.mimetype,
      };
      var extension = mimetype[1];
      const file = bucket.file(`Images/${obj.userId}/${obj.name}.${extension}`);
      await file.save(image.buffer, { contentType: image.mimetype });
      file.makePublic();
      const imgLink = file.publicUrl();
      console.log("IMAGE UPLOADED...");

      console.log("MUSIC UPLOADING...");
      mimetype = music.mimetype.split("/");
      obj.meta.music = {
        name: music.originalname,
        mimetype: music.mimetype,
      };
      extension = mimetype[1];
      const musicFile = bucket.file(
        `Music/${obj.userId}/${obj.name}.${extension}`,
      );
      await musicFile.save(music.buffer, { contentType: music.mimetype });
      musicFile.makePublic();
      const musicLink = musicFile.publicUrl();
      console.log("MUSIC UPLOADED...");

      obj.image = imgLink;
      obj.music = musicLink;
      const musicCollection = client.db("Dollop").collection("music");
      let musicId = await musicCollection.insertOne(obj);

      const userCollection = client.db("Dollop").collection("users");
      await userCollection.updateOne(
        { _id: body.userId },
        { $push: { music: musicId.insertedId } },
      );
      client.close();
      res.status(200).send("Added music to db");
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", (req, res) => {
  console.log("GET MUSIC called");

  // body has an array of music ids
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const query = req.query;
    const musicIds = query.ids.map(x => new ObjectId(x));
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("music");

      await collection.find({ _id: { $in: musicIds } }).toArray((err, data) => {
        if (err) {
          res.status(400).send("Error in finding");
          return;
        }
        res.status(200).send(data);
      });
      client.close();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  console.log("DELETE MUSIC called id:", req.body.id);

  // body has music id as id and userId as userId
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const body = req.body;
    const music_id = new ObjectId(body.id);

    let name, meta;
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const userCollection = client.db("Dollop").collection("users");
      let response = await userCollection.findOne({ _id: body.userId });
      if (response == null) {
        res.status(400).send("Invalid user id");
        return;
      } else {
        if (response.activeSession != body.token) {
          res.status(400).send("Invalid session");
          return;
        }
      }

      const collection = client.db("Dollop").collection("music");
      collection.find({ _id: music_id }).toArray(async (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in finding");
          return;
        }
        name = data[0].name;
        meta = data[0].meta;

        let imgExtension, musicExtension;
        imgExtension = meta.image.mimetype.split("/")[1];
        musicExtension = meta.music.mimetype.split("/")[1];
        await bucket
          .file(`Images/${body.userId}/${name}.${imgExtension}`)
          .delete();
        await bucket
          .file(`Music/${body.userId}/${name}.${musicExtension}`)
          .delete();
        const musicCollection = client.db("Dollop").collection("music");
        await musicCollection.deleteOne({ _id: music_id });

        const userCollection = client.db("Dollop").collection("users");
        await userCollection.updateOne(
          { _id: body.userId },
          { $pull: { music: music_id } },
        );
        res.status(200).send("Deleted successfully");
        client.close();
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
