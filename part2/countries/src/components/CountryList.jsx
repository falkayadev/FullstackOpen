const CountryItem = ({ country, onShowDetails }) => (
  <li>
    {country.name.common}
    <button onClick={() => onShowDetails(country)}>show</button>
  </li>
);

const CountryList = ({ countries, onShowDetails }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountryItem
          key={country.name.common}
          country={country}
          onShowDetails={onShowDetails}
        />
      ))}
    </ul>
  );
};

export default CountryList;
