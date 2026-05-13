const { format } = require('date-fns') 

const query = require("../db/query");

const homePageController = async (req, res) => {
  const rows = await query.getMessages();

  const user = req.user;

  res.render("index", {
    title: "Club house",
    pageTemplate: "messages",
    user,
    rows,
    format
  });
};

module.exports = homePageController;
