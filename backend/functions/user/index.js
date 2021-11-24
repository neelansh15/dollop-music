const firebase = require("firebase");
require("firebase/firestore");
const config = require("../utils/config");

firebase.initializeApp(config);

const { db } = require("../utils/admin");

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    role: 0,
  };
  const password = req.body.password;

  //Role will be either 0 (User/Interviewee) or 1 (Admin/Interviewer)

  //Note:
  // Password should be at least 6 characters. Check this in frontend
  // Username should preferably be in lowercase

  //Check if user document exists
  const checkUserDocRef = db.collection("users").doc(newUser.username);
  checkUserDocRef.get().then((doc) => {
    if (doc.exists) {
      return res.status(400).json({ error: "Username already exists" });
    }
  });
  //If username is new, proceed further
  let token = "";
  let userId = ""; //Need uid for use in Auth middleware

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, password)
    .then((data) => {
      userId = data.user.uid
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      return db.collection("users").doc(newUser.username).set({
        userId,
        ...newUser
      });
    })
    .then((data) => {
      res.status(201).json({
        token,
      });
    })
    .catch((err) => {
      console.error(`Failed to sign up user: ${err}`);
      res.status(500).json({ error: err.code });
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      res.status(200).json({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: err.code });
    });
};
