var router = require("express").Router();
const { uri } = require("../../db");
const { MongoClient } = require("mongodb");

router.get("/", async (req, res) => {
  console.log("SEARCH called");
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const query = req.query;
    const response = [];
    client.connect(async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("err");
        return;
      }
      const musicCollection = client.db("Dollop").collection("music");
      musicCollection
        .find({ name: { $regex: `.*${query.name}.*`, $options: "i" } })
        .toArray((err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send("Error in finding");
            return;
          }
          data.forEach(element => {
            response.push({ ...element, type: "music" });
          });
        });
      const userCollection = client.db("Dollop").collection("users");

      userCollection
        .find({
          $or: [
            { name: { $regex: `${query.name}`, $options: "i" } },
            { username: { $regex: `${query.name}`, $options: "i" } },
          ],
        })
        .toArray((err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send("Error in finding");
            return;
          }
          data.forEach(element => {
            response.push({ ...element, type: "user" });
          });
          res.send(response);
          client.close();
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
