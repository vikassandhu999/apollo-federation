/* eslint no-unused-vars: ["off", {"args": "after-used"}] */
/*
  adejareemma@gmail.com
 */
const postDataSource = require('./data-source/PostDataSource');

const resolvers = {
  Post: {
    author: (post) => ({
      __typename: 'User',
      id: post.authorId,
    }),
  },
  User: {
    posts: async (user) => postDataSource.getPostsByAuthorId(user.id),
  },
  Query: {
    post: async (_, { id }) => postDataSource.getPostById(id),
    posts: async () => postDataSource.getAllPosts(),
  },
  Mutation: {
    createPost: async (_, { input }, { user }) => {
      if (!user || !user.isAuthenticated || !user.id) return new Error('Unauthorized');
      return postDataSource.createPost(input, user.id);
    },
  },
};

module.exports = resolvers;
