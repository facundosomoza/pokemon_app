const { Pokemon, Type } = require("../db");

const axios = require("axios");

const getPokemonsFromDataBase = async () => {
  try {
    //Traigo todos los pokemons desde la db
    //Con el include, arma el join entre la tabla Pokemon y Type
    const dataBasePokemons = await Pokemon.findAll({
      include: {
        model: Type,
      },
    });

    /*Recorro el resultado que traje de la db y
     le doy forma al json para enviarlo al front
    */
    const result = dataBasePokemons.map((dataBasePokemon) => {
      const {
        id,
        name,
        image,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        Types,
      } = dataBasePokemon;

      return {
        id,
        name,
        image,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        tipos: Types.map((type) => ({ id: type.id, name: type.name })),
        createdInDb: true,
      };
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getPokemonsFromAPI = async () => {
  const apiResult = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=120"
  );

  const pokemonsFromApi = apiResult.data.results;

  const dataPokemonsFromApi = pokemonsFromApi.map(async (pokemonFromApi) => {
    const pokemonInfo = await axios.get(pokemonFromApi.url);
    const pokemon = pokemonInfo.data;
    return {
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
      createdInDb: false,
    };
  });

  const allApiPokemons = await Promise.all(dataPokemonsFromApi);

  return allApiPokemons;
};

const getPokemons = async (pokemonName) => {
  //Traigo los pokemons desde la base de datos
  const pokemonsFromDataBase = await getPokemonsFromDataBase();

  //Traigo los pokemons desde la API
  const pokemonsFromAPI = await getPokemonsFromAPI();

  //Junto los dos resultados (API + DB)
  const allPokemonsFromDataBaseAndApi = [
    ...pokemonsFromDataBase,
    ...pokemonsFromAPI,
  ];

  if (pokemonName) {
    /*Con filter, recorro todos los resultados, y los que coincidan con el 
    nombre del pokemon buscado los retorna en un nuevo array
    */
    const result = allPokemonsFromDataBaseAndApi.filter(
      (pokemon) => pokemon.name === pokemonName
    );

    return result;
  }

  return allPokemonsFromDataBaseAndApi;
};

const getPokemonsById = async (pokemonId) => {
  const totalPokemons = await getPokemons();
  const pokeById = await totalPokemons.filter(
    (totalPokemon) => String(totalPokemon.id) === pokemonId
  );
  if (pokeById.length > 0) {
    return pokeById;
  } else {
    throw new Error(`Pokemon no encontrado, id: ${pokemonId} incorrecto`);
  }
};

const createPokemon = async (pokemonData) => {
  const {
    name,
    image,
    vida,
    ataque,
    defensa,
    velocidad = null,
    altura = null,
    peso = null,
    types,
  } = pokemonData;

  try {
    const [pokemon, created] = await Pokemon.findOrCreate({
      where: { name: name },
      defaults: {
        name,
        image,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
      },
    });
    if (!created) {
      throw new Error("Este pokemon ya existe en la base de datos");
    }

    console.log("POKEMON CREADO...", pokemon);

    const typesDb = await Type.findAll({ where: { name: types } });

    await pokemon.addTypes(typesDb);

    return pokemon;
  } catch (error) {
    throw new Error(`Error al crear el Pokémon: ${error.message}`);
  }
};

const getTypeIdFromUrl = (typeUrl) => {
  const urlParts = typeUrl.split("/");

  return urlParts[urlParts.length - 2];
};

const getTypesPokemonFromApi = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const typesDataFromApi = await response.data.results;

    const types = typesDataFromApi.map((type) => ({
      id: getTypeIdFromUrl(type.url),
      name: type.name,
    }));

    for (const type of types) {
      await Type.findOrCreate({
        where: { id: type.id, name: type.name },
      });
    }

    return types;
  } catch (error) {
    console.error("Error to get types from API", error);
    throw new Error("Error to get types from API");
  }
};

const getTypesPokemons = async () => {
  try {
    const typesFromApi = await getTypesPokemonFromApi();

    console.log(typesFromApi);

    return typesFromApi;
  } catch (error) {
    console.error("Error to get types of pokemons", error);
    throw new Error("Error to get types of pokemons");
  }
};

module.exports = {
  getPokemons,
  getPokemonsById,
  createPokemon,
  getTypesPokemons,
};
