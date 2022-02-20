const express = require("express");
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const recordRoutes = express.Router();
const post = require('../models/post');

recordRoutes.route("/").get(function(req, res) {
    post.findOne().sort({createdAt : -1}).limit(5).exec(function(err, posts) {
        if(err) {
            res.status(400).send("Error retrieving posts");
        } else {
            res.status(200).send(posts)
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
        // need to implement test cases for if wrong format is inputted to prevent DB issues
    }
    post.create(doc, function (error, result) 
         {
            if(error) {
                console.log("Error uploading new post");
                res.status(400).send("Error uploading new post");
            } else {
                console.log(`Added a new post with id  ${doc.id}`);
                res.status(204).send(`Added a new post with id  ${doc.id}`);
            }
         });
});

// untested - not sure this works
recordRoutes.route("/changelike").post(function (req, res) {
    // 1 to add like, 0 to remove like
    post.findOne({post_id: req.body.post_id, author_id: req.body.author_id}, function(err, modPost) {
        if(req.body.changeLike == 1) {
            modPost.likes += 1;
            modPost.save(function(err) {
            });
            res.status(204).send(`Added a like to post`)
        } else if(req.body.changeLike == 0) {
            modPost.likes -= 1;
            modPost.save(function(err) {
            });
            res.status(204).send(`Removed a like from post`)
        } else {
            res.status(400).send(`Failed to change like on post with id`);
        }
    });
});
// untested - not sure this works
recordRoutes.route("/delete").post(function (req, res) {
    /*
    const filter = {
        post_id = req.body.post_id,
        author_id = req.body.author_id,
    };
    */
    post.deleteOne({post_id: req.body.post_id}, function(err, delPost) {});
});

module.exports = recordRoutes;