const express = require("express");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const router = express.Router();
const post = require("../models/post");
const user = require("../models/user");

// ensure auth
const { ensureAuth } = require("../authenticate");

router.get("/global", async (req, res) => {
  // get number of posts
  let numPosts = await post.countDocuments();
  // get number of users
  let numUsers = await user.countDocuments();
  // get total time spent on study
  let totalTime = await post.aggregate([
    {
      $group: {
        _id: null,
        totalTime: { $sum: "$timeStudying" },
      },
    },
  ]);
  // get average time spent on study
  let avgTime = await post.aggregate([
    {
      $group: {
        _id: null,
        avgTime: { $avg: "$timeStudying" },
      },
    },
  ]);

  res.status(200).send({
    numPosts: numPosts,
    numUsers: numUsers,
    totalTime: totalTime[0].totalTime,
    avgTime: avgTime[0].avgTime,
  });
});

router.get("/user", ensureAuth, async (req, res) => {
  // get number of posts
  let numPosts = await post.countDocuments({ author_id: req.user.google.id });
  // get total time spent on study for user
  let totalTime = await post.aggregate([
    {
      $match: { author_id: req.user.google.id },
    },
    {
      $group: {
        _id: null,
        totalTime: { $sum: "$timeStudying" },
      },
    },
  ]);
  // get average time spent on study for user
  let avgTime = await post.aggregate([
    {
      $match: { author_id: req.user.google.id },
    },
    {
      $group: {
        _id: null,
        avgTime: { $avg: "$timeStudying" },
      },
    },
  ]);

  res.status(200).send({
    numPosts: numPosts,
    totalTime: totalTime[0].totalTime,
    avgTime: avgTime[0].avgTime,
  });
});

module.exports = router;
