import React from "react";

const PokemonItem = ({ poke, onSelection, selectedPokemon }) => {
  const isSelected = selectedPokemon?.id === poke.id;

  return (
    <li
      className={isSelected ? "poke-list__item active" : "poke-list__item"}
      onClick={() => onSelection(poke)}
    >
      <img
        src={poke.sprites.other["official-artwork"].front_default}
        alt={poke.name}
        className="poke-list__img"
      />

      <p className="paragraph">
        {poke.name.replace(/^./, (str) => str.toUpperCase())}
      </p>
    </li>
  );
};

export default PokemonItem;
