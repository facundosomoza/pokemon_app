import React, { useState, useEffect } from "react";
import { getPokemons } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  orderByName,
  filterByType,
  orderByAttack,
  orderByHp,
  filterCreated,
} from "../redux/actions";

const SelectOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);

  const [, setOrden] = useState("");

  const handleSort = (e) => {
    e.preventDefault();

    dispatch(orderByName(e.target.value));

    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleButtonRealod = () => {
    dispatch(getPokemons());
  };

  const handleFilterTypes = (e) => {
    e.preventDefault();
    if (e.target.value !== "Tipos") {
      dispatch(filterByType(e.target.value));
    }
  };

  const handleSortAttack = (e) => {
    e.preventDefault();
    if (e.target.value !== "attack") dispatch(orderByAttack(e.target.value));

    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleSortHp = (e) => {
    e.preventDefault();
    if (e.target.value !== "jp") dispatch(orderByHp(e.target.value));

    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  };

  return (
    <div className="container">
      <button className="button" onClick={handleButtonRealod}>
        Reload
      </button>
      <select className="select" onChange={(e) => handleSort(e)}>
        <option value="asc">A - Z</option>
        <option value="des">Z - A</option>
      </select>
      <select className="select" onChange={(e) => handleFilterTypes(e)}>
        <option>Types</option>
        <option value="All">All</option>
        {allTypes?.map((e) => (
          <option key={e.id} value={e.name}>
            {e.name}
          </option>
        ))}
      </select>
      <select className="select" onChange={(e) => handleSortAttack(e)}>
        <option value="attack">Attack</option>
        <option value="min">min</option>
        <option value="max">max</option>
      </select>
      <select className="select" onChange={(e) => handleSortHp(e)}>
        <option value="hp">hp</option>
        <option value="min">min</option>
        <option value="max">max</option>
      </select>
      <select className="select" onChange={(e) => handleFilterCreated(e)}>
        <option value="All">Origin</option>
        <option value="created">Created</option>
        <option value="api">Api</option>
      </select>
    </div>
  );
};

export default SelectOrder;
