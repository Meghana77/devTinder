const mongoose = require('mongoose');

const User = new mongoose.Schema({
~    username: {
        type: String,
        maxLength: 20,
        minLength: 3
    },
    password: {
        type: String,
        maxLength: 30,
        minLength: 6
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

module.exports = mongoose.Model('users', User);