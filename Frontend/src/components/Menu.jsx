import React, { useEffect, useState } from 'react';
import { HistoryTitle } from "./index";
import axios from 'axios';

export default function Menu({ onSelectChat }) {
  const email = JSON.parse(localStorage.getItem("auth")).email;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/chats", {
          email
        });
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChats();
  }, [email]);

  return (
    <div className='w-1/6 h-screen overflow-y-scroll absolute top-0 left-0 border-e-2 border-white flex flex-col'>
      <div className='h-[50px] bg-black w-full'></div>
      <div className='w-full h-full mt-5'>
        {chats.map((chat, index) => (
          <div key={index} onClick={() => onSelectChat(chat._id)}>
            <HistoryTitle title={chat.query} />
          </div>
        ))}
      </div>
    </div>
  );
}
