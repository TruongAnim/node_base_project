const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

class UserController {
  async getUser(req, res, next) {
    try {
      var user = await User.findById(req.user._id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
  async getUserInfo(req, res, next) {
    try {
      var user = await User.findById(req.body["userId"]);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
  async updateUserInfo(req, res, next) {
    try {
      const { name, description, avatar } = req.body;
      const id = req.user.id;
      var user = await User.findById(id);
      if (name && name.length > 0) {
        user.name = name;
      }
      if (description && description.length > 0) {
        user.description = description;
      }
      if (avatar && avatar.length > 0) {
        user.avatar = avatar;
      }
      await user.save();
      res.status(200).json({
        isSuccess: true,
        message: "Information updated successfully",
        data: {
          name,
          description,
          avatar,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async changePassword(req, res, next) {
    try {
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      var user = await User.findById(req.user._id);
      const isMatch = await bcryptjs.compare(oldPassword, user.password);
      if (isMatch) {
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        user = await user.save();
        return res.json({
          isSuccess: true,
          message: "Password changed successfully",
        });
      } else {
        return res.json({
          isSuccess: false,
          message: "Invalid current password",
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async countPostUpvote(userId) {
    try {
      const result = await Post.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $addFields: {
            upvoteCount: { $size: "$upVotes" },
          },
        },
        {
          $group: {
            _id: "",
            totalUpvotes: { $sum: "$upvoteCount" },
          },
        },
      ]);
      if (result.length > 0) {
        return result[0].totalUpvotes;
      } else {
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }
  async countCommentUpvote(userId) {
    try {
      const result = await Comment.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $addFields: {
            upvoteCount: { $size: "$upVotes" },
          },
        },
        {
          $group: {
            _id: "",
            totalUpvotes: { $sum: "$upvoteCount" },
          },
        },
      ]);
      if (result.length > 0) {
        return result[0].totalUpvotes;
      } else {
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }
  getUserActivity = async (req, res, next) => {
    try {
      const userId = req.body.userId;
      const countPost = await Post.countDocuments({ userId });
      const countComment = await Comment.countDocuments({ userId });
      const postUpvote = await this.countPostUpvote(userId);
      const commentUpvote = await this.countCommentUpvote(userId);
      res.json({ userId, countPost, countComment, postUpvote, commentUpvote });
    } catch (err) {
      next(err);
    }
  };
}
module.exports = new UserController();
