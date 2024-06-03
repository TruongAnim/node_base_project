const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

class CommentController {
  async newComment(req, res, next) {
    try {
      const { userId, content, mediaLink, type, mediaAspectRatio, postId } =
        req.body;
      console.log({
        userId,
        content,
        mediaLink,
        type,
        mediaAspectRatio,
        postId,
      });
      var comment = new Comment({ userId, content, mediaLink, type, mediaAspectRatio });
      comment = await comment.save();
      var post = await Post.findById(postId);
      post.comments.push(comment.id);
      post = await post.save();
      res.json(comment);
    } catch (err) {
      next(err);
    }
  }

  async newReply(req, res, next) {
    try {
      const { userId, content, mediaLink, type, commentId } = req.body;
      console.log({ userId, content, mediaLink, type });
      var comment = new Comment({ userId, content, mediaLink, type });
      comment = await comment.save();
      var post = await Comment.findById(commentId);
      post.comments.push(comment.id);
      post = await post.save();
      res.json(comment);
    } catch (err) {
      next(err);
    }
  }

  async getComment(req, res, next) {
    try {
      const { postId } = req.body;
      const post = await Post.findById(postId);
      const commentIds = post.comments;
      const comments = await Comment.find({
        _id: { $in: commentIds },
      }).populate("userId");
      res.json(comments);
    } catch (err) {
      next(err);
    }
  }

  async getReply(req, res, next) {
    try {
      const { commentId } = req.body;
      const comment = await Comment.findById(commentId);
      const commentIds = comment.comments;
      const comments = await Comment.find({
        _id: { $in: commentIds },
      }).populate("userId");
      res.json(comments);
    } catch (err) {
      next(err);
    }
  }
  async upvote(req, res, next) {
    try {
      const commentId = req.body["commentId"];
      const userId = req.body["userId"];
      const isUpvote = req.body["isUpvote"];
      var comment = await Comment.findById(commentId);
      if (isUpvote) {
        const indexToAdd = comment.upVotes.indexOf(userId);
        if (indexToAdd == -1) {
          comment.upVotes.push(userId);
        }
      } else {
        const indexToRemove = comment.upVotes.indexOf(userId);
        if (indexToRemove > -1) {
          comment.upVotes.splice(indexToRemove, 1);
        }
      }
      comment = await comment.save();
      res.json(comment);
    } catch (err) {
      next(err);
    }
  }
  async favourite(req, res, next) {
    try {
      const commentId = req.body["commentId"];
      const userId = req.body["userId"];
      const isFavourite = req.body["isFavourite"];
      var comment = await Comment.findById(commentId);
      if (isFavourite) {
        const indexToAdd = comment.favourites.indexOf(userId);
        if (indexToAdd == -1) {
          comment.favourites.push(userId);
        }
      } else {
        const indexToRemove = comment.favourites.indexOf(userId);
        if (indexToRemove > -1) {
          comment.favourites.splice(indexToRemove, 1);
        }
      }
      comment = await comment.save();
      res.json(comment);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
module.exports = new CommentController();
