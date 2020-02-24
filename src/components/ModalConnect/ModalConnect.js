import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './ModalConnect.css';
import Cookies from 'js-cookie';
import spiderman from '../../assets/images/spiderman.png';

const ModalConnect = ({ setDisplayModalConnect, setUser }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleEmailChange = event => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = event => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    if (email === '' && password === '') {
      setErrorMessage('A true superhero has an email and a password.');
    } else if (email === '') {
      setErrorMessage('A true superhero has an email.');
    } else if (password === '') {
      setErrorMessage('A true superhero has a password.');
    } else {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND + '/user/log_in',
          {
            email,
            password
          }
        );
        Cookies.set('userToken', response.data.account.token, { expires: 30 });
        setUser({ token: response.data.account.token });
        setDisplayModalConnect(false);
        setErrorMessage(null);
        history.push('/characters/page=1');
      } catch (e) {
        setErrorMessage(`You're not a superhero (yet).`);
        console.error(e.message);
      }
    }
  };

  return (
    <div
      className="modal-connect d-flex justify-center align-center"
      onClick={event => {
        if (
          event.target.className ===
          'modal-connect d-flex justify-center align-center'
        ) {
          setDisplayModalConnect(false);
        }
      }}
    >
      <div className="modal-connect-box d-flex flex-column align-center">
        <img className="spiderman" src={spiderman} alt="spiderman" />
        <h2 className="form-title">LOG IN</h2>
        <form
          className="d-flex flex-column align-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">EMAIL</label>
          <input
            className="input"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            className="input"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="error-message">{errorMessage}</span>
          <input
            className="submit"
            name="submit"
            type="submit"
            value="LOG IN"
          />
        </form>
        <Link
          onClick={() => {
            setDisplayModalConnect(false);
          }}
          to="/user/sign_up"
          className="modal-connect-sign-up"
        >
          Not a superhero yet ? Sign up !
        </Link>
      </div>
    </div>
  );
};

export default ModalConnect;
