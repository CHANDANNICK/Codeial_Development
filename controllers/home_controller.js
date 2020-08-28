//module.exports.actionName = function(req,res){};

module.exports.home = function (req, res) {
  return res.send("<h1>Express is up and Running</h1>");
};
