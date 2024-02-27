const pokemonControllers = require("../controllers/pokemonsControllers");

const createPokemon = async (req, res) => {
  //FALTA TYPES
  const { name, image, vida, ataque, defensa, velocidad, altura, peso, types } =
    req.body;

  const pokemonData = {
    name,
    image,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
    types, //CAMBIAR POR LOS TYPES QUE LLEGUEN
  };

  console.log({ pokemonData });

  try {
    const pokemon = await pokemonControllers.createPokemon(pokemonData);
    res.status(200).json({ pokemon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPokemon,
};
