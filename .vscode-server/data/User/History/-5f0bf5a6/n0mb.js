import React from "react";
import Pagination from "react-js-pagination";
import "./Paging.css";

const Paging = ({ totalItemsCount, onPageChange }) => {
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <Pagination
      className="pagination-container"
      itemsCountPerPage={itemsPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;