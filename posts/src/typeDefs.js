const { gql } = require('apollo-server');

const typeDefs = gql`
    type Post @key(fields: "id") {
        id: ID!
        title: String!
        content: String!
        createdAt: String
        author : User
    }

    extend type User @key(fields: "id") {
        id: ID! @external
        posts: [Post]
    }
    
    input CreatePostInput {
        title: String!
        content: String!
    }
    
    extend type Query {
        hi:String
        post(id : ID!) : Post
    }
    
    extend type Mutation {
        createPost(input : CreatePostInput) : Post
    }
`;

module.exports = typeDefs;
