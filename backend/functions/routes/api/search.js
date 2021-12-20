var router = require("express").Router();
const { client } = require("../../db");

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
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
        .find({ name: { $regex: `.*${query.name}.*`, $options: "i" } })
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
