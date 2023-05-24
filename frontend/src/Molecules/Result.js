import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Images/Bikers.jpg";

export default function Result({currentRoute}) {

  const navigate = useNavigate();

  function goToRoute(){
    navigate(`/route/${currentRoute.id}`);
    window.location.reload(false);
  }

  return (
    <Link onClick={() => goToRoute()} to="/route/1">
      <div className="flex flex-col sm:flex-row rounded-md shadow-xl mb-4">
        <div className="w-full sm:w-2/5">
          <img alt="" src={Image} className="w-full h-full" />
        </div>
        <div className="bg-gray-300 w-full sm:w-3/5 pl-2 text-lg md:texl-2xl flex flex-col justify-around">
          <div>{currentRoute.name}</div>
          <div>{currentRoute.location}</div>
          <div>{currentRoute.stars} Stars</div>
          <div>{currentRoute.difficulty}</div>
        </div>
      </div>
    </Link>
  );
}
