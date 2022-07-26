import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            username
            password
            email
        }
    }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`
export const SAVE_BOOK = gql`
    mutation saveBook($content: saveBook) {
        saveBook(content: $content) {
        _id
        username
        email
        password
        bookCount
        savedBooks {
            bookId
        }
    }
}
`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            username
            savedBooks {
                bookId
    }
        }
    }
`;