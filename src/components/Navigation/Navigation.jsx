import React from 'react';
import classNames from 'classnames';
import './Navigation.scss';

export const Navigation = ({ setPage, currentPage }) => {

  return (
    <div className="Navigation">
      <div className="Navigation__img-block">
        <img
          className="Navigation__image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/799px-Rick_and_Morty.svg.png"
          alt="Logotype"
        />
      </div>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button
              className={classNames('nav__link', { 'nav__link--active': currentPage === 'Characters' })}
              type="button"
              onClick={() => setPage('Characters')}
            >
              Characters
            </button>
          </li>
          <li className="nav__item">
            <button
              className={classNames('nav__link', { 'nav__link--active': currentPage === 'Episodes' })}
              type="button"
              onClick={() => setPage('Episodes')}
            >
              Episodes
            </button>
          </li>
          <li className="nav__item">
            <button
              className={classNames('nav__link', { 'nav__link--active': currentPage === 'Location' })}
              type="button"
              onClick={() => setPage('Location')}
            >
              Location
            </button>
          </li>
          <li className="nav__item">
            <button
              className={classNames('nav__link', { 'nav__link--active': currentPage === 'WatchListPage' })}
              type="button"
              onClick={() => setPage('WatchListPage')}
            >
              Watch List
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

