import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Characters from './pages/Characters';

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
              <Characters></Characters>
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  );
};

export default App;
