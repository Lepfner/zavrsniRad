import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
import GreenBtn from "../../Atoms/GreenBtn";
import ImageGallery from "react-image-gallery";
import "./Route.css";
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

  async function deleteHandler(routeID) {
    try {
      const response = await axios.delete(`/delete/${routeID}`);
      toast.success("Route deleted!");
      navigate("/Main");
    } catch (error) {
      toast.error("An error has occured");
    }
  }

  function editRoute() {
    navigate("/Edit");
    window.location.reload(false);
  }

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
  ];

  function checkUserToken() {
    if (localStorage.getItem("isLoggedIn") === "false") {
      return navigate("/login");
    }
  }

  useEffect(() => {
    checkUserToken();
    var currentId = window.location.href.slice(28, 41);
    let result;
    const fetch = async () => {
      result = await axios(`route/${currentId}`);
      setFetchedRoute(result.data);
    };
    fetch();
    let userresult;
    const userfetch = async () => {
      userresult = await axios(`route/${currentId}`);
      setFetchedUser(userresult.data);
    };
    userfetch();
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-70.9, 42.35],
      zoom: 9,
      interactive: false,
    });
    var directions = new MapboxDirections({
      accessToken:
        "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g",
      unit: "metric",
      profile: "mapbox/cycling",
      interactive: false,
    });
    map.current.on("click", (e) => {
      console.log(
        `A click event has occurred on a visible portion of the poi-label layer at ${e.lngLat}`
      );
    });
    map.current.on("load", function () {
      directions.setOrigin([result.data.lng, result.data.lat]);
      directions.setDestination([result.data.endLng, result.data.endLat]);
    });
    map.current.addControl(directions, "top-left");
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
                handleClick={() => console.log("Starred!")}
                type="button"
              />
            </div>
            <div className="w-full mb-8 flex flex-row justify-center">
              <div
                ref={mapContainer}
                className="map-container mapboxgl-canvas shadow-2xl"
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
              <ImageGallery
                showThumbnails={false}
                additionalClass="w-full lg:w-1/2"
                items={images}
              />
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
