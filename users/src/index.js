require('dotenv').config();

const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core');
const { buildFederatedSchema } = require('@apollo/federation');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4001;

(async function () {
  try {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
      context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user };
      },
      schema: buildFederatedSchema([{ typeDefs, resolvers }]),
      plugins: [ApolloServerPluginInlineTraceDisabled()],
    });

    await server.start();

    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('Users Service : Mongoose connected');

    server.applyMiddleware({ app });

    await new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`Users service is running at http://localhost:${port}/graphql......`);
  } catch (e) {
    console.log('Users service crashed...', { error: e.message });
  }
}());
