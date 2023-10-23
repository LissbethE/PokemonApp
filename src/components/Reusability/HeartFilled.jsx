import React from "react";
import { ImHeart } from "react-icons/im";

const HeartFilled = ({ onClick, classes }) => {
  return (
    <button className={`heart ${classes}`} onClick={onClick}>
      <ImHeart className="heart__icon" />
    </button>
  );
};

export default HeartFilled;
