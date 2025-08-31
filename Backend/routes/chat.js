import express from "express"
import {Thread} from "../models/Thread.js"

import getResponse from "../utils/openai.js"

const router = express.Router();



router.delete("/thread/:threadId", async(req,res)=>{
    console.log("ON delete route")
          const {threadId} = req.params;
         
    try{
        const thread = await Thread.findOneAndDelete({threadId});
        if(!thread){
            return res.status(404).json({mesage:"Thread is not deleted"});
        }

        res.status(202).json({message:"Thread is deleted", title:thread.title});

    } catch(err){
        console.log(err);
    }
});

//Get all threads 

router.get("/thread", async(req,res)=>{

    try{
        const thread = await Thread.find({}).sort({updatedAt:-1});

        res.json(thread)
    } catch(err){
        console.log(err);
    }
});

router.get("/thread/:threadId", async(req,res)=>{
        const {threadId} = req.params;
       
    try{
        const thread = await Thread.findOne({threadId});
        if(!thread){
            return res.status(404).json({mesage:"Chat not found"});
        }

        res.json(thread.message);

    } catch(err){
        console.log(err);
    }
});




router.post("/chat", async(req,res)=>{
  
    const {threadId, message}= req.body;

    if(!threadId || !message){
        res.status(404).json({message:"missing required fields"});
    }

    try{
        let thread = await Thread.findOne({threadId});

          if(!thread){
             thread = new Thread({
            threadId,
            title:message,
            message:[{role:"user",content:message}]
           });
          }else{
            thread.message.push({role:"user",content:message})
          }

         const assistantReplay = await getResponse(message);
         console.log(assistantReplay);

         thread.message.push({role:"assistant",content:assistantReplay});
         thread.updatedAt=new Date;
         await thread.save();

         res.json({reply:assistantReplay});


    }catch(err){
        console.log(err);
        res.status(505).json({message:"Somthing went wrong"})
    }
})

export default router;