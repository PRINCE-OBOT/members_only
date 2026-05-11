const { body, validationResult, matchedData } = require("express-validator");
const query = require("../db/query");

const validateMessage = [
  body("message").trim().notEmpty().withMessage("Must not be empty")
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

    const { message } = matchedData(req);

    console.log(req.user);
    // query.addMessage({
    //   message
    // });

    res.json({ message: "Message sent" });
    // res.redirect("/");
  }
];

module.exports = messageController;
