import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = props => {
  const history = useHistory();
  history.push('/characters/page=1');
  return <></>;
};

export default Home;
