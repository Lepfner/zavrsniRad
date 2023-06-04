import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
import GreenBtn from "../../Atoms/GreenBtn";
import ImageGallery from "react-image-gallery";
import "../../Styles/Route.css";
import { checkUserToken } from "../../Atoms/checkToken.js";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

function Route() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  mapboxgl.accessToken =
    "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g";
  const navigate = useNavigate();
  const [fetchedRoute, setFetchedRoute] = useState([]);
  const [fetchedUser, setFetchedUser] = useState([]);
  const [fetchedImage, setFetchedImage] = useState([]);
  const [visible, setVisible] = useState(true);
  const [renderComponent, setRenderComponent] = useState(false);
  let check;

  async function deleteHandler(routeID) {
    try {
      const response = await axios.delete(`/delete/${routeID}`);
      toast.success("Route deleted!");
      navigate("/Main");
    } catch (error) {
      toast.error("An error has occured");
    }
  }

  const handleAddStar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/addStar",
        JSON.stringify({
          route_id: fetchedRoute.id,
          user_id: parseInt(localStorage.getItem("currentUserId")),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Starred!");
    } catch (err) {
      switch (err.response.status) {
        case 401:
          toast.error("You already starred this route!");
          break;
        default:
          toast.error("Unknown Error!");
          break;
      }
    }
  };

  const handleRemoveStar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/removeStar",
        JSON.stringify({
          route_id: fetchedRoute.id,
          user_id: parseInt(localStorage.getItem("currentUserId")),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Star removed!");
    } catch (err) {
      switch (err.response.status) {
        case 401:
          toast.error("You haven't starred this route!");
          break;
        default:
          toast.error("Unknown Error!");
          break;
      }
    }
  };

  function editRoute() {
    localStorage.setItem("editedRouteId", window.location.href.slice(28, 41));
    navigate("/Edit");
    window.location.reload(false);
  }

  function toggleNav() {
    if (visible) {
      const collection = document.getElementsByClassName("directions-control");
      for (let i = 0; i < collection.length; i++) {
        collection[i].style.display = "none";
      }
      setVisible(false);
    } else {
      const collection = document.getElementsByClassName("directions-control");
      for (let i = 0; i < collection.length; i++) {
        collection[i].style.display = "block";
      }
      setVisible(true);
    }
  }

  let images = [
  ];

  function formatImages(arrLength, data) {
    if (localStorage.getItem("runOnce") === "1") {
      for (let i = 0; i < arrLength; i++) {
        images.push({
          original: data[i].image,
          thumbnail: data[i].image,
        });
      }
      localStorage.setItem("runOnce", "0");
    }
    setFetchedImage(images);
  }

  useEffect(() => {
    check = checkUserToken();
    if (!check) {
      return navigate("/login");
    }
    const timer = setTimeout(() => {
      setRenderComponent(true);
    }, 500);
    localStorage.setItem("runOnce", "1");
    var currentId = window.location.href.slice(28, 41);
    let result, userResult, imageResult;
    const fetch = async () => {
      result = await axios(`route/${currentId}`);
      setFetchedRoute(result.data);
      userResult = await axios(`users/${result.data.user_id}`);
      setFetchedUser(userResult.data);
      imageResult = await axios(`image/${currentId}`);
      formatImages(imageResult.data.length, imageResult.data);
    };
    fetch();
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-70.9, 42.35],
      zoom: 9,
      interactive: true,
      controls: {
        profileSwitcher: false,
      },
    });
    var directions = new MapboxDirections({
      accessToken:
        "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g",
      unit: "metric",
      profile: "mapbox/cycling",
      interactive: true,
      controls: {
        profileSwitcher: false,
      },
    });
    map.current.on("load", function () {
      directions.setOrigin([result.data.lng, result.data.lat]);
      directions.setDestination([result.data.endLng, result.data.endLat]);
    });
    map.current.addControl(directions, "top-left");
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="font-custom mt-10 sm:mt-20 w-full flex flex-col items-center justify-between">
      <div className="h-full mb-10 flex flex-col justify-center max-w-[100%] sm:max-w-[70%] outline outline-green-400 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl mb-4">{fetchedRoute.name}</h1>
            <div className="w-full gap-2 flex flex-row mb-2">
              <GreenBtn
                variant={1}
                text="STAR ROUTE!"
                handleClick={(e) => handleAddStar(e)}
                type="button"
              />
              <GreenBtn
                variant={1}
                text="UNSTAR ROUTE!"
                handleClick={(e) => handleRemoveStar(e)}
                type="button"
              />
              <GreenBtn
                variant={1}
                text="TOGGLE NAV!"
                handleClick={() => toggleNav()}
                type="button"
              />
            </div>
            <div className="w-full mb-8 flex flex-row justify-center">
              <div
                ref={mapContainer}
                className="map-container mapboxgl-canvas shadow-2xl mb-16"
              />
            </div>
            <div className="flex flex-col lg:flex-row w-full">
              <div className="pr-5 w-full sm:w-1/2">
                <div className="w-full h-full bg-slate-200 rounded-xl p-5 shadow-2xl">
                  <div className="text-2xl">
                    Created by{" "}
                    <Link to={`/Profile/${fetchedRoute.user_id}`}>
                      <b>{fetchedUser.name}</b>
                    </Link>
                  </div>
                  <div className="text-xl">{fetchedRoute.name}</div>
                  <div className="text-lg">{fetchedRoute.location}</div>
                  <div>{fetchedRoute.stars} Stars</div>
                  <div className="pb-2">{fetchedRoute.difficulty}</div>
                  <div>{fetchedRoute.about}</div>
                </div>
              </div>
              {renderComponent ? (
                <ImageGallery
                  showThumbnails={false}
                  additionalClass="w-full lg:w-1/2"
                  items={fetchedImage}
                />
              ) : null}
            </div>
            {localStorage.getItem("currentUserId") === fetchedRoute.user_id && (
              <div className="w-full flex flex-row justify-evenly">
                <GreenBtn
                  variant={1}
                  text="EDIT ROUTE"
                  handleClick={() => editRoute()}
                  type="button"
                />
                <GreenBtn
                  variant={1}
                  text="DELETE ROUTE"
                  handleClick={() => deleteHandler(fetchedRoute.id)}
                  type="button"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Route;
