import React from "react";
import { Link } from "react-router-dom";

import { LogoutIcon, UserCircleIcon } from "@heroicons/react/outline";

const UserMenus = ({ isAuthenticated, runLogout }) => {
  const isAdmin = true;
  return (
    <div className="flex-col">
      {isAuthenticated ? (
        <>
          <div className="bg-gray-100 p-3 rounded-lg mb-5">
            <UserCircleIcon className="rounded-full h-12 w-12 float-right" />
            <div className="flex items-center text-sm">
              Hello,{" "}
              <span className="font-bold">
                {localStorage.getItem("username")}
              </span>
              !
              <button
                className="ml-2 p-1 bg-gray-300 text-slate-600 rounded-full hover:bg-gray-400"
                onClick={runLogout}
              >
                <LogoutIcon className="w-4 h-4" />
              </button>
            </div>
            <ul className="usermenus-ul">
              <li className="usermenus-li">
                <Link to="google.com">Change Password</Link>
              </li>
              <li className="usermenus-li"></li>
            </ul>
          </div>

          {isAdmin && (
            <div className="bg-gray-100 p-5 rounded-lg mb-5">
              <div className="usermenus-welcome">Admin Panel</div>
              <ul className="usermenus-ul">
                <li className="usermenus-li">
                  <Link to="google.com">Manage User</Link>
                </li>
                <li className="usermenus-li">
                  <Link to="/manage-objects">Manage Objects</Link>
                </li>
              </ul>
            </div>
          )}

          <div className="block text-center text-sm text-gray-400">
            {"{"} Made with a lot of ❤️ {"}"}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserMenus;
