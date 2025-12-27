import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Types.ObjectId,
        required: true,
        index : true,
        ref: "User"
    },
    title: {
        type : String,
        unique : true,
        trim : true
    },
    description: {
        type: String,
        required: true,
    },
    status : {
        type : String,
        enum : ["important","crucial","basic","done"]
    },
    dueDate : {
        type : Date
    }

},{timestamps:true});

export default mongoose.model("Task", taskSchema);