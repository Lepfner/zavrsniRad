import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
//import JuicyLogo from "../images/logo.png";
//import BlackLogo from '../images/blackLogo.png';
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import useAuth from "../Atoms/Auth/useAuth";

export default function Header() {

  const { setAuth, setIsLoggedIn } = useAuth();

  function handleLogout()  {
    localStorage.setItem("isLoggedIn", false);
    setAuth({});
    setIsLoggedIn(false);
    navigate("/Login");
  }

  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-green-500 pt-7 pb-7 ">
      <div className="md:ml-10 min-w-[50%]">
        <button onClick={() => navigate("/Main")}>
          {/* Add logo
          <img src={currentLogo} alt="" className="h-20" />
          */}
        </button>
      </div>
      <div className="flex">
        <button>
          <FontAwesomeIcon onClick={() => navigate("/MyProfile")}
            id="logoIcon"
            className="hidden md:flex mr-14 hover:animate-pulse"
            icon={faUser}
            size="2x"
          />
        </button>
        <button onClick={() => navigate("/Settings")}>
          <FontAwesomeIcon
            id="settingsIcon"
            className="hidden md:flex mr-14 hover:animate-spin"
            icon={faGear}
            size="2x"
          />
        </button>
        <button onClick={() => handleLogout()}>
          <FontAwesomeIcon
            id="logoutIcon"
            className="hidden md:flex mr-10 hover:animate-ping"
            icon={faSignOut}
            size="2x"
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
