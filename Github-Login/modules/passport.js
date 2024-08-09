var passport = require("passport");
var GitHubStrartegy = require("passport-github").Strategy;

var User = require("../models/User");

// Config Passport to use GitHub strategy for OAuth authentication
passport.use(
  new GitHubStrartegy(
    {
      // GitHub OAuth credentials from .env file
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // Cb URL that GitHub will redirect to after authentication
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    // Function to handle the user's profile after successful authentication
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      // Extract profile data
      var profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url,
      };

      // Check if a user with same email already exists in db
      User.findOne({ email: profile._json.email })
        .then((user) => {
          if (!user) {
            // If the user does not exist, create a new one
            return User.create(profileData).then((addedUser) => {
              // Pass the newly created user to the done callback
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
