const { Router } = require("express");
const homePageController = require("../controllers/home-page-controller");
const signupController = require("../controllers/sign-up-controller");
const { loginController } = require("../controllers/log-in-controller");
const logoutController = require("../controllers/log-out-controller");
const messageController = require("../controllers/message-controller");
const deleteMessageController = require("../controllers/delete-message-controller");
const memberPasscodeController = require("../controllers/member-passcode-controller");
const adminPasscodeController = require("../controllers/admin-passcode-controller");

const router = Router();

router.get("/", homePageController);

router.post("/sign-up", signupController);

router.get("/log-in", loginController);

router.post("/message", messageController);

router.get("/message/:id", deleteMessageController);

router.get("/join-club", memberPasscodeController);

router.post("/join-club/member", memberPasscodeController);

router.post("/join-club/admin", adminPasscodeController);

router.get("/log-out", logoutController);

module.exports = router;
