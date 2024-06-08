import { useState } from "react";
import Display from "./Display";

const Search = ({data}) => {
  const [search, setSearch] = useState("");

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
    return <ul>{ current.map(d => <li key={d.name.common}>{d.name.common}</li>) }</ul>
  }

  return (
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