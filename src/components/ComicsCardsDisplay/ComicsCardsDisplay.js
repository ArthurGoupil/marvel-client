import React from 'react';
import './ComicsCardsDisplay.css';

const ComicsCardsDisplay = ({ title, description, thumbnail }) => {
  return (
    <li className="comic-card-wrapper d-flex">
      <div className="comic-card d-flex">
        <img
          className="comic-card-img"
          src={thumbnail.path + '/portrait_fantastic.' + thumbnail.extension}
          alt={title}
        />
        <div className="comic-card-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </li>
  );
};

export default ComicsCardsDisplay;
