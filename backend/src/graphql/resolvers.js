// Mongoose Model
import User from "../models/user";

export const resolvers = {
    Query: {
        async getUser(_, { input }) {
            return await User.find(input);
        }
    },
    Mutation: {
        async createUser(_, { input }) {
            console.log(input);
            const res = await User.create(input);
            console.log('RES: ' + res);
            return await res;
        }
    }
};