import React from "react";
import { Link } from "react-router-dom";

import { TrashIcon } from "@heroicons/react/outline";

const ClientsList = (props) => {
  const { filterText, data, deleteClient } = props;

  const confirmDelete = (id) => {
    let delCon = window.confirm(
      "Are you sure to delete this client? You cannot restore this."
    );

    if (delCon) {
      deleteClient.mutate(id);
    }
  };

  if (!data) {
    return (
      <div className="text-center text-slate-400 italic">No data available</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-500">
            <th className="w-4/5 text-left p-2 uppercase text-sm">Client</th>
            <th className="w-1/5 text-left p-2 uppercase text-sm"></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((client) => {
              let clientName =
                client.first_name +
                " " +
                client.middle_name +
                " " +
                client.last_name;

              return (
                clientName.includes(filterText) ||
                client.client_id.includes(filterText)
              );
            })
            .map((client) => (
              <tr className="border-b hover:bg-slate-100" key={client.id}>
                <td className="p-2 text-left">
                  <img
                    src={client.image}
                    className="rounded-full w-6 h-6 inline-block mr-3"
                    alt="client"
                  />
                  <Link
                    to={"/clients/" + client.id}
                    className="text-base hover:underline group"
                  >
                    {`${client.last_name}, ${client.first_name} ${client.middle_name}`}
                    <div className="bg-slate-700 text-white absolute left-1/4 p-1 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all ease-in-out">
                      {client.client_id}
                    </div>
                  </Link>
                </td>
                <td className="flex items-start justify-center p-2">
                  <button
                    className="flex items-center p-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-500 transition-all ease-in-out"
                    onClick={confirmDelete.bind(this, client.id)}
                  >
                    <TrashIcon className="inline-block w-5 h-5" />{" "}
                    <span className="hidden md:inline-block">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
