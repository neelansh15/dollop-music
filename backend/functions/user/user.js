// const firebase = require("firebase");
// require("firebase/firestore");
// const config = require("../utils/config");

// firebase.initializeApp(config);

const { db } = require("../utils/admin");


exports.user = (req, res) => {
    let user = {}
    if(req.body.bio != "") user.bio = req.body.bio
    if(req.body.location != "") user.location = req.body.location

    db.doc(`/users/${req.user.username}`).update(user)
    .then(() => {
        console.log(`User details of "${req.user.username}" updated`)
        return res.json({ message: "Details updated successfully "})
    })
    .catch((err) => {
        console.error(err)
        return res.status(500).json({ error: err.code })
    })
    
}

exports.getUser = (req, res) => {
    if(req.user.username != "" && req.user.username != null){
        db.collection('users').doc(req.user.username).get()
        .then((data) => {
            return res.json(data.data())
        })
    }
}
