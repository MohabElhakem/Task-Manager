import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    email : {
        type:String,
        required: true,
        unique: true,
        index : true,
        trim : true,
        match : [/^\S+@\S+\.\S+$/, "Invalied Email Format"]
    },
    password: {
        type : String,
        required : true,
    },
    isActive: {
        type : Boolean,
        default: true
    }
},{timestamps:true})

export default mongoose.model('User',userSchema);