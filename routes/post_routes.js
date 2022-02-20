const express = require("express");
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const recordRoutes = express.Router();
const post = require('../models/post');

/* Broken
recordRoutes.route("/").get(async function(req, res) {
    const filter = {};
    const all = await post.find(filter);
    all.toString(function(err, result) {
    //all.toArray(function(err, result) {
        if(err) {
            res.status(400).send("Error fetching posts");
        } else {
            res.status(200).send(json(result));
        }
    });
});
*/
recordRoutes.route("/upload").post(function (req, res) {
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
                console.log("Error uploading new post");
                res.status(400).send("Error uploading new post");
            } else {
                console.log(`Added a new post with id  ${doc.id}`);
                res.status(204).send(`Added a new post with id  ${doc.id}`);
            }
         });
    //post.create(doc);
});

module.exports = recordRoutes;