import React from "react";
import { Link } from "react-router-dom";

const ManageObjects = () => {
  return (
    <div className="mx-auto p-2">
      <div className="border-b pb-1 font-bold text-lg uppercase mb-3">
        Manage Objects
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto mb-4">
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
      <div className="border-b pb-1 font-bold text-lg uppercase mb-3">
        Manage Report Objects
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
        <Link
          to="/manage-objects/service-reports"
          className="text-gray-600 hover:text-gray-700 border border-slate-300 rounded-lg p-4 h-full w-full group hover:bg-slate-300 cursor-pointer"
        >
          <div className="text-lg font-bold">Manage Service Reports</div>
          <div className="text-sm">Add or edit service reports.</div>
        </Link>

        <div
        // to="/manage-objects/visit-types"
        // className="text-gray-600 border border-slate-300 rounded-lg p-4 h-full w-full group"
        >
          {/* <div className="text-lg italic">More settings soon.</div> */}
          {/* <div className="text-sm">Add, edit, or delete visit types.</div> */}
        </div>
        <div> </div>
        {/* <Link
          to="/manage-objects/discounts"
          className="text-gray-600 hover:text-gray-700 border border-slate-300 rounded-lg p-4 h-full w-full group hover:bg-slate-300 cursor-pointer"
        >
          <div className="text-lg font-bold">Manage Discounts</div>
          <div className="text-sm">Add, edit, or delete discounts.</div>
        </Link> */}
      </div>
    </div>
  );
};

export default ManageObjects;
