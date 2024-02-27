const { Router } = require("express");
const { getTypesPokemons } = require("../handlers/getTypesPokemons");

const router = Router();

router.get("/", getTypesPokemons);

module.exports = router;
