import { Route, Routes } from "react-router-dom";

import Clients from "../pages/Clients/Clients";
import ViewClient from "../pages/Clients/ViewClient";
import ViewRecord from "../pages/Clients/ViewRecord";
import HomeNotLoggedIn from "../pages/Home/HomeNotLoggedIn";
import HomeLoggedIn from "../pages/Home/HomeLoggedIn";
import Visits from "../pages/Visits/Visits";
import NewRecord from "../pages/Clients/NewRecord";
import ViewVisit from "../pages/Visits/ViewVisit";
import ManageObjects from "../pages/ManageObjects";
import ManageServices from "../pages/ManageServices";
import ManageVisitTypes from "../pages/ManageVisitTypes";
import ManageDiscounts from "../pages/ManageDiscounts";
import ServiceReports from "../pages/ServiceReports";
import ContentLoading from "./ContentLoading";

import { privateRoute, publicRoute } from "../routes/route";

const CenterContent = ({ isLoading, isAuth, login }) => {
  return (
    <div className="flex-grow h-screen overflow-y-auto">
      <div className="min-w-full max-w-lg md:max-w-xl lg:max-w-2xl p-3">
        {isLoading ? (
          <div className="pt-24">
            <ContentLoading />
          </div>
        ) : (
          <Routes>
            <Route
              exact
              path="/"
              element={publicRoute(
                isAuth,
                <HomeNotLoggedIn runLogin={login} />
              )}
            />
            <Route
              exact
              path="/home"
              element={privateRoute(isAuth, <HomeLoggedIn />)}
            />
            <Route
              path="/clients"
              element={privateRoute(isAuth, <Clients />)}
            />
            <Route
              path="/clients/:clientId"
              element={privateRoute(isAuth, <ViewClient />)}
            />
            <Route
              path="/clients/records/:clientId/:inputId"
              element={<ViewRecord isAuthenticated={isAuth} />}
            />
            <Route
              path="/clients/records/new/:clientId"
              element={<NewRecord isAuthenticated={isAuth} />}
            />
            <Route
              path="/visits"
              element={<Visits isAuthenticated={isAuth} />}
            />
            <Route
              path="visits/view/:clientId"
              element={<ViewVisit isAuthenticated={isAuth} />}
            />
            <Route
              path="/manage-objects"
              element={<ManageObjects isAuthenticated={isAuth} />}
            />
            <Route
              path="/manage-objects/services"
              element={<ManageServices isAuthenticated={isAuth} />}
            />
            <Route
              path="/manage-objects/visit-types"
              element={<ManageVisitTypes isAuthenticated={isAuth} />}
            />
            <Route
              path="/manage-objects/discounts"
              element={<ManageDiscounts isAuthenticated={isAuth} />}
            />
            <Route
              path="/manage-objects/service-reports"
              element={<ServiceReports isAuthenticated={isAuth} />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default CenterContent;
