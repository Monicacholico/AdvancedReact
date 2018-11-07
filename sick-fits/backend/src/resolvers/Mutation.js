const Mutations = {
    async createItem(parent, args, ctx, info){

        const item = await ctx.db.mutation.createItem({
                data: {
                    // This is how to create a relationship between the Item and the User
                    // user: {
                    //     connect: {
                    //         id: ctx.request.userId,
                    //     },
                    // },
                    ...args,
                },
            },
            info
        );

        console.log(item);

        return item;
    }




    // createDog(parent, args, ctx, info){
    //     global.dogs = global.dogs || [];
    //     //create a Dog
    //     const newDog = {name: args.name};
    //     global.dogs.push(newDog);
    //     return newDog;
    // },
};

module.exports = Mutations;
