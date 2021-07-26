const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');

// const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./server/schemas/resolvers');
const {authMiddleware} = require('./server/utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  // typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

module.exports = {
  MONGODB:
    "mongodb+srv://andibuzzi:4oktPiuIaTXVyQc0@cluster0.xc54p.mongodb.net/tabs?retryWrites=true",
  SECRET_KEY: "some very secret key",
};
