import { TextField } from '@material-ui/core';
import React, { useState, useMemo, useEffect } from 'react';

import { getEpisodes } from '../../API/Episodes/Episodes';
import { NothingFound } from '../NothingFound/NothingFound';
import { Pagination } from '../Pagination';

import { EpisodesList } from './EpisodesList';

import './EpisodesPage.scss';

export const EpisodesPage = () => {
  const [currentPageId, setCurrentPageId] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const [defaultEpisodes, setDefaultEpisodes] = useState([]);
  const [
    filteredEpisodes,
    setFilteredEpisodes,
  ] = useState(defaultEpisodes);
  const [name, setName] = useState('');

  useEffect(() => {
    getEpisodes()
      .then((data) => {
        setDefaultEpisodes(data.results);
        setFilteredEpisodes(data.results);
        setPageCount(data.info.pages);
      });
  }, []);

  useEffect(() => {
    getEpisodes(`?page=${currentPageId}`)
      .then((data) => {
        setDefaultEpisodes(data.results);
        setFilteredEpisodes(data.results);
      });
  }, [currentPageId]);

  useMemo(() => {
    let result = defaultEpisodes;

    if (name) {
      result = result.filter(
        character => character.name.toLowerCase()
          .startsWith(name.toLowerCase()),
      );
    }

    if (name.length === 0) {
      setFilteredEpisodes(defaultEpisodes);
    } else {
      setFilteredEpisodes(result);
    }
  }, [name, defaultEpisodes]);

  const changePage = (pageId) => {
    setName('');
    setCurrentPageId(pageId);
  };

  return (
    <div className="EpisodesPage container">
      <div>
        <TextField
          id="standard-secondary"
          label="Filter episodes by Name"
          // color="warning"
          value={name}
          onChange={event => setName(event.target.value)}
          className="EpisodesPage__filter"
        />
        {filteredEpisodes.length > 0
          ? <EpisodesList movies={filteredEpisodes} />
          : <NothingFound />
        }
      </div>

      <Pagination
        currentPageId={currentPageId}
        pageCount={pageCount}
        onClick={changePage}
      />
    </div>
  );
};
