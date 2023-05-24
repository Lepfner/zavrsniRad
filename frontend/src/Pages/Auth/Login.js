import axios from "../../Atoms/Axios/axios";
import useAuth from "../../Atoms/Auth/useAuth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Typewriter from "typewriter-effect";
import GreenBtn from "../../Atoms/GreenBtn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth, setIsLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Pending");
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      const { id } = response?.data;
      setAuth({ email, password, id });
      localStorage.setItem("currentUserId", id);
      toast.success("Successful login!", { id: toastId });
      navigate("/main");
    } catch (err) {
      toast.error("Incorrect email or password", { id: toastId });
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="flex font-custom flex-col justify-center pl-8 pb-12 
                 lg:w-full md:w-full max-sm:pl-0 pb-8 w-full"
    >
      <>
        <span className="lg:text-6xl md:text-5xl sm:text-4xl text-4xl w-fit mb-2 flex flex-row">
          Go&nbsp;
          <Typewriter
            options={{
              cursorClassName: "hidden",
              strings: ["Register!", "Login!", "Explore!"],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
        <div
          className="w-full flex flex-col lg:text-lg md:flex-row text-base 
                        sm:flex-col"
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className={`${
                password !== "" ? `validate` : ""
              } h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5`}
            />
            <div className="flex  lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col ">
              <GreenBtn
                variant={1}
                text="LOGIN"
                handleClick={() => handleSubmit()}
                type="Submit"
              />
              <GreenBtn
                variant={1}
                text="SIGN-UP"
                handleClick={() => navigate("/SignUp")}
                type="button"
              />
            </div>
          </form>
          <div
            className="flex flex-col items-center border-solid border-2 border-t-green-400 sm:border-t-0 sm:border-l-green-400 
                          lg:h-52 pt-6 md:w-2/5 max-sm:h-auto pt-0 mt-4"
          >
            <p className="mb-4 font-bold w-4/5 lg:pl-4 max-sm:pl-0">
              Login using e-mail and password
            </p>
            <p className="underline mb-4 font-bold w-4/5 lg:pl-4 max-sm:pl-0">
              <Link to="/Recovery">Forgot password?</Link>
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default Login;
