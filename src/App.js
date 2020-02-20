import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import Header from './components/Header/Header';
import ModalConnect from './components/ModalConnect/ModalConnect';
import Characters from './pages/Characters';
import Comics from './pages/Comics';
import CharacterComics from './pages/CharacterComics';
import CharactersSearch from './pages/CharactersSearch';
import ComicsSearch from './pages/ComicsSearch';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
  faStar,
  faMask
} from '@fortawesome/free-solid-svg-icons';
library.add(faChevronLeft, faChevronRight, faStar, faMask);

const App = () => {
  const [displayModalConnect, setDisplayModalConnect] = useState(false);
  const tokenFromCookie = Cookies.get('userToken');

  let userState;
  if (tokenFromCookie) {
    userState = { token: tokenFromCookie };
  } else {
    userState = null;
  }
  const [user, setUser] = useState(userState);

  return (
    <div className={displayModalConnect ? 'scroll-off' : 'scroll-on'}>
      {' '}
      <Router>
        <Header
          setDisplayModalConnect={setDisplayModalConnect}
          user={user}
          setUser={setUser}
        />
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
            <Route path="/user/sign_up">
              <SignUp user={user} setUser={setUser} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
        {displayModalConnect && (
          <ModalConnect
            setDisplayModalConnect={setDisplayModalConnect}
            setUser={setUser}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
