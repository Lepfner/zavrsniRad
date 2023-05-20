import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
import Autocomplete from "react-google-autocomplete";
import ImageUploading from "react-images-uploading";
import GreenBtn from "../../Atoms/GreenBtn";
import Select from "react-select";
import "./Route.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

const routeData = {
  name: "",
  location: "",
  lng: "",
  lat: "",
  endLng: "",
  endLat: "",
  images: [],
  about: "",
  difficulty: "",
  user_id: localStorage.getItem("currentUserId")
};

const options = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

function AddNew({variant}) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState([]);

  const mapContainer = useRef(null);
  const map = useRef(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g";
  const [images, setImages] = useState([]);
  const maxNumber = 10;

  const handleSubmit = async () => {
    const toastId = toast.loading("Pending");
    try {
      const formResponse = await axios.post(`/create`, formData);
      toast.success("Created New Route!", { id: toastId });
      navigate(`/Profile/${routeData.user_id}`);
    } catch (error) {
      toast.error("an error occured", { id: toastId });
    }
  };

  function checkUserToken() {
    if (localStorage.getItem("isLoggedIn") === "false") {
      return navigate("/login");
    }
  }

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    routeData.images = imageList;
  };

  useEffect(() => {
    checkUserToken();
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
    {/*
    map.current.on("click", (e) => {
      console.log(
        `A click event has occurred on a visible portion of the poi-label layer at ${e.lngLat}`
      );
    });
    map.current.on("load", function () {
      directions.setOrigin("Podstrana, Croatia"); // On load, set the origin to "Toronto, Ontario".
      directions.setDestination("Split, Croatia"); // On load, set the destination to "Montreal, Quebec".
    }); */}
    map.current.addControl(directions, "top-left");
    directions.on('route', (event) => {
      const route = event.route;
      const waypoints = route[0].legs[0].steps.map((step) => ({
        lng: step.maneuver.location[0],
        lat: step.maneuver.location[1],
      }));
      console.log(waypoints[0].lat);
      routeData.lat = waypoints[0].lat;
      routeData.endLat = waypoints[waypoints.length - 1].lat;
      routeData.lng = waypoints[0].lng;
      routeData.endLng = waypoints[waypoints.length - 1].lng;
      console.log(waypoints[waypoints.length - 1])
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
      <div className="h-full flex flex-col mb-24 justify-center max-w-[100%] sm:max-w-[60%] outline outline-green-400 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex justify-center items-center">
            <form
              className="flex justify-center items-center flex-col lg: w-full max-md:w-full"
              onSubmit={handleSubmit}
            >
              {variant === 1 && <h1 className="text-3xl sm:text-4xl mb-4">Create new Route</h1>}
              {variant === 2 && <h1 className="text-3xl sm:text-4xl mb-4">Edit Route</h1>}
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
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
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Location:
              </p>
              <Autocomplete
                required
                value={formData.location}
                onChange={(e) => updateData({ location: e.target.value })}
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                apiKey={"AIzaSyD5fzFAonYntL_GNTfxtI03bEJwD7_v9h0"}
                onPlaceSelected={(place) => {
                  updateData({location: place.formatted_address})
                }}
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                About:
              </p>
              <input
                required
                value={formData.about}
                onChange={(e) => updateData({ about: e.target.value })}
                type="text"
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="About"
              />
              <p className=" lg:text-3xl mb-4 md: text-2xl sm: text-xl">
                Difficulty:
              </p>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                className="focus:outline-none h-14 px-2 rounded-lg mb-8 w-full lg:w-4/5 md:w-4/5"
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Images:
              </p>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper focus:outline-none h-40 px-2 rounded-lg bg-gray-300 mb-8 w-full sm:w-2/5">
                    <button
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                    &nbsp;
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image["data_url"]} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>
                            Update
                          </button>
                          <button onClick={() => onImageRemove(index)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
              <div className="flex w-full justify-center lg:gap-8 flex-row md:flex-row gap-2 max-sm:flex-col ">
                <GreenBtn
                  variant={1}
                  text="CREATE"
                  handleClick={() => handleSubmit()}
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
export default AddNew;
