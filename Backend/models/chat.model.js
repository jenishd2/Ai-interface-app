import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

export const Chat = mongoose.model("Chat", chatSchema);

