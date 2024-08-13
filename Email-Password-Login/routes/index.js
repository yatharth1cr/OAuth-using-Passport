var express = require("express");
var router = express.Router();
var User = require("../models/Usermodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//register
router.get("/register", (req, res, next) => {
  var error = req.flash("error")[0];
  res.render("register", { error });
});

router.post("/register", (req, res, next) => {
  // console.log(req.body);
  var { name, email, password } = req.body;
  if (req.body.password.length <= 4) {
    req.flash("error", "minimum password length should be 5");
    return res.redirect("/register");
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash("error", "email is already exist. Try different email");
        return res.redirect("/register");
      }
      User.create({ name, email, password })
        .then((addedUser) => {
          return res.redirect("/login");
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

// login
router.get("/login", (req, res, next) => {
  var error = req.flash("error")[0];
  res.render("login", { error });
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "Email/password Required");
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "User Not Found");
        return res.redirect("/login");
      }

      user.verifyPassword(password, (err, result) => {
        if (err) {
          return next(err);
        }
        if (!result) {
          req.flash("error", "Password incorrect");
          return res.redirect("/login");
        }
        req.session.userId = user.id;
        return res.redirect("/user");
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    return res.redirect("/");
  });
});
module.exports = router;
