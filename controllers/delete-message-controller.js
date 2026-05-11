const query = require("../db/query");

const deleteMessageController = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(401).json({ message: "Only admin can delete message" });

  const id = req.params.id;

  query.deleteMessage({ id });

  res.json({ message: "Message deleted" });
  // res.redirect("/");
};

module.exports = deleteMessageController;
