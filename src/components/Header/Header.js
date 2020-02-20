import React from 'react';
import Logo from './Logo/Logo';
import './Header.css';
import marvelHeroesSrc from '../../assets/images/marvel-heroes.png';

const Header = props => {
  return (
    <>
      <header className="header-top d-flex flex-column align-center">
        <div className="header-container-top d-flex flex-column align-center">
          <Logo />
        </div>
      </header>
      <div className="header-bottom d-flex justify-center">
        <div className="header-container-bottom d-flex flex-column align-center">
          <nav className="header-menu">
            <ul className="d-flex">
              <li>CHARACTERS</li>
              <li>COMICS</li>
              <li>FAVOURITES</li>
            </ul>
          </nav>
          <div className="search-bloc-container d-flex justify-center">
            <div className="search-bloc-background d-flex justify-center align-center">
              <div className="search-bloc d-flex align-center">
                <img src={marvelHeroesSrc} alt="marvel-heroes" />
                <form className="d-flex">
                  <input
                    className="search-bloc-input"
                    type="text"
                    placeholder="Find your own superhero..."
                  />
                  <input
                    className="search-bloc-submit"
                    type="submit"
                    value="GO!"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
