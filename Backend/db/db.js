import mongoose from "mongoose";
import { DB_NAME } from "../Constant.js";
import dotenv from "dotenv"

dotenv.config()
const ConnectDB = async ()=>{
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

      console.log(`\n MongoDB Connected ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error ",error);
        process.exit(1);
    }
}

export default ConnectDB