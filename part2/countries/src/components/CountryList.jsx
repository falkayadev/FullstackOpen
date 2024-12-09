const CountryItem = ({ country }) => <li>{country.name.common}</li>;

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountryItem key={country.name.common} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
