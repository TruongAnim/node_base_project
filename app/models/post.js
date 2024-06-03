const mongoose = require("mongoose");
const postScheme = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  }],
  upVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  }],
  title: { type: String, required: true},
  type: { type: String, required: true},
  mediaLink: { type: String},
  mediaAspectRatio: { type: Number},
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model("Post", postScheme);
module.exports = Post;
