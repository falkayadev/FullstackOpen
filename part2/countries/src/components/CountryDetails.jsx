import { useState, useEffect } from "react";
import weatherService from "../services/weatherService";
const CountryDetails = ({ country }) => {
  const [temp, setTemp] = useState(null);
  const [iconCode, setIconCode] = useState(null);
  const [wind, setWind] = useState(null);
  useEffect(() => {
    weatherService.getTemp(country.capital[0], country.cca2).then((data) => {
      setTemp(data.main.temp);
      setIconCode(data.weather[0]["icon"]);
      setWind(data.wind.speed);
    });
  }, []);
  return (
    <div className="details--container">
      <h2 className="details--title">{country.name.common}</h2>
      <ul className="details--summary">
        <li>capital {country.capital[0]}</li>
        <li>area {country.area}</li>
      </ul>

      <h3 className="details--title__sub">languages:</h3>
      <ul className="details--language__list">
        {Object.entries(country.languages).map((country) => (
          <li key={country[0]}>{country[1]}</li>
        ))}
      </ul>
      <img
        className="details--flag"
        src={country.flags.png}
        alt="country flag"
      />
      <h3 className="details--title__sub">Weather in {country.capital[0]}</h3>
      <p>temperature {temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt=""
      />
      <p>wind {wind} m/s</p>
    </div>
  );
};

export default CountryDetails;
