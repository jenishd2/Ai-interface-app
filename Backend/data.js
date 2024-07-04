import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(`${process.env.CHAT_API_KEY}`);

const data = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const result = await model.generateContent(prompt);
    return result; // Ensure the result is in JSON format
  } catch (error) {
    console.log(`Data Error ${error}`);
    throw error; // Propagate the error to be handled by the caller
  }
};

export default data;
