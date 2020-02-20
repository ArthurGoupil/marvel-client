import React from 'react';
import './CharacterTopBloc.css';

const CharacterTopBloc = ({ characterData }) => {
  return (
    <div className="character-top-bloc-container d-flex justify-center">
      <div className="character-top-bloc-background d-flex justify-center align-center">
        <div className="character-top-bloc d-flex align-center justify-center">
          <h2 className="character-top-bloc-title">{characterData.name}</h2>
          <img
            className="character-top-bloc-img"
            src={`${characterData.thumbnail.path}/landscape_incredible.${characterData.thumbnail.extension}`}
            alt={characterData.name}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterTopBloc;
