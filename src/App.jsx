import './App.css'
import { useState, useEffect } from "react";

import CoinInfo from './Components/CoinInfo.jsx'
// import CoinInfo from './Components/CoinInfo';
// import CoinInfo from "./Components/coinInfo";
export default function App() {

  const API_KEY = "3eb132ce569ebbf66ab36f1ec1a3ec497afe367449cba6794dc6cc5718b64cfd";
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key"
        + API_KEY
        // how do we call an API using fetch? 
      );

      const json = await response.json();
      setList(json);

      console.log(list)

    };

    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };
  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
    type="text"
    placeholder="Search..."
    onChange={(inputString) => searchItems(inputString.target.value)}
  />
      <ul>
        {console.log(list)}
        {list && Object.entries(list.Data).map(([coin]) =>
          list.Data[coin].PlatformType === "blockchain" ? (
            <CoinInfo
  image={list.Data[coin].ImageUrl}
  name={list.Data[coin].FullName}
  symbol={list.Data[coin].Symbol}
  />

            
          ) : null
        )}
      </ul>
      
    </div>
  )
}
