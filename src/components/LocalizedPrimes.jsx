import * as React from "react";
import { calculatePrime, translations, formatNumberToString } from "./utils";
import {useState} from 'react';

// Complete the app so that the user can change their locale as well as iterate through every prime number. Take special care to only re-calculate the prime number when the user clicks NEXT PRIME.

// TASKS
// Increment the prime number count when the button is clicked
// Change the language when the select option is changed
// Memoize nthprime so that it's only re-calculated when count changes


export default function LocalizedPrimeNumbers() {

  const [locale, setLocale] = useState("en-US")
 const [count, setCount]= useState(1)


const handleClick = () => {
  setCount(count + 1)
}


  const nthprime = React.useMemo(() => {
    console.log('calculate')
    return calculatePrime(count)
  }, [count])

  // const nthprime = useCallback(() => {
  //   calculatePrime(count)
  // }, [count])

 const handleLocaleChange = (e) => {
   setLocale(e.target.value)
 }

  console.log('reander')
  return (
    <div>
      <header>
        <select value={locale} onChange={handleLocaleChange}>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español (ES)</option>
        </select>

        <button className="primary" onClick={handleClick}>
          {translations[locale].nextPrime}
        </button>
      </header>
      <p>
        {translations[locale].nthPrime(
          formatNumberToString(count, locale),
          nthprime
        )}
      </p>
    </div>
  );
}
