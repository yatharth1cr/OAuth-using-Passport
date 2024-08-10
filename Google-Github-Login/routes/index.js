var express = require("express");
const passport = require("passport");
var router = express.Router();

// GET home page.
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express GOOGE-GITHUB-LOGIN APP" });
});

// GET github success page.
router.get("/githubsuccess", (req, res) => {
  res.render("githubsuccess", { user: req.user });
});

// GET google success page.
router.get("/googlesuccess", (req, res) => {
  res.render("googlesuccess", { user: req.user });
});

// GET failure page.
router.get("/failure", (req, res) => {
  res.render("failure");
});

// Github
router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/failure",
  }),
  (req, res) => {
    res.redirect("/githubsuccess");
  }
);

// Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
  }),
  (req, res) => {
    res.redirect("/googlesuccess");
  }
);

// logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });
});

// export the router
module.exports = router;
