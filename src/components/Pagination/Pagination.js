import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pagination = ({ charactersCount, pageParams, limitPerPage }) => {
  const pagesArray = [];
  const pageSelectedIconSrc = '';

  for (let i = 0; i < Math.ceil(charactersCount / limitPerPage); i++) {
    pagesArray.push(i);
  }
  let pageParamsNum = Number(pageParams);
  if (!pageParamsNum) {
    pageParamsNum = 1;
  }

  return (
    <div className="pages d-flex align-center justify-center flex-wrap">
      <Link
        className="page-number d-flex justify-center align-center"
        to={`/characters/page=${pageParamsNum - 1}`}
      >
        <FontAwesomeIcon className="pagination-icons" icon="chevron-left" />
      </Link>
      {pagesArray.map((page, index) => {
        return (
          <Link
            className={
              page === pageParams - 1
                ? 'page-number d-flex justify-center align-center page-selected'
                : 'page-number d-flex justify-center align-center'
            }
            key={index}
            to={`/characters/page=${page + 1}`}
          >
            {page + 1}
          </Link>
        );
      })}
      <Link
        className="page-number d-flex justify-center align-center"
        to={`/characters/page=${pageParamsNum + 1}`}
      >
        <FontAwesomeIcon className="pagination-icons" icon="chevron-right" />
      </Link>
    </div>
  );
};

export default Pagination;
