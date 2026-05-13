const { body, validationResult, matchedData } = require("express-validator");
const query = require("../db/query");

const validatePasscode = [
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage("Member passcode must not be empty")
];

const memberPasscodeController = [
  validatePasscode,
  async (req, res) => {
    
    if (req.user.ismember) {
      req.flash("error", {
        member: "You are already a member"
      });

      return res.redirect("/join-club");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", {
        member: "Member passcode field must not be empty"
      });

      return res.redirect("/join-club");
    }

    const passcode = matchedData(req).passcode;

    const isPasscodeValid = await query.isPasscodeValid({
      passcode,
      name: "member"
    });

    const { id, email } = req.user;

    if (isPasscodeValid) {
      await query.updateUser({
        id,
        email,
        isMember: true
      });

      return res.redirect("/");
    } else {
      req.flash("error", {
        member: "Incorrect member passcode"
      });

      res.redirect("/join-club");
    }
  }
];

module.exports = memberPasscodeController;
