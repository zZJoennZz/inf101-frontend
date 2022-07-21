import React from "react";
import { Link } from "react-router-dom";

const UserMenus = ({ isAuthenticated, runLogout }) => {
  const isAdmin = true;
  return (
    <div className="flex-col">
      {isAuthenticated ? (
        <>
          <div className="bg-gray-100 p-5 rounded-lg mb-5">
            <img
              src="https://cdn.onlinewebfonts.com/svg/img_162386.png"
              alt="Joenn"
              className="rounded-full h-12 w-12 float-right border-2 border-white shadow-md"
            />
            <div className="flex-col text-sm">
              Hello,{" "}
              <span className="font-bold">
                {localStorage.getItem("username")}
              </span>
              !
            </div>
            <ul className="usermenus-ul">
              <li className="usermenus-li">
                <Link to="google.com">Change Password</Link>
              </li>
              <li className="usermenus-li">
                <Link to={0} onClick={runLogout}>
                  Logout
                </Link>
              </li>
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
