import React from "react";
import Image from "../Images/Bikers.jpg";

export default function Result() {
  return (
    <div className="flex flex-col sm:flex-row rounded-md shadow-xl mb-4">
      <div className="w-full sm:w-2/5">
        <img alt="" src={Image} className="w-full h-full" />
      </div>
      <div className="bg-gray-300 w-full sm:w-3/5 pl-2 text-lg md:texl-2xl flex flex-col justify-around">
        <div>Upper Podstrana Route</div>
        <div>Podstrana, Croatia</div>
        <div>2.5 Miles</div>
        <div>64 Stars</div>
        <div>Intermediate</div>
      </div>
    </div>
  );
}
