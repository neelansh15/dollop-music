var router = require("express").Router();
const { client, firebaseApp, bucket } = require("../../db");
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

router.get("/most_clapped", (req, res) => {
  // body has nothing
  try {
    const body = req.body;
    client.connect(async (err, res) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const collection = client.db("Dollop").collection("music");
      await collection
        .find({})
        .sort({ claps: -1 })
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

router.post("/clap", (req, res) => {
  // body has music id
  try {
    const body = req.body;
    const music_id = new ObjectId(body.id);
    client.connect(async (err, res) => {
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
  // body has all the fields needed for music
  // userId, name, image, music file as uploadedFile
  try {
    const body = req.body;
    var image, music;
    for (i in req.files) {
      if (req.files[i].mimetype.split("/")[0] === "image") {
        image = req.files[i];
      } else if (req.files[i].mimetype.split("/")[0] === "audio") {
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
    console.log(obj.userId);
    if (obj.userId == -1) {
      res.status(400).send("No userId provided");
      return;
    }
    var userId = req.body.userId;
    client.connect(async (err, res) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }

      var mimetype = image.mimetype;
      console.log(image);
      mimetype = mimetype.split("/");
      obj.meta.image = {
        name: image.name,
        mimetype: mimetype,
      };
      var extension = mimetype[1];
      console.log("Extension", extension);
      console.log(image.buffer);
      const file = bucket.file(`Images/${obj.userId}/${obj.name}.${extension}`);
      await file.save(image.buffer, { contentType: image.mimetype });
      file.makePublic();
      const imgLink = file.publicUrl();

      mimetype = music.mimetype.split("/");
      obj.meta.music = {
        name: music.name,
        mimetype: mimetype,
      };
      extension = mimetype[1];
      console.log("Extension", extension);
      const musicFile = bucket.file(
        `Music/${obj.userId}/${obj.name}.${extension}`,
      );
      await musicFile.save(music.buffer, { contentType: music.mimetype });
      musicFile.makePublic();
      const musicLink = musicFile.publicUrl();

      obj.image = imgLink;
      obj.music = musicLink;
      const musicCollection = client.db("Dollop").collection("music");
      let musicId = await musicCollection.insertOne(obj);

      const userCollection = client.db("Dollop").collection("users");
      await userCollection.updateOne(
        { _id: userId },
        { $push: { music: musicId.insertedId } },
      );
      client.close();
    });
    res.status(200).send("Added music to db");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", (req, res) => {
  // body has an array of music ids
  try {
    const body = req.body;
    const musicIds = body.ids.map(x => new ObjectId(x));
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
  // body has music id as id and userId as userId
  try {
    const body = req.body;
    const music_id = new ObjectId(body.id);
    console.log(music_id);
    let name, meta;
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }

      const collection = client.db("Dollop").collection("music");
      collection.find({ _id: music_id }).toArray(async (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in finding");
          return;
        }
        console.log(data);
        name = data[0].name;
        meta = data[0].meta;

        console.log(name, meta);

        let imgExtension, musicExtension;
        imgExtension = meta.image.mimetype[1];
        musicExtension = meta.music.mimetype[1];
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
