const pokemonsControllers = require("../controllers/pokemonsControllers");

const getPokemonsById = async (req, res) => {
  try {
    const pokemonId = req.params.idPokemon;

    const pokemon = await pokemonsControllers.getPokemonsById(pokemonId);

    if (!pokemon) {
      return res.status(404).json({ error: "El pokemon no fue encontrado" });
    }
    res.json(pokemon);
  } catch (error) {
    console.error("Error al procesar la solicitud", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getPokemonsById,
};
