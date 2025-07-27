const mongoose = require('mongoose');
const{v4:uuidv4} = require('uuid');

const workspaceSchema =  mongoose.Schema({
    _id: {
        default: uuidv4,
        type: String,
        unique: true,
    },
    creator_id:{
        required: true,
        type: String
    },
    workspaceName:{
        required: true,
        type: String,
        unique: true,
    },
    note:{
        type: String,
        default: 'Add A Note'
    },
    priority:{
        type: String,
        enum:['minor','normal','critical'],
        default: 'normal'
    }
},{timestamps: true});

const workspace = mongoose.model('workspace',workspaceSchema);
module.exports = workspace;