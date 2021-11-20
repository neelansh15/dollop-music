const { MongoClient } = require("mongodb");
const config = require("./config");
const { initializeApp } = require("firebase-admin/app");

const uri = config.MONGO_DB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const firebaseConfig = config.firebaseConfig;
const firebaseApp = initializeApp(firebaseConfig);

module.exports = { client, firebaseApp };
