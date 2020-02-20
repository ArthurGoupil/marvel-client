import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logo from './Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

const Header = ({ setDisplayModalConnect, user, setUser }) => {
  const history = useHistory();
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
              <li className={!user ? 'cursor-disabled' : 'cursor-enabled'}>
                <FontAwesomeIcon className="favourite-nav-icon" icon="star" />
                &nbsp;FAVOURITES
              </li>
              <li>
                <FontAwesomeIcon className="user-nav-icon" icon="mask" />
                &nbsp;
                {user ? (
                  <button
                    className="header-button-log"
                    onClick={() => {
                      Cookies.remove('userToken');
                      setUser(null);
                      history.push('/characters/page=1');
                    }}
                  >
                    LOG OUT
                  </button>
                ) : (
                  <button
                    className="header-button-log"
                    onClick={() => {
                      setDisplayModalConnect(true);
                    }}
                  >
                    LOG IN
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
