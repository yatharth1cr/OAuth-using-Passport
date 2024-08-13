var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/Usermodel");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
          if (!user.verifyPassword(password)) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          } else {
            return done(null, user);
          }
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
