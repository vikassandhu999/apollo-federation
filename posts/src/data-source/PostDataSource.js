const Post = require('../models/Post.model');
const Id = require('../utils/Id');

async function createPost(input, authorId) {
  const { title, content } = input;

  const postPayload = {
    id: Id.makeId(),
    authorId,
    title,
    content,
    createdAt: new Date(),
  };
  const post = new Post(postPayload);
  await post.save();
  return post;
}

async function getPostById(id) {
  const foundPost = await Post.findOne({ id });
  if (!foundPost) return null;
  return foundPost;
}

async function getPostsByAuthorId(authorId) {
  const foundPost = await Post.find({ authorId });
  if (!foundPost) return null;
  return foundPost;
}

async function getAllPosts() {
  return Post.find();
}

const postDataSource = Object.freeze({
  createPost,
  getPostById,
  getPostsByAuthorId,
  getAllPosts,
});

module.exports = postDataSource;
