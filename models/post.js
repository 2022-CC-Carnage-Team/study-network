const mongoose = require("mongoose");
const internal = require("stream");
const Schema = mongoose.Schema;
var db = require('../db/conn');

let post = new Schema({
    id: String,
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    createdAt: Date,
    updatedAt: Date,
    likes: Number,
    coordinates: {type: [Number], default: [0, 0]}
});
const POST = mongoose.model('post', post);
module.exports = POST
