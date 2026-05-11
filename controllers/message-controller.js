const { body, validationResult, matchedData } = require("express-validator");
const query = require("../db/query");

const validateMessage = [
  body("text"),
  body("title")
    .trim()
    .custom((value, { req }) => {
      if (value === "" && req.body.text.trim("") === "") {
        throw new Error("Either title or text must be filled");
      }
      return true;
    })
];

const messageController = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).render("sign-up", {
      //   title: "Message",
      //   errors: errors.array()
      // });
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text } = matchedData(req);

    query.addMessage({
      userId: req.user.id,
      title,
      text
    });

    res.json({ message: "Message sent" });
    // res.redirect("/");
  }
];

module.exports = messageController;
