import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { createPokemons } from "../redux/actions";

import { useHistory } from "react-router-dom";

const CreatePokemon = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const pokemonTypes = useSelector((state) => state.types);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const EMPTY_STATE = {
    name: "",
    image: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    types: [],
  };

  const EMPTY_ERROR_MESSAGES = {
    name: "",
    image: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    types: "",
  };

  const [formData, setFormData] = useState({ ...EMPTY_STATE });

  const [errorMessages, setErrorMessages] = useState(EMPTY_ERROR_MESSAGES);

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

  const validateForm = () => {
    let isValid = true;

    const newErrorMessages = { ...EMPTY_ERROR_MESSAGES };

    if (!formData.name.trim()) {
      newErrorMessages.name = "Please, insert a Pokémon name.";
      isValid = false;
    }
    if (!formData.image.trim()) {
      newErrorMessages.image = "Please, insert an image URL.";
      isValid = false;
    }
    if (!formData.vida.trim()) {
      newErrorMessages.vida = "Please, insert a value.";
      isValid = false;
    }
    if (!formData.ataque.trim()) {
      newErrorMessages.ataque = "Please, insert a value.";
      isValid = false;
    }
    if (!formData.defensa.trim()) {
      newErrorMessages.defensa = "Please, insert a value.";
      isValid = false;
    }
    if (!formData.velocidad.trim()) {
      newErrorMessages.velocidad = "Please, insert a value.";
      isValid = false;
    }
    if (!formData.altura.trim()) {
      newErrorMessages.altura = "Please, insert a value.";
      isValid = false;
    }
    if (!formData.peso.trim()) {
      newErrorMessages.peso = "Please, insert a value.";
      isValid = false;
    }
    if (formData.types.length === 0) {
      newErrorMessages.types = "Please, select a type.";
      isValid = false;
    }

    setErrorMessages(newErrorMessages);

    return isValid;
  };

  const handleSubmit = async (event) => {
    setIsSubmitted(true);

    event.preventDefault();

    if (validateForm()) {
      dispatch(createPokemons(formData, history));
    }
  };

  useEffect(() => {
    validateForm();
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
          <div className="error-message">
            {isSubmitted && errorMessages.name ? errorMessages.name : ""}
          </div>
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
        <div className="error-message">
          {isSubmitted && errorMessages.image ? errorMessages.image : ""}
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
        <div className="error-message">
          {isSubmitted && errorMessages.vida ? errorMessages.vida : ""}
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
        <div className="error-message">
          {isSubmitted && errorMessages.ataque ? errorMessages.ataque : ""}
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
        <div className="error-message">
          {isSubmitted && errorMessages.defensa ? errorMessages.defensa : ""}
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
        <div className="error-message">
          {isSubmitted && errorMessages.velocidad
            ? errorMessages.velocidad
            : ""}
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
        <div className="error-message">
          {isSubmitted && errorMessages.altura ? errorMessages.altura : ""}
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
        <div className="error-message">
          {isSubmitted && errorMessages.peso ? errorMessages.peso : ""}
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

        <div className="error-message">
          {isSubmitted && errorMessages.types ? errorMessages.types : ""}
        </div>

        <button type="submit" className="button-create-pk">
          Create Pokémon
        </button>
      </form>
    </div>
  );
};

export default CreatePokemon;
