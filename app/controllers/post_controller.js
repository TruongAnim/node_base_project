const Post = require("../models/post");
const Tag = require("../models/tag");

class PostController {
  async newPost(req, res, next) {
    try {
      const { tags, title, type, mediaLink, mediaAspectRatio } = req.body;
      var post = new Post({
        userId: req.user.id,
        tags,
        title,
        type,
        mediaLink,
        mediaAspectRatio,
      });
      for (var i in tags) {
        var tag = await Tag.findById(tags[i]);
        tag.posts.push(post.id);
        await tag.save();
      }
      post = await post.save();
      res.json(post);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async paginatePost(req, res, next) {
    try {
      const tags = req.query.tags;
      const page = req.query.page ?? 0;
      const limit = req.query.limit ?? 10;
      console.log("paginate post: ", tags, page, limit);
      const query = tags === undefined || tags.length == 0 ? {} : { tags: { $in: tags } };
      const posts = await Post.find(query)
        .skip(page * limit)
        .limit(limit)
        .populate("userId")
        .sort({ createdAt: -1 }); // -1 for descending order, 1 for ascending order
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
  async getPostById(req, res, next) {
    try {
      const id = req.params.id;
      console.log("get post by id: ", id)
      const posts = await Post.findById(id)
        .populate("userId")
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
  async getPost(req, res, next) {
    try {
      const tags = req.query.tags;
      console.log("get post: ", req.query);
      const query = tags === undefined || tags.length == 0 ? {} : { tags: { $in: tags } };
      const posts = await Post.find(query)
        .populate("userId")
        .sort({ createdAt: -1 }); // -1 for descending order, 1 for ascending order
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
  async getUserPost(req, res, next) {
    try {
      const userId = req.body.userId;
      console.log(req.body)
      const posts = await Post.find({ userId: userId })
        .populate("userId")
        .sort({ createdAt: -1 }); // -1 for descending order, 1 for ascending order
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
  async getUpvotePost(req, res, next) {
    try {
      const userId = req.body.userId;
      const posts = await Post.find({ upVotes: { $in: [userId] } })
        .populate("userId")
        .sort({ createdAt: -1 }); // -1 for descending order, 1 for ascending order
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
  async getFavouritePost(req, res, next) {
    try {
      const userId = req.body.userId;
      const posts = await Post.find({ favourites: { $in: [userId] } })
        .populate("userId")
        .sort({ createdAt: -1 }); // -1 for descending order, 1 for ascending order
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
  async upvote(req, res, next) {
    try {
      const postId = req.body["postId"];
      const userId = req.body["userId"];
      const isUpvote = req.body["isUpvote"];
      var post = await Post.findById(postId);
      if (isUpvote) {
        const indexToAdd = post.upVotes.indexOf(userId);
        if (indexToAdd == -1) {
          post.upVotes.push(userId);
        }
      } else {
        const indexToRemove = post.upVotes.indexOf(userId);
        if (indexToRemove > -1) {
          post.upVotes.splice(indexToRemove, 1);
        }
      }
      post = await post.save();
      res.json(post);
    } catch (err) {
      next(err);
    }
  }
  async favourite(req, res, next) {
    try {
      const postId = req.body["postId"];
      const userId = req.body["userId"];
      const isFavourite = req.body["isFavourite"];
      var post = await Post.findById(postId);
      if (isFavourite) {
        const indexToAdd = post.favourites.indexOf(userId);
        if (indexToAdd == -1) {
          post.favourites.push(userId);
        }
      } else {
        const indexToRemove = post.favourites.indexOf(userId);
        if (indexToRemove > -1) {
          post.favourites.splice(indexToRemove, 1);
        }
      }
      post = await post.save();
      res.json(post);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
module.exports = new PostController();
