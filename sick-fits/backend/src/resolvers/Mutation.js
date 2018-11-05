const Mutations = {
    async createItem(parent, args, ctx, info){

        const item = await ctx.db.mutation.createItem({
            data:{
                title: args.title,
                description: args.description,
                image: args.image,
                largeImage: args.largeImage,
                price: args.price
            }
        }, info);

        return item;
        console.log(item);
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
