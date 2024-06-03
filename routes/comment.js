const express = require("express");
const router = express.Router();
const auth_passport = require("../middlewares/auth_passport");
const commentController = require("../app/controllers/comment_controller");

router.post("/new-comment", commentController.newComment);
router.post("/new-reply", commentController.newReply);
router.post("/get-comment", commentController.getComment);
router.post("/get-reply", commentController.getReply);
router.post("/upvote", commentController.upvote);
router.post("/favourite", commentController.favourite);

module.exports = router;
