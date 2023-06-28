import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ search }) => {
  const [text, setText] = useState("");
  const onSearch = (q) => {
    setText(q);
    search(q);
  };
  return (
    <div className="relative">
      <input
        className="shadow-lg w-full block bg-slate-200 px-4 rounded-md p-2 hover:bg-slate-300 duration-200 focus:outline-none text-black"
        placeholder="Search for routes..."
        value={text}
        autoFocus
        type="text"
        onChange={(e) => onSearch(e.target.value)}
      ></input>
      <FontAwesomeIcon
        className="absolute top-[28%] right-[2.5%]"
        icon={faSearch}
      />
    </div>
  );
};

export default Search;
