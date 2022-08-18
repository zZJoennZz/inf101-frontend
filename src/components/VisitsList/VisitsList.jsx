import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./visitslist.scss";
import { FolderOpenIcon, TrashIcon } from "@heroicons/react/outline";
import { reverseArrOrder } from "../../functions/reverseArrOrder";

const VisitsList = (props) => {
  const { filterText, data, runReload } = props;

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
        .then((res) => {
          runReload();
          alert(res.data.message);
        })
        .catch((error) => {
          alert(error);
          runReload();
        });
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

  return reverseArrOrder(data)
    .filter((client) => {
      let clientName =
        client.first_name + " " + client.middle_name + " " + client.last_name;

      return clientName.includes(filterText);
    })
    .map((e) => (
      <tr className="border-b" key={e.id}>
        <td className="py-3">
          <strong>{e.visit_date}</strong>{" "}
          <div className="text-xs italic">
            {convertTime(e.time_in)} - {convertTime(e.time_out)}
          </div>
        </td>
        <td className="py-3 pl-2">
          <span className="font-bold">
            <Link to={"/visits/view/" + e.id}>
              <div className="mr-1 inline-block text-xs bg-slate-600 p-1 text-white rounded-full">
                {e.client_id}
              </div>

              {e.first_name + " " + e.middle_name + " " + e.last_name}
            </Link>
          </span>{" "}
        </td>
        <td className="py-3 flex items-center">
          <button className="mr-1 font-bold py-1 px-2 bg-slate-400 hover:bg-slate-200 rounded-md">
            <Link
              to={"/visits/view/" + e.id}
              className="text-white flex items-center hover:text-slate-600"
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
      </tr>
    ));
};

export default VisitsList;
