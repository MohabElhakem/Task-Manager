const mongoose = require('mongoose');
const{v4:uuidv4} = require('uuid');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        unique: true,
        lowercase: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    password: {
        type: String,
        required: true,
        minlength:6
    },

    _id: {
        type: String,
        default: uuidv4,
    },

    role:{
        type: String,
        default: 'user',
        enum:['user','admin'],
    },

},{timestamps: true});

const user = mongoose.model('user', userSchema);
module.exports = user;