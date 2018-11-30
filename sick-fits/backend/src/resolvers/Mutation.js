/* mutations in this file have to match whats in the schema */

const Mutations = {
    /*    
    createDog(parent, args, ctx, info) {
        global.dogs = global.dogs || [];

        console.log(`createDog in Mutations args ${args}`);

        // create a dog
        const newDog = {name: args.name};
        global.dogs.push(newDog);
        return newDog;
    }
    */

    async createItem(parent, args, ctx, info) {
        // TODO: check if they are logged in

        // and this makes use of generated prisma.graphql
        const item = await ctx.db.mutation.createItem({
            data: {
                // the arguments are simply spread
                ...args
            }
        }, info);

        // console.log('in mutation.js createItem() info is' + JSON.stringify(info, undefined, 2));
        return item;
    },
    updateItem(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = {...args};
        // remove the ID from updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info);
    },
};

module.exports = Mutations;