import { useState } from "react";
import Display from "./Display";

const Search = ({data}) => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(null);

  const searchList = () => {
    const current =  data
      .filter(d => d
        .name
        .common
        .toLowerCase()
        .includes(search
          .toLowerCase()))
    if (current.length === 1) return <Display name={current[0].name.common} />
    if (current.length >= 10) return <p>Too many matches, specify another filter</p>
    return <ul>
      {
        current.map((d, i) =>
          <li key={d.name.common}>
            {d.name.common}
            <button onClick={() => setDisplay(<Display name={current[i].name.common} />)}>
              Show
            </button>
          </li>)
      }
    </ul>
  }

  return (
    display ||
    <div>
      <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
        <p>find countries</p>
        <input onChange={e => setSearch(e.target.value)}/>
      </div>
      { searchList() }
    </div>
  )
}

export default Search