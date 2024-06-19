import { useState, useEffect } from "react";

export default function CountryInfo() {
  const [countryCode, setCountryCode] = useState("AU");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setCountryCode(e.target.value);
  };

  // useEffect(() => {
  //   let ignore = false;
  //   const fetchCountry = async () => {
  //     const url = `https://restcountries.com/v2/alpha/${countryCode}`;
  //     setLoading(true);

  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();

  //       if (ignore === false) {
  //         setData(data);
  //         setError(null);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       if (ignore === false) {
  //         setError(error);
  //         setData(null);
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchCountry();

  //   return () => {
  //     ignore = true;
  //   };
  // }, [countryCode]);

  useEffect(() => {
    let ignore = false;

    const fetchCountry = async () => {
      const url = `https://restcountries.com/v2/alpha/${countryCode}`;
      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (ignore === false) {
          setData(data);
          setLoading(false);
          setError(null)
        }

      } catch(error) {
        if (ignore === false) {
          setError(error);
          setData(null);
          setLoading(false);
        }
      }
    }

    fetchCountry()

    return () => {
      ignore = true;
    }
  }, [countryCode])

  console.log("country", countryCode);
  return (
    <section>
      <header>
        <h1>Country Info:</h1>

        <label htmlFor="country">Select a country:</label>
        <div>
          <select id="country" value={countryCode} onChange={handleChange}>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="CN">China</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IN">India</option>
            <option value="JP">Japan</option>
            <option value="MX">Mexico</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States of America</option>
          </select>
          {isLoading && <span>Loading...</span>}
          {error && <span>{error.message}</span>}
        </div>
      </header>

      {data && (
        <article>
          <h2>{data.name}</h2>
          <table>
            <tbody>
              <tr>
                <td>Capital:</td>
                <td>{data.capital}</td>
              </tr>
              <tr>
                <td>Region:</td>
                <td>{data.region}</td>
              </tr>
              <tr>
                <td>Population:</td>
                <td>{data.population}</td>
              </tr>
              <tr>
                <td>Area:</td>
                <td>{data.area}</td>
              </tr>
            </tbody>
          </table>
        </article>
      )}
    </section>
  );
}
