import axios from "axios";
const baseUrl = "/api/people";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const deletedPerson = axios
    .get(`${baseUrl}/${id}`)
    .then((response) => response.data);
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(() => deletedPerson);
};

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
