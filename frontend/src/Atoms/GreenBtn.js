import React from "react";

export default function GreenBtn({ text, handleClick, type, variant }) {
  return (
    <>
      {variant === 1 && (
        <button
          onClick={handleClick}
          type={type}
          className="block bg-green-400 px-4 rounded-md p-2 mt-4 text-white hover:bg-green-500 duration-200"
        >
          {text}
        </button>
      )}
      {variant === 2 && (
        <button
          onClick={handleClick}
          type={type}
          className="w-full block bg-green-400 px-4 rounded-md p-2 text-white hover:bg-green-500 duration-200 shadow-lg"
        >
          {text}
        </button>
      )}
    </>
  );
}
