const query = require("../db/query");

const deleteMessageController = async (req, res) => {
  if (!req.user.isadmin)
    return res.status(401).json({ message: "Only admin can delete message" });

  const id = Number(req.params.id);

  query.deleteMessage(id);

  res.redirect("/");
};

module.exports = deleteMessageController;
