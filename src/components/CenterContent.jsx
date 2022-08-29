import { Route, Routes } from "react-router-dom";

import Clients from "../pages/Clients/Clients";
import ViewClient from "../pages/Clients/ViewClient";
import HomeNotLoggedIn from "../pages/Home/HomeNotLoggedIn";
import HomeLoggedIn from "../pages/Home/HomeLoggedIn";
import Visits from "../pages/Visits/Visits";
import ViewVisit from "../pages/Visits/ViewVisit";
import ManageObjects from "../pages/ManageObjects";
import ManageServices from "../pages/ManageServices";
import ManageVisitTypes from "../pages/ManageVisitTypes";
import ManageDiscounts from "../pages/ManageDiscounts";
import ServiceReports from "../pages/ServiceReports";
import ContentLoading from "./ContentLoading";

import { privateRoute, publicRoute } from "../routes/route";
import MyAccount from "../pages/MyAccount";
import ManageUsers from "../pages/ManageUsers";

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
            <Route path="/visits" element={privateRoute(isAuth, <Visits />)} />
            <Route
              path="visits/view/:clientId"
              element={privateRoute(isAuth, <ViewVisit />)}
            />
            <Route
              path="/manage-objects"
              element={privateRoute(isAuth, <ManageObjects />)}
            />
            <Route
              path="/manage-objects/services"
              element={privateRoute(isAuth, <ManageServices />)}
            />
            <Route
              path="/manage-objects/visit-types"
              element={privateRoute(isAuth, <ManageVisitTypes />)}
            />
            <Route
              path="/manage-objects/discounts"
              element={privateRoute(isAuth, <ManageDiscounts />)}
            />
            <Route
              path="/manage-objects/service-reports"
              element={privateRoute(isAuth, <ServiceReports />)}
            />
            <Route
              path="/my-account"
              element={privateRoute(isAuth, <MyAccount />)}
            />
            <Route
              path="/manage-users/*"
              element={privateRoute(isAuth, <ManageUsers />)}
            />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default CenterContent;
