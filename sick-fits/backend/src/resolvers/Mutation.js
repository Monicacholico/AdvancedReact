const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const {promisify} = require('util');
const {transport, makeANiceEmail} = require('../mail');

const Mutations = {
    async createItem(parent, args, ctx, info) {
        if(!ctx.request.userId){
            throw new Error("You must be logged in to do that!")
        }


        const item = await ctx.db.mutation.createItem(
            {
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
    },

    updateItem(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = {...args};
        // remove the ID from the updates
        delete updates.id;
        //run the update method
        return ctx.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id,
                },
            }, info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        //1.find the item
        const item = await ctx.db.query.item({where}, `{id title user {id}}`);
        //2. Check if they own thata item, or have the permissions

        //3. Delete it!
        return ctx.db.mutation.deleteItem({where}, info);
    },
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();

        const password = await bcrypt.hash(args.password, 10);
        const user = await ctx.db.mutation.createUser({
                data: {
                    ...args,
                    password,
                    permissions: {set: ['USER']},
                },
            },
            info
        );
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);

        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        return user;
    },
    async signin(parent, {email, password}, ctx, info) {
        //1.check if ther is a user with that email
        const user = await ctx.db.query.user({where: {email}});
        if (!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        //2. Check if their password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid Password!');
        }
        //.3 generate the JWT Token
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        //4.Set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        //5. Return the User
        return user;
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: "Goodbye"};
    },
    async requestReset(parent, args, ctx, info) {
        //1. Check if this is a real user
        const user = await ctx.db.query.user({where: {email: args.email}});
        if (!user) {
            throw new Error(`No such user found for email${args.email}`)
        }
        //2. Set a reset token and expiry on that user
        const randomBytesPromisified = promisify(randomBytes);
        const resetToken = (await randomBytesPromisified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;
        const res = await ctx.db.mutation.updateUser({
            where: {email: args.email},
            data: {resetToken, resetTokenExpiry},
        });
        console.log(res);
        return {message: 'Thanks'};
    },
    async resetPassword(parent, args, ctx, info) {
        //1. check if the password match
        if (args.password !== args.confirmPassword) {
            throw new Error("Yo passwords don't match!");
        }
        //2.check if its a legit reset token
        //3.check if its expired
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.reseToken,
                resetTokenExpiry_gte: Date.now() - 3600000,
            },
        });
        if (!user) {
            throw new Error('This token is either invalid or expired');
        }
        //4. Has their new password
        const password = await bcrypt.hash(args.password, 10);
        //5. Save the new password to the user and remvoe old fields
        const updateUser = await ctx.db.mutation.updateUser({
            where: {email: user.email},
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        //6. Generate JWT
        const token = jwt.sign({userId: updateUser.id},
            process.env.APP_SECRET);
        //7. Set the JWT cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
                maxAge: 1000 * 60 * 6 * 24 * 365,
        });
        //8. return the new user
        return updateUser;
    }

};

module.exports = Mutations;
