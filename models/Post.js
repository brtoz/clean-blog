import mongoose from "mongoose";

//const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const PostSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);
//module.exports = Post;
export default Post;
