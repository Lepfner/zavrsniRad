import React from "react";

export default function GreenBtn({ text, handleClick, type }) {
  return (
    <button
      onClick={handleClick}
      type={type}
      className="block bg-green-400 px-4 rounded-md p-2 mt-4 text-white hover:bg-green-500"
    >
      {text}
    </button>
  );
}
