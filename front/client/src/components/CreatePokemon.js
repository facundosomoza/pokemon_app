import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { createPokemons } from "../redux/actions";

import { useHistory } from "react-router-dom";

const CreatePokemon = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const pokemonTypes = useSelector((state) => state.types);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    types: [],
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;

    const newFormData = { ...formData };

    const typeAlreadyExists = newFormData.types.find((type) => type === value);

    if (!typeAlreadyExists) {
      newFormData.types.push(value);
    } else {
      newFormData.types = newFormData.types.filter((type) => type !== value);
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    if (!formData.name.trim()) {
      setMessage("Please, insert a Pokémon name.");
      isValid = false;
    }
    if (!formData.image.trim()) {
      setMessage("Please, select an image.");
      isValid = false;
    }
    if (!formData.vida.trim()) {
      setMessage("Please, insert a value.");
      isValid = false;
    }
    if (!formData.ataque.trim()) {
      setMessage("Please, insert a value.");
      isValid = false;
    }
    if (!formData.defensa.trim()) {
      setMessage("Please, insert a value.");
      isValid = false;
    }
    if (!formData.velocidad.trim()) {
      setMessage("Please, insert a value.");
      isValid = false;
    }
    if (!formData.altura.trim()) {
      setMessage("Please, insert a value.");
      isValid = false;
    }
    if (!formData.peso.trim()) {
      setMessage("Please, insert a value.");
      isValid = false;
    }
    if (!formData.types.length === 0) {
      setMessage("Please, select a type.");
      isValid = false;
    }

    if (isValid) {
      dispatch(createPokemons(formData, history));
      setFormData({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
      });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="create-pokemon-container">
      <form onSubmit={handleSubmit} className="create-pokemon-form">
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <div>{message}</div>
        </div>
        <div className="form-group">
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Vida:
            <input
              type="number"
              name="vida"
              value={formData.vida}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Ataque:
            <input
              type="number"
              name="ataque"
              value={formData.ataque}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Defensa:
            <input
              type="number"
              name="defensa"
              value={formData.defensa}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Velocidad:
            <input
              type="number"
              name="velocidad"
              value={formData.velocidad}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Altura:
            <input
              type="number"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Peso:
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Type:
            <select
              className="select"
              name="type"
              value={formData.types}
              onChange={(e) => handleTypeChange(e)}
              multiple
            >
              {pokemonTypes?.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="button-create-pk">
          Create Pokémon
        </button>
      </form>
    </div>
  );
};

export default CreatePokemon;
