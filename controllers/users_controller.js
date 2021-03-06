const User = require("../models/user");

//module.exports.ActionName = function (req, res) { };

//profile action
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, usr) {
    if (err) {
      return redirect("back");
    } else {
      return res.render("user_profile", {
        title: "Codeial",
        user: req.user,
        profile_user: usr,
      });
    }
  });
};

//Update Action
module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      if (user) {
        return res.redirect("back");
      }
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

//render sign-up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    return res.redirect("/users/profile/" + userId + "");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render sign-in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    return res.redirect("/users/profile/" + userId + "");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};

//Get  Sign-up data
module.exports.create = function (req, res) {
  //didn't match confirm password
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user | Sign up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user | Sign up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//Sign-in and create session for user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
