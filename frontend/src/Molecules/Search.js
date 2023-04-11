import React, { useState } from "react";

const Search = ({ search }) => {
  const [text, setText] = useState("");
  const onSearch = (q) => {
    setText(q);
    search(q);
  };
  return (
    <>
      <input
        className="shadow-lg w-full block bg-slate-200 px-4 rounded-md p-2 text-white hover:bg-slate-300 duration-200 focus:outline-none text-black"
        placeholder="Search for routes..."
        value={text}
        autoFocus
        type="text"
        onChange={(e) => onSearch(e.target.value)}
      ></input>
    </>
  );
};

export default Search;
