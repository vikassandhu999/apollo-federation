/* eslint no-unused-vars: ["off", {"args": "after-used"}] */

const registerUser = require('./use-cases/RegisterUser');
const loginUser = require('./use-cases/LoginUser');
const getUserById = require('./use-cases/GetUserById');

const resolvers = {
  User: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveReference(reference) {
      return getUserById(reference.id);
    },
    id(user, args, context, info) {
      return user.id;
    },
    email(user, args, context, info) {
      return user.email;
    },
    fullName(user, args, context, info) {
      return user.fullName;
    },
  },
  Query: {
    hello: () => ('Hello World'),
    me: async (_, { input }, { user }) => {
      if (!user || !user.isAuthenticated || !user.id) throw new Error('Unauthorized');
      return getUserById(user.id);
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => registerUser(input),
    loginUser: async (_, { input }) => loginUser(input),
  },
};

module.exports = resolvers;
