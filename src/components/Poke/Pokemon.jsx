import React, { useEffect } from "react";

import Btn from "../Reusability/Btn";
import Composition from "../Reusability/Composition";
import Heart from "../Reusability/Heart";
import HeartFilled from "../Reusability/HeartFilled";

import typeIcon from "../../typeIcon";

const Pokemon = ({
  data,
  addFavorite,
  onAddFavorite,
  onDeleteFavorite,
  onShowDetails,
  onMoreDetails,
  btnTxt,
}) => {
  const icon = typeIcon(data);
  const isInDetail = btnTxt === "💖 Add to my favorites";
  const name = data?.name.replace(/^./, (str) => str.toUpperCase());
  const isPokemonAdded = addFavorite.map((poke) => poke?.id).includes(data.id);

  //////////////////////////////////////

  const compBtn = (
    <>
      {!isPokemonAdded ? (
        <Btn classBtn="button" onClick={handleAdd}>
          {btnTxt}
        </Btn>
      ) : (
        <Btn classBtn="button" onClick={() => onDeleteFavorite(data.id)}>
          ❌ Remove from favorites
        </Btn>
      )}
    </>
  );

  const compHeart = (
    <>
      <Btn classBtn="button" onClick={handleDetails}>
        {btnTxt}
      </Btn>

      {!isPokemonAdded ? (
        <Heart onClick={handleAdd} />
      ) : (
        <HeartFilled onClick={() => onDeleteFavorite(data.id)} />
      )}
    </>
  );

  //////////////////////////////////////

  function handleAdd() {
    const newPokemonAdded = {
      id: data.id,
      name: data.name,
      types: data.types,
      image: data?.sprites.other["official-artwork"].front_default,
      abilities: data.abilities,
      sprites: data?.sprites,
      species: data.species,
      weight: data.weight,
      height: data.height,
      stats: data.stats,
    };

    onAddFavorite(newPokemonAdded);
  }

  function handleDetails() {
    onShowDetails();
    onMoreDetails(data);
  }

  //////////////////////////////////////

  useEffect(() => {
    if (!data.name) return;

    document.title = `Pokémon | ${icon + name}`;

    // Cleaning up the title
    return () => (document.title = "Pokémon App");
  }, [data.name, icon, name]);

  //////////////////////////////////////
  return (
    <div className="pokemon">
      <h1 className="heading-1 heading-1--marginB">{name}</h1>

      <Composition
        image={data?.sprites.other["official-artwork"].front_default}
      />

      {isInDetail ? compBtn : compHeart}
    </div>
  );
};

export default Pokemon;
