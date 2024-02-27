const pokemonsControllers = require("../controllers/pokemonsControllers");

const getTypesPokemons = async (req, res) => {
  try {
    const pokemonTypes = await pokemonsControllers.getTypesPokemons();

    res.json(pokemonTypes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTypesPokemons,
};
