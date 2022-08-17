import React from "react";
import { NavLink } from "react-router-dom";

import {
  HomeIcon,
  UserIcon,
  OfficeBuildingIcon,
  LoginIcon,
} from "@heroicons/react/solid";

const Menu = ({ isAuth }) => {
  const inActiveLink =
    "flex transition-all ease-in-out items-center p-4 text-xl text-white font-bold hover:bg-gray-200 hover:text-red-700 cursor-pointer rounded-xl active:scale-95 mb-2";

  const activeLink = "text-red-700 bg-gray-200 scale-95 " + inActiveLink;
  return (
    <nav className="menu">
      {isAuth && (
        <>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? activeLink : inActiveLink)}
          >
            <HomeIcon className="h-9 w-9 inline-block md:mr-2" />
            <span className="hidden md:inline-block">Home</span>
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) => (isActive ? activeLink : inActiveLink)}
          >
            <UserIcon className="h-9 w-9 inline-block md:mr-2" />
            <span className="hidden md:inline-block">Clients</span>
          </NavLink>
          <NavLink
            to="/visits"
            className={({ isActive }) => (isActive ? activeLink : inActiveLink)}
          >
            <OfficeBuildingIcon className="h-9 w-9 inline-block md:mr-2" />
            <span className="hidden md:inline-block">Visits</span>
          </NavLink>
        </>
      )}

      {!isAuth && (
        <NavLink to="/visits" className={activeLink}>
          <LoginIcon className="h-9 w-9 inline-block md:mr-2" />
          <span className="hidden md:inline-block">Login</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Menu;
