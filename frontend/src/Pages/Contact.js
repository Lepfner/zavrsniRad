import React, { useEffect, useRef } from 'react';
//import Header from '../dashboard/Header';
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

export default function Settings() {

  const navigate = useNavigate();

  function checkUserToken() {
    if (localStorage.getItem("isLoggedIn") === 'false') {
      return navigate('/login');
    }
  }

  useEffect(() => {
    checkUserToken();
  })

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_l72z64l', 'template_mu6s50h', form.current, 'M-karua9jmM9OyLKr')
      .then((result) => {
        // show the user a success message
      }, (error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className=' w-full flex justify-center items-center mt-10'>
        <div className='bg-skin-primary w-3/4 p-3 rounded-2xl text-center flex items-center space-x-4 shadow-xl flex-col md:flex-row'>
          <div className='md:w-5/12 w-full flex flex-col justify-center items-center md:border-r border-0 text-skin-a11y'>
            <h1 className="bg-skin-primary text-3xl mt-10 mb-4">Report a problem:</h1>
            <form ref={form} onSubmit={sendEmail} className='w-full'>
              <input type='text' name="user" placeholder='Write your username'
                className="resize-none focus:outline-none p-2.5 w-5/6 h-10 mb-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </input>
              <textarea
                name="message"
                className="resize-none focus:outline-none p-2.5 w-5/6 h-32 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Feel free to let us know what is bothering you and write as many details as you like:" />
              <button
                type="submit"
                className=" bg-gray-700 px-4 w-32 rounded-md p-2 mt-4 text-white hover:text-skin-a11y lg:text-xl md:text-lg sm: text-lg">
                Send
              </button>
            </form>
          </div>
          <div className='sm:m-10 m-0 sm:w-2/3 w-full flex flex-col justify-center bg-skin-primary text-skin-a11y text-center'>
            <div className='text-3xl'>ABOUT US:</div>
            <div className='text-lg'>
              Created by a team of several software developers and testers,<br />
              Juicy is an online dating website that allows you meet people around the globe<br />
              with just a click of a button. Meet new friends, partners & etc. using our fully responsive<br />
              & simple to use design. We hope you have a wonderful time using our website and be sure<br />
              to let us know
              if there are any problems or if something/someone is bothering you.<br />
              Our team is working around the clock to make sure your experience is smooth as possible.<br />
              You can contact us using email or using the website's report system.
            </div>
            <div className='mt-12 text-lg'>Meet the team:<br />
              Toni Grbić,<br />
              Bruno Ivanković,<br />
              Jozo Krstanović,<br />
              Andrija Lerner,<br />
              Mateo Papuga,<br />
              Toni Radman<br /></div>
            <div className='mt-4'>Email contact: lerner.andi@gmail.com</div>
          </div>
        </div>
      </div>
    </>
  )
}