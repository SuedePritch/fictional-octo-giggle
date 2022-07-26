const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
        _id: ID
        username: String,
        email: String,
        password: String,
        bookCount: Int,
        savedBooks: [Book],
    }

    type Book {
        authors: [String],
        description: String,
        bookId: String,
        image: String,
        link: String,
        title: String,
    }

    type Auth {
        token:ID!,
        user: User
    }

    input saveBook {
        bookId: ID!,
        authors: [String],
        description: String,
        image: String,
        link: String,
        title: String,
    }


    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username:String!, email: String!, password: String! ): Auth
        saveBook(content: saveBook): User

    }

    # Define which queries the front end is allowed to make and what data is returned
    type Query {
        testUserDeleteMe:[User]
        me: User
        books: [Book]
    }
`;

module.exports = typeDefs;
