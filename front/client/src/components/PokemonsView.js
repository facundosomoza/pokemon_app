import React, { useEffect, useState } from "react";

import SelectOrder from "./SelectOrder";

import { getPokemons, getTypes, getPokemonName } from "../redux/actions";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";
import Pagination from "./Pagination";

export const PokemonsView = () => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [currentPokemons, setCurrentPokemons] = useState([]);
  const pokemonTo = currentPage * pokemonsPerPage;
  const pokemonFrom = pokemonTo - pokemonsPerPage;

  console.log({ pokemonFrom });

  console.log({ currentPokemons });

  useEffect(() => {
    setCurrentPokemons(pokemons.slice(pokemonFrom, pokemonTo));
  }, [pokemons, currentPage]);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const handlePokemonClick = (pokemon) => {
    console.log("Here..");
    history.push({
      pathname: "/pokemonviewdetail",
      state: { pokemon: pokemon },
    });
  };

  const setPagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>{location.pathname === "/pokemons" && <SelectOrder />}</div>
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={pokemons.length}
        pagination={setPagination}
        page={currentPage}
      />
      <div className="pokemon-list">
        <ul className="pokemon-cards">
          {currentPokemons.map((pokemon) => {
            console.log(`${pokemon.createdInDb}-${pokemon.id}`);
            return (
              <li
                key={`${pokemon.createdInDb}-${pokemon.id}`}
                className="pokemon-card"
                onClick={() => {
                  handlePokemonClick(pokemon);
                }}
              >
                <div className="pokemon-card-inner">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                  <div className="pokemon-details">
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <ul className="pokemon-stats">
                      <li>
                        <strong>Type:</strong>

                        {pokemon.tipos.map((tipo) => (
                          <span
                            key={`${pokemon.createdInDb}-${pokemon.id}-${tipo}`}
                          >
                            {" "}
                            {tipo}
                          </span>
                        ))}
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
