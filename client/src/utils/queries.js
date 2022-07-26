import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Query {
me {
    username
    email
    password
    bookCount
    savedBooks {
        authors
        description
        bookId
        link
        title
    }
}
}
`;
