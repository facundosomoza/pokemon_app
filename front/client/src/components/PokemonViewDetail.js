import React from "react";

import { useLocation } from "react-router-dom";

const PokemonViewDetail = () => {
  const location = useLocation();
  const { pokemon } = location.state;

  return (
    <div className="centered-card">
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <div className="centered-content">
        <div>
          <strong>Name:</strong> {pokemon.name}
        </div>

        <div>
          <strong>Hp:</strong> {pokemon.vida}
        </div>
        <div>
          <strong>Attack:</strong> {pokemon.ataque}
        </div>
        <div>
          <strong>Defence:</strong> {pokemon.defensa}
        </div>
        <div>
          <strong>Speed:</strong> {pokemon.velocidad}
        </div>
        <div>
          <strong>Height:</strong> {pokemon.altura}
        </div>
        <div>
          <strong>Weight:</strong> {pokemon.peso}
        </div>

        <div>
          <strong>Types:</strong>
          {pokemon.tipos.map((tipo) => (
            <span> {tipo}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonViewDetail;

/*
 id: pokemon.id,
      name: pokemon.name,
      tipos: pokemon.types.map((poke) => poke.type.name),
      image: pokemon.sprites.other.home.front_default,
      vida: pokemon.stats[0].base_stat,
      ataque: pokemon.stats[1].base_stat,
      defensa: pokemon.stats[2].base_stat,
      velocidad: pokemon.stats[5].base_stat,
      altura: pokemon.height,
      peso: pokemon.weight,
*/
