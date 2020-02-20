import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CharactersCardsDisplay from '../components/CharactersCardsDisplay/CharactersCardsDisplay';
import Pagination from '../components/Pagination/Pagination';
import SearchBloc from '../components/SearchBloc/SearchBloc';
import searchImage from '../assets/images/hulk.png';

const CharactersSearch = ({ user }) => {
  const [data, setData] = useState([]);
  const [charactersSearchCount, setCharactersSearchCount] = useState();
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
          `https://marvel-goupil-backend.herokuapp.com/characters/search=${search}/page=${page}?limit=${limitPerPage}`
        );
        setData(response.data.results);
        setCharactersSearchCount(response.data.total);
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
        placeholder="Find your own superhero..."
        searchType="characters"
      />
      {!isLoading ? (
        data.length !== 0 ? (
          !isLoading ? (
            <section className="d-flex flex-column">
              <ul className="characters-cards-container d-flex flex-wrap">
                {data.map((character, index) => {
                  return (
                    <CharactersCardsDisplay
                      key={index}
                      {...character}
                      user={user}
                    />
                  );
                })}
              </ul>
              <Pagination
                count={charactersSearchCount}
                pageParams={page}
                limitPerPage={limitPerPage}
                paginationType={`characters/search=${search}`}
              />
            </section>
          ) : (
            <span className="d-flex justify-center">
              En cours de chargement...
            </span>
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

export default CharactersSearch;
