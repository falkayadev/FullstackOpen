import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const config = {
    withCredentials: true,
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    withCredentials: true,
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export default { getAll, create };
