import React, { useState, useMemo, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { getLocations } from '../../API/Locations/Locations';
import { Pagination } from '../Pagination';
import { LocationList } from './LocationList';

import './LocationPage.scss';
import { NothingFound } from '../NothingFound/NothingFound';

export const LocationPage = () => {
  const [currentPageId, setCurrentPageId] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const [defaultLocations, setDefaultLocations] = useState([]);
  const [
    filteredLocations,
    setFilteredLocations,
  ] = useState(defaultLocations);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');

  useEffect(() => {
    getLocations()
      .then((data) => {
        setDefaultLocations(data.results);
        setFilteredLocations(data.results);
        setPageCount(data.info.pages);
      });
  }, []);

  useEffect(() => {
    getLocations(`?page=${currentPageId}`)
      .then((data) => {
        setDefaultLocations(data.results);
        setFilteredLocations(data.results);
      });
  }, [currentPageId]);

  useMemo(() => {
    let result = defaultLocations;

    if (name) {
      result = result.filter(
        location => location.name.toLowerCase()
          .startsWith(name.toLowerCase()),
      );
    }

    if (type) {
      result = result.filter(
        location => location.type.toLowerCase()
          .startsWith(type.toLowerCase()),
      );
    }

    if (dimension) {
      result = result.filter(
        location => location.dimension.toLowerCase()
          .startsWith(dimension.toLowerCase()),
      );
    }

    if (name.length === 0 && type.length === 0 && dimension.length === 0) {
      setFilteredLocations(defaultLocations);
    } else {
      setFilteredLocations(result);
    }
  }, [name, type, dimension, defaultLocations]);

  const changePage = (pageId) => {
    setName('');
    setType('');
    setDimension('');
    setCurrentPageId(pageId);
  };

  return (
    <div className="LocationPage">
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <TextField
                  label="Name"
                  placeholder="Filter by Name"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </th>

              <th scope="col">
                <TextField
                  label="Type"
                  placeholder="Filter by Type"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={type}
                  onChange={event => setType(event.target.value)}
                />
              </th>

              <th scope="col">
                <TextField
                  label="Dimension"
                  placeholder="Fulter by Dimension"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dimension}
                  onChange={event => setDimension(event.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.length > 0
              && <LocationList locations={filteredLocations} />
            }
          </tbody>
        </table>
        {filteredLocations.length === 0 && <NothingFound />}
      </div>

      <Pagination
        currentPageId={currentPageId}
        pageCount={pageCount}
        onClick={changePage}
      />
    </div>
  );
};
