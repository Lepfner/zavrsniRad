import { createContext, useState } from "react";

const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
    const [lengthValue, setLengthValue] = useState([1, 100]);
    const [locationValue, setLocationValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [diffValue, setDiffValue] = useState("");
    const [checked, setChecked] = useState(true);
  
  return (
    <FilterContext.Provider value={{ lengthValue, locationValue, dateValue, diffValue, checked, setChecked, setDateValue, setDiffValue, setLengthValue, setLocationValue }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
