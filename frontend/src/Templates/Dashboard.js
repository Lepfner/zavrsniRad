import React from "react";
import Header from "../Organisms/Header";
import { Outlet } from "react-router-dom";

export default function Dashboard({ children }) {
  return (
    <div className="h-screen w-full bg-[url('../Images/bicycle.jpg')] bg-no-repeat bg-cover opacity-80">
      <Header />
      <div className="h-5/6 w-full flex justify-center">
        <div className="h-full lg:w-full md:w-10/12">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
