// this is the glue between the API and the actual source of data --
// a rest point or a DB or Prisma
const Query = {
    dogs(parent, args, ctx, info) {
        global.dogs = global.dogs || [];
        return global.dogs;
    }
};

module.exports = Query;
