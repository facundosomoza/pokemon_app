import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonName, getPokemons } from "../redux/actions";

import linkin from "../img-pokemon/link.png";

const SearchBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [searchPokemon, setSearchPokemon] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const pokemonName = useSelector((state) => state.pokemons);

  const handlePokemon = (event) => {
    setSearchPokemon(event.target.value);
  };

  const handleSearchPokemon = () => {
    // Verificar si el campo de búsqueda está vacío
    if (!searchPokemon.trim()) {
      alert("Please, insert a Pokémon name.");
      return;
    }

    // Realizar la búsqueda del Pokémon
    dispatch(getPokemonName(searchPokemon))
      .then(() => {
        const foundPokemon = pokemonName.find(
          (pokemon) => pokemon.name === searchPokemon
        );
        if (foundPokemon) {
          console.log(`El Pokémon ${searchPokemon} fue encontrado.`);
          // Aquí puedes realizar acciones adicionales si se encuentra el Pokémon
          setSearchPerformed(true); // Marcar que se ha realizado una búsqueda
          setSearchPokemon(""); // Limpiar el campo de búsqueda
        } else {
          alert(`The Pokémon ${searchPokemon} does not exist.`);
          //dispatch(getPokemons());
        }
      })
      .catch((error) => {
        console.error("Error al buscar el Pokémon:", error);
        setSearchPerformed(false); // Marcar que no se ha realizado una búsqueda en caso de error
        setSearchPokemon(""); // Limpiar el campo de búsqueda
      });
  };

  return (
    <>
      <div className="search-bar">
        <div className="left-buttons">
          {/* Botones Home y Create */}
          {location.pathname !== "/pokemons" && (
            <Link to="/pokemons" style={buttonStyle}>
              Home
            </Link>
          )}
          {location.pathname !== "/createpokemon" && (
            <Link to="/createpokemon" style={buttonStyle}>
              Create Pokémon
            </Link>
          )}
          <a
            href="https://www.linkedin.com/in/fnsomoza/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkin} alt="LinkedIn" style={{ width: "17px" }} />
          </a>
        </div>
        <div className="right-input">
          {location.pathname === "/pokemons" && (
            <>
              <input
                type="text"
                placeholder="Search Pokémon"
                className="search-input"
                value={searchPokemon}
                onChange={handlePokemon}
              />
              <button className="button-search" onClick={handleSearchPokemon}>
                Search
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const buttonStyle = {
  padding: "9px 18px",
  background: "linear-gradient(to bottom right, #ffffff, #808080, #c0c0c0)",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "5px",
  border: "none",
  marginRight: "15px",
};

export default SearchBar;
