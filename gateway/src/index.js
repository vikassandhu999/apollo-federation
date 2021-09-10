require('dotenv').config();

const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const userAuthMiddleware = require('./middlewares/user-auth-middleware');

const port = process.env.PORT || 4000;

const serviceList = [
  { name: process.env.USERS_SERVICE_KEY, url: process.env.USERS_SERVICE_URL },
  { name: process.env.POSTS_SERVICE_KEY, url: process.env.POSTS_SERVICE_URL },
];

// eslint-disable-next-line func-names
(async function () {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(userAuthMiddleware());

  const gateway = new ApolloGateway({
    serviceList,
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url,
        async willSendRequest({ request, context }) {
          request.http.headers.set(
            'user',
            context.user ? JSON.stringify(context.user) : null,
          );
        },
      });
    },
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ req }) => {
      const user = req.user || null;
      return { user };
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log('Gateway has been started...');
}());
