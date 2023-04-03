import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Atoms/Auth/useAuth";
import { isEmptyObject } from "../../Atoms/emptyObj";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
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
  const { userSet, auth, setIsLoggedIn } = useAuth();
  const { id } = auth;
  const [formData, setFormData] = useState(
    isEmptyObject(userSet) ? initialData : userSet
  );

  const handleSubmit = async () => {
    const toastId = toast.loading("Pending");
    try {
      const formResponse = await axios.put(`/setup/${id}`, formData);
      setIsLoggedIn(true);
      toast.success("succesfull profile setup!", { id: toastId });
      navigate("/Success");
    } catch (error) {
      console.log(error);
      toast.error("an error occured", { id: toastId });
    }
  };

  function checkUserToken() {
    if (localStorage.getItem("isLoggedIn") === "false") {
      return navigate("/login");
    }
  }

  useEffect(() => {
    checkUserToken();
  }, []);

  const updateData = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-between">
      <Toaster />
      <div className="h-24 w-full bg-orange-500 mb-8" />
      <div className="h-full flex flex-col justify-center max-w-[75%] outline outline-orange-500 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex justify-center items-center">
            <form
              className="flex justify-center items-center flex-col lg: w-4/5 max-md:w-full"
              onSubmit={handleSubmit}
            >
              <p className="text-xl mb-4">Step 1</p>
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Name:
              </p>
              <input
                required
                value={formData.name}
                onChange={(e) => updateData({ name: e.target.value })}
                type="text"
                placeholder="placeholder"
                className="h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Surname:
              </p>
              <input
                required
                value={formData.surname}
                onChange={(e) => updateData({ surname: e.target.value })}
                type="text"
                className="h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="placeholder"
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Username:
              </p>
              <input
                required
                value={formData.username}
                onChange={(e) => updateData({ username: e.target.value })}
                type="text"
                className="h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="placeholder"
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Location:
              </p>
              <input
                required
                value={formData.location}
                onChange={(e) => updateData({ location: e.target.value })}
                type="text"
                className="h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="placeholder"
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Profile Image:
              </p>
              <input
                required
                value={formData.profileimg}
                onChange={(e) => updateData({ profileimg: e.target.value })}
                type="text"
                className="h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="placeholder"
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                About:
              </p>
              <input
                required
                value={formData.about}
                onChange={(e) => updateData({ about: e.target.value })}
                type="text"
                className="h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="placeholder"
              />
              <div className="flex w-full justify-center lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col ">
                <button
                  className="block bg-orange-500 px-4 rounded-md p-2 mt-4 text-white hover:bg-orange-600"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileSetup;
