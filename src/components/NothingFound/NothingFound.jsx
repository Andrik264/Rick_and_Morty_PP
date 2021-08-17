import React from 'react';
import './NothingFound.scss';

export const NothingFound = () => {
  return (
    <div className="container">
      <div className="nothingFound">
        <h2>Nothing found</h2>
        <img
          src="https://static.posters.cz/image/1300/%D0%9F%D0%BB%D0%B0%D0%BA%D0%B0%D1%82%D0%B8/rick-morty-season-4-i86560.jpg"
          alt="nothing found"
          className="nothingFound-img"
        />
      </div>
    </div>
  );
};

