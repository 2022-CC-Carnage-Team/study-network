const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: String,
    default: "",
    unique: false,
  },
  lastName: {
    type: String,
    default: "",
    unique: false,
  },
  authStrategy: {
    type: String,
    default: "microsoft",
    unique: false,
  },
  microsoft: {
    email: {
      type: String,
      unique: false,
      required: true,
    },
    id: {
      type: String,
      default: "",
      index: true,
      required: true,
    },
    token: {
      type: String,
      unique: false,
      required: false,
    },
    refreshToken: String,
    profilePic: String,
  },
  likedPosts: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", User, "users");
