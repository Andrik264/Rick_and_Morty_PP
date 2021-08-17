import React, { useEffect, useMemo, useState } from 'react';

import { getCharacters } from '../../API/Characters/Charaters';
import { FilterInput } from '../FilterInput/FilterInput';
import { NothingFound } from '../NothingFound/NothingFound';
import { Pagination } from '../Pagination';
import { CharactersList } from './CharactersList';


import './CharactersPage.scss';

export const CharactersPage = () => {
  const [currentPageId, setCurrentPageId] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const [defaultCharacters, setDefaultCharacters] = useState([]);
  const [
    filteredCharacters,
    setFilteredCharacters,
  ] = useState(defaultCharacters);
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    getCharacters()
      .then((data) => {
        setDefaultCharacters(data.results);
        setFilteredCharacters(data.results);
        setPageCount(data.info.pages);
      });
  }, []);

  useEffect(() => {
    getCharacters(`?page=${currentPageId}`)
      .then((data) => {
        setDefaultCharacters(data.results);
        setFilteredCharacters(data.results);
      });
  }, [currentPageId]);

  useMemo(() => {
    let result = defaultCharacters;

    if (species) {
      result = result.filter(
        character => character.species.toLowerCase()
          .startsWith(species.toLowerCase()),
      );
    }

    if (status) {
      result = result.filter(
        character => character.status === status,
      );
    }

    if (gender) {
      result = result.filter(
        character => character.gender === gender,
      );
    }

    if (species.length === 0 && status.length === 0 && gender.length === 0) {
      setFilteredCharacters(defaultCharacters);
    } else {
      setFilteredCharacters(result);
    }
  }, [species, status, gender, defaultCharacters]);

  const changePage = (pageId) => {
    setSpecies('');
    setStatus('');
    setGender('');
    setCurrentPageId(pageId);
  };

  return (
    <div className="CharactersPage">
      <div className="CharactersPage__filterBlock">
        <FilterInput
          value={species}
          onChange={setSpecies}
          placeholder="Species"
        />

        <select value={status} onChange={event => setStatus(event.target.value)}>
          <option value="">All status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">unknown</option>
        </select>

        <select value={gender} onChange={event => setGender(event.target.value)}>
          <option value="">All gender</option>
          <option value="unknown">unknown</option>
          <option value="Female">Famale</option>
          <option value="Male">Male</option>
          <option value="Genderless">Genderless</option>
        </select>
      </div>

      {filteredCharacters.length > 0
        ? <CharactersList characters={filteredCharacters} />
        : <NothingFound />
      }
      {pageCount && (
        <Pagination
          currentPageId={currentPageId}
          pageCount={pageCount}
          onClick={changePage}
        />
      )}
    </div>
  );
};
