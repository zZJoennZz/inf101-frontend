import React from "react";
import { Navigate } from "react-router-dom";
import "./home.scss";

import {
  InformationCircleIcon,
  LoginIcon,
  UserCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/outline";
const HomeNotLoggedIn = ({ runLogin, isAuthenticated }) => {
  let [loginCred, setLoginCred] = React.useState(false);

  const onChangeText = (e) =>
    setLoginCred({ ...loginCred, [e.target.name]: e.target.value });

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    runLogin(loginCred);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <div className="p-5">
          <div className="row">
            <div className="border border-slate-200 p-4 rounded-lg">
              <h1 className="border-b mb-3 border-slate-200 pb-3 text-slate-600 font-bold">
                <InformationCircleIcon className="inline-block w-7 h-7 mr-3 float-left" />
                Login to access inf101 system
              </h1>

              <form onSubmit={onSubmitLogin}>
                <div className="flex items-center bg-slate-100 px-3 rounded-md mb-3">
                  <UserCircleIcon className="w-7 h-7" />
                  <input
                    type="text"
                    onChange={onChangeText}
                    name="username"
                    id="username"
                    className="w-full p-4 outline-none bg-transparent"
                    placeholder="Enter username"
                    autoComplete="username"
                  />
                </div>
                <div className="flex items-center bg-slate-100 px-3 rounded-md mb-3">
                  <LockClosedIcon className="w-7 h-7" />
                  <input
                    type="password"
                    onChange={onChangeText}
                    name="password"
                    id="password"
                    className="w-full p-4 outline-none bg-transparent"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </div>
                <button className="py-2 px-4 hover:bg-cyan-500 hover:border-cyan-500 bg-cyan-600 text-white border border-cyan-600 rounded-md font-bold shadow-lg hover:shadow-none">
                  <LoginIcon className="inline-block w-5 h-5" /> Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeNotLoggedIn;
