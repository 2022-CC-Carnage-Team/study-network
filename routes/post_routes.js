const express = require("express");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

const { processUser } = require("../utility.js");

// ensure auth
const { ensureAuth, ensureAuthNoRedirect } = require("../authenticate");

// check if post is liked by user
async function isLikedByUser(postId, userId) {
  // check if post id is in the user's liked posts
  let likedPosts = await User.findOne({ "microsoft.id": userId }).select(
    "likedPosts"
  );

  // if liked posts contains post id, return true
  if (likedPosts.likedPosts.includes(postId)) {
    return true;
  } else {
    return false;
  }
}

router.route("/numPages").get((req, res) => {
  // get q search parameter
  let q = req.query.q;

  // search database for posts with title or content containing q if q is not empty
  if (!q || q === null || q === "") {
    q = "";
  }

  Post.find({ title: { $regex: q, $options: "mi" } }).exec(async function (
    err,
    posts
  ) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      // get number of posts returned by search
      let numPosts = posts.length;

      // return number of pages
      res.status(200).send({ numPages: parseInt(numPosts / 5) + 1 });
    }
  });
});

router.route("/").get(function (req, res) {
  // get q search parameter
  let q = req.query.q;

  // get page
  let page = req.query.page;

  if (!page) {
    page = 1;
  }

  // check if we're getting a user's posts
  let userid = req.query.user;

  let userMatch = {};
  if (userid !== "false") {
    userMatch = { author_id: userid };
  }

  // search database for posts with title or content containing q if q is not empty
  if (!q || q === null || q === "") {
    q = "";
  }

  Post.find({ title: { $regex: q, $options: "mi" }, ...userMatch })
    .sort({ createdAt: -1 })
    .skip((page - 1) * 5)
    .limit(5)
    .exec(async function (err, posts) {
      if (err) {
        res.status(400).send("Error retrieving posts");
      } else {
        // loop through posts and get the user data for each post
        let postArr = [];
        for (let post of posts) {
          let resUser = await User.findOne({
            "microsoft.id": post.author_id,
          });
          let liked = false;
          if (ensureAuthNoRedirect(req)) {
            liked = await isLikedByUser(post.post_id, req.user.microsoft.id);
          }
          if (resUser) {
            resUser = processUser(resUser);
            postArr.push({
              post: post,
              author: resUser,
              liked: liked,
            });
          } else {
            postArr.push({
              post: post,
              author: null,
              liked: liked,
            });
          }
        }

        res.status(200).send(postArr);
      }
    });
});

router.route("/fetch").post(function (req, res) {
  Post.findOne({ post_id: req.body.post_id }, async function (err, findPost) {
    if (err) {
      res.status(400).send(`Error finding post`);
    } else {
      let userComplete = {};
      let liked = false;
      if (req.user && ensureAuthNoRedirect(req)) {
        liked = await isLikedByUser(findPost.post_id, req.user.microsoft.id);
      }
      let user = await User.findOne({ "microsoft.id": findPost.author_id });
      if (!user) {
        userComplete = { post: findPost, author: null };
        res.status(500);
      } else {
        user = processUser(user);
        userComplete = { post: findPost, author: user, liked: liked };
      }
      res.status(200).send(userComplete);
    }
  });
});

router.route("/upload").post(ensureAuth, function (req, res) {
  const doc = {
    post_id: uuidv4(),
    author_id: req.user.microsoft.id,
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
    difficulty: req.body.difficulty,
    class: req.body.class,
    postType: req.body.postType,
    // need to implement test cases for if wrong format is inputted to prevent DB issues
  };
  Post.create(doc, function (error, result) {
    if (error) {
      console.log("Error uploading new post");
      res.status(400).send("Error uploading new post");
    } else {
      //console.log(`Added a new post with id  ${doc.id}`);
      res.status(204).send(`Added a new post with id  ${doc.id}`);
    }
  });
});

router.route("/changelike").post(ensureAuth, function (req, res) {
  // find post in a user's likedPosts array, if it exists, remove it, if not, add it
  User.findOne({ "microsoft.id": req.user.microsoft.id }, function (err, user) {
    if (err) {
      res.status(400).send("Error finding user");
    } else {
      // check if post id exists in user's likedPosts array
      let index = user.likedPosts.indexOf(req.body.post_id);
      if (index > -1) {
        user.likedPosts.splice(index, 1);
        // remove like from post
        Post.findOneAndUpdate(
          { post_id: req.body.post_id },
          { $inc: { likes: -1 } },
          function (err, post) {
            if (err) {
              res.status(400).send("Error updating post");
            }
          }
        );
      } else {
        user.likedPosts.push(req.body.post_id);
        // add like to post
        Post.findOneAndUpdate(
          { post_id: req.body.post_id },
          { $inc: { likes: 1 } },
          function (err, post) {
            if (err) {
              res.status(400).send("Error updating post");
            }
          }
        );
      }
      user.save(function (err, result) {
        if (err) {
          res.status(400).send("Error saving user");
        }
      });

      res.status(204).send("Success");
    }
  });
});
router.route("/delete").post(ensureAuth, function (req, res) {
  Post.findOne({ post_id: req.body.post_id }, function (err, modPost) {
    if (!err) {
      if (modPost.author_id == req.user.microsoft.id) {
        Post.deleteOne({ post_id: req.body.post_id }, function (err, delPost) {
          if (err) {
            res.status(400).send(`Error deleting post`);
          } else {
            res.status(200).send(delPost);
          }
        });
      } else {
        res.status(400).send(`You are not the author of this post`);
      }
    }
  });
});
router.route("/time_studying").get(function (req, res) {
  var totalAssignmentTime = 0;
  Post.find().exec(async function (err, posts) {
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
      res.status(200).send(totalAssignmentTime);
    }
  });
});

module.exports = router;
