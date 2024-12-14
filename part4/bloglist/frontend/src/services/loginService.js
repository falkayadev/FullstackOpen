import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const logout = async () => {
  const config = {
    withCredentials: true,
  };
  const response = await axios.post(`${baseUrl}/logout`, {}, config);
  return response.data;
};

const status = async () => {
  const config = {
    withCredentials: true,
  };

  const response = await axios.get(`${baseUrl}/status`, config);
  return response.data;
};
export default { login, logout, status };
