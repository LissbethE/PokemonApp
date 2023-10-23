import React from "react";

const Logo = ({ onCloseView }) => {
  return (
    <p className="logo" onClick={onCloseView}>
      Pokémon App
    </p>
  );
};

export default Logo;
