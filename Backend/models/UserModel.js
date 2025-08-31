import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required:[true,"Your email address is required"],
        unique : [true,"Your email address shoulld unique"],
        lowercase :true
    },
    username : {
        type:String,
        required: [true,"Username is required"]
    },
    password :{
        type:String,
        required : [true,"Password is required"],
    },
     token: { type: String }
,
});

 
export const User =  mongoose.model("User", userSchema);