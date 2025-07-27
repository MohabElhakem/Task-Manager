const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const workspace = require('./workspace');

const taskSchema = mongoose.Schema({
    _id: {
        default: uuidv4,
        type: String,
    },
    workspace_id: {
        required: true,
        type: String,
        index: true
    },
    creator_id:{
        reuired: true,
        type: String,
        index: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    note: {
        type: String,

    },
    isDone:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        enum:['minor','normal','critical'],
        default: 'normal'
    },
    timeframe:{
        type : Date
    }
    
},{timestamps: true});

const task = mongoose.model('task',taskSchema);
module.exports = task;