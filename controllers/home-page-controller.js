const { format } = require('date-fns') 

const query = require("../db/query");

const homePageController = async (req, res) => {
  const rows = await query.getMessages();

  const user = req.user;

  const userIs = user.isadmin ? "admin" : user.ismember ? "member" : "visitor";

  res.render("index", {
    title: "Club house",
    pageTemplate: "messages",
    userIs,
    rows,
    format
  });
};

module.exports = homePageController;
