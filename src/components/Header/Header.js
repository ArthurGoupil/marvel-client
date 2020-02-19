import React from 'react';
import Logo from './Logo/Logo';

const Header = props => {
  return (
    <header>
      <div className="header-container d-flex flex-column align-center">
        <Logo />
        <nav className="header-menu">
          <ul className="d-flex">
            <li>CHARACTERS</li>
            <li>COMICS</li>
            <li>FAVOURITES</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
