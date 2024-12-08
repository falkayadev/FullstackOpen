import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];
  useEffect(() => {
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
    axios
      .get(baseUrl)
      .then((response) => response.data)
      .then((data) => {
        setCountries([...countries, ...data]);
      });
  }, []);
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      <div>
        <label htmlFor="filter">find countries</label>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={handleFilter}
        />
        <ul>
          {filteredCountries.map((country) => (
            <li>{country.name.common}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
