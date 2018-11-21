/*
*   entry point to the application
*/

require('dotenv').config({path: 'variables.env'});
const createServer = require('./createYogaServer');
const db = require('./db');

// Yoga server that exposes the public DB api we are exposing
const server = createServer();

// use express middle ware to handle cookies (JWT)
// use express middleware to populate current user
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL // we only accept calls from that one front end
    }
}, details => {
    // this is a callback function
    console.log(`Yoga Server is running on port ${details.port}`);
});

