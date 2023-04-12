import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "burger-menu";
import { Link } from "react-router-dom";
import useAuth from "../Atoms/Auth/useAuth";
import { useNavigate } from "react-router-dom";
import "burger-menu/lib/index.css";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setAuth, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  function handleLogout()  {
    localStorage.setItem("isLoggedIn", false);
    setAuth({});
    setIsLoggedIn(false);
    navigate("/Login");
  }

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon
          className="mr-10 hover:animate-pulse text-skin-a11y"
          icon={faBars}
          size="2x"
          color="white"
        />
      </div>
      <Menu
        className="burger-menu font-custom"
        isOpen={isOpen}
        selectedKey={"entry"}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex flex-col">
        <Link to="/Main" className="mb-10">Main Page</Link>
        <Link to="/Profile/:id" className="mb-10">My Profile</Link>
        <Link to="/Contact" className="mb-10">Settings</Link>
        <Link to="/Login" onClick={() => handleLogout()} className="mb-10">Logout</Link>
        </div>
      </Menu>
    </>
  );
};

export default Hamburger;
