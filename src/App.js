import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Characters from './pages/Characters';
import Comics from './pages/Comics';
import CharacterComics from './pages/CharacterComics';
import CharactersSearch from './pages/CharactersSearch';
import ComicsSearch from './pages/ComicsSearch';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
library.add(faChevronLeft, faChevronRight);

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="d-flex justify-center">
          <Switch>
            <Route path="/characters/page=:pageParams">
              <Characters />
            </Route>
            <Route path="/characters/search=:search/page=:pageParams">
              <CharactersSearch />
            </Route>
            <Route path="/character/:id/page=:pageParams">
              <CharacterComics />
            </Route>
            <Route path="/comics/page=:pageParams">
              <Comics />
            </Route>
            <Route path="/comics/search=:search/page=:pageParams">
              <ComicsSearch />
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  );
};

export default App;
