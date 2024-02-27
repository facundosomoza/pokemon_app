import React, { useEffect } from "react";

import SelectOrder from "./SelectOrder";

import { getPokemons, getTypes, getPokemonName } from "../redux/actions";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";

export const PokemonsView = () => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons);

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

  return (
    <>
      <div>{location.pathname === "/pokemons" && <SelectOrder />}</div>

      <div className="pokemon-list">
        <ul className="pokemon-cards">
          {pokemons.map((pokemon) => (
            <li
              key={pokemon.id}
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
                        <span> {tipo.name}</span>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
