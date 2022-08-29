import React from "react";
import { Link } from "react-router-dom";

import { LogoutIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/solid";

const UserMenus = ({ isAdmin, isAuthenticated, runLogout }) => {
  return (
    <div className="fixed transition-all ease-in-out bottom-6 right-6 rounded-full w-10 h-10 hover:w-56 hover:h-56 before:mb-3 before:content-['User'] before:bg-gradient-to-t before:from-cyan-600 before:to-teal-500 before:shadow-md before:text-white before:rounded-full before:flex before:items-center before:justify-center before:w-14 before:h-14 lg:rounded-none lg:w-56 lg:h-auto lg:before:content-none lg:before:bg-transparent lg:bg-white lg:bottom-auto lg:right-auto lg:block">
      {isAuthenticated ? (
        <>
          <div className="bg-gray-100 p-3 rounded-lg mb-5">
            {/* <UserCircleIcon className="rounded-full h-12 w-12 float-right" /> */}
            <div className="text-sm">
              Hello,{" "}
              <span className="font-bold">
                {localStorage.getItem("username")}
              </span>
              !{" "}
              <Link to="/my-account" className="inline">
                <CogIcon className="inline-block w-5 h-5 mr-1" />
              </Link>
              <button
                className="ml-2 p-1 float-right bg-gray-300 text-slate-600 rounded-full hover:bg-gray-400"
                onClick={runLogout}
              >
                <LogoutIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isAdmin && (
            <div className="bg-gray-100 p-5 rounded-lg mb-5">
              <div className="usermenus-welcome">Admin Panel</div>
              <ul className="usermenus-ul">
                <li className="usermenus-li">
                  <Link to="/manage-users">Manage Users</Link>
                </li>
                <li className="usermenus-li">
                  <Link to="/manage-objects">Manage Objects</Link>
                </li>
              </ul>
            </div>
          )}

          <div className="hidden lg:block text-center text-sm text-gray-400">
            <div>
              {"{"} Made with a lot of ❤️ {"}"}
            </div>
            <div className="italic text-xs">Software version: 1.0.0</div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserMenus;
