import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pagination = ({ count, pageParams, limitPerPage, paginationType }) => {
  const pagesArray = [];

  for (let i = 0; i < Math.ceil(count / limitPerPage); i++) {
    pagesArray.push(i);
  }
  if (pagesArray.length === 0) {
    pagesArray.push(0);
  }
  let pageParamsNum = Number(pageParams);
  if (!pageParamsNum) {
    pageParamsNum = 1;
  }

  return (
    <div className="pages d-flex align-center justify-center flex-wrap">
      <Link
        className="page-number d-flex justify-center align-center"
        to={`/${paginationType}/page=${pageParamsNum - 1}`}
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
            to={`/${paginationType}/page=${page + 1}`}
          >
            {page + 1}
          </Link>
        );
      })}
      <Link
        className="page-number d-flex justify-center align-center"
        to={`/${paginationType}/page=${pageParamsNum + 1}`}
      >
        <FontAwesomeIcon className="pagination-icons" icon="chevron-right" />
      </Link>
    </div>
  );
};

export default Pagination;
