const postRouter = require("express").Router();
const PostController = require("../controllers/PostController");
const { authorization } = require("../middleware/middleware");

postRouter.get("/", PostController.getPost);

postRouter.get("/:id", PostController.getPostByUserID);

postRouter.post("/", authorization, PostController.createPost);

postRouter.delete("/:id", authorization, PostController.deletePost);

postRouter.put("/:id", authorization, PostController.updatePost);

module.exports = postRouter;
