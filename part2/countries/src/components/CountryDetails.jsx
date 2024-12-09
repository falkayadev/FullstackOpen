const CountryDetails = ({ country }) => {
  return (
    <div className="details--container">
      <h2 className="details--title">{country.name.common}</h2>
      <ul className="details--summary">
        <li>capital {country.capital[0]}</li>
        <li>area {country.area}</li>
      </ul>

      <h3 className="details--languages__title">languages:</h3>
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
    </div>
  );
};

export default CountryDetails;
