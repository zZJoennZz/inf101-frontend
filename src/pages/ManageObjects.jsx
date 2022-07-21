import React from "react";
import { Link, Navigate } from "react-router-dom";

const ManageObjects = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mx-auto p-2">
      <h1 className="mb-4 uppercase text-xl font-bold">
        Manage inf101 objects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
        <Link
          to="/manage-objects/services"
          className="text-gray-600 hover:text-gray-700 border border-slate-300 rounded-lg p-4 h-full w-full group hover:bg-slate-300 cursor-pointer"
        >
          <div className="text-lg font-bold">Manage Services</div>
          <div className="text-sm">Add, edit, or delete services.</div>
        </Link>

        <Link
          to="/manage-objects/visit-types"
          className="text-gray-600 hover:text-gray-700 border border-slate-300 rounded-lg p-4 h-full w-full group hover:bg-slate-300 cursor-pointer"
        >
          <div className="text-lg font-bold">Manage Visit Types</div>
          <div className="text-sm">Add, edit, or delete visit types.</div>
        </Link>

        <Link
          to="/manage-objects/discounts"
          className="text-gray-600 hover:text-gray-700 border border-slate-300 rounded-lg p-4 h-full w-full group hover:bg-slate-300 cursor-pointer"
        >
          <div className="text-lg font-bold">Manage Discounts</div>
          <div className="text-sm">Add, edit, or delete discounts.</div>
        </Link>
      </div>
    </div>
  );
};

export default ManageObjects;
