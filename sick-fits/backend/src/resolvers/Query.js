// this is the glue between the API and the actual source of data --
// a rest point or a DB or Prisma

const {forwardTo} = require('prisma-binding');

const Query = {
    /*    
        dogs(parent, args, ctx, info) {
            global.dogs = global.dogs || [];
            return global.dogs;
    }
    */

    /* if the yoga query is exactly the same as the prisma query and there is no additional logic,
    then we can simply forward it on
    */
    // items: forwardTo('db'),

    async items(parent, args, ctx, info) {
        const items = await ctx.db.query.items();
        return items;
    }

};

module.exports = Query;
