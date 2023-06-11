import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
import Autocomplete from "react-google-autocomplete";
import ImageUploading from "react-images-uploading";
import GreenBtn from "../../Atoms/GreenBtn";
import Select from "react-select";
import "../../Styles/Route.css";
import { checkUserToken } from "../../Atoms/checkToken.js";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { diffOptions } from "../../Atoms/data";

function Upload() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState([]);
  let check;

  const mapContainer = useRef(null);
  const map = useRef(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g";
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateData({
      difficulty: selectedOption.value,
      user_id: parseInt(localStorage.getItem("currentUserId")),
      images: images,
      lengthImg: images.length,
    });
    const toastId = toast.loading("Pending");
    try {
      const formResponse = await axios.post(`/createNew`, formData);
      toast.success("Created New Route!", { id: toastId });
      navigate(`/Profile/${formData.user_id}`);
    } catch (error) {
      toast.error("An error occured", { id: toastId });
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = JSON.parse(e.target.result);
      console.log(text);
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
        directions.setOrigin([text.geometry.coordinates[0][0], text.geometry.coordinates[0][1]]);
        directions.setDestination([text.geometry.coordinates[1][0], text.geometry.coordinates[1][1]]);
      });
      updateData({
        lat: text.geometry.coordinates[0][1],
        endLat: text.geometry.coordinates[1][1],
        lng: text.geometry.coordinates[0][0],
        endLng: text.geometry.coordinates[1][0],
      });
      map.current.addControl(directions, "top-left");
    };
    reader.readAsText(e.target.files[0])
  }

  useEffect(() => {
    check = checkUserToken();
    if (!check) {
      return navigate("/login");
    }
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
              onSubmit={handleSubmit}
            >
              <h1 className="text-3xl sm:text-4xl mb-4">Create new Route</h1>
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
              <p className=" lg:text-3xl mb-2 md:text-2xl sm:text-xl">
                Images:
              </p>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={10}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
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
              <p className=" lg:text-3xl mb-2 md:text-2xl sm:text-xl">
                Upload file:
              </p>
              <input
                accept=".geojson"
                onChange={(e) => showFile(e)}
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="Upload GPX file"
                type="file"
              />
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
export default Upload;
