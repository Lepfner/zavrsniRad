import { useContext } from "react";
import FilterContext from "./filterProvider";

const useFilter = () => {
  return useContext(FilterContext);
};

export default useFilter;
