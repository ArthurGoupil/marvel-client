import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo/Logo';
import './Header.css';

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
              <li>
                <Link to="/characters/page=1">CHARACTERS</Link>
              </li>
              <li>
                <Link to="/comics/page=1">COMICS</Link>
              </li>
              <li>FAVOURITES</li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
