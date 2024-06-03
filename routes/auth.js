const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/auth_controller");
const auth_passport = require("../middlewares/auth_passport");

router.post("/login", authController.login);
router.post("/signup", authController.signup);

module.exports = router;
