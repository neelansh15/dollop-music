const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = require("./temp_env");

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
