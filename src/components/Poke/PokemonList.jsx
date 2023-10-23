import React from "react";
import PokemonItem from "./PokemonItem";
import ErrorMessage from "../Reusability/ErrorMessage";
import Loader from "../Reusability/Loader";
import Search from "../Reusability/Search";
//import Search from "../Reusability/Search";

const PokemonList = ({
  data,
  onSelection,
  selectedPokemon,
  query,
  setQuery,
  error,
  isLoading,
}) => {
  const pokemonItem = data?.map((poke) => (
    <PokemonItem
      poke={poke}
      key={poke.id}
      onSelection={onSelection}
      selectedPokemon={selectedPokemon}
    />
  ));

  //////////////////////////////////////
  return (
    <ul className="poke-list">
      <Search query={query} setQuery={setQuery} />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && pokemonItem}
    </ul>
  );
};

export default PokemonList;
