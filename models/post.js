const mongoose = require("mongoose");
const internal = require("stream");
const Schema = mongoose.Schema;

const Post = new Schema({
  post_id: {
    type: String,
    default: "",
  },
  author_id: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  difficulty: {
    type: Number,
    default: 0,
  },
  class: {
    type: String,
    default: "",
  },
  likes: {
    type: Number,
    default: 0,
  },
  coordinates: { type: [Number], default: [0, 0] },
});
const POST = mongoose.model("Post", Post, "posts");
module.exports = POST;
