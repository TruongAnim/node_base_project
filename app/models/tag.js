const mongoose = require("mongoose");
const tagScheme = mongoose.Schema({
  name: { type: String, required: true },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  icon: { type: String, required: true },
});
const Tag = mongoose.model("Tag", tagScheme);
module.exports = Tag;
