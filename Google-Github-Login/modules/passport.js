var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;

var User = require("../models/User");
const app = require("../app");
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID_GITHUB,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      var profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url,
        githubid: profile.id,
        provider: profile.provider,
      };

      User.findOne({ email: profile._json.email }) // Corrected typo
        .then((user) => {
          if (!user) {
            User.create(profileData)
              .then((addedUser) => {
                done(null, addedUser);
              })
              .catch((err) => {
                done(err);
              });
          } else {
            done(null, user); // Return the existing user
          }
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      var profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.picture,
        googleid: profile.id,
        provider: profile.provider,
      };

      User.findOne({ email: profile._json.email })
        .then((user) => {
          if (!user) {
            User.create(profileData)
              .then((addedUser) => {
                return done(null, addedUser);
              })
              .catch((err) => {
                done(err);
              });
          } else {
            return done(null, user); // Return the existing user
          }
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user, err) => {
      return done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
