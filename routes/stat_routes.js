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

  var numPosts = await post.countDocuments({
    author_id: req.user.microsoft.id,
  });

  // group time spent on study by day
  let timeByDay = await post.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        totalTime: { $sum: "$timeStudying" },
      },
    },
  ]);

  // get total time spent on study for user
  let totalTime = await post.aggregate([
    {
      $match: { author_id: req.user.microsoft.id },
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
      $match: { author_id: req.user.microsoft.id },
    },
    {
      $group: {
        _id: null,
        avgTime: { $avg: "$timeStudying" },
      },
    },
  ]);

  // if any of these are undefined, set them to 0
  timeByDay === undefined ? timeByDay : 0;
  numPosts === undefined ? numPosts : 0;
  totalTime === undefined ? totalTime : [0];
  avgTime === undefined ? avgTime : [0];

  res.status(200).send({
    timeByDay: timeByDay,
    numPosts: numPosts,
    totalTime: totalTime[0].totalTime,
    avgTime: avgTime[0].avgTime,
  });
});

module.exports = router;
