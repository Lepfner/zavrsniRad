import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GreenBtn from "../../Atoms/GreenBtn";
import emailjs from "@emailjs/browser";
import axios from "../../Atoms/Axios/axios";
import { toast } from "react-hot-toast";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Pending");

    try {
      const response = await axios.post("/code", JSON.stringify({ email }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      localStorage.setItem("searchedUser", email);
      const emailParams = {
        to_name: [`${email}`],
        from_name: "Bike app",
        message: `${response.data}`,
      };
      emailjs
        .send(
          "service_v43f1xh",
          "template_pl3h4sm",
          emailParams,
          "M-karua9jmM9OyLKr"
        )
        .then(
          (response) => {
            toast.success("Successful!", { id: toastId });
            navigate("/Confirm");
          },
          (err) => {
            toast.error("Email could not be sent!", { id: toastId });
          }
        );
      toast.success("Success!", { id: toastId });
      navigate("/Confirm");
    } catch (err) {
      switch (err.response.status) {
        case 401:
          toast.error("User not found", { id: toastId });
          break;
        default:
          toast.error("Email error", { id: toastId });
          break;
      }
    }
  };

  return (
    <div className="font-custom flex flex-col justify-center pl-8 pb-12 lg:w-full max-sm:pl-0 pb-8">
      <h1 className="lg:text-5xl mb-2 md: text-5xl sm: text-4xl">RECOVERY:</h1>
      <div className="w-full flex flex-col lg:text-lg md:flex-row text-base sm:flex-col ">
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
          <div className="flex lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col ">
            <GreenBtn
              variant={1}
              text="SEND"
              handleClick={() => handleSubmit()}
              type="Submit"
            />
            <GreenBtn
              variant={1}
              text="BACK"
              handleClick={() => navigate("/Login")}
              type="button"
            />
          </div>
        </form>
        <div
          className="flex justify-center border-solid border-2 mt-4 border-t-green-400 sm:border-t-0 sm:border-l-green-400 
                         lg:h-40 md:w-2/5 max-sm:h-auto"
        >
          <p className="mb-4 font-bold w-4/5 lg:pl-2 max-sm:pl-0">
            Enter the email address with which you have a registered account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
