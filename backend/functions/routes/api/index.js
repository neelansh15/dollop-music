var router = require("express").Router();

// split up route handling
router.use("/follow", require("./follow"));
router.use("/music", require("./music"));
router.use("/profile", require("./profile"));
router.use("/search", require("./search"));
// etc.

module.exports = router;
