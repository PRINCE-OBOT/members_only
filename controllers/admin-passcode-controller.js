const { body, validationResult, matchedData } = require("express-validator");
const query = require("../db/query");

const validatePasscode = [
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage("Member passcode must not be empty")
];

const adminPasscodeController = [
  validatePasscode,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).render("sign-up", {
      //   title: "Message",
      //   errors: errors.array()
      // });
      return res.status(400).json({ errors: errors.array() });
    }

    const passcode = matchedData(req).passcode;

    const isPasscodeValid = await query.isPasscodeValid({
      passcode,
      name: "admin"
    });

    if (isPasscodeValid) {
      res.json({ message: "Valid" });
    } else {
      res.json({ message: "inValid" });
    }

    // res.redirect("/");
  }
];

module.exports = adminPasscodeController;
