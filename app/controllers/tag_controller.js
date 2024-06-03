const Tag = require("../models/tag");

class TagController {
  async getTags(req, res, next) {
    try {
      var tags = await Tag.find({});
      res.json(tags);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TagController()