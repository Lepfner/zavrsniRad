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
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  mapboxgl.accessToken =
    "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g";
  const navigate = useNavigate();
  const [fetchedRoute, setFetchedRoute] = useState([]);

  async function deleteHandler(userID) {
    try {
      const response = await axios.delete(`/delete/${userID}`);
      console.log(response);
      toast.success("Route deleted!");
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
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  function checkUserToken() {
    if (localStorage.getItem("isLoggedIn") === "false") {
      return navigate("/login");
    }
  }

  useEffect(() => {
    checkUserToken();
    var currentId = window.location.href.slice(28, 29);
    axios.get(`route/${currentId}`).then(function (response) {
      setFetchedRoute(response.data);
    });
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    var directions = new MapboxDirections({
      accessToken:
        "pk.eyJ1IjoibGVwZm5lciIsImEiOiJjbGhwNWhkajUxdnZpM2VveDRobnNiNzhtIn0.fz4tTHyEsxz5PHN-yvN70g",
      unit: "metric",
      profile: "mapbox/cycling",
    });
    map.current.on("click", (e) => {
      console.log(
        `A click event has occurred on a visible portion of the poi-label layer at ${e.lngLat}`
      );
    });
    map.current.on("load", function () {
      directions.setOrigin("Podstrana, Croatia"); // On load, set the origin to "Toronto, Ontario".
      directions.setDestination("Split, Croatia"); // On load, set the destination to "Montreal, Quebec".
    });
    map.current.addControl(directions, "top-left");
  }, []);

  return (
    <div className="font-custom mt-10 sm:mt-20 w-full flex flex-col items-center justify-between">
      <div className="h-full mb-10 flex flex-col justify-center max-w-[100%] sm:max-w-[70%] outline outline-green-400 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl mb-4">Upper Podstrana Route</h1>
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
                    <Link to="/Profile/1">
                      <b>Andrija Lerner</b>
                    </Link>
                  </div>
                  <div className="text-xl">Upper Podstrana Route</div>
                  <div className="text-lg">Podstrana, Croatia</div>
                  <div>64 Stars</div>
                  <div className="pb-2">Intermediate</div>
                  <div>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                  </div>
                </div>
              </div>
              <ImageGallery
                showThumbnails={false}
                additionalClass="w-full lg:w-1/2"
                items={images}
              />
            </div>
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
                handleClick={() => deleteHandler()}
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Route;
