import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
import Autocomplete from "react-google-autocomplete";
import GreenBtn from "../../Atoms/GreenBtn";
import Select from "react-select";
import "../../Styles/Route.css";
import { checkUserToken } from "../../Atoms/checkToken.js";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { diffOptions } from "../../Atoms/data";

function Edit() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState([]);
  let check;

  const mapContainer = useRef(null);
  const map = useRef(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g";

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateData({
      difficulty: selectedOption.value,
    });
    const toastId = toast.loading("Pending");
    try {
      const formResponse = await axios.post(`/edit`, formData);
      toast.success("Edited Route!", { id: toastId });
      navigate(`/Profile/${formData.user_id}`);
    } catch (error) {
      switch (error.response.status) {
        case 401:
          toast.error("Route not found!", { id: toastId });
          break;
        default:
          toast.error("Error occured while editing route!", { id: toastId });
          break;
      }
    }
  };

  useEffect(() => {
    check = checkUserToken();
    if (!check) {
      return navigate("/login");
    }
    let result;
    const fetch = async () => {
      result = await axios(`route/${localStorage.getItem("editedRouteId")}`);
      setFormData(result.data);
    };
    fetch();
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-70.9, 42.35],
      zoom: 9,
    });
    var directions = new MapboxDirections({
      accessToken:
        "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g",
      unit: "metric",
      profile: "mapbox/cycling",
    });
    map.current.on("load", function () {
      directions.setOrigin([result.data.lng, result.data.lat]);
      directions.setDestination([result.data.endLng, result.data.endLat]);
    });
    map.current.addControl(directions, "top-left");
    directions.on("route", (event) => {
      const route = event.route;
      const waypoints = route[0].legs[0].steps.map((step) => ({
        lng: step.maneuver.location[0],
        lat: step.maneuver.location[1],
      }));
      updateData({
        lat: waypoints[0].lat,
        endLat: waypoints[waypoints.length - 1].lat,
        lng: waypoints[0].lng,
        endLng: waypoints[waypoints.length - 1].lng,
      });
    });
  }, []);

  const updateData = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  return (
    <div className="font-custom mt-10 sm:mt-20 w-full flex flex-col items-center justify-between">
      <Toaster />
      <div className="h-full flex flex-col mb-24 justify-center max-w-[100%] sm:max-w-[60%] outline bg-white outline-green-400 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex justify-center items-center">
            <form
              className="flex justify-center items-center flex-col lg:w-full max-md:w-full"
              onSubmit={(e) => handleSubmit(e)}
            >
              <h1 className="text-3xl sm:text-4xl mb-4">Edit Route</h1>
              <p className=" lg:text-3xl mb-2 md:text-2xl sm:text-xl">
                Geography:
              </p>
              <div
                ref={mapContainer}
                className="map-container mapboxgl-canvas shadow-2xl"
              />
              <p className="lg:text-3xl mb-2 md:text-2xl sm:text-xl mt-8">
                Name:
              </p>
              <input
                required
                value={formData.name}
                onChange={(e) => updateData({ name: e.target.value })}
                type="text"
                placeholder="Name"
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
              />
              <p className=" lg:text-3xl mb-2 md:text-2xl sm:text-xl">
                Location:
              </p>
              <Autocomplete
                required
                value={formData.location}
                onChange={(e) => updateData({ location: e.target.value })}
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                apiKey={"AIzaSyD5fzFAonYntL_GNTfxtI03bEJwD7_v9h0"}
                onPlaceSelected={(place) => {
                  updateData({ location: place.formatted_address });
                }}
              />
              <p className=" lg:text-3xl mb-2 md:text-2xl sm:text-xl">About:</p>
              <input
                required
                value={formData.about}
                onChange={(e) => updateData({ about: e.target.value })}
                type="text"
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="About"
              />
              <p className=" lg:text-3xl mb-4 md:text-2xl sm:text-xl">
                Difficulty:
              </p>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={diffOptions}
                className="focus:outline-none h-14 px-2 rounded-lg mb-8 w-full lg:w-4/5 md:w-4/5"
              />
              <div className="flex w-full justify-center lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col ">
                <GreenBtn
                  variant={1}
                  text="SUBMIT"
                  handleClick={(e) => handleSubmit(e)}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Edit;
