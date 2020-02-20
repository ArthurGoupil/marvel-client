import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CharactersCardsDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CharactersCardsDisplay = ({ name, description, thumbnail, id, user }) => {
  const sendCharactersFavourite = async () => {
    try {
      const response = await axios.post(
        'https://marvel-goupil-backend.herokuapp.com/character/favourite',
        { characterId: id },
        {
          headers: {
            Autorization: 'Bearer ' + user.token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  const cardLink = `/character/${id}/page=1`;
  return (
    <li className="character-card-wrapper d-flex">
      <Link to={cardLink} className="character-card-link d-flex">
        <div className="character-card d-flex">
          {user && (
            <FontAwesomeIcon
              onClick={sendCharactersFavourite}
              className="character-card-icon-favourite"
              icon="star"
            />
          )}

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
