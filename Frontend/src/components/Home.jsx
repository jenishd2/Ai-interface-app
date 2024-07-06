import React from "react";
import { Header, Menu } from "./index.js";
export default function Home({ children }) {
  return (
    <div className="flex items-center justify-center flex-col w-full ">
      <Header />

      <div className="flex w-full h-[93vh] ">
        {/* <Menu /> */}
        {children}
      </div>
    </div>
  );
}
