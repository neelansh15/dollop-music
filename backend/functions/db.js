const { MongoClient } = require("mongodb");
const config = require("./config");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getStorage } = require("firebase-admin/storage");

// const firebaseAuth = require("firebase-admin/lib")
//   .initializeApp(config.firebaseConfig)
//   .auth();
// const firebaseAppAuth = firebase.initializeApp(config.firebaseConfig);

const uri = config.MONGO_DB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const firebaseConfig = config.firebaseConfig;
const firebaseApp = initializeApp({
  ...firebaseConfig,
});
const firebaseAuth = getAuth(firebaseApp);
const bucket = getStorage().bucket();

module.exports = { client, firebaseApp, firebaseAuth, bucket, uri };
