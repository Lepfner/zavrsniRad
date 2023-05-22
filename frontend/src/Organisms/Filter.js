import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "react-google-autocomplete";
import GreenBtn from "../Atoms/GreenBtn";
import useFilter from "../Atoms/Filter/useFilter";

export default function Filter() {
  const [lengthValue, setLengthValueLocal] = useState([1, 100]);
  const [locationValue, setLocationValueLocal] = useState("");
  const [dateValue, setDateValueLocal] = useState("");
  const [diffValue, setDiffValueLocal] = useState("");
  const [checked, setCheckedLocal] = useState(true);
  const {
    setLengthValue,
    setChecked,
    setDiffValue,
    setLocationValue,
    setDateValue,
  } = useFilter();

  const applyFilter = async(e) => {
    setChecked(checked);
    setLengthValue(lengthValue);
    setDiffValue(diffValue);
    setLocationValue(locationValue);
    setDateValue(dateValue);
  }

  return (
    <>
      <form className="flex flex-col bg-white rounded-xl mt-4 pb-4 px-4 relative">
        <label className="m-auto pt-[20px]">Length in miles:</label>
        <div className="px-[30px]">
          <Slider
            getAriaLabel={() => "Length"}
            value={lengthValue}
            onChange={(e) => setLengthValueLocal(e.target.value)}
            valueLabelDisplay="auto"
            max={100}
            min={1}
          />
        </div>
        <label className="m-auto">Location:</label>
        <div className="px-[20px]">
          <Autocomplete
            required
            value={locationValue}
            onChange={(e) => setLocationValueLocal(e.target.value)}
            className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full"
            apiKey={"AIzaSyD5fzFAonYntL_GNTfxtI03bEJwD7_v9h0"}
            onPlaceSelected={(place) => {
            }}
          />
        </div>
        <FormControl>
          <label>Newest/Oldest:</label>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={dateValue}
            onChange={(e) => setDateValueLocal(e.target.value)}
          >
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
        </FormControl>
        <div>
          <label className="m-auto">Starred:</label>
          <Checkbox
            checked={checked}
            onChange={(e) => setCheckedLocal(!checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <GreenBtn
          variant={1}
          text="APPLY"
          handleClick={() => applyFilter()}
          type="submit"
        />
      </form>
    </>
  );
}
