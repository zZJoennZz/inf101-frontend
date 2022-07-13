import React from "react";
import { Link } from "react-router-dom";

import "./visitslist.scss";

const VisitsList = (props) => {
  const { data } = props;

  return data.map((e) => (
    <div className="visits-list" key={e.id}>
      <div className="visits-list-inner">
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
            <button className="visits-list-delete">
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default VisitsList;
