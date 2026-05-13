const query = require("../db/query");

const homePageController = async (req, res) => {
  const rows = await query.getUsers();

  res.render("index", {
    title: "Home page",
    pageTemplate: "messages",
    rows
  });
};

module.exports = homePageController;
