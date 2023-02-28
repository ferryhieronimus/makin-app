const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 15
  },
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  bio: {
    type: String,
    default: "No bio",
    maxlength: 160
  },
  posts: [
    {
      type: mongoose.ObjectId,
      ref: 'Post'
    }
  ],
  closeFriends: [
    {
      type: mongoose.ObjectId,
      ref: 'User'
    }
  ],
  passwordHash: String,
  profileImage: {
    type: String,
    default: "",
  },
  cloudinary_id: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)