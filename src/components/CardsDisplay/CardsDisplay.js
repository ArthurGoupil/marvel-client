import React from 'react';
import './CardsDisplay.css';

const CardsDisplay = ({ name, description, thumbnail }) => {
  return (
    <li className="card-wrapper d-flex">
      <div className="card d-flex">
        <img
          className="card-img"
          src={thumbnail.path + '/standard_xlarge.' + thumbnail.extension}
          alt={name}
        />
        <div className="card-text">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </li>
  );
};

export default CardsDisplay;
