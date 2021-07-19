import axios from "axios";
const baseUrl = "/api/notes";
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
//创建新的note时将token发送给server
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  console.log(response);
  return response.data;
};
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
const deleteNote = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  // console.log("app.js:", response);
  return response.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deleteNote,
  setToken,
};
