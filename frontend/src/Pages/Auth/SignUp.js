import SuccessPage from "./SuccessPage";
import axios from "../../Atoms/Axios/axios";
import useAuth from "../../Atoms/Auth/useAuth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GreenBtn from "../../Atoms/GreenBtn";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
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
      setIsRegistered(true);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      const { id } = response?.data;
      localStorage.setItem("currentUserId", id)
      setAuth({ email, password, id });
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
      {!isRegistered ? (
        <>
          <h1 className="lg:text-6xl mb-2 md: text-5xl sm: text-4xl">
            SIGN-UP:
          </h1>
          <div
            className="w-full flex flex-col lg:text-lg md:flex-row text-base 
                       sm:flex-col "
          >
            <form className="lg: w-4/5 max-md:w-full" onSubmit={handleSubmit}>
              <p>E-mail:</p>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={`${
                  email !== "" ? `validate` : ""
                } h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5`}
              />
              <p>Password:</p>
              <input
                required
                value={password}
                minLength={7}
                maxLength={20}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={`${
                  password !== "" ? `validate` : ""
                } h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5`}
              />
              <p>Confirm password:</p>
              <input
                required
                value={passwordConfirm}
                minLength={7}
                maxLength={20}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type="password"
                className={`${
                  passwordConfirm !== "" ? `validate` : ""
                } h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5`}
              />
              <div className="flex  lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col ">
                <GreenBtn
                  variant={1}
                  text="SIGN-UP"
                  handleClick={() => handleSubmit()}
                  type="Submit"
                />
              </div>
            </form>
            <div
              className=" flex flex-col items-center border-solid border-2 border-t-green-400 sm:border-t-0 sm:border-l-green-400 
          lg:h-80 pt-6 md:w-2/5 max-sm:h-auto pt-0 mt-4"
            >
              <p className="underline mb-4 font-bold w-4/5 lg:pl-4 max-sm:pl-0">
                <Link to="/Login">Login with existing account</Link>
              </p>
            </div>
          </div>
        </>
      ) : (
        <SuccessPage type="Registration" />
      )}
    </div>
  );
};

export default SignUp;
