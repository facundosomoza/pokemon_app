import axios from "axios";
//ACTIOS TYPE
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_TYPES = "GET_TYPES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const ORDER_BY_HP = "ORDER_BY_HP";
export const FILTER_CREATED = "FILTER_CREATED";
//ACTIONS
export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001");
      return dispatch({ type: GET_POKEMONS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPokemonName = (pokemonName) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/?name=${pokemonName}`
      );
      console.log(response.data);
      if (response.data.length > 0) {
        return dispatch({ type: GET_POKEMONS, payload: response.data });
      }
    } catch (error) {
      alert("nobre de pokemon no existe");
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/types");
      return dispatch({ type: GET_TYPES, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPokemons = (info, history) => {
  console.log("formData...", info);
  return async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/pokemons/create",
        info
      );
      alert("Pokemon was created!");

      history.push("/pokemons");
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

export const orderByAttack = (payload) => {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
};

export const orderByHp = (payload) => {
  return {
    type: ORDER_BY_HP,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};
