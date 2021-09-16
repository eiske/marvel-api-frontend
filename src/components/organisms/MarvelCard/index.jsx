import React from "react";

import "./styles.css";

const MarvelCard = ({ name, description, thumb, ext }) => {
  const src = `${thumb}.${ext}`;

  return (
    <div className="marvel-card">
      <div className="card-thumb">
        <figure className="img-wrapper">
          <img src={src} alt={name} />
        </figure>
      </div>
      <p className="description">{description}</p>
      <h4 className="name">{name}</h4>
    </div>
  );
};

export default MarvelCard;
