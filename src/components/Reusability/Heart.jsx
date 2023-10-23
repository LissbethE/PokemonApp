import React from "react";
import { TfiHeart } from "react-icons/tfi";

const Heart = ({ onClick }) => {
  return (
    <button className="heart" onClick={onClick}>
      <TfiHeart className="heart__icon" />
    </button>
  );
};

export default Heart;
