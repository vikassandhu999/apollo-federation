const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: {
      unique: true,
    },
  },
  authorId: {
    type: String,
    required: true,
    unique: true,
    index: {
      unique: true,
    },
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
