import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
import GreenBtn from "../../Atoms/GreenBtn";

function Route() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  async function deleteHandler(userID) {
    if (!window.confirm("confirm to delete user!")) return;
    const newItems = items.filter((user) => user.id !== userID);
    setItems(newItems);

    try {
      const response = await axios.delete(`/delete/${userID}`);
      console.log(response);
      toast.success("user deleted!");
    } catch (error) {
      toast.error("and error has occured");
    }
  }

  function handleEdit() {
    navigate("/New");
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
      <div className="h-full flex flex-col justify-center max-w-[100%] sm:max-w-[70%] outline outline-green-400 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl mb-4">Upper Podstrana Route</h1>
            <div className="w-full bg-red-100 flex flex-row justify-center">
              <h1>Map</h1>
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <h1 className="w-full sm:w-1/2 bg-green-100">Gallery</h1>
              <div className="w-full sm:w-1/2 bg-blue-100">
                <div>Created by <Link to="/Profile/1"><b>Andrija Lerner</b></Link></div>
                <div>Upper Podstrana Route</div>
                <div>Podstrana, Croatia</div>
                <div>2.5 Miles</div>
                <div>64 Stars</div>
                <div>Intermediate</div>
                <div>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum."
                </div>
              </div>
            </div>
            <div className="w-full">
              <h1 className="bg-orange-200">Geo Data</h1>
            </div>
            <div className="w-full flex flex-row justify-evenly">
              <GreenBtn
                variant={1}
                text="EDIT ROUTE"
                handleClick={() => handleEdit()}
                type="button"
              />
              <GreenBtn
                variant={1}
                text="DELETE ROUTE"
                handleClick={() => deleteHandler()}
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Route;