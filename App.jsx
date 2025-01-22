import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch Pokémon Data from API
  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((response) => {
        const results = response.data.results;
        const fetchData = results.map(async (poke) => {
          const details = await axios.get(poke.url);
          return {
            name: poke.name,
            image: details.data.sprites.front_default,
            id: details.data.id
          };
        });

        Promise.all(fetchData).then((data) => setPokemon(data));
      })
      .catch((error) => console.log(error));
  }, []);

  // Search Functionality
  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Pokemon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <div className="card-container">
        {filteredPokemon.map((poke) => (
          <div key={poke.id} className="card">
            <img src={poke.image} alt={poke.name} />
            <h3>{poke.name.toUpperCase()}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
