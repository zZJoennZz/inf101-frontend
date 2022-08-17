import React from "react";

import { useQuery } from "@tanstack/react-query";
import { getClients, getVisits } from "../../functions/apiCalls";

import { Navigate } from "react-router-dom";
import ContentLoading from "../../components/ContentLoading";

const HomeLoggedIn = ({ isAuthenticated }) => {
  const allClients = useQuery(["allClients"], () => getClients());
  const allVisits = useQuery(["allVisits"], () => getVisits());

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allClients.isLoading || allVisits.isLoading) return <ContentLoading />;
  return (
    <div className="p-3">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-slate-500 border-b pb-3">
          Dashboard
        </h1>
      </div>
      <div className="mb-4 text-slate-400 italic">Summary of business</div>
      <div className="text-center">
        {allClients.isError && "Can't fetch clients."}
        {allVisits.isError && "Can't fetch visits."}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 space-x-0 md:space-x-2">
        <div className="stat-box bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="stat-title">Clients</div>
          <div className="text-4xl">
            {allClients.data && !allClients.isError
              ? allClients.data.data.length
              : 0}
          </div>
        </div>
        <div className="stat-box bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="stat-title">Visits</div>
          <div className="text-4xl">
            {allVisits.data && !allVisits.isError
              ? allVisits.data.data.length
              : 0}
          </div>
        </div>
        <div className="stat-box bg-gradient-to-r from-yellow-500 to-lime-400">
          <div className="stat-title">EST. Revenue</div>
          <div>
            <span className="text-lg">₱</span>
            <span className="text-4xl">2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoggedIn;
