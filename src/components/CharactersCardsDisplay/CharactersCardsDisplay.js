import React from 'react';
import { Link } from 'react-router-dom';
import './CharactersCardsDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CharactersCardsDisplay = ({ name, description, thumbnail, id }) => {
  const cardLink = `/character/${id}/page=1`;
  return (
    <li className="character-card-wrapper d-flex">
      <Link to={cardLink} className="character-card-link d-flex">
        <div className="character-card d-flex">
          <FontAwesomeIcon
            className="character-card-icon-favourite"
            icon="star"
          />
          <img
            className="character-card-img"
            src={thumbnail.path + '/standard_xlarge.' + thumbnail.extension}
            alt={name}
          />
          <div className="character-card-text">
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CharactersCardsDisplay;
