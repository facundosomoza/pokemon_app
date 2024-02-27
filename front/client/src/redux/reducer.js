import {
  GET_POKEMONS,
  GET_POKEMON_NAME,
  GET_TYPES,
  ORDER_BY_NAME,
  FILTER_BY_TYPE,
  ORDER_BY_ATTACK,
  ORDER_BY_HP,
  FILTER_CREATED,
} from "./actions";

let initialState = {
  pokemons: [],
  allPokemons: [],
  searchResults: [],
  types: [],
  notFound: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        notFound: false,
      };
    case GET_POKEMON_NAME:
      return {
        ...state,
        searchResults: action.payload,
        notFound: action.payload.length === 0,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ORDER_BY_NAME:
      // Clonar el array de pokemons
      const sortedAll =
        action.payload === "asc"
          ? // Si el orden es ascendente, ordenar de A a Z
            [...state.pokemons].sort((a, b) => a.name.localeCompare(b.name))
          : // Si el orden es descendente, ordenar de Z a A
            [...state.pokemons].sort((a, b) => b.name.localeCompare(a.name));

      // Actualizar el estado con el nuevo orden de pokemons
      return {
        ...state,
        pokemons: sortedAll,
      };

    case FILTER_BY_TYPE:
      let filterType;
      if (action.payload === "All") {
        filterType = state.allPokemons;
      } else {
        filterType = state.allPokemons.filter(
          (pokemon) => pokemon.tipos && pokemon.tipos.includes(action.payload)
        );
      }
      return {
        ...state,
        pokemons: filterType,
      };

    case ORDER_BY_ATTACK:
      let sortedAttack = [...state.allPokemons];

      if (action.payload === "min") {
        sortedAttack.sort((a, b) => a.ataque - b.ataque);
      }
      if (action.payload === "max") {
        sortedAttack.sort((a, b) => b.ataque - a.ataque);
      }
      return {
        ...state,
        pokemons: sortedAttack,
      };
    case ORDER_BY_HP:
      let sortedHp = [...state.allPokemons];

      if (action.payload === "min") {
        sortedHp.sort((a, b) => a.vida - b.vida);
      }
      if (action.payload === "max") {
        sortedHp.sort((a, b) => b.vida - a.vida);
      }
      return {
        ...state,
        pokemons: sortedHp,
      };
    case FILTER_CREATED:
      const createdFilter =
        action.payload === "created"
          ? state.allPokemons.filter((e) => e.createdInDb)
          : state.allPokemons.filter((e) => !e.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
      };
    default:
      return state;
  }
};

export default rootReducer;
