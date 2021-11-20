var router = require("express").Router();

// split up route handling
router.use("/profile", require("./profile"));
router.use("/follow", require("./follow"));
// etc.

module.exports = router;
