const mongoose = require("mongoose");
const userScheme = mongoose.Schema({
  name: { type: String, required: true, default: "username" },
  email: {
    type: String,
    required: true,
    min: 10,
    trim: true,
    validate: {
      validator: (value) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return value.match(re);
      },
      message: "Invalid email",
    },
  },
  avatar: { type: String, required: true,  default: "/images/default_avt.png" },
  description: { type: String, default: "None" },
  password: { type: String, required: true, min: 6, trim: true },
});

const User = mongoose.model("User", userScheme);
module.exports = User;