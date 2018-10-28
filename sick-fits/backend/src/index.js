require('dotenv').config({path: 'variables.env'});
const createServer = require('./createYogaServer');
const db = require('./db');

const server = createServer();

// use express middle ware to handle cookies (JWT)
// use express middleware to populate current user
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
}, details => {
    // this is a callback function
    console.log(`Server is running on port ${details.port}`);
});

