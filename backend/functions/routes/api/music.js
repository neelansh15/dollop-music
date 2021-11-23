var router = require("express").Router();
const { client, firebaseApp, bucket } = require("../../db");
var ObjectId = require("mongodb").ObjectId;

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
});

// router.get("/:id", (req, res) => {
//   const body = req.body;
//   const params = req.params;
//   const musicId = new ObjectId(params.id);
//   client.connect(async (err, res) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send("err");
//       return;
//     }
//     const collection = client.db("Dollop").collection("music");

//     await collection.find({ _id: musicId }).toArray((err, data) => {
//       if (err) {
//         res.status(400).send("Error in finding");
//         return;
//       }
//       res.status(200).send(data);
//     });
//     client.close();
//   });
// });

router.post("/", (req, res) => {
  const body = req.body;
  const obj = {
    userId: body.userId ? body.userId : -1,
    albumId: body.albumId ? body.albumId : -1,
    name: body.name ? body.name : "Music",
    genre: body.genre ? body.genre : "None",
    image: body.image ? body.image : "https://bit.ly/2Z7Plfp",
    date: body.date ? body.date : Date.now(),
    music: body.music,
    claps: 0,
  };
  if (obj.userId == -1) {
    res.status(400).send("No userId provided");
    return;
  }
  var userId = new ObjectId(req.body.userId);
  client.connect(async (err, res) => {
    if (err) {
      console.log(err);
      res.status(400).send("err");
      return;
    }
    var extension = obj.image.split(".").pop();
    console.log("Extension", extension);
    var storage = await bucket
      .upload(__dirname + obj.image, {
        public: true,
        destination: `Images/${obj.userId}/${obj.name}.${extension}`,
      })
      .then(() => {
        console.log("file uploaded.");
      })
      .catch(err => {
        console.error("ERROR:", err);
      });

    console.log(storage);
    extension = obj.music.split(".").pop();
    console.log("Extension", extension);
    storage = await bucket
      .upload(__dirname + obj.image, {
        public: true,
        destination: `Music/${obj.userId}/${obj.name}.${extension}`,
      })
      .then(() => {
        console.log("file uploaded.");
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
    console.log(storage);
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
});

module.exports = router;
