import {useEffect, useState} from "react";
import axios from "axios";

const Display = ({name}) => {
  const [data, setData] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setData(response.data)
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data.capitalInfo.latlng[0]}&lon=${response.data.capitalInfo.latlng[1]}&appid=${import.meta.env.VITE_WEATHER_TOKEN}`)
          .then(response => setWeather(response.data))
      })
  }, []);

  return (
    data &&
    <div>
      <div>
        <h1>{data.name.common}</h1>
        <p>Capital: {data.capital}</p>
        <p>Area: {data.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(data.languages).map((lang) => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={data.flags.png} alt={data.flags.alt} style={{borderStyle: "solid"}} />
      </div>
      {
        weather && <div>
          <h2>Weather in {data.capital}</h2>

          <p>Temperature: {weather.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
               alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      }
    </div>
  )
}

export default Display