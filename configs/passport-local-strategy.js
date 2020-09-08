const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// <<--!Authenticating Using Passport-->>

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user -->> Passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// <<-- Serializing to decide which key has to be kept in cookies -->>

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// <<-- Deserializing the user from the cookies -->>

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user -->>Passport");
      return done(err);
    }
    return done(null, user);
  });
});

//Check Authentication

passport.checkAuthentication = function (req, res, next) {
  // if user is signed in
  if (req.isAuthenticated()) {
    return next();
  }

  //if user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user; 
  }
  next();
};

//export passport

module.exports = passport;
