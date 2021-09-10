const { gql } = require('apollo-server');

const typeDefs = gql`
    type User @key(fields: "id") {
        id: ID!
        email: String!
        fullName: String!
    }
    
   input RegisterUserInput {
       email: String!
       fullName: String!
       password: String!
    }
    
    input LoginUserInput { 
        email: String!
        password: String!
    }
    
    type UserLoginPayload {
        accessToken: String!
    }
    
    extend type Query {
        hello: String
        me: User
    }
    
    extend type Mutation {
        registerUser(input : RegisterUserInput) : User
        loginUser(input : LoginUserInput) : UserLoginPayload
    }
`;

module.exports = typeDefs;
