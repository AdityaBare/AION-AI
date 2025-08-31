import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:["user","assistant","system"],
        required:true
    },
    content:{
        type:String,
        required:true

    },
    timestamp:{
        type:Date,
        default:Date.now
    }


});

const Message = mongoose.model("Message", MessageSchema);



const ThreadSchema = new mongoose.Schema({
    threadId:{
        type:String,
        required : true,
        unique:true
    },
    title:{
        type:String,
       default:"New Chat"
    },

    message:[MessageSchema],

    createdAt:{
        type:Date,
        default:Date.now
    },

    updatedAt:{
        type:Date,
        default:Date.now
    },
      user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'}

    ],


})
const Thread =  mongoose.model("Thread",ThreadSchema);

export  {Thread,Message};