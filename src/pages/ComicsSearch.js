import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ComicsCardsDisplay from '../components/ComicsCardsDisplay/ComicsCardsDisplay';
import Pagination from '../components/Pagination/Pagination';
import SearchBloc from '../components/SearchBloc/SearchBloc';
import searchImage from '../assets/images/comic-picture.png';

const ComicsSearch = () => {
  const [data, setData] = useState([]);
  const [comicsSearchCount, setComicsSearchCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { pageParams, search } = useParams();
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
          `https://marvel-goupil-backend.herokuapp.com/comics/search=${search}/page=${page}?limit=${limitPerPage}`
        );
        setData(response.data.results);
        setComicsSearchCount(response.data.total);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [page, search]);

  return (
    <div className="d-flex flex-column">
      <SearchBloc
        searchImageSrc={searchImage}
        alt="Hulk"
        placeholder="Find your own comic..."
        searchType="comics"
      />
      {!isLoading ? (
        data.length !== 0 ? (
          !isLoading ? (
            <section className="d-flex flex-column">
              <ul className="characters-cards-container d-flex flex-wrap">
                {data.map((comic, index) => {
                  return <ComicsCardsDisplay key={index} {...comic} />;
                })}
              </ul>
              <Pagination
                count={comicsSearchCount}
                pageParams={page}
                limitPerPage={limitPerPage}
                paginationType={`comics/search=${search}`}
              />
            </section>
          ) : (
            <span className="d-flex justify-center">Loading...</span>
          )
        ) : (
          <span>Aucun résultat</span>
        )
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default ComicsSearch;
