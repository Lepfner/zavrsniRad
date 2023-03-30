import React from "react";
import { Outlet } from "react-router-dom";

export default function Login({ children }) {
  return (
    <div className="bg-slate-50 h-screen flex items-center justify-center relative">
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-green-400" />
      <div className="bg-gray-200 rounded-3xl p-8 max-w-4xl flex z-10 boxShadowContainer w-4/5 lg:w-3/5 md:w-3/5 sm:w-4/5">
        {children}
        <Outlet/>
      </div>
    </div>
  );
}
