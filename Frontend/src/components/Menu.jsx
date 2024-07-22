import React, { useEffect, useState } from "react";
import { HistoryTitle } from "./index";
import { FiEdit } from "react-icons/fi";
import { BsLayoutSidebar } from "react-icons/bs";
import axios from "axios";
import "../App.css";
export default function Menu({ onSelectChat, onEmpty, toggleSidebar }) {
  const email = JSON.parse(localStorage.getItem("auth")).email;
  const [chats, setChats] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/chats",
          {
            email,
          }
        );
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChats();
  }, [email]);

  const handleSidebarToggle = () => {
    setIsVisible(!isVisible);
    toggleSidebar();
  };

  return (
    <div>
      <div
        className={`w-1/6 h-screen overflow-y-scroll custom-scrollbar absolute top-0 left-0 border-e-2 border-white flex flex-col  transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-[60px] bg-black w-full flex justify-between items-center p-3  sticky top-0">
          <BsLayoutSidebar
            className={`text-2xl text-gray-400 cursor-pointer ${
              isVisible ? "relative" : "absolute left-5 top-5"
            } `}
            onClick={handleSidebarToggle}
          />
          <FiEdit
            className="text-2xl text-gray-400 cursor-pointer"
            onClick={() => {
              onEmpty();
            }}
          />
        </div>
        <div className="w-full h-full mt-4">
          {chats.map((chat, index) => (
            <div key={index} onClick={() => onSelectChat(chat._id)}>
              <HistoryTitle title={chat.query} />
            </div>
          ))}
        </div>
      </div>
      <BsLayoutSidebar className={`fixed top-3 left-3 text-2xl text-gray-400 cursor-pointer z-50 ${isVisible ? 'hidden' : 'block'}`} onClick={handleSidebarToggle} />
    </div>
  );
}
