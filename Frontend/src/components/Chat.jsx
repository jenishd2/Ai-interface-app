import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import MarkdownRenderer from "./Markdown.jsx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Chat() {
  const { register, handleSubmit, reset } = useForm();
  const [chatHistory, setChatHistory] = useState([]); // Updated state to store chat history
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // const accessToken = useSelector((state)=>state.auth.accessToken)
  const userData = JSON.parse(localStorage.getItem("auth"))
  


  const submit = async (data) => {
    const query = data.Query;
    const email = userData.email
    // console.log(email)
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/data", {
        query,
        email
      });
      const answer = response.data;

      // Update chat history
      setChatHistory((prevHistory) => [...prevHistory, { query, answer }]);
      setLoading(false);
      reset();
    } catch (error) {
      console.error("Error fetching data:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { query, answer: "Error fetching data" },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="w-[100%] h-full mx-auto relative overflow-y-scroll overflow-x-hidden ">
      
      {/* <h1>{user}</h1> */}
      {/* Render chat history */}
      {chatHistory.map((chat, index) => (
        <div key={index} className="m-4 w-full">
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-primary text-xl">
              {chat.query}
            </div>
          </div>
          <div className="chat chat-start">
            {loading && index === chatHistory.length - 1 ? (
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton count={10} className="w-[70%] left-[20%] m-1" />
              </SkeletonTheme>
            ) : (
              <MarkdownRenderer
                content={chat.answer}
                classname="text-lg m-1 w-[70%]  left-[20%]  chat-bubble chat-bubble-black text-white"
              />
            )}
          </div>
        </div>
      ))}

      <form
        onSubmit={handleSubmit(submit)}
        className="flex items-center justify-center sticky bottom-0 w-[80%] left-[15%] gap-3"
      >
        <textarea
          className="textarea textarea-bordered w-[80%] text-lg"
          placeholder="Enter Your Query"
          {...register("Query", { required: true })}
        ></textarea>
        <button className="btn btn-primary bottom-0 w-[10%] text-xl">
          Send <FiSend />
        </button>
      </form>
    </div>
  );
}
