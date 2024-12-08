import axios from "axios";
const baseUrl = "http://localhost:3000/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObj) => {
  return axios.post(baseUrl, newObj);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, remove };
