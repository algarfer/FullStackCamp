import {useEffect, useState} from "react";
import axios from "axios";

const Display = ({name}) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => setData(response.data))
  }, []);

  return (
    data &&
    <div>
      <h1>{data.name.common}</h1>
      <p>Capital: {data.capital}</p>
      <p>Area: {data.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(data.languages).map((lang) => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={data.flags.png} alt={data.flags.alt} style={{borderStyle: "solid"}}/>
    </div>
  )
}

export default Display