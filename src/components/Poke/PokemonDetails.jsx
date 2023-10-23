import React from "react";
import typeIcon from "../../typeIcon";

const PokemonDetails = ({ data }) => {
  const icon = typeIcon(data);

  return (
    <section className="pokemonDetails">
      <h2 className="pokemonDetails__type heading-2">
        <span>{icon}</span>
        {data?.types[0].type.name.replace(/^./, (str) => str.toUpperCase())}
      </h2>

      <div className="pokemonDetails__body">
        <p className="paragraph">
          <span className="pokemonDetails__span">Species:</span>
          {data.species.name}
        </p>

        <p className="paragraph">
          <span className="pokemonDetails__span">Weight:</span>
          {data.weight} lbs
        </p>

        <p className="paragraph">
          <span className="pokemonDetails__span">Height:</span>
          {data.height}0 cm
        </p>

        <p className="paragraph">
          <span className="pokemonDetails__span">Id:</span>
          {data.id}
        </p>
      </div>

      <div className="pokemonDetails__box">
        <div className="pokemonDetails__abilities">
          <h3 className="heading-3">🫧 Abilities</h3>

          <div className="pokemonDetails__abilities-box">
            {data.abilities.map((ab, id) => (
              <p key={id} className="paragraph">
                {ab.ability.name.replace(/^./, (str) => str.toUpperCase())}
              </p>
            ))}
          </div>
        </div>

        <div className="pokemonDetails__stats">
          <h3 className="heading-3">🫧 Stats</h3>

          <div className="pokemonDetails__stats-box">
            {data.stats.map((stat, id) => (
              <p key={id} className="paragraph">
                <span className="pokemonDetails__span">
                  {stat.stat.name.replace(/^./, (str) => str.toUpperCase())}:
                </span>

                <span>{stat.base_stat}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokemonDetails;
