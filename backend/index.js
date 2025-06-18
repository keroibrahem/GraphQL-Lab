// index.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const cors = require("cors");

const startServer = async () => {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  await connectDB();

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
};

startServer();
