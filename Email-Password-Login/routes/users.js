var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  var user = req.user;
  res.render("user", { user });
});

module.exports = router;
