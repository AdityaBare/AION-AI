import express from "express"
import "dotenv/config"
import cors from "cors"
import mongoose from "mongoose";
import chatRoute from "./routes/chat.js"
import userRoute from "./routes/user.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;


app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use("/api", chatRoute);
app.use("/user",userRoute )





app.listen(PORT,()=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("MongoDb connected....")
}).catch((e)=>{
          console.log("Error ",e);
});
    console.log("On port 8080...");
});