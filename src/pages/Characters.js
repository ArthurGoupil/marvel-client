import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LineDisplay from '../components/LineDisplay';

const Characters = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { pageParams } = useParams();

  let page;
  if (!pageParams) {
    page = 1;
  } else page = pageParams;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/characters/page=1`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [page]);

  return !isLoading ? (
    <div className="d-flex flex-column align-center">
      {data.map((character, index) => {
        return <LineDisplay key={index} {...character} />;
      })}
    </div>
  ) : (
    <span>En cours de chargement...</span>
  );
};

export default Characters;
