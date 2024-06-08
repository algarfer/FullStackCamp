import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setData(response.data))
  }, []);

  return <Search data={data || []}/>
}

export default App
