//module.exports.actionName = function(req,res){};
const Post = require("../models/post");

const User = require("../models/user");

module.exports.home = function (req, res) {
  // return res.send("<h1>Express is up and Running</h1>");

  //populate the user
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Codeial",
          user: req.user,
          alluser:users,
          posts: posts,
        });
      });
    });
};
