import axios from "axios";
const WEATHER_API_KEY = "d00d15a0e67add060925b6656286fb9c";

const getTemp = (capital, cca2) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital},${cca2}&appid=${WEATHER_API_KEY}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getTemp };
