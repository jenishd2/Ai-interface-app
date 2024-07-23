import React from "react";
import { Chat, Home } from "../src/components/index";
import "./App.css";
export default function App() {
  return (
    <div className="">
      <Home children={<Chat />} />
    </div>
  );
}
