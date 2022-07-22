import React from "react";
import { Link } from "react-router-dom";

import { FolderOpenIcon, TrashIcon } from "@heroicons/react/outline";

const ClientsList = (props) => {
  const { data, deleteClient } = props;

  if (!data) {
    return (
      <div className="text-center text-slate-400 italic">No data available</div>
    );
  }
  return data.map((e) => (
    <div
      className="bg-gray-100 rounded-full mb-5 p-4 md:p-5 flex items-center border border-slate-300"
      key={e.id}
    >
      <div className="flex mr-0 md:mr-5">
        <img
          src={process.env.REACT_APP_IMG_URL + e.image}
          alt={e.first_name}
          className="hidden md:inline-block w-20 h-20 border-4 border-white rounded-full"
        />
      </div>

      <div className="flex-grow">
        <div className="font-bold text-md md:text-xl">
          {e.first_name + " " + e.middle_name + " " + e.last_name}
        </div>
        <div className="block text-sm italic">{e.client_id}</div>
      </div>

      <div className="flex">
        <div className="bg-slate-400 md:h-12 rounded-full p-4 items-center justify-center flex hover:bg-slate-200 group">
          <Link
            to={"/clients/" + e.id}
            className="text-white group-hover:text-gray-600"
          >
            <FolderOpenIcon className="w-5 h-5 inline-block" />
            <span className="hidden md:inline-block md:pl-2">Open</span>
          </Link>
        </div>
        <div className="flex bg-red-500 text-white p-4 rounded-full ml-4">
          <button
            onClick={deleteClient.bind(this, e.id)}
            className="delete-button"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  ));
};

export default ClientsList;
