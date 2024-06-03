const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return next(Error(`User <${email}> dose not exist!`));
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return next(Error("Incorrect password!"));
      }
      const token = jwt.sign({ id: user._id }, "passwordKey");
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        description: user.description,
        avatar: user.avatar,
        token,
      });
    } catch (err) {
      next(err);
    }
  }
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;
      console.log({ name, email, password });
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(Error(`Email <${email}> has been used!`));
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      var user = new User({ name, email, password: hashedPassword });
      user = await user.save();
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new AuthController();
