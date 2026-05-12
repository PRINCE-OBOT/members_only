const { Router } = require("express");
const homePageController = require("../controllers/home-page-controller");
const signupController = require("../controllers/sign-up-controller");
const { loginController } = require("../controllers/log-in-controller");
const logoutController = require("../controllers/log-out-controller");
const messageController = require("../controllers/message-controller");
const deleteMessageController = require("../controllers/delete-message-controller");
const memberPasscodeController = require("../controllers/member-passcode-controller");

const router = Router();

router.get("/", homePageController);

router.post("/sign-up", signupController);
 
router.get("/log-in", loginController);

router.post("/message", messageController);

router.get("/message/:id", deleteMessageController);

// router.get("/passcode", memberPasscodeController);

router.post("/passcode/member", memberPasscodeController);

router.post("/passcode/admin", deleteMessageController);

router.get("/log-out", logoutController);

module.exports = router;
