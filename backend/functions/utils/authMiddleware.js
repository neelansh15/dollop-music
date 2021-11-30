const { db, admin } = require("./admin");

module.exports = (req, res, next) => {
  let idToken = null;
  if (req.headers.authorization) idToken = req.headers.authorization;
  else {
    console.error("No token found");
    res.status(403).json({ error: "Unauthorized. No token found" });
  }

  //Verify id token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      console.log(`Decoded token: ${decodedToken}`);
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userId", "==", decodedToken.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.username = data.docs[0].data().username;
      req.user.role = data.docs[0].data().role;
      console.log("Authorized")
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token: ", err);
      return res.status(403).json(err);
    });
};
