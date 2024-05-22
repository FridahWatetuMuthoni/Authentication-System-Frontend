import axiosInstance from "../api/axiosInstance";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

//Require Access Token
const getUser = async (id) => {
  const response = await axiosInstance.get(`user/${id}/`);
  return response.data;
};

const getImages = async (page, search) => {
  console.log(page);
  console.log(search);
  let url;
  const all_photos = `https://api.unsplash.com/photos`;
  const search_photos = `https://api.unsplash.com/search/photos?page=${page}&query=${search}`;
  if (search) {
    url = all_photos;
  } else {
    url = search_photos;
  }
  const response = await axios.get(url, {
    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${API_KEY}`,
    },
  });
  return response;
};

const updateUser = async (user) => {
  const response = await axiosInstance.put(`user/${user.id}`, user);
  return response.data;
};

const logoutUser = async (refresh_token) => {
  const response = await axiosInstance.post("logout", refresh_token);
  return response.data;
};

const getNewAccesToken = async (refresh_token) => {
  const response = await axiosInstance.post("refresh/", refresh_token);
  return response.data;
};

//Dont Require Access Token
const registerUser = async (user) => {
  const response = await axiosInstance.post("register/", user);
  return response.data;
};

const loginUser = async (user) => {
  const response = await axiosInstance.post("login/", user);
  return response.data;
};

export {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  getNewAccesToken,
  updateUser,
  getImages,
};
