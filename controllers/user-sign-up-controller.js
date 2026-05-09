const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");
const query = require("../db/query");

const alphaErr = "must contain only letters";
const lengthErr = "must be between 1 and 10 characters";

const validateUserSignUp = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").trim().isEmail().withMessage("Enter a valid email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  })
];

const userSignupController = [
  validateUserSignUp,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).render("sign-up", {
      //   title: "Sign Up",
      //   errors: errors.array()
      // });
      res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, isAdmin, password } = matchedData(req);

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(query);
    query.addUser({
      firstName,
      lastName,
      hashedPassword,
      email,
      isAdmin
    });

    res.json({ message: "signup" });
    // res.redirect("/log-in");
  }
];

module.exports = userSignupController;
