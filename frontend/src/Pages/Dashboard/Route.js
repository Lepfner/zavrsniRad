import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Atoms/Auth/useAuth";
import { isEmptyObject } from "../../Atoms/emptyObj";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";

const routeData = {
  name: "",
  location: "",
  geography: "",
  images: [],
  about: "",
  length: 0,
  difficulty: "",
};

function Route() {
  const navigate = useNavigate();
  const { userSet } = useAuth();
  const [formData, setFormData] = useState(
    isEmptyObject(userSet) ? routeData : userSet
  );
  const [items, setItems] = useState([]);

  async function deleteHandler(userID) {
    if(!window.confirm("confirm to delete user!"))
      return
    const newItems = items.filter(user => user.id !== userID)
    setItems(newItems)

    try {
      const response = await axios.delete(`/delete/${userID}`);
      console.log(response);
      toast.success("user deleted!");
    } catch (error) {
      toast.error("and error has occured");
    }
  }

  function checkUserToken() {
    if (localStorage.getItem("isLoggedIn") === "false") {
      return navigate("/login");
    }
  }

  useEffect(() => {
    //checkUserToken();
  }, []);

  return (
    <div className="font-custom mt-10 sm:mt-20 w-full flex flex-col items-center justify-between">
      <div className="h-full flex flex-col mb-24 justify-center max-w-[100%] sm:max-w-[60%] outline outline-green-400 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex justify-center items-center">a
          </div>
        </div>
      </div>
    </div>
  );
}
export default Route;
