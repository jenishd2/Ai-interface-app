import React, { useState } from "react";
import { Header, Menu ,Chat,Home,} from "../src/components/index";
import "./App.css"
export default function App() {
  return (
    <div className="">
      <Home children={<Chat />}/>
      {/* <Header />  */}
      {/* <Menu />
      <Chat /> */}
    </div>
  );
}
