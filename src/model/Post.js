// models/Post.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  datePublished: {
    type: Date,
    required: true
  },
  dateModified: {
    type: Date
  },
  image: {
    url: {
      type: String,
      required: true
    },
    width: Number,
    height: Number
  },
  author: {
    name: String,
    url: String,
    image: {
      url: String,
      height: Number,
      width: Number
    }
  }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
