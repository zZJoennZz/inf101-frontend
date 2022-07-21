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

const CenterContent = ({ isAuth, login }) => {
  return (
    <div className="flex-grow h-screen overflow-y-auto">
      <div className="mx- min-w-full max-w-lg md:max-w-xl lg:max-w-2xl p-3">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomeNotLoggedIn runLogin={login} isAuthenticated={isAuth} />
            }
          />
          <Route
            exact
            path="/home"
            element={<HomeLoggedIn isAuthenticated={isAuth} />}
          />
          <Route
            path="/clients"
            element={<Clients isAuthenticated={isAuth} />}
          />
          <Route
            path="/clients/:clientId"
            element={<ViewClient isAuthenticated={isAuth} />}
          />
          <Route
            path="/clients/records/:clientId/:inputId"
            element={<ViewRecord isAuthenticated={isAuth} />}
          />
          <Route
            path="/clients/records/new/:clientId"
            element={<NewRecord isAuthenticated={isAuth} />}
          />
          <Route path="/visits" element={<Visits isAuthenticated={isAuth} />} />
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
            element={<ManageDiscounts />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default CenterContent;
