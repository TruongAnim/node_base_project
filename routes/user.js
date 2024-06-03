const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/user_controller");
const auth_passport = require("../middlewares/auth_passport");

router.post("/get-user-info", auth_passport, userController.getUserInfo);
router.post("/get-user", auth_passport, userController.getUser);
router.post("/update-user-info", auth_passport, userController.updateUserInfo);
router.post("/change-password", auth_passport, userController.changePassword);
router.post("/get-user-activity", userController.getUserActivity);

module.exports = router;
