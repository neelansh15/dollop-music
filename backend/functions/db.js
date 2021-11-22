const { MongoClient } = require("mongodb");
const config = require("./config");
const { initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const uri = config.MONGO_DB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const firebaseConfig = config.firebaseConfig;
const firebaseApp = initializeApp(firebaseConfig);
const bucket = getStorage().bucket();

module.exports = { client, firebaseApp, bucket };
