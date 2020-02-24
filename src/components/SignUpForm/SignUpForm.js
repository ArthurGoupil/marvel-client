import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './SignUpForm.css';
import thor from '../../assets/images/thor.png';
import captainAmerica from '../../assets/images/captain-america.png';

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const fieldIsEmpty =
    email === '' || password === '' || passwordConfirm === '';

  const handleEmailChange = event => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = event => {
    const value = event.target.value;
    setPassword(value);
  };
  const handlePasswordConfirmChange = event => {
    const value = event.target.value;
    setPasswordConfirm(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (fieldIsEmpty) {
      setErrorMessage('A true superhero makes sure to fill all fields.');
    } else if (password !== passwordConfirm) {
      setErrorMessage('A true superhero knows how to type twice his password.');
    } else {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND + '/user/sign_up',
          {
            email,
            password
          }
        );
        Cookies.set('userToken', response.data.account.token, { expires: 30 });
        setUser({ token: response.data.account.token });
        setErrorMessage(null);
        history.push('/characters/page=1');
      } catch (e) {
        if (e.response.status === 409) {
          setErrorMessage(e.response.data.message);
        } else {
          setErrorMessage('An error occured. Nobody is perfect.');
        }
        console.log(e.response.data.message);
      }
    }
  };

  return (
    <div className="sign-up-form-container">
      <img className="sign-up-thor" src={thor} alt="Thor" />
      <div className="d-flex flex-column align-center">
        <h2 className="form-title">SIGN UP</h2>
        <form
          className="sign-up-form d-flex flex-column"
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

          <label htmlFor="password-confirm">PASSWORD CONFIRM</label>
          <input
            className="input"
            name="password-confirm"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          <span className="error-message">{errorMessage}</span>
          <input
            className="submit"
            name="submit"
            type="submit"
            value="SIGN UP"
          />
        </form>
        <img
          className="sign-up-captain-america"
          src={captainAmerica}
          alt="Captain America"
        />
      </div>
    </div>
  );
};

export default SignUp;
