import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBloc.css';

const SearchBloc = ({ searchImageSrc, alt, placeholder, searchType }) => {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearch(value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    history.push(`/${searchType}/search=${search}/page=1`);
  };

  return (
    <div className="search-bloc-container d-flex justify-center">
      <div className="search-bloc-background d-flex justify-center align-center">
        <div className="search-bloc d-flex align-center">
          <img src={searchImageSrc} alt={alt} />
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="search-bloc-input"
              type="text"
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder={placeholder}
            />
            <input className="search-bloc-submit" type="submit" value="GO!" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBloc;
