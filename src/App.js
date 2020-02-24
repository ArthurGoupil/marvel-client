import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
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
  faStar as fasFaStar,
  faMask
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
library.add(faChevronLeft, faChevronRight, fasFaStar, farFaStar, faMask);

const App = () => {
  const [displayModalConnect, setDisplayModalConnect] = useState(false);
  const [userFavourites, setUserFavourites] = useState({});
  const tokenFromCookie = Cookies.get('userToken');

  let userState;
  if (tokenFromCookie) {
    userState = { token: tokenFromCookie };
  } else {
    userState = null;
  }
  const [user, setUser] = useState(userState);

  useEffect(() => {
    const fetchUserFavourites = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/user/favourites`,
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }
        }
      );
      setUserFavourites(response.data);
    };
    if (user) {
      fetchUserFavourites();
    }
  }, [user]);

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
              <Characters
                user={user}
                userFavourites={userFavourites}
                setUserFavourites={setUserFavourites}
              />
            </Route>
            <Route path="/characters/search=:search/page=:pageParams">
              <CharactersSearch
                user={user}
                userFavourites={userFavourites}
                setUserFavourites={setUserFavourites}
              />
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
