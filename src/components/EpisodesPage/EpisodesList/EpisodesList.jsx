import React from 'react';
import { EpisodeCard } from '../EpisodeCard/EpisodeCard';

import './EpisodesList.scss';

export const EpisodesList = ({ movies }) => {

  return (
    <div className="EpisodesList">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Episode №</th>
            <th scope="col">Name</th>
            <th scope="col">Air date</th>
            <th scope="col">Characters</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <React.Fragment key={movie.id}>
              <EpisodeCard movie={movie} />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
