import { Chat } from "../models/chat.model.js";
import data from "../data.js"; 
import { User } from "../models/user.model.js";
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

export {Createchat}