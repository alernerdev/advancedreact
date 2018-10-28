const {GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

function createServer() {
    return new GraphQLServer({
        // this file cant be empty AND it needs a mutation and query
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation: Mutation,
            Query: Query
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        // the database will be passed in into every request processing
        context: req => ({ ...req, db })
    });
}

module.exports = createServer;


