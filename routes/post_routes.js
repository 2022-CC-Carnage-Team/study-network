const express = require("express");
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const recordRoutes = express.Router();
const post = require('../models/post');


recordRoutes.route("/posts").get(async function(req, res) {
    const filter = {};
    const all = await post.find(filter);
    all.toArray(function(err, result) {
        if(err) {
            res.status(400).send("Error fetching posts");
        } else {
            res.json(result);
        }
    });
});
recordRoutes.route("/posts/upload").post(function (req, res) {
    const doc = {
        id: uuidv4(),
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
                res.status(400).send("Error uploading new post");
            } else {
                console.log(`Added a new post with id  ${doc.id}`);
                res.status(204).send();
            }
         });
    //post.create(doc);
});

module.exports = recordRoutes;