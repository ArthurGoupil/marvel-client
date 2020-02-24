import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CharactersCardsDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CharactersCardsDisplay = ({
  name,
  description,
  thumbnail,
  id,
  user,
  userFavourites,
  setUserFavourites
}) => {
  // FUNCTION CALLED TO ADD A THE CHARACTER TO THE USER FAVOURITE
  const sendCharactersFavourite = async () => {
    if (!userFavourites.characters.includes(id)) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND + '/character/favourite',
          { characterId: id },
          {
            headers: {
              Authorization: 'Bearer ' + user.token
            }
          }
        );
        const copiedUserFavourites = { ...userFavourites };
        copiedUserFavourites.characters.push(id);
        setUserFavourites(copiedUserFavourites);
        console.log(response.data);
      } catch (e) {
        console.error(e.message);
      }
    } else {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND + '/character/favourite/remove',
          { characterId: id },
          {
            headers: {
              Authorization: 'Bearer ' + user.token
            }
          }
        );
        const copiedUserFavourites = { ...userFavourites };
        const characterIndex = copiedUserFavourites.characters.indexOf(id);
        copiedUserFavourites.characters.splice(characterIndex);
        setUserFavourites(copiedUserFavourites);
        console.log(response.data);
      } catch (e) {
        console.error(e.message);
      }
    }
  };

  return (
    <li className="character-card-wrapper d-flex">
      {user &&
        (userFavourites.characters.includes(id) ? (
          <FontAwesomeIcon
            onClick={sendCharactersFavourite}
            className="character-card-icon-favourite-solid"
            icon={['fas', 'star']}
          />
        ) : (
          <FontAwesomeIcon
            onClick={sendCharactersFavourite}
            className="character-card-icon-favourite-regular"
            icon={['far', 'star']}
          />
        ))}
      <Link
        to={`/character/${id}/page=1`}
        className="character-card-link d-flex"
      >
        <div className="character-card d-flex">
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
