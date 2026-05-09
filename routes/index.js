const { Router } = require("express");
const signupController = require("../controllers/sign-up-controller");
const passport = require("passport");
const loginController = require("../controllers/log-in-controller");
const router = Router();
const LocalStrategy = require("passport-local").Strategy;

router.post("/sign-up", signupController);

passport.use(loginController.localStrategy());

router.get("/log-in", (req, res) => {
  res.json({ message: "Log in page" });
});

router.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ user: req.user });
});

module.exports = router;
