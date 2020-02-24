import React from 'react';
import './NoResult.css';
import venom from '../../assets/images/venom.png';

const NoResult = ({ type }) => {
  return (
    <span className="no-result d-flex justify-center align-center">
      <img src={venom} alt="Venom" />
      <span className="no-result-text">
        YOU'RE SURELY MISTAKING
        <br />
        WITH A DISNEY {type}
        <span className="no-result-is-red">...</span>
      </span>
    </span>
  );
};

export default NoResult;
