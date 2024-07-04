import ConnectDB from "./db/db.js"
import dotenv from "dotenv"
import app from "./app.js";

dotenv.config({
  path:"./env"
})

// console.log(`${process.env.PORT}`)
const port = process.env.PORT || 8000;


ConnectDB()
.then(()=>{
    // we Listen Our App in this Section
    app.listen(port,()=>{
        console.log(`start Surver At ${port}`);
    })
})
.catch((error)=>{
    console.log("Mongo Db Error ",error)
})

