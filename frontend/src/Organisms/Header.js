import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../Images/Logo.png";
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import useAuth from "../Atoms/Auth/useAuth";

export default function Header() {
  const { setAuth, setIsLoggedIn, setUser } = useAuth();

  function handleLogout() {
    localStorage.setItem("isLoggedIn", false);
    setAuth({});
    setUser([]);
    setIsLoggedIn(false);
    navigate("/Login");
  }

  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-green-500 pt-7 pb-7 ">
      <div className="md:ml-10 min-w-[50%]">
        <button onClick={() => navigate("/Main")}>
          <img src={logo} alt="" className="h-8 ml-10 sm:ml-0" />
        </button>
      </div>
      <div className="flex">
        <button
          onClick={() =>
            navigate(`/Profile/${localStorage.getItem("currentUserId")}`)
          }
        >
          <FontAwesomeIcon
            className="hidden md:flex mr-14 hover:animate-pulse"
            icon={faUser}
            size="xl"
            color="white"
          />
        </button>
        <button onClick={() => navigate("/Contact")}>
          <FontAwesomeIcon
            className="hidden md:flex mr-14 hover:animate-spin"
            icon={faGear}
            size="xl"
            color="white"
          />
        </button>
        <button onClick={() => handleLogout()}>
          <FontAwesomeIcon
            className="hidden md:flex mr-10 hover:animate-ping"
            icon={faSignOut}
            size="xl"
            color="white"
          />
        </button>
      </div>
      <div className="flex justify-between md:hidden">
        <button>
          <Hamburger />
        </button>
      </div>
    </div>
  );
}
