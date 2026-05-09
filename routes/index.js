const { Router } = require("express");
const userSignupController = require("../controllers/user-sign-up-controller");
const router = Router();

router.post("/sign-up", userSignupController);

module.exports = router;
