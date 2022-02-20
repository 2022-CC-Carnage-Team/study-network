const express = require("express");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const recordRoutes = express.Router();
const post = require("../models/post");
const user = require("../models/user");

recordRoutes.route("/").get(function (req, res) {
  post
    .find()
    .sort({ createdAt: -1 })
    .limit(5)
    .exec(async function (err, posts) {
      if (err) {
        res.status(400).send("Error retrieving posts");
      } else {
        // loop through posts and get the user data for each post
        let postArr = [];
        for (let post of posts) {
          let resUser = await user.findOne({ "google.id": post.author_id });
          postArr.push({
            post: post,
            author: resUser,
          });
        }

        res.status(200).send(postArr);
      }
    });
});

recordRoutes.route("/fetch").post(function (req, res) {
  post.findOne({ post_id: req.body.post_id }, function (err, findPost) {
    if (err) {
      res.status(400).send(`Error finding post`);
    } else {
      let userComplete = {};
      user.findOne(
        { google: { id: findPost.author_id } },
        function (err, user) {
          if (err) {
            userComplete = { post: findPost, author: null };
          } else {
            userComplete = { post: findPost, author: user };
          }
        }
      );
      res.status(200).send(userComplete);
    }
  });
});

recordRoutes.route("/upload").post(function (req, res) {
  const doc = {
    post_id: uuidv4(),
    author_id: req.body.author_id,
    title: req.body.title,
    description: req.body.description,
    // times will need to be converted from string to date?
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    likes: req.body.likes,
    coordinates: req.body.coordinates,
    timeStudying: req.body.timeStudying,
    // need to implement test cases for if wrong format is inputted to prevent DB issues
  };
  post.create(doc, function (error, result) {
    if (error) {
      console.log("Error uploading new post");
      res.status(400).send("Error uploading new post");
    } else {
      //console.log(`Added a new post with id  ${doc.id}`);
      console.log(`likes  ${doc.likes}`);
      console.log(`post_id ${doc.post_id}`);
      console.log(`author_d ${doc.author_id}`);
      console.log(`coordinates ${doc.coordinates}`);
      console.log(`time on assignment: ${doc.timeStudying}`);
      res.status(204).send(`Added a new post with id  ${doc.id}`);
    }
  });
});

recordRoutes.route("/changelike").post(function (req, res) {
  // 1 to add like, 0 to remove like
  post.findOne(
    { post_id: req.body.post_id, author_id: req.body.author_id },
    function (err, modPost) {
      if (req.body.change_like == 1) {
        modPost.likes += 1;
        modPost.save(function (err) {});
        console.log(
          `Failed to change like on post with id ${req.body.post_id}`
        );
        res.status(204).send(`Added a like to post ${req.body.post_id}`);
      } else if (req.body.change_like == 0) {
        modPost.likes -= 1;
        modPost.save(function (err) {});
        console.log(
          `Failed to change like on post with id ${req.body.post_id}`
        );
        res.status(204).send(`Removed a like from post ${req.body.post_id}`);
      } else {
        console.log(
          `Failed to change like on post with id ${req.body.post_id}`
        );
        res
          .status(400)
          .send(`Failed to change like on post with id ${req.body.post_id}`);
      }
    }
  );
});
recordRoutes.route("/delete").post(function (req, res) {
  /*
    const filter = {
        post_id = req.body.post_id,
        author_id = req.body.author_id,
    };
    */
  post.deleteOne({ post_id: req.body.post_id }, function (err, delPost) {
    if (err) {
      res.status(400).send(`Error deleting post`);
    } else {
      res.status(200).send(delPost);
    }
  });
});
recordRoutes.route("/time_studying").get(function (req, res) {
    var totalAssignmentTime = 0;
    post
    .find()
    .exec(async function (err, posts) {
      if (err) {
        res.status(400).send("Error retrieving posts");
      } else {
        // loop through posts and get the user data for each post
        let postArr = [];
        for (let post of posts) {
            // need error checking here for when this field DNE
            totalAssignmentTime += post.timeStudying;
        }
        console.log(`total Assignment time: ${totalAssignmentTime}`);
        res.status(200).send();
      }
    });
})

module.exports = recordRoutes;
