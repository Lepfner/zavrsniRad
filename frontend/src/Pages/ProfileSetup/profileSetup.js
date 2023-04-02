import React, { useState, useEffect } from "react";
import PS1 from "./pS_page_1";
import Success from "./Success";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Atoms/Auth/useAuth";
import { isEmptyObject } from "../../Atoms/emptyObj";
const initialData = {
  name: "",
  surname: "",
  username: "",
  location: "",
  profileimg: "",
  about: "",
};

function ProfileSetup() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const {userSet} = useAuth()
  const [formData, setFormData] = 
        useState(isEmptyObject(userSet) ? initialData : userSet);
  
  function checkUserToken() {
    if (localStorage.getItem("isLoggedIn") === 'false') {
      return navigate('/login');
    }
  }

  useEffect(() => {
    checkUserToken();
  },[])

  const updateData = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  const componentList = [
    <PS1
      {...formData}
      updateData={updateData}
      setPage={setPage}
      handleSubmit={handleSubmit}
    />,
    <Success setPage={setPage} />,
  ];

  return (
    <div className="w-full flex flex-col items-center justify-between">
      <Toaster />
      <div className="h-24 w-full bg-orange-500 mb-8" />
      <div
        className="h-full flex flex-col justify-center max-w-[75%]
                     outline outline-orange-500 outline-[1rem] rounded-xl z-0
                     w-[100%]"
      >
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex justify-center items-center">
            {componentList[page]}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileSetup;
