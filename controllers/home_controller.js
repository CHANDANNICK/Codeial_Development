//module.exports.actionName = function(req,res){};
const Post = require("../models/post");

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
      if (err) {
        console.log("Error in creating post");
        return;
      }
      return res.render("home", {
        title: "Codeial",
        user: req.user,
        posts: posts,
      });
    });
};
