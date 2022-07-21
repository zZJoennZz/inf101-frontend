import React from "react";
import { Navigate } from "react-router-dom";

const HomeLoggedIn = ({ isAuthenticated }) => {
  return (
    <div className="home-logged-in">
      {!isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="inner-content">
          <div className="row">
            <div className="col-10">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLoggedIn;
