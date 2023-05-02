import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Atoms/Auth/useAuth";
import { isEmptyObject } from "../../Atoms/emptyObj";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
import Autocomplete from "react-google-autocomplete";
import ImageUploading from "react-images-uploading";
import GreenBtn from "../../Atoms/GreenBtn";
import Select from "react-select";

const routeData = {
  name: "",
  location: "",
  geography: "",
  images: [],
  about: "",
  length: 0,
  difficulty: "",
};

const options = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

function AddNew() {
  const navigate = useNavigate();
  const { userSet } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState(
    isEmptyObject(userSet) ? routeData : userSet
  );

  const [images, setImages] = useState([]);
  const maxNumber = 10;

  const handleSubmit = async () => {
    const toastId = toast.loading("Pending");
    try {
      const formResponse = await axios.post(`/create`, formData);
      toast.success("Created New Route!", { id: toastId });
      navigate("/Profile/1");
    } catch (error) {
      console.log(error);
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
              <h1 className="text-3xl sm:text-4xl mb-4">Create new Route</h1>
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
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
                  console.log(place);
                }}
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Geography:
              </p>
              <input
                required
                value={formData.geography}
                onChange={(e) => updateData({ geography: e.target.value })}
                type="text"
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="Geo Data"
              />
              <p className=" lg:text-3xl mb-2 md: text-2xl sm: text-xl">
                Length (in miles):
              </p>
              <input
                required
                value={formData.length}
                onChange={(e) => updateData({ length: e.target.value })}
                type="number"
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="Username"
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
