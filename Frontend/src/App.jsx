import React, { useState } from "react";
import { Header, Menu ,Chat} from "../src/components/index";
export default function App() {
  return (
    <div className="w-full h-[100vh] relative">
      <Header />
      <Menu />
      <Chat />
    </div>
  );
}
