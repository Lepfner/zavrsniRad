import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "react-google-autocomplete";
import GreenBtn from "../Atoms/GreenBtn";

export default function Filter() {
  const [locationValue, setLocationValueLocal] = useState("");
  const [diffValue, setDiffValueLocal] = useState("");
  const [advancedValue, setAdvancedLocal] = useState("");

  const applyFilter = async () => {
    window.location.reload(false);
    localStorage.setItem("locationValue", locationValue);
    localStorage.setItem("diffValue", diffValue);
    localStorage.setItem("advancedValue", advancedValue);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl mt-4 pb-4 px-4 relative">
      <label className="m-auto pt-[20px]">Location:</label>
      <div className="px-[20px]">
        <Autocomplete
          required
          value={locationValue}
          onChange={(e) => setLocationValueLocal(e.target.value)}
          className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full"
          apiKey={"AIzaSyD5fzFAonYntL_GNTfxtI03bEJwD7_v9h0"}
          onSelect={(e) => setLocationValueLocal(e.target.value)}
          onPlaceSelected={(place) =>
            setLocationValueLocal(place.formatted_address)
          }
        />
      </div>
      <FormControl>
        <label>Beginner/Intermediate/Advanced:</label>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={diffValue}
          onChange={(e) => setDiffValueLocal(e.target.value)}
        >
          <FormControlLabel
            value="Beginner"
            control={<Radio required={true} />}
            label="Beginner"
          />
          <FormControlLabel
            value="Intermediate"
            control={<Radio required={true} />}
            label="Intermediate"
          />
          <FormControlLabel
            value="Advanced"
            control={<Radio required={true} />}
            label="Advanced"
          />
        </RadioGroup>
        <label>Advanced:</label>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={advancedValue}
          onChange={(e) => setAdvancedLocal(e.target.value)}
        >
          <FormControlLabel
            value="Routes I Starred"
            control={<Radio required={true} />}
            label="Routes I Starred"
          />
          <FormControlLabel
            value="Most Starred Routes"
            control={<Radio required={true} />}
            label="Most Starred Routes"
          />
          <FormControlLabel
            value="Newest"
            control={<Radio required={true} />}
            label="Newest"
          />
          <FormControlLabel
            value="Oldest"
            control={<Radio required={true} />}
            label="Oldest"
          />
        </RadioGroup>
      </FormControl>
      <GreenBtn
        variant={1}
        text="APPLY"
        handleClick={() => applyFilter()}
        type="submit"
      />
    </div>
  );
}
