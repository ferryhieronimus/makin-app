import axios from "axios";
const baseUrl = "/api/posts";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getPost = async (limit) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}?limit=${limit}&skip=0`, config);
  return response.data;
};

const getAllPost = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getPostByUserID = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createPost = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updatePost = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deletePost = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const Services = {
  setToken,
  getPost,
  getPostByUserID,
  getAllPost,
  createPost,
  updatePost,
  deletePost,
};

export default Services;
