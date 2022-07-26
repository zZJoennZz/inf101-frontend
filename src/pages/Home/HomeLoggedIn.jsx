import React from "react";
import { Navigate } from "react-router-dom";

const HomeLoggedIn = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="p-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-600">Dashboard</h1>
      </div>
      <div className="filters"></div>
    </div>
  );
};

export default HomeLoggedIn;
