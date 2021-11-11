var router = require("express").Router();

// split up route handling
router.use("/profile", require("./profile"));
// etc.

module.exports = router;
