const {GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// create graphql Yoga Server

function createServer() {
    return new GraphQLServer({      
        typeDefs: 'src/schema.graphql', // this file cant be empty AND it needs a mutation and query
                                        // this it the public subset of DB API we are exposing
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


