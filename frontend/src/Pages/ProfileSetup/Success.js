import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center justify-between">
    <div className="h-24 w-full bg-orange-500 mb-8" />
    <div className="h-full flex flex-col justify-center max-w-[75%] outline outline-orange-500 outline-[1rem] rounded-xl z-0 w-[100%]">
      <div className="w-full rounded-xl p-12 z-10">
        <div className="flex justify-center items-center">
    <div className="mt-20">
      <h1 className="mb-12 lg:text-6xl md:text-5xl sm: text-4xl">
        Successful Setup!
      </h1>
      <div
        className="flex justify-center lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col 
                      lg:text-xl md:text-lg sm: text-lg"
      >
        <button
          className="block bg-orange-500 px-4 rounded-md p-2 mt-4 text-white hover:bg-orange-600"
          onClick={() => navigate("/Main")}
        >
          Dashboard
        </button>
      </div>
    </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
