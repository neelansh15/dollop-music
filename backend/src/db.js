const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_DB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
