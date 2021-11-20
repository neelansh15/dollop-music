var router = require("express").Router();

// split up route handling
router.use("/profile", require("./profile"));
router.use("/follow", require("./follow"));
router.use("/chat", require("./chat"));
// etc.

module.exports = router;
