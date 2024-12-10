import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.Prev
          disabled={currentPage === 1}
          onClick={() => handleClick(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <BootstrapPagination.Item
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </BootstrapPagination.Item>
        ))}
        <BootstrapPagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handleClick(currentPage + 1)}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;
