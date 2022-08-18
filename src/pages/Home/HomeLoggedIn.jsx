import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../functions/apiCalls";
import ContentLoading from "../../components/ContentLoading";

const HomeLoggedIn = () => {
  const allDashboardStats = useQuery(["getDashboardStats"], () =>
    getDashboardStats()
  );

  if (allDashboardStats.isLoading) return <ContentLoading />;

  return (
    <div className="p-3">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-slate-500 border-b pb-3">
          Dashboard
        </h1>
      </div>
      <div className="mb-4 text-slate-400 italic">Summary of business</div>
      <div className="text-center">
        {allDashboardStats.isError && "Can't fetch stats."}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 space-x-0 md:space-x-2">
        <div className="stat-box bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="stat-title">Clients</div>
          <div className="text-4xl font-bold">
            {allDashboardStats.data.data.client}
          </div>
        </div>
        <div className="stat-box bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="stat-title">Visits</div>
          <div className="text-4xl font-bold">
            {allDashboardStats.data.data.visit}
          </div>
        </div>
        <div className="stat-box bg-gradient-to-r from-red-700 to-orange-500">
          <div className="stat-title">EST. Revenue</div>
          <div>
            <span className="text-lg">₱</span>
            <span className="text-4xl font-bold">
              {allDashboardStats.data.data.revenue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoggedIn;
