import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ComicsCardsDisplay from '../components/ComicsCardsDisplay/ComicsCardsDisplay';
import Pagination from '../components/Pagination/Pagination';
import SearchBloc from '../components/SearchBloc/SearchBloc';
import Loader from '../components/Loader/Loader';

import searchImage from '../assets/images/comic-picture.png';

const Comics = () => {
  const [data, setData] = useState([]);
  const [comicsCount, setComicsCount] = useState();
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
          `${process.env.REACT_APP_BACKEND}/comics/page=${page}?limit=${limitPerPage}`
        );
        setData(response.data.data.results);
        setComicsCount(response.data.data.total);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="d-flex flex-column">
      <SearchBloc
        searchImageSrc={searchImage}
        alt="Hulk"
        placeholder="Find your own comic..."
        searchType="comics"
      />
      {!isLoading ? (
        <section className="d-flex flex-column">
          <ul className="comics-cards-container d-flex flex-wrap">
            {data.map((comic, index) => {
              return <ComicsCardsDisplay key={index} {...comic} />;
            })}
          </ul>
          <Pagination
            count={comicsCount}
            pageParams={page}
            limitPerPage={limitPerPage}
            paginationType="comics"
          />
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Comics;
