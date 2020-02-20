import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ComicsCardsDisplay from '../components/ComicsCardsDisplay/ComicsCardsDisplay';
import Pagination from '../components/Pagination/Pagination';
import CharacterTopBloc from '../components/CharacterTopBloc/CharacterTopBloc';

const CharacterComics = () => {
  const [data, setData] = useState([]);
  const [characterData, setCharacterData] = useState([]);
  const [comicsCount, setComicsCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { pageParams, id } = useParams();
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
          `http://localhost:3100/character/${id}/page=${page}?limit=${limitPerPage}`
        );
        setData(response.data.results);
        setComicsCount(response.data.total);
      } catch (e) {
        console.error(e.message);
      }
      try {
        const response = await axios.get(
          `http://localhost:3100/characterdata/${id}`
        );
        setCharacterData(response.data.data.results[0]);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [page, id]);

  return (
    <div className="d-flex flex-column">
      {!isLoading ? (
        <section className="d-flex flex-column">
          <CharacterTopBloc characterData={characterData} />
          <ul className="comics-cards-container d-flex flex-wrap">
            {data.map((comic, index) => {
              return <ComicsCardsDisplay key={index} {...comic} />;
            })}
          </ul>
          <Pagination
            count={comicsCount}
            pageParams={page}
            limitPerPage={limitPerPage}
            paginationType={`character/${id}`}
          />
        </section>
      ) : (
        <span className="d-flex justify-center">Loading...</span>
      )}
    </div>
  );
};

export default CharacterComics;
