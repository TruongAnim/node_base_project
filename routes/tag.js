const express = require("express");
const router = express.Router();
const auth_passport = require("../middlewares/auth_passport");
const tagController = require("../app/controllers/tag_controller");

/* GET users listing. */
router.get("/get-tags", tagController.getTags);

module.exports = router;
