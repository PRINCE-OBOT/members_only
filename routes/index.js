const { Router } = require("express");
const homePageController = require("../controllers/home-page-controller");
const signup = require("../controllers/sign-up-controller");
const { loginController } = require("../controllers/log-in-controller");
const logoutController = require("../controllers/log-out-controller");

const messageController = require("../controllers/message-controller");
const deleteMessageController = require("../controllers/delete-message-controller");

const memberPasscodeController = require("../controllers/member-passcode-controller");
const adminPasscodeController = require("../controllers/admin-passcode-controller");
const joinClubController = require("../controllers/join-club-controller");
const addMessageController = require("../controllers/add-message-controller");

const router = Router();

// get routes

router.get("/", homePageController);

router.get("/sign-up", signup.getController);

router.get("/log-in", loginController);

router.get("/message", addMessageController);

router.get("/join-club", joinClubController);

router.get("/log-out", logoutController);

// post routes
router.post("/sign-up", signup.postController);

router.post("/message", messageController);

router.post("/join-club/member", memberPasscodeController);

router.post("/join-club/admin", adminPasscodeController);

// delete router

router.delete("/message/:id", deleteMessageController);


module.exports = router;
