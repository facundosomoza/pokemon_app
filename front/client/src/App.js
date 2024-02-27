import "./App.css";

import Home from "./components/Home";
import { PokemonsView } from "./components/PokemonsView";
import SearchBar from "./components/SearchBar";
import PokemonViewDetail from "./components/PokemonViewDetail";
import CreatePokemon from "./components/CreatePokemon";
import SelectOrder from "./components/SelectOrder";

import { Route, Switch, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {!isHome && <SearchBar />}
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/pokemons" component={PokemonsView}></Route>
        <Route path="/pokemonviewdetail" component={PokemonViewDetail}></Route>
        <Route path="/createpokemon" component={CreatePokemon}></Route>
        <Route path="/selectorder" component={SelectOrder}></Route>
      </Switch>
    </>
  );
}

export default App;
