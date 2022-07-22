import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import "./visitslist.scss";

import { FolderOpenIcon, TrashIcon } from "@heroicons/react/outline";

const VisitsList = (props) => {
  const { data, runReload } = props;

  const convertTime = (dTime) => {
    let toConvertTime = new Date("01/01/1999 " + dTime);
    return toConvertTime.toLocaleTimeString();
  };

  const delVisit = async (visitId) => {
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    let confirmDelete = window.confirm(
      "Are you sure to delete this visit record? This will include the other records and report. You will not be able to restore this."
    );

    if (confirmDelete) {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}visit/${visitId}`, config)
        .then((res) => alert(res.data.message))
        .catch((error) => alert(error));
      runReload();
    }
  };

  if (data === undefined || data === [] || !data) {
    return (
      <tr className="text-center text-slate-400 italic">
        <td colSpan={5} className="py-3">
          No data available
        </td>
      </tr>
    );
  }

  return data.map((e) => (
    <tr className="border-b" key={e.id}>
      <td className="py-3">{e.visit_date}</td>
      <td className="py-3">{convertTime(e.time_in)}</td>
      <td className="py-3">{convertTime(e.time_out)}</td>
      <td className="py-3">
        {e.first_name + " " + e.middle_name + " " + e.last_name}
      </td>
      <td className="py-3 flex items-center">
        <button className="mr-2 py-1 px-2 bg-cyan-600 rounded-md hover:bg-cyan-500">
          <Link
            to={"/visits/view/" + e.id}
            className="text-white flex items-center hover:text-slate-100"
          >
            <FolderOpenIcon className="mr-2 w-4 h-4" />
            View
          </Link>
        </button>
        <button
          className="bg-red-600 hover:bg-red-500 p-1 rounded-md"
          onClick={delVisit.bind(this, e.id)}
        >
          <TrashIcon className="w-6 h-6 text-white" />
        </button>
      </td>
      {/* <div className="visits-list-inner">
        <div className="row">
          <div className="col-2">
            <img
              src={`${process.env.REACT_APP_IMG_URL}${e.image}`}
              alt={e.name}
              className="visits-list-client-img"
            />
          </div>
          <div className="col-8">
            <div className="visits-list-info">
              <span className="visits-list-label">Client:</span>{" "}
              <span className="visits-list-client-name">
                {e.first_name} {e.middle_name} {e.last_name}
              </span>{" "}
              <span className="visits-list-client-id">{e.client_id}</span>
            </div>
            <div className="visits-list-info">
              <span className="visits-list-label">Visit Date:</span>{" "}
              <span className="visits-list-date">{e.visit_date}</span>
            </div>
            <button className="visits-list-view">
              <Link to={"/visits/view/" + e.id}>
                <i className="fas fa-folder-open"></i> View
              </Link>
            </button>
          </div>
          <div className="col-2">
            <button
              onClick={delVisit.bind(this, e.id)}
              className="visits-list-delete"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div> */}
    </tr>
  ));
};

export default VisitsList;
