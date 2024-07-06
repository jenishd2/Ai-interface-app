import { Chat } from "../models/chat.model.js";
import data from "../data.js"; 
import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"

const Createchat =  async (req, res) => {
    // console.log(req.body)
    const { query ,email} = req.body; // Extract query from request body
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    const user = await User.findOne({email})
    // console.log(user._id)
    try {
      const result = await data(query); // Use the query to get the data
      const responseText = result.response.text();
  
      // Save the query and response to the database
      const chat =  Chat.create({
        query,
        response: responseText,
        user:user._id
      });
    //   await chat.save()
       res.json(responseText); // Send the result as JSON response
    } catch (error) {
      res.status(500).json({ error: `Error fetching data: ${error.message}` });
    }
}

const GetChats = asyncHandler(async (req,res)=>{
  const {email} = req.body;
  const user = await User.findOne({email}) 

  const chats = await Chat.find({user:user._id})

  if(!chats){
    throw new apiError(404,"Chats are not found")
  }

  res.json(chats);
})

const getChatDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat details", error });
  }
};
export {Createchat,GetChats,getChatDetails}