import React from "react";
import { Logout } from "./index";

export default function Header() {
  const email = JSON.parse(localStorage.getItem("auth")).email;
  return (
    <header className="w-[83%] ml-auto text-white h-[50px] flex justify-between items-center p-4">
      <h1 className="text-xl">Ask Question</h1>
      <div className="flex justify-center items-center gap-5">
        <h1 className="text-xl">{email}</h1>
        <Logout classname="" />
      </div>
    </header>
  );
}
