import React from "react";

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination text-end text-gray-500 dark:text-gray-50  flex justify-end mx-2 my-3">
      <button
        onClick={() => onPageChange(page - 1)}
        className="cursor-pointer hover:text-gray-800 pagination-button px-3"
        disabled={page <= 1}
      >
        &#60; Previous
      </button>
      <span className="pagination-info">
        Page <span className="text-blue-600 dark:text-blue-600">{page}</span> of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="cursor-pointer hover:text-gray-800 pagination-button px-3"
      >
        <span>Next &#62;</span>
      </button>
    </div>
  );
}

export default Pagination;
