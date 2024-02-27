const pokemonsControllers = require("../controllers/pokemonsControllers");

const getPokemons = async (req, res) => {
  try {
    // Obtener el nombre del pokemon de los parámetros de consulta (si está presente)
    const pokemonName = req.query.name ? req.query.name : "";

    // Si no se proporciona un nombre de pokemon, se obtienen todos los pokemons
    console.log("Se solicita el listado de todos los pokemons");

    // Llamar al controlador para obtener todos los pokemons
    const pokemons = await pokemonsControllers.getPokemons(pokemonName);

    // Enviar la lista de pokemons como respuesta
    res.json(pokemons);
  } catch (error) {
    // Manejar errores
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getPokemons,
};
