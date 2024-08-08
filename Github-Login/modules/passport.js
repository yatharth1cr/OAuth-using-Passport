var passport = require("passport");
var GitHubStrartegy = require("passport-github").Strategy;

var User = require("../models/User");

passport.use(
  new GitHubStrartegy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      // Extract profile data
      var profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url,
      };

      User.findOne({ email: profile._json.email })
        .then((user) => {
          if (!user) {
            return User.create(profileData).then((addedUser) => {
              return done(null, addedUser);
            });
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
