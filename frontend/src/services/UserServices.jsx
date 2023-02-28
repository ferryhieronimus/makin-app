import axios from "axios";
const baseUrl = "https://makin-app.up.railway.app/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getUser = async (limit, username) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(
    `${baseUrl}?limit=${limit}&skip=0&username=${username}`, config
  );
  return response.data;
};

const getUserByUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data;
};

const updateUser = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const updateProfileImage = async (id, formData) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  const response = await axios.put(`${baseUrl}/image/${id}`, formData, config);
  return response.data;
};

const deleteProfileImage = async (id) => {
  const response = await axios.delete(`${baseUrl}/image/${id}`);
  return response.data;
};

const addCloseFriend = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/addclosefriend/${id}`,
    newObject,
    config
  );
  return response.data;
};

const removeCloseFriend = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/removeclosefriend/${id}`,
    newObject,
    config
  );
  return response.data;
};

export default {
  setToken,
  getUser,
  getUserByUsername,
  updateUser,
  updateProfileImage,
  deleteProfileImage,
  addCloseFriend,
  removeCloseFriend,
};
