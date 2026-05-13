const addMessageController = async (req, res) => {
  const user = req.user;

  res.render("index", {
    title: "Add message",
    pageTemplate: "add-message",
  });
};

module.exports = addMessageController;
