import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonFavorites = ({
  data,
  onDeleteFavorite,
  onMoreDetails,
  onShowDetails,
}) => {
  return (
    <section className="favorites">
      <h1 className="heading-1 heading-1--card-fav">
        💖 My Favorites Pokémons
      </h1>

      <ul className="favorites__list">
        {data?.map((poke) => (
          <PokemonCard
            key={poke.id}
            poke={poke}
            onDeleteFavorite={onDeleteFavorite}
            onMoreDetails={onMoreDetails}
            onShowDetails={onShowDetails}
          />
        ))}
      </ul>
    </section>
  );
};

export default PokemonFavorites;
