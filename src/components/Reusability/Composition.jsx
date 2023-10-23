import React from "react";
import Tilt from "react-parallax-tilt";

const Composition = ({ image, classes }) => {
  return (
    <figure>
      <Tilt
        glarePosition="all"
        perspective={500}
        gyroscope={true}
        scale={1.02}
        style={{ transformStyle: "preserve-3d" }}
        className={`composition composition--margin-bottom ${classes}`}
      >
        <img
          src={image}
          alt="pokemon img"
          className="composition__img"
          style={{ transform: "translateZ(60px)" }}
        />
      </Tilt>
    </figure>
  );
};

export default Composition;

/*
 glarePosition="all"
        perspective={500}
        gyroscope={true}
        scale={1.02}
        style={{ transformStyle: "preserve-3d" }}
        className={`composition composition--margin-bottom ${classes}`} */
