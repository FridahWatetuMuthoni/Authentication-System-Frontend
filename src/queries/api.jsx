import axiosInstance from "../api/axiosInstance";
import axios from "axios";

//Require Access Token
const getUser = async (id) => {
  const response = await axiosInstance.get(`user/${id}/`);
  return response.data;
};

const getImages = async () => {
  const response = await axios.get(
    `https://pixabay.com/api/videos/?key=43981619-af9be092e27d0a9968920c9bc&q=flowers`
  );
  return response.data;
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
