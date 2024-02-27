const { Router } = require("express");
const { getPokemons } = require("../handlers/getPokemons");
const { getPokemonsById } = require("../handlers/getPokemonsById");
const { createPokemon } = require("../handlers/createPokemon");

const router = Router();

router.get("/", getPokemons);

router.get("/:idPokemon", getPokemonsById);

router.post("/pokemons/create", createPokemon);

module.exports = router;
