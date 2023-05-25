import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { checkUserToken } from "../../Atoms/checkToken.js";

export default function Settings() {
  const navigate = useNavigate();
  let check;

  useEffect(() => {
    check = checkUserToken();
    if (!check) {
      return navigate("/login");
    }
  });

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_v43f1xh",
        "template_mu6s50h",
        form.current,
        "M-karua9jmM9OyLKr"
      )
      .then(
        (result) => {},
        (error) => {}
      );
  };

  return (
    <>
      <div className="font-custom w-full flex justify-center items-center mt-10">
        <div className="outline outline-green-400 outline-[1rem] w-3/4 p-3 rounded-2xl text-center flex items-center shadow-2xl flex-col md:flex-row">
          <div className="md:w-5/12 w-full flex flex-col items-center md:border-r border-0 text-skin-a11y">
            <h1 className="bg-skin-primary text-3xl mt-10 mb-10">
              Report a problem:
            </h1>
            <p className="text-justify ml-2 mr-2 sm:ml-6 sm:mr-6 md:ml-12 md:mr-12">
              Please let us know if you have any problems with our app
              whatsoever. We would be more than happy to assist you in any way.
            </p>
            <br />
            <form ref={form} onSubmit={sendEmail} className="w-full">
              <input
                type="text"
                name="user"
                placeholder="Write your username"
                className="resize-none focus:outline-none p-2.5 w-5/6 h-10 mb-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              <textarea
                name="message"
                className="resize-none focus:outline-none p-2.5 w-5/6 h-32 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Feel free to let us know what is bothering you and write as many details as you like"
              />
              <button
                type="submit"
                className="bg-gray-700 hover:bg-green-500 duration-200 px-4 w-32 rounded-md p-2 mt-4 text-white lg:text-xl md:text-lg sm: text-lg"
              >
                Send
              </button>
            </form>
          </div>
          <div className="sm:m-10 m-0 sm:w-2/3 w-full flex flex-col justify-center text-center">
            <div className="text-3xl mt-10 sm:mt-0">About:</div>
            <div className="text-lg text-justify ml-0 mr-0 sm:ml-20 sm:mr-20 mt-10">
              Our online bicycle route app is the perfect tool for anyone
              looking to explore new bike routes and discover hidden gems in
              their area. With user-friendly features and intuitive navigation,
              our app makes it easy to plan your next cycling adventure. With
              our online bicycle route app, you'll never run out of exciting new
              routes to explore. We hope you have a wonderful time using our
              website and be sure to let us know if there are any problems or if
              something/someone is bothering you. Our team is working around the
              clock to make sure your experience is smooth as possible. You can
              contact us using email or using the website's report system.
            </div>
            <div className="mt-12 text-lg">
              Made by Andrija Lerner
              <br />
            </div>
            <div className="mt-4">
              <a
                href="mailto:alerne00@fesb.hr"
                target="_blank"
                rel="noreferrer"
              >
                Email contact: alerne00@fesb.hr
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
