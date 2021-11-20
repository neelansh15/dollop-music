var router = require("express").Router();
const { client, firebaseApp } = require("../../db");
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
