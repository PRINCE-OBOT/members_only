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
    if (req.user.isadmin) {
      req.flash("error", {
        admin: "You are already an admin"
      });

      return res.redirect("/join-club");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", {
        admin: "Admin passcode field must not be empty"
      });

      return res.redirect("/join-club");
    }

    const passcode = matchedData(req).passcode;

    const isPasscodeValid = await query.isPasscodeValid({
      passcode,
      name: "admin"
    });

    const { id, email } = req.user;

    if (isPasscodeValid) {
      await query.updateUser({
        id,
        email,
        isMember: true,
        isAdmin: true
      });
      res.render("index", {
        title: "Club house",
        pageTemplate: "messages"
      });
    } else {
      req.flash("error", {
        admin: "Incorrect admin passcode"
      });

      res.redirect("/join-club");
    }

    // res.redirect("/");
  }
];

module.exports = adminPasscodeController;
