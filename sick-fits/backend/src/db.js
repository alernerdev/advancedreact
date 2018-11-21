/* 
* this file connects to remote Prisma DB and allows to query it with javascript 
*/

const {Prisma} = require('prisma-binding');

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql', // generated stuff from Prisma
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
});

module.exports = db;