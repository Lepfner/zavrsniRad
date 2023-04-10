import React, { useEffect, useState } from "react";
import Location from "../../Images/Location.png";
import empty_avatar from "../../Images/Avatar.png";
import { useNavigate } from "react-router-dom";
import axios from "../../Atoms/Axios/axios";
import useAuth from "../../Atoms/Auth/useAuth";

const ProfilePage = () => {
  const { userSet, setUser, auth } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(true);

  function checkUserToken() {
    if (localStorage.getItem("isLoggedIn") === "false") {
      return navigate("/login");
    }
  }

  function handleEdit() {
    navigate("/Setup");
  }

  useEffect(() => {
    checkUserToken();
    const fetch = async () => {
      const result = await axios(`users/${auth.id}`);
      setUser({ ...result.data });
    };
    fetch();
  }, []);

  return (
    <>
      <div className="font-custom w-full h-full flex justify-center mt-4">
        <div className="min-h-[47rem] max-w-[910px] w-[80%] max-sm:w-[90%] shadow-2xl bg-green-500 rounded-r-[5rem] flex justify-start items-center">
          <div className="h-[96%] mx-4 my-2 pb-4 w-[94%] shadow-2xl bg-slate-200 rounded-r-[4rem] flex flex-col gap-4 max-sm:w-[90%]">
            <div className="w-full min-h-[13rem] flex gap-4 mx-4 mt-8">
              <section className="w-[90%] h-full bg-slate-300 rounded-xl flex justify-start py-4 max-sm:flex-col max-sm:items-center sm:overflow-y-hidden overflow-y-scroll overflow-x-hidden">
                <div className="w-[36%] flex flex-col items-center ml-8 pr-4 border-r-2 border-green-500 max-sm:border-b-2 max-sm:border-none max-sm:w-[90%] max-sm:mb-4">
                  <div className=" mt-4 mb-2 rounded-full flex justify-center h-[8rem] w-[8rem] overflow-hidden mx-4 bg-slate-200 ">
                    <img
                      src={userSet.profileimg || empty_avatar}
                      className="object-cover h-[8rem]"
                      alt="user"
                    />
                  </div>
                  <p>
                    {userSet.name}Andrija {userSet.surname}Lerner
                  </p>
                  <p>{userSet.username} Lepfner</p>
                  <p>
                    <img
                      src={Location}
                      className="w-8 h-8 inline-block mix-blend-color-burn"
                      alt=""
                    />
                    {userSet.location}Podstrana, Hrvatska
                  </p>
                  <a
                    href={`mailto:${userSet.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userSet.email}alerne00@fesb.hr
                  </a>
                  {current && (
                    <button
                      type="button"
                      className="bg-gray-700 hover:bg-green-500 duration-200 px-4 w-36 rounded-md p-2 mt-4 text-white lg:text-xl md:text-lg sm: text-lg"
                      onClick={handleEdit}
                    >
                      Edit profile
                    </button>
                  )}
                </div>
                <div className="w-[63%] pl-8 pt-2 pb-4 text-lg max-sm:border-t-2 max-sm:border-skin-primary max-sm:w-[90%]">
                  <h3>
                    {userSet.about}"Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum."
                  </h3>
                </div>
              </section>
            </div>
            <section className="w-[90%] min-h-[22rem] bg-slate-300 mx-4 rounded-xl py-4 px-8 sm:overflow-y-hidden overflow-y-scroll overflow-x-hidden">
              <h2 className="text-center text-2xl">Routes</h2>
              <p className="text-lg">{userSet.routes}</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
