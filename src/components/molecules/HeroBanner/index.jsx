import React from "react";
import loadable from "@loadable/component";

import "./styles.css";

const LargeFigure = loadable(() => import("../../atom/LargeFigure"));

const HeroBanner = ({ srcImg, name }) => {
  return (
    <section className="hero-banner">
      <div className="hero-container">
        <LargeFigure srcImg={srcImg} name={name} />
        <h1 className="name">{name}</h1>
      </div>
    </section>
  );
};

export default HeroBanner;
