import React from "react";
import { useNavigate } from "react-router-dom";

export default function Result({currentRoute}) {

  const navigate = useNavigate();

  function goToRoute(){
    navigate(`/route/${currentRoute.id}`);
    window.location.reload(false);
  }

  return (
      <div onClick={() => goToRoute()} className="flex flex-col sm:flex-row rounded-md shadow-xl mb-4">
        <div className="w-full sm:w-2/5">
          <img alt="" src={currentRoute.image} className="w-full h-full" />
        </div>
        <div className="bg-gray-300 w-full sm:w-3/5 pl-2 text-lg md:texl-2xl flex flex-col justify-around">
          <div>{currentRoute.name}</div>
          <div>{currentRoute.location}</div>
          <div>{currentRoute.stars} Stars</div>
          <div>{currentRoute.difficulty}</div>
        </div>
      </div>
  );
}
