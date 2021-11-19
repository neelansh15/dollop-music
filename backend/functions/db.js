const { MongoClient } = require("mongodb");
const config = require("./config");

const uri = config.MONGO_DB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
