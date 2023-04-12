import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function Filter() {
  const [ageValue, setAgeValue] = useState([18, 99]);
  const [genderValue, setGenderValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  return (
    <>
      <form
        className="flex flex-col bg-white rounded-xl mt-4 pb-4 px-4 relative"
      >
        <label className="m-auto pt-[20px]">Age range:</label>
        <div className="px-[30px]">
          <Slider
            getAriaLabel={() => "Age range"}
            value={ageValue}
            onChange={(e) => setAgeValue(e.target.value)}
            valueLabelDisplay="auto"
            max={99}
            min={18}
          />
        </div>
        <div>
          <FormControl>
            <label>Gender</label>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={genderValue}
              onChange={(e) => setGenderValue(e.target.value)}
              sx={{}}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>
        <label className="m-auto">Eye Color:</label>
        <select
          name="relationshipStatus"
          className="m-auto max-w-min bg-gray-300"
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
        >
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="Brown">Brown</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          className="block max-w-min m-auto pb-[5px] bg-skin-primary px-4 rounded-md p-2 mt-4 text-skin-a11y"
        >
          Apply
        </button>
      </form>
    </>
  );
}
