//module.exports.actionName = function(req,res){};

module.exports.home = function (req, res) {
  // return res.send("<h1>Express is up and Running</h1>");

  return res.render("home", {
    title: "Codeial",
    user: req.user,
  });
};
