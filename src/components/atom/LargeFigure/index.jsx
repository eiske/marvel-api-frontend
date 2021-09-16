import React from "react";

import "./styles.css";

const LargeFigure = ({ srcImg, name }) => {
  return (
    <figure className="hero-wrapper">
      <img src={srcImg} alt={name} className="character" />
    </figure>
  );
};

export default LargeFigure;
