import SuccessPage from "./SuccessPage";
import axios from "../../Atoms/Axios/axios";
import useAuth from "../../Atoms/Auth/useAuth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GreenBtn from "../../Atoms/GreenBtn";

const ChangePass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isRegisterd, setIsRegisterd] = useState(false);
  const navigate = useNavigate();
  const { setAuth, setIsLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }
    const toastId = toast.loading("Pending");
    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("successful registration!", { id: toastId });
      setIsRegisterd(true);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);

      const { id, is_admin } = response?.data;
      setAuth({ email, password, id, is_admin });
      navigate("/Setup");
    } catch (err) {
      console.log(err);
      toast.error("email already taken!", { id: toastId });
    }
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <div
      className="font-custom flex flex-col justify-center pl-8 pb-12 
                  lg:w-full md:w-full max-sm:pl-0 pb-8 w-full"
    >
      {!isRegisterd ? (
        <>
          <h1 className="lg:text-6xl mb-6 md: text-5xl sm: text-4xl">
            NEW PASSWORD:
          </h1>
          <div
            className="w-full flex flex-col lg:text-lg md:flex-row text-base 
                       sm:flex-col "
          >
            <form className="lg: w-4/5 max-md:w-full" onSubmit={handleSubmit}>
              <p>Password:</p>
              <input
                required
                value={password}
                minLength={7}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={`${
                  password !== "" ? `validate` : ""
                } h-14 px-2 rounded-lg bg-gray-300 mb-6 w-full lg:w-4/5 md:w-4/5`}
              />
              <p>Confirm password:</p>
              <input
                required
                value={passwordConfirm}
                minLength={7}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type="password"
                className={`${
                  passwordConfirm !== "" ? `validate` : ""
                } h-14 px-2 rounded-lg bg-gray-300 mb-6 w-full lg:w-4/5 md:w-4/5`}
              />
              <div className="flex  lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col ">
                <GreenBtn
                  text="RESET"
                  handleClick={() => console.log("reset")}
                  type="Submit"
                />
                <GreenBtn
                  text="BACK"
                  handleClick={() => navigate("/Recovery")}
                  type="button"
                />
              </div>
            </form>
            <div
              className=" flex flex-col items-center border-solid border-2 border-t-green-400 sm:border-t-0 sm:border-l-green-400 
          lg:h-80 pt-6 md:w-2/5 max-sm:h-auto pt-0 mt-4"
            >
              <p className="mb-4 font-bold w-4/5 lg:pl-4 max-sm:pl-0">
                Please select a new password that you will use for this account
              </p>
            </div>
          </div>
        </>
      ) : (
        <SuccessPage type="password reset" />
      )}
    </div>
  );
};

export default ChangePass;
