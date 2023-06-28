import React, { useEffect, useState } from "react";
import Search from "../../Molecules/Search";
import Filter from "../../Organisms/Filter";
import GreenBtn from "../../Atoms/GreenBtn";
import Results from "../../Organisms/Results";
import { useNavigate } from "react-router-dom";
import axios from "../../Atoms/Axios/axios";
import { checkUserToken } from "../../Atoms/checkToken.js";

export default function Main() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  let check;

  useEffect(() => {
    check = checkUserToken();
    if (!check) {
      return navigate("/login");
    }
    const fetch = async () => {
      if (query === "") {
        const result = await axios(`/routes`);
        setItems(result.data);
      } else {
        const result = await axios(`/search/${query}`);
        setItems(result.data);
      }
    };
    fetch();
  }, [query]);

  return (
    <div className="font-custom h-full w-full flex flex-col items-center">
      <div className="mt-10 sm:mt-20 flex flex-col sm:flex-row items-center justify-start sm:items-start sm:justify-center gap-4 bg-gray-200 w-11/12 sm:w-2/3 p-4 rounded-lg shadow-xl">
        <div className="flex flex-col w-full sm:w-2/6">
          <GreenBtn
            text="Add New"
            variant={2}
            type="button"
            handleClick={() => navigate("/New")}
          />
          <br/>
          <GreenBtn
            text="Upload a route"
            variant={2}
            type="button"
            handleClick={() => navigate("/Upload")}
          />
          <Filter />
        </div>
        <div className="flex flex-col w-full sm:w-4/6 mb-4">
          <Search search={(q) => setQuery(q)} />
          <Results items={items} />
        </div>
      </div>
    </div>
  );
}
