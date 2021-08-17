import React from 'react';

import { CharacterCard } from '../CharactersCard';

import './CharactersList.scss';

export const CharactersList = ({ characters }) => {

  return (
    <div className="CharactersList">
      <ul className="CharactersList__list">
        {characters.map(character => (
          <li key={character.id} className="CharactersList__item">
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
    </div>
  );
};
