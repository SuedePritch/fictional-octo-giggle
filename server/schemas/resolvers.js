const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    testUserDeleteMe: async (parent)=>{
        return User.find({})
    },
    me: async (parent, context) => {
        console.log(context)
        if (context.user) {
        return User.findOne({
            _id: context.user._id 
            });
        }
        throw new AuthenticationError('You need to be logged in! resolvers');
    },

    books: async () => { 
        return await Book.find({});
    }
    },
    Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
    },


    
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
        throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
    },
    saveBook: async (parent, { saveBook }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        if (context.user) {
        return User.findOneAndUpdate(
            { _id: context.user._id },
            {
            $addToSet: { savedBooks: saveBook },
            },
            {
            new: true,
            runValidators: true,
            }
        );
        }
      // If user attempts to execute this mutation and isn't logged in, throw an error
        throw new AuthenticationError('You need to be logged in!');
    },
    },
};

module.exports = resolvers;
