import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Atoms/Auth/useAuth";
import { isEmptyObject } from "../../Atoms/emptyObj";
import { toast } from "react-hot-toast";
import axios from "../../Atoms/Axios/axios";
import Autocomplete from "react-google-autocomplete";
import ImageUploading from "react-images-uploading";
import { checkUserToken } from "../../Atoms/checkToken.js";

const initialData = {
  name: "",
  surname: "",
  username: "",
  location: "",
  profileimg: [],
  about: "",
};

function ProfileSetup() {
  const navigate = useNavigate();
  const { userSet, setIsLoggedIn } = useAuth();
  const id = localStorage.getItem("currentUserId");
  const [formData, setFormData] = useState(
    isEmptyObject(userSet) ? initialData : userSet
  );
  let check;

  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Pending");
    try {
      const formResponse = await axios.put(`/setup/${id}`, formData);
      setIsLoggedIn(true);
      toast.success("Succesfull profile setup!", { id: toastId });
      navigate("/Success");
    } catch (error) {
      toast.error("An error occured", { id: toastId });
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    formData.profileimg = images;
  };

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
    <div className="font-custom w-full flex flex-col items-center justify-between">
      <Toaster />
      <div className="h-24 w-full bg-green-400 mb-8" />
      <div className="h-full flex flex-col mb-24 justify-center max-w-[75%] outline outline-green-400 outline-[1rem] rounded-xl z-0 w-[100%]">
        <div className="w-full rounded-xl p-12 z-10">
          <div className="flex justify-center items-center">
            <form
              className="flex justify-center items-center flex-col lg: w-4/5 max-md:w-full"
              onSubmit={handleSubmit}
            >
              <h1 className="text-3xl sm:text-4xl mb-4">Profile setup</h1>
              <p className="lg:text-3xl mb-2 md:text-2xl sm:text-xl">
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
                Surname:
              </p>
              <input
                required
                value={formData.surname}
                onChange={(e) => updateData({ surname: e.target.value })}
                type="text"
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="Surname"
              />
              <p className=" lg:text-3xl mb-2 md:text-2xl sm:text-xl">
                Username:
              </p>
              <input
                required
                value={formData.username}
                onChange={(e) => updateData({ username: e.target.value })}
                type="text"
                className="focus:outline-none h-14 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-4/5 md:w-4/5"
                placeholder="Username"
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
                onSelect={(e) => updateData({ location: e.target.value })}
                onPlaceSelected={(place) =>
                  updateData({ location: place.formatted_address })
                }
              />
              <p className=" lg:text-3xl mb-2 md:text-2xl sm:text-xl">
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
              <p className=" lg:text-3xl mb-2 md:text-2xl sm:text-xl">
                Profile Image:
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
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper focus:outline-none h-40 px-2 rounded-lg bg-gray-300 mb-8 w-full lg:w-1/5 md:w-1/5">
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
                <button
                  className="block bg-green-400 px-4 rounded-md p-2 mt-4 text-white hover:bg-green-500"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileSetup;
