import React from "react";

const ClientPagination = ({ clientsPerPage, totalClients, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalClients / clientsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination space-x-1 mb-4">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item inline-block">
          <button
            onClick={paginate.bind(this, number)}
            className="page-link w-6 h-6 rounded-full text-xs bg-cyan-700 text-white flex items-center justify-center transition-all ease-in-out hover:bg-cyan-500"
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ClientPagination;
