import React, { useState } from 'react';
import './App.scss';
import { CharactersPage } from './components/CharactersPage/CharactersPage';
import { EpisodesPage } from './components/EpisodesPage/EpisodesPage';
import { LocationPage } from './components/LocationPage';
import { Navigation } from './components/Navigation/Navigation';
import { WatchListPage } from './components/WhatchListPage';
import './styles/general.scss';

const App = () => {
  const [page, setPage] = useState('Characters');

  function pageToRender() {
    switch (page) {
      case 'Characters':
        return <CharactersPage />;

      case 'Episodes':
        return <EpisodesPage />;

      case 'Location':
        return <LocationPage />;

      case 'WatchListPage':
        return <WatchListPage />;

      default:
        return <div>Hello</div>;
    }
  }

  return (
    <>
      <div className="App__nav">
        <Navigation setPage={setPage} currentPage={page} />
      </div>

      <div className="App__body">
        {pageToRender()}
      </div>
    </>
  );
};

export default App;
