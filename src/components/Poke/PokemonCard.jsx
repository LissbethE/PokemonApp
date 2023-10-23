import React from "react";
import Composition from "../Reusability/Composition";
import Btn from "../Reusability/Btn";
import HeartFilled from "../Reusability/HeartFilled";
import typeIcon from "../../typeIcon";

import Tilt from "react-parallax-tilt";

const PokemonCard = ({
  poke,
  onDeleteFavorite,
  onMoreDetails,
  onShowDetails,
}) => {
  const icon = typeIcon(poke);

  const handleDetails = function () {
    onShowDetails();
    onMoreDetails(poke);
  };

  return (
    <li>
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.5}
        glareColor="#ffcaca"
        glarePosition="all"
        scale={1.02}
        glareBorderRadius="10px"
        className="favorites__item"
      >
        <Composition image={poke.image} classes="composition--card-fav" />

        <HeartFilled
          onClick={() => onDeleteFavorite(poke.id)}
          classes="heart heart--card-fav"
        />

        <h3 className="heading-3">
          {poke.name.replace(/^./, (str) => str.toUpperCase())}
        </h3>

        <div className="favorites__info">
          <p className="paragraph">
            <span>{icon}</span>
            {poke.types[0].type.name.replace(/^./, (str) => str.toUpperCase())}
          </p>

          <p className="paragraph">Id: {poke.id}</p>
        </div>

        <Btn classBtn="button button--card-fav" onClick={handleDetails}>
          🔮 More Details
        </Btn>
      </Tilt>
    </li>
  );
};

export default PokemonCard;
