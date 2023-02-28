const usersRouter = require("express").Router();
const UserController = require("../controllers/UserController");
const { authorization } = require("../middleware/middleware");
const upload = require("../middleware/multer");
require("../utils/cloudinary.config");

usersRouter.get("/", UserController.getAllUser);

usersRouter.get("/:username", UserController.getUserByUsername);

usersRouter.post("/", UserController.createUser);

usersRouter.put("/:id", authorization, UserController.updateUser);

usersRouter.put(
  "/image/:id",
  upload.single("image"),
  UserController.updateProfileImage
);

usersRouter.delete(
  "/image/:id",
  upload.single("image"),
  UserController.deleteProfileImage
);

usersRouter.put(
  "/addclosefriend/:id",
  authorization,
  UserController.addCloseFriend
);

usersRouter.put(
  "/removeclosefriend/:id",
  authorization,
  UserController.removeCloseFriend
);

module.exports = usersRouter;
