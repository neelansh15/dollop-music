const { client, firebaseApp, firebaseAuth, bucket } = require("../../db");
const admin = require("firebase-admin");
const db = admin.firestore();
const { signInWithEmailAndPassword } = require("firebase/auth");

const signup = (email, username, password) => {
  console.log(email, username, password);
  const newUser = {
    email: email,
    username: username,
    password: password,
  };

  let userId = "";

  return firebaseAuth
    .createUser(newUser)
    .then(data => {
      userId = data.uid;
      console.log(userId);
      return userId;
    })
    .catch(err => {
      console.error(`Failed to sign up user: ${err}`);
      return -1;
    });
};

const login = (email, password) => {
  const user = {
    email: email,
    password: password,
  };

  return signInWithEmailAndPassword(firebaseAuth, user.email, user.password)
    .then(data => {
      console.log(data);
      console.log(data.user.getIdToken());
      return data.user.getIdToken();
    })
    .then(token => {
      console.log(token);
      return token;
    })
    .catch(err => {
      console.error(err);
      return err.code;
    });
};

module.exports = { signup, login };
