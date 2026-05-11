const { Router } = require("express");
const homePageController = require("../controllers/home-page-controller");
const signupController = require("../controllers/sign-up-controller");
const { loginController } = require("../controllers/log-in-controller");
const logoutController = require("../controllers/log-out-controller");
const messageController = require("../controllers/message-controller");

const router = Router();

router.get("/", homePageController);

router.post("/sign-up", signupController);

router.get("/log-in", loginController);

router.post("/message", messageController);

router.get("/log-out", logoutController);

module.exports = router;
