const Post = require("../models/PostModel");
const User = require("../models/UserModel");

module.exports.getPost = async (request, response) => {
  const posts = await Post.find({})
    .populate("user")
    .sort({ createdAt: -1 })
    .skip(request.query.skip)
    .limit(request.query.limit);

  response.json(posts);
};

module.exports.getPostByUserID = async (request, response) => {
  const posts = await Post.find({
    user: request.params.id,
  })
    .populate("user")
    .sort({ createdAt: -1 })
    .skip(request.query.skip)
    .limit(request.query.limit);

  response.json(posts);
};

module.exports.createPost = async (request, response) => {
  const user = request.user;

  const post = new Post({
    content: request.body.content,
    isCloseFriend: request.body.isCloseFriend,
    user: user._id,
  });

  const savedPost = await post.save();
  user.posts = user.posts.concat(savedPost._id);
  await user.save();

  const newPost = await Post.findById(savedPost.id).populate("user");

  response.json(newPost);
};

module.exports.deletePost = async (request, response) => {
  const deletedObject = await Post.findByIdAndRemove(request.params.id);
  await User.findByIdAndUpdate(request.user.id, {
    $pull: { posts: request.params.id },
  });

  response.json(deletedObject);
};

module.exports.updatePost = async (request, response) => {
  const post = {
    content: request.body.content,
  };

  const updatedPost = await Post.findByIdAndUpdate(request.params.id, post, {
    new: true,
  });
  response.json(updatedPost);
};
