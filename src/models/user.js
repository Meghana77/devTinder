const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username : {
        type: String
    },
    password : {
        type: String
    },
    email : {
        type: String
    }
});

module.exports = mongoose.Model('users', User);