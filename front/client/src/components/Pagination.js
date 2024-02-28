import React from "react";

export default function Pagination({
  pokemonsPerPage,
  allPokemons,
  pagination,
  page,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav style={paginationStyle}>
      <ul style={ulStyle}>
        {pageNumbers &&
          pageNumbers.map((number, index) => (
            <li key={index} style={liStyle}>
              <button onClick={() => pagination(number)} style={buttonStyle}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
};

const ulStyle = {
  listStyleType: "none",
  padding: 0,
  display: "flex",
};

const liStyle = {
  margin: "0 5px",
};

const buttonStyle = {
  padding: "5px 10px",
  border: "2px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
};
