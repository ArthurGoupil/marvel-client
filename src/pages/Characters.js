import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardsDisplay from '../components/CardsDisplay/CardsDisplay';
import Pagination from '../components/Pagination/Pagination';

const Characters = () => {
  const [data, setData] = useState({});
  const [charactersCount, setCharactersCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { pageParams } = useParams();
  const limitPerPage = 100;

  let page;
  if (!pageParams) {
    page = 1;
  } else page = pageParams;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/characters/page=${page}?limit=${limitPerPage}`
        );
        setData(response.data.results);
        setCharactersCount(response.data.total);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [page]);

  return !isLoading ? (
    <>
      <section className="d-flex flex-column">
        <ul className="cards-container d-flex flex-wrap">
          {data.map((character, index) => {
            return <CardsDisplay key={index} {...character} />;
          })}
        </ul>
        <Pagination
          charactersCount={charactersCount}
          pageParams={page}
          limitPerPage={limitPerPage}
        />
      </section>
    </>
  ) : (
    <span>En cours de chargement...</span>
  );
};

export default Characters;
