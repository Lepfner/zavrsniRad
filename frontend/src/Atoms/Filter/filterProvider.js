import { createContext, useState } from "react";

const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
    const [locationValue, setLocationValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [diffValue, setDiffValue] = useState("");
    const [checked, setChecked] = useState(true);
  
  return (
    <FilterContext.Provider value={{ locationValue, dateValue, diffValue, checked, setChecked, setDateValue, setDiffValue, setLocationValue }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
