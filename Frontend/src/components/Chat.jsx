import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import MarkdownRenderer from "./Markdown.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { FiSend } from "react-icons/fi";
import "../App.css";
import { Menu ,Skeleton} from "./index.js";

export default function Chat() {
  const { register, handleSubmit, reset } = useForm();
  const [chatHistory, setChatHistory] = useState([]); // Updated state to store chat history
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // const accessToken = useSelector((state)=>state.auth.accessToken)
  const userData = JSON.parse(localStorage.getItem("auth"));

  const submit = async (data) => {
    const query = data.Query;
    const email = userData.email;
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/data", {
        query,
        email,
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

  const handleSelectChat = async (chatId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/chats/${chatId}`
      );
      setSelectedChat(response.data);
      setChatHistory([]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chat details:", error);
      setLoading(false);
    }
  };

  const EmptyChat = () => {
    setSelectedChat(null);
    setChatHistory([]);
  };
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`${
        isSidebarVisible ? "w-[83%]" : "w-full"
      } h-[100%] ml-auto overflow-hidden overflow-y-scroll`}
    >
      <Menu
        onSelectChat={handleSelectChat}
        onEmpty={EmptyChat}
        toggleSidebar={toggleSidebar}
      />

      {selectedChat ? (
        <div className="h-[86vh] overflow-scroll ">
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-primary text-xl">
              {selectedChat.query}
            </div>
          </div>
          <MarkdownRenderer
            content={selectedChat.response}
            classname="text-lg m-1 w-[70%] left-[8%]  chat-bubble chat-bubble-black text-white"
          />
        </div>
      ) : (
        <>
          <div className={`${(chatHistory.length ==0)?"h-[86vh]":"hidden"} flex justify-center items-center`}>
          {/* <Skeleton /> */}
            <h1 className="text-4xl">Welcome To Website</h1>
          </div>
        </>
      )}
      {/* Render chat history */}
      {chatHistory.map((chat, index) => (
        <div key={index} className="w-full">
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-primary text-xl">
              {chat.query}
            </div>
          </div>
          <div className="chat chat-start">
            {loading && index === chatHistory.length - 1 ? (
              <Skeleton />
            ) : (
              <MarkdownRenderer
                content={chat.answer}
                classname="text-lg m-1 w-[70%] left-[8%]  chat-bubble chat-bubble-black overflow-x-scroll text-white"
              />
            )}
          </div>
        </div>
      ))}

      <form
        onSubmit={handleSubmit(submit)}
        className="flex items-center justify-center sticky bottom-0 w-[90%] left-[10%] gap-3"
      >
        <textarea
          className="textarea textarea-bordered w-[80%] text-lg"
          placeholder="Enter Your Query"
          {...register("Query", { required: true })}
          rows={1}
        ></textarea>
        <button className="btn btn-primary bottom-0 w-[10%] text-xl">
          Send <FiSend />
        </button>
      </form>
    </div>
  );
}
