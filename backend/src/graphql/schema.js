import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
    type Query {
        getUser(input: UserInput): [User]
    }

    type Mutation {
        createUser(input: UserInput): User
    }
    
    type User {
        _id: ID
        user: String!
        password: String!
    }

    input UserInput {
        user: String!
        password: String!
    }

`;

export default makeExecutableSchema({
    typeDefs,
    resolvers
})