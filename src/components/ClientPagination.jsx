import React from "react";

const ClientPagination = ({ clientsPerPage, totalClients, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalClients / clientsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination space-x-1 mb-4">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className="page-item px-3 py-1 rounded-full text-xl inline-block bg-cyan-700 text-white hover:bg-cyan-500"
        >
          <button onClick={paginate.bind(this, number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ClientPagination;
