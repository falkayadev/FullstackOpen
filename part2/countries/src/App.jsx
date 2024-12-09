import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

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
    if (selectedCountry) {
      setSelectedCountry(null);
    }
    setFilter(e.target.value);
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <div className="container">
        <div className="filter--container">
          <label htmlFor="filter" className="filter--label">
            find countries
          </label>
          <input
            type="text"
            name="filter"
            className="filter--input"
            value={filter}
            onChange={handleFilter}
          />
        </div>
        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter.</p>
        )}
        {filteredCountries.length === 1 ? (
          <CountryDetails country={filteredCountries[0]} />
        ) : selectedCountry ? (
          <CountryDetails country={selectedCountry} />
        ) : filteredCountries.length <= 10 ? (
          <CountryList
            countries={filteredCountries}
            onShowDetails={handleShowDetails}
          />
        ) : null}
      </div>
    </>
  );
}

export default App;
