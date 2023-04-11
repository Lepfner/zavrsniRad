import React from "react";
import { useNavigate } from "react-router-dom";
import GreenBtn from "../../Atoms/GreenBtn";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="font-custom w-full flex flex-col items-center justify-between">
      <div className="h-24 w-full bg-green-400 mb-8" />
      <div className="h-full flex flex-col justify-center max-w-[75%] outline outline-green-400 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex justify-center items-center">
            <div>
              <h1 className="mb-12 lg:text-6xl md:text-5xl sm: text-4xl">
                Successful Setup!
              </h1>
              <div
                className="flex justify-center lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col 
                      lg:text-xl md:text-lg sm: text-lg"
              >
                <GreenBtn
                  variant={1}
                  text="Dashboard"
                  type="button"
                  handleClick={() => navigate("/Main")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
