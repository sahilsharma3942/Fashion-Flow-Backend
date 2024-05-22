import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstName:{
        type: String,
        required:true,
        trim:true,
        maxlength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    address:{
        type:String,
        maxlength:255
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps : true})

const User = mongoose.model("User",userSchema);

export default User;