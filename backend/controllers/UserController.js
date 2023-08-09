const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const cloudinary = require("cloudinary");

module.exports.getAllUser = async (request, response) => {
  const users = await User.find(
    request.query.username === "" || !request.query.username
      ? {}
      : {
          username: { $regex: request.query.username, $options: "i" },
        }
  )
    .populate({
      path: "posts",
      populate: {
        path: "user",
      },
    })
    .skip(request.query.skip)
    .limit(request.query.limit);

  response.json(users);
};

module.exports.getUserByUsername = async (request, response) => {
  console.log(request.params.username);
  const user = await User.findOne({
    username: request.params.username,
  });

  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
};

module.exports.createUser = async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "This username is already taken",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
};

module.exports.updateUser = async (request, response) => {
  const { username, name, bio } = request.body;

  const existingUser = await User.findOne({ username: username });

  if (existingUser && existingUser.id !== request.params.id) {
    return response.status(400).json({
      error: "This username is already taken",
    });
  }

  const profile = {
    username,
    name,
    bio,
  };

  const updatedProfile = await User.findByIdAndUpdate(
    request.params.id,
    profile,
    { new: true, runValidators: true }
  );
  response.json(updatedProfile);
};

module.exports.updateProfileImage = async (request, response) => {
  const existingUser = await User.findById(request.params.id);

  if (!existingUser) {
    return response.status(400).json({
      error: "Username not found",
    });
  }

  const res = await cloudinary.v2.uploader.upload(request.file.path, {
    folder: "ProfilePicture",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  });

  const updatedProfile = await User.findByIdAndUpdate(
    request.params.id,
    { profileImage: res.secure_url, cloudinary_id: res.public_id },
    { new: true, runValidators: true }
  );

  response.json(updatedProfile);
};

module.exports.deleteProfileImage = async (request, response) => {
  const existingUser = await User.findById(request.params.id);

  if (!existingUser) {
    return response.status(400).json({
      error: "Username not found",
    });
  }
  await cloudinary.v2.uploader.destroy(existingUser.cloudinary_id);

  const updatedProfile = await User.findByIdAndUpdate(
    request.params.id,
    { profileImage: "", cloudinary_id: "" },
    { new: true, runValidators: true }
  );

  response.json(updatedProfile);
};

module.exports.addCloseFriend = async (request, response) => {
  const { closeFriend } = request.body;

  const user = await User.findById(closeFriend);
  const currentUser = request.user;

  if (currentUser.id !== request.params.id) {
    return response.status(401).json({
      error: "Unauthorized",
    });
  }

  const updatedProfile = await User.findByIdAndUpdate(request.params.id, {
    $push: { closeFriends: user._id },
    new: true,
  });

  response.json(updatedProfile);
};

module.exports.removeCloseFriend = async (request, response) => {
  const { closeFriend } = request.body;

  const user = await User.findById(closeFriend);
  const currentUser = request.user;

  if (currentUser.id !== request.params.id) {
    return response.status(401).json({
      error: "Unauthorized",
    });
  }

  const updatedProfile = await User.findByIdAndUpdate(request.params.id, {
    $pull: { closeFriends: user._id },
  });

  response.json(updatedProfile);
};
