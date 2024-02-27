import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="button-container">
        <Link to="/pokemons" style={buttonStyle}>
          Home
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  position: "absolute",
  top: "140px" /* Margen de 100px desde la parte superior */,
  left: "50%",
  transform: "translateX(-50%)" /* Centra horizontalmente */,
  display: "inline-block",
  padding: "10px 20px",
  background: "linear-gradient(to bottom, #000000, #333333)",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "5px",
  border: "none",
};

export default Home;
