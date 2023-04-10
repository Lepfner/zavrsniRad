import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Atoms/Axios/axios";
import useAuth from "../../Atoms/Auth/useAuth";
import { toast } from "react-hot-toast";
import GreenBtn from "../../Atoms/GreenBtn";

const Confirmation = () => {
  const [authCode, setAuthCode] = useState("");
  const navigate = useNavigate();
  const { auth, isLoggedIn } = useAuth();
  const { id } = auth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Pending");
    try {
      const response = await axios.post(
        "/verifyOTP",
        JSON.stringify({ userId: id, otp: authCode }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      console.log(auth, isLoggedIn);
      toast.success("Verification successful!", { id: toastId });
      navigate("/AdminPanel");
    } catch (error) {
      console.log(error);
      toast.error("invalid or expired OTP, try again!", { id: toastId });
    }

    setAuthCode("");
  };

  return (
    <div className="font-custom flex flex-col justify-center pl-8 pb-12 lg:w-full max-sm:pl-0 pb-8">
      <h1 className="text-4xl mb-2 lg:text-4xl max-sm:text-2xl">
        CONFIRMATION:
      </h1>
      <div className="w-full flex flex-col lg:text-lg md:flex-row text-base sm:flex-col ">
        <form className="lg: w-4/5 max-md:w-full" onSubmit={handleSubmit}>
          <p>6-digit code:</p>
          <input
            required
            value={authCode}
            pattern="[0-9]{1,6}"
            minLength={6}
            maxLength={6}
            onChange={(e) => setAuthCode(e.target.value)}
            type="text"
            className={`${
              authCode !== "" ? `validate` : ""
            } h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5`}
          />
          <div className="flex  lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col ">
            <GreenBtn
              text="SEND"
              handleClick={() => console.log("send")}
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
          className=" flex justify-center border-solid border-2 mt-2 border-t-green-400 sm:border-t-0 sm:border-l-green-400 
                         lg:h-44 text-base md:w-2/5 max-sm:h-auto"
        >
          <p className="mb-4 font-bold w-4/5 lg:pl-2 max-sm:pl-0">
            Enter the code that was sent to your mail so we can confirm it is
            indeed you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
