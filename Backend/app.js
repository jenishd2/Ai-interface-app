import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();


app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use(cors({
  origin:"*",
  credentials:true,
  methods:["GET","POST"]
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

// router import
import UserRouter from "./routes/user.routes.js"
import ChatRouter from "./routes/chat.routes.js"
// router declaration
app.use("/api/v1/users",UserRouter)
app.use("/api/v1",ChatRouter)
// this mean http://localhost:8000/api/v1/users/register


  
  export default app