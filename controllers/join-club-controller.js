const query = require("../db/query");

const joinClubController = async (req, res) => {
  const user = req.user;

  const userIs = user.isadmin ? "admin" : user.ismember ? "member" : "visitor";

  res.render("index", {
    title: "Join club",
    pageTemplate: "join-club",
    userIs,
    error: req.flash("error")[0] || {}
  });
};

module.exports = joinClubController;
